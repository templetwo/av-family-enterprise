import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui";
import { site, trademarkNotice } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/notices")({
  head: () =>
    pageMeta({
      title: "Notices | AV Family Enterprise LLC",
      description: "Privacy notice, accessibility statement, and trademarks and attributions for avfamilyenterprise.com.",
      path: "/notices",
    }),
  component: Notices,
});

const ISSUES = "https://github.com/templetwo/av-family-enterprise/issues";

function Notices() {
  return (
    <>
      <PageHeader eyebrow="Notices" title="Privacy, accessibility, and attributions" />
      <div className="wrap max-w-[820px]! space-y-14 py-[clamp(48px,7vw,80px)]">
        <section id="privacy">
          <h2 className="h2">Privacy notice</h2>
          <div className="mt-4 space-y-3 text-ink-soft">
            <p>
              This site sets no cookies, runs no analytics or tracking, and loads no third-party scripts or fonts. Every
              page, image and font is served from this site.
            </p>
            <p>
              The site is hosted on GitHub Pages. Like any web host, GitHub receives technical request data such as your
              IP address when you load a page; that is governed by GitHub’s own privacy statement, not collected by us.
            </p>
            <p>
              This site has no inquiry form of its own yet. Links on the Contact page lead to a separate inquiry form on
              the founder’s research site; what you submit there is used only to reply to your inquiry.
            </p>
            <p>This notice was last updated on 26 September 2026 and will be revised before any form or analytics is added.</p>
          </div>
        </section>

        <section id="accessibility">
          <h2 className="h2">Accessibility</h2>
          <div className="mt-4 space-y-3 text-ink-soft">
            <p>
              This site is built toward WCAG 2.2 AA: visible focus, text alternatives for every image, labeled
              navigation, and color contrast checked at design time. That is a target, not a claim of conformance; the
              site has not been independently audited.
            </p>
            <p>
              <b className="font-semibold text-ink">Report an accessibility barrier.</b> If something on this site does
              not work for you, please describe the page and the problem in a public issue at{" "}
              <a className="tlink" href={ISSUES} target="_blank" rel="noopener">github.com/templetwo/av-family-enterprise/issues</a>, or
              through the inquiry route on the Contact page if you prefer not to post publicly.
            </p>
          </div>
        </section>

        <section id="notices">
          <h2 className="h2">Trademarks and attributions</h2>
          <div className="mt-4 space-y-3 text-ink-soft">
            <p>{trademarkNotice}</p>
            <p>
              Screenshots of the operator training simulator, T2Helix, cosmic-cli, Project Epistemic Bound and Master
              Operations Agent were captured from the founder’s own public repositories using synthetic, scripted or
              offline data only. The founder portrait and the VDAC1 illustration are published on the founder’s public
              research site.
            </p>
            <p>
              Each project referenced on this site keeps its own license and authorship; listing it here does not change
              either. Papers are published under CC BY 4.0.
            </p>
            <p>
              Typefaces: IBM Plex Sans and IBM Plex Mono, SIL Open Font License. The logo lettering is set in Michroma,
              SIL Open Font License.
            </p>
            <p>© 2026 {site.legalName}.</p>
          </div>
        </section>
      </div>
    </>
  );
}
