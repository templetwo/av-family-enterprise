// Node loader hooks: resolve the Workers-only `cloudflare:email` module to a stub.
const STUB = 'data:text/javascript,' + encodeURIComponent(
  'export class EmailMessage { constructor(from, to, raw) { this.from = from; this.to = to; this.raw = raw; } }'
);
export async function resolve(specifier, context, next) {
  if (specifier === 'cloudflare:email') return { url: STUB, shortCircuit: true };
  return next(specifier, context);
}
