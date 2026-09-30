// Run: node --import ./test/register.mjs --test test/   (from contact-worker/)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { buildMime } from '../src/worker.js';

const URL_ = 'https://contact.templetwo.com/avfe';
const SITE = 'https://avfamilyenterprise.com';

function kv() {
  const m = new Map();
  return { get: async (k) => (m.has(k) ? m.get(k) : null), put: async (k, v) => void m.set(k, v), m };
}
function env(over = {}) {
  const sent = [];
  return {
    sent,
    RL: kv(),
    EMAIL: { send: async (msg) => void sent.push(msg) },
    CONTACT_TO: 'info@avfamilyenterprise.com',
    CONTACT_FROM: 'AV Family Enterprise <avfe-contact@templetwo.com>',
    ...over,
  };
}
const good = { name: 'Jane Doe', org: 'Test Agency', email: 'jane@example.gov', type: 'Technical project', summary: 'We need a simulator.' };
function post(fields, { origin = SITE, ip = '203.0.113.7', headers = {} } = {}) {
  const h = { 'Content-Type': 'application/x-www-form-urlencoded', 'CF-Connecting-IP': ip, ...headers };
  if (origin) h.Origin = origin;
  return new Request(URL_, { method: 'POST', headers: h, body: new URLSearchParams(fields).toString() });
}
function decodeParts(raw) {
  // base64 bodies follow each "Content-Transfer-Encoding: base64" header block.
  return [...raw.matchAll(/Content-Transfer-Encoding: base64\r\n\r\n([A-Za-z0-9+/=]+)/g)].map((m) => Buffer.from(m[1], 'base64').toString('utf8'));
}

test('GET is refused with 405', async () => {
  const r = await worker.fetch(new Request(URL_), env());
  assert.equal(r.status, 405);
  assert.equal(r.headers.get('X-Contact-Worker'), 'avfe');
});

test('foreign Origin is refused with 403 and sends nothing', async () => {
  const e = env();
  const r = await worker.fetch(post(good, { origin: 'https://evil.example' }), e);
  assert.equal(r.status, 403);
  assert.equal(e.sent.length, 0);
});

test('honeypot filled: 200, nothing sent', async () => {
  const e = env();
  const r = await worker.fetch(post({ ...good, website: 'http://spam' }), e);
  assert.equal(r.status, 200);
  assert.equal(e.sent.length, 0);
});

test('missing or invalid fields: 422, nothing sent', async () => {
  for (const f of [{ ...good, name: '' }, { ...good, summary: '  ' }, { ...good, email: 'not-an-email' }, { ...good, email: 'a b@c.com' }]) {
    const e = env();
    const r = await worker.fetch(post(f), e);
    assert.equal(r.status, 422, JSON.stringify(f));
    assert.equal(e.sent.length, 0);
  }
});

test('fails closed without the RL binding (503) or without EMAIL (503)', async () => {
  for (const over of [{ RL: undefined }, { EMAIL: undefined }]) {
    const e = env(over);
    const r = await worker.fetch(post(good), e);
    assert.equal(r.status, 503);
    assert.equal(r.headers.get('X-Contact-Status'), 'not_configured');
    assert.equal(e.sent.length, 0);
  }
});

test('valid inquiry: one message to the fixed inbox, reply-to the sender', async () => {
  const e = env();
  const r = await worker.fetch(post(good), e);
  assert.equal(r.status, 200);
  assert.match(r.headers.get('Content-Type'), /text\/html/);
  assert.match(await r.text(), /Inquiry sent/);
  assert.equal(e.sent.length, 1);
  const msg = e.sent[0];
  assert.equal(msg.to, 'info@avfamilyenterprise.com');
  assert.equal(msg.from, 'avfe-contact@templetwo.com');
  assert.match(msg.raw, /^From: AV Family Enterprise <avfe-contact@templetwo\.com>\r\n/);
  assert.match(msg.raw, /\r\nReply-To: jane@example\.gov\r\n/);
  assert.match(msg.raw, /\r\nSubject: AV Family Enterprise inquiry · Technical project · Jane Doe\r\n|\r\nSubject: =\?UTF-8\?B\?/);
  const [text, html] = decodeParts(msg.raw);
  assert.match(text, /Organization: Test Agency/);
  assert.match(text, /We need a simulator\./);
  assert.match(html, /We need a simulator\./);
});

