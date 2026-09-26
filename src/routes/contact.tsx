import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui";
import { site } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta({
      title: "Contact | AV Family Enterprise LLC",
      description: "Bring a defined problem or an open question: a technical project or a research collaboration.",
      path: "/contact",
    }),
  component: Contact,
});

const TEMPLE_INQUIRY = "https://thetempleoftwo.com/inquiry";

const field =
  "min-h-[46px] w-full rounded-md border border-rule bg-card px-3 text-[15px] text-ink focus-visible:outline-2 focus-visible:outline-cyan";

function InquiryForm({ action }: { action: string }) {
  return (
    <form action={action} method="post" className="card grid gap-[18px]">
      <label className="grid gap-1.5 text-[14.5px] font-medium">Name<input className={field} type="text" name="name" autoComplete="name" required /></label>
      <label className="grid gap-1.5 text-[14.5px] font-medium">Organization<input className={field} type="text" name="org" autoComplete="organization" /></label>
      <label className="grid gap-1.5 text-[14.5px] font-medium">Work email<input className={field} type="email" name="email" autoComplete="email" required /></label>
      <label className="grid gap-1.5 text-[14.5px] font-medium">
        Type of inquiry
        <select className={field} name="type" defaultValue="Technical project">
          <option>Technical project</option>
          <option>Research collaboration</option>
          <option>Capability statement request</option>
          <option>Other</option>
        </select>
      </label>
      <label className="grid gap-1.5 text-[14.5px] font-medium">
        Non-sensitive summary
        <textarea className={`${field} py-3`} name="summary" rows={5} required />
      </label>
      <p className="text-[13.5px] text-ink-soft">
        Please provide a non-sensitive project summary. Do not submit classified information, controlled unclassified
        information, credentials, personal records, or proprietary operational data through this form.
      </p>
      <button type="submit" className="btn btn-primary justify-self-start">Send inquiry</button>
    </form>
  );
}

function Contact() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Bring a defined problem — or an open question.">
        For a technical project: objective, constraints, timeline, and the evidence you would need to judge the result.
        For a research collaboration: the question, what exists, and what validation is needed next.
      </PageHeader>
      <section className="section">
        <div className="wrap grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {site.formEndpoint ? (
            <InquiryForm action={site.formEndpoint} />
          ) : (
            <div className="card">
              <h2 className="h3">How to reach us today</h2>
              <p className="mt-3 text-ink-soft">
                The inquiry form on this site opens once the business mailbox has been tested. Until then, inquiries
                reach the founder through the research site’s inquiry form. Please state that your message is for AV
                Family Enterprise, and include the type of inquiry: technical project, research collaboration,
                capability statement request, or other.
              </p>
              <a href={TEMPLE_INQUIRY} target="_blank" rel="noopener" className="btn btn-primary mt-6">
                Open the inquiry form ↗
              </a>
              <p className="mt-6 text-[13.5px] text-ink-soft">
                Please provide a non-sensitive project summary. Do not submit classified information, controlled
                unclassified information, credentials, personal records, or proprietary operational data through any
                inquiry form.
              </p>
            </div>
          )}
          <aside className="grid content-start gap-6">
            <div>
              <p className="mono text-ink-soft">Business contact</p>
              <p className="mt-2 font-semibold">{site.legalName} · {site.location}</p>
            </div>
            <div className="card">
              <p className="font-semibold">Verified business email added after the mailbox test</p>
              <p className="mt-2 text-[14.5px] text-ink-soft">
                This form is an inquiry channel, not an approved intake system for controlled data.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