test('unknown inquiry type becomes "Other"', async () => {
  const e = env();
  await worker.fetch(post({ ...good, type: 'Wire me money' }), e);
  const [text] = decodeParts(e.sent[0].raw);
  assert.match(text, /Type: Other/);
});

test('header injection via name is neutralised; HTML is escaped', async () => {
  const e = env();
  await worker.fetch(post({ ...good, name: 'Eve\r\nBcc: victim@example.com', summary: '<script>alert(1)</script>' }), e);
  const raw = e.sent[0].raw;
  const headerBlock = raw.split('\r\n\r\n')[0];
  assert.doesNotMatch(headerBlock, /\r\nBcc:/i);
  const [, html] = decodeParts(raw);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
});

test('rate limit: the 6th message from one IP in the window is refused (429)', async () => {
  const e = env();
  for (let i = 0; i < 5; i++) assert.equal((await worker.fetch(post(good), e)).status, 200);
  const r = await worker.fetch(post(good), e);
  assert.equal(r.status, 429);
  assert.equal(e.sent.length, 5);
  // a different IP is unaffected
  assert.equal((await worker.fetch(post(good, { ip: '198.51.100.9' }), e)).status, 200);
});

test('oversized body is refused with 413 (declared and streamed)', async () => {
  const big = { ...good, summary: 'x'.repeat(40 * 1024) };
  const e = env();
  assert.equal((await worker.fetch(post(big), e)).status, 413);
  // no Content-Length: streamed cap must still hold
  const body = new URLSearchParams(big).toString();
  const stream = new ReadableStream({ start(c) { c.enqueue(new TextEncoder().encode(body)); c.close(); } });
  const req = new Request(URL_, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', Origin: SITE }, body: stream, duplex: 'half' });
  assert.equal((await worker.fetch(req, e)).status, 413);
  assert.equal(e.sent.length, 0);
});

test('transport failure returns 502', async () => {
  const e = env({ EMAIL: { send: async () => { throw new Error('E_RECIPIENT_NOT_ALLOWED'); } } });
  const r = await worker.fetch(post(good), e);
  assert.equal(r.status, 502);
  assert.equal(r.headers.get('X-Contact-Status'), 'send_failed');
});

test('no Origin header (non-browser) still passes through to the rate limit', async () => {
  const e = env();
  const r = await worker.fetch(post(good, { origin: null }), e);
  assert.equal(r.status, 200);
  assert.equal(e.sent.length, 1);
});

test('buildMime strips CR/LF from every header value (ASCII subject, no encoded-word)', () => {
  const raw = buildMime({
    fromEmail: 'avfe-contact@templetwo.com',
    fromName: 'AV Family Enterprise',
    to: 'info@avfamilyenterprise.com',
    replyTo: 'jane@example.gov\r\nBcc: victim@example.com',
    subject: 'Hello\r\nBcc: victim@example.com',
    text: 'body',
    html: '<p>body</p>',
  });
  const headerBlock = raw.split('\r\n\r\n')[0];
  assert.doesNotMatch(headerBlock, /\r\nBcc:/i);
  assert.match(headerBlock, /\r\nSubject: Hello Bcc: victim@example\.com\r\n/);
});

test('a multi-line name arrives as one line', async () => {
  const e = env();
  await worker.fetch(post({ ...good, name: 'Jane\nDoe' }), e);
  const [text] = decodeParts(e.sent[0].raw);
  assert.match(text, /^Name: Jane Doe$/m);
});
