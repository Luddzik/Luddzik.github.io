import Header from "../components/Header"
import Footer from "../components/Footer"
import LegalEntity from "../components/LegalEntity"
import { CONTACT_EMAIL, SITE_HOST, STUDIO_NAME } from "../lib/brand"
import styles from "./privacy-policy.module.css"

export default function PrivacyPolicy() {
  return (
    <>
      <Header showNavLinks={false} />
      <main className={styles.privacyPolicy} id="top">
        <div className={styles.container}>
          <h1>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last Updated: 14 September, 2026</p>

          <p className={styles.intro}>Thank you for playing our games!</p>

          <p>
            This Privacy Policy applies to all of {STUDIO_NAME}, our games, this website and
            related services (collectively the &ldquo;Service&rdquo;). {STUDIO_NAME} is a
            trading name of a sole proprietorship established in Poland; the registration
            details are in section 12, and the data controller for the purposes of the GDPR is
            that business. We may occasionally update this Privacy Policy by posting a revised
            version on {SITE_HOST}. If we make any significant changes, we will notify you in
            accordance with applicable laws, which may include placing a notice within the
            Service before the update becomes effective. Your continued use of the Service after
            the effective date signifies your agreement to the updated Privacy Policy.
          </p>

          <section>
            <h2>1. Information We Collect</h2>
            <p>
              We collect very little, because there is very little to collect. Our games are
              single-player and run offline; this website is a set of static pages. We do not
              sell your personal information, and we have never done so.
            </p>

            <h3>a. Inside our games</h3>
            <p>
              Our games have <strong>no account and no password</strong>, no advertising, and no
              analytics, telemetry or crash-reporting software of our own. Nothing you do in a
              game is sent to us.
            </p>
            <p>
              Your progress is written to a save file on your own computer. It stays there,
              deleting it deletes the data, and we never receive a copy.
            </p>

            <h3>b. The store you get the game from</h3>
            <p>
              Our games are distributed through storefronts such as Steam and itch.io. Those
              platforms have their own accounts, their own payment handling and their own data
              collection, all governed by their own privacy policies rather than this one — see{" "}
              <a
                href="https://store.steampowered.com/privacy_agreement/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Valve&rsquo;s privacy policy
              </a>{" "}
              and{" "}
              <a href="https://itch.io/docs/legal/privacy-policy" rel="noopener noreferrer" target="_blank">
                itch.io&rsquo;s privacy policy
              </a>
              . What reaches us from them is aggregate reporting — how many copies sold,
              wishlists, refunds, broad country and platform breakdowns — which does not
              identify individual players.
            </p>

            <h3>c. Feedback you choose to send us</h3>
            <p>
              Some builds offer a feedback button that opens an optional form hosted on Google
              Forms. It requires no sign-in, and you decide what to write. If you include your
              email address so we can follow up, we use it only to reply to you. Google processes
              the form submission under its own privacy policy.
            </p>

            <h3>d. This website</h3>
            <p>
              This site is a set of static pages hosted on GitHub Pages. It sets{" "}
              <strong>no cookies</strong> and carries no analytics, no advertising and no
              tracking pixels. As the host, GitHub processes standard server request logs,
              including your IP address, to deliver the pages and protect the service; see{" "}
              <a
                href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub&rsquo;s privacy statement
              </a>
              .
            </p>

            <h3>e. Contact information</h3>
            <p>
              If you contact us by email, we receive your email address and whatever you choose
              to tell us, and we keep it only as long as needed to answer you.
            </p>

            <div className={styles.note}>
              Note: Our games do not collect or process any sensitive medical information. They
              are designed purely for entertainment.
            </div>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use the little information we receive to:</p>
            <ul>
              <li>Provide, maintain, and improve the functionality of our Service.</li>
              <li>Understand what players think of a game so we can make it better.</li>
              <li>Respond to user inquiries and provide customer support.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2>3. Legal Basis for Processing Personal Data (For Users in the EU/UK)</h2>
            <p>
              We are established in Poland, so the GDPR applies to our processing. The legal
              grounds we rely on are:
            </p>
            <ul>
              <li>
                Consent: when you choose to send us feedback or write to us, you decide what to
                share, and you can withdraw it at any time by asking us to delete it.
              </li>
              <li>
                Legitimate Interests: for operational purposes such as delivering this website
                securely and maintaining and improving the Service.
              </li>
              <li>Legal Obligation: when required to comply with applicable laws.</li>
            </ul>
          </section>

          <section>
            <h2>4. Sharing and Disclosure of Information</h2>
            <p>We only share your information under the following limited circumstances:</p>

            <h3>a. Service Providers</h3>
            <p>
              We rely on a small number of third parties to run the Service: the storefront
              distributing a game (such as Valve or itch.io), GitHub for hosting this website,
              Google for the optional feedback form, and our email provider. Each processes data
              under its own privacy policy and only for the purposes described in section 1.
            </p>

            <h3>b. Legal Compliance</h3>
            <p>
              We may disclose your information if required to do so by law or in response to valid legal requests by
              public authorities.
            </p>

            <h3>c. Business Transfers</h3>
            <p>
              If the business behind {STUDIO_NAME} undergoes a merger, acquisition, or asset
              sale, your information may be transferred as part of that transaction. You will be
              notified of any such change.
            </p>
          </section>

          <section>
            <h2>5. International Data Transfers</h2>
            <p>
              Some of the providers listed in section 4 are established outside the European
              Economic Area, including in the United States, so the limited information they
              handle on our behalf may be processed there. Where that happens we rely on the
              safeguards those providers put in place under the GDPR, such as the European
              Commission&rsquo;s adequacy decisions or Standard Contractual Clauses.
            </p>
          </section>

          <section>
            <h2>6. Data Retention</h2>
            <p>
              We retain your information only as long as necessary to fulfill the purposes
              outlined in this Privacy Policy, or as required by law. In practice that means
              correspondence and feedback are kept while they are still useful and then deleted.
              Your game progress is not ours to retain at all — it lives in a save file on your
              own computer, and clearing it removes it permanently.
            </p>
          </section>

          <section>
            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul>
              <li>Access: Request access to the data we hold about you.</li>
              <li>Correction: Request correction of inaccurate or incomplete data.</li>
              <li>Erasure: Request deletion of your data (subject to legal and contractual obligations).</li>
              <li>Restriction: Request the restriction of data processing.</li>
              <li>Objection: Object to data processing based on legitimate interests.</li>
              <li>Portability: Request the transfer of your data to another service.</li>
              <li>Withdraw Consent: Withdraw consent for processing where applicable.</li>
            </ul>
            <p>
              To exercise these rights, please contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will respond in
              accordance with applicable laws. If you are in the European Union and believe we
              have not handled your data properly, you may also complain to a supervisory
              authority — in Poland that is the President of the Personal Data Protection Office
              (Prezes Urzędu Ochrony Danych Osobowych, UODO).
            </p>
          </section>

          <section>
            <h2>8. Children&rsquo;s Privacy</h2>
            <p>
              Our Service is not intended for children under 13 years old (or the minimum age in your jurisdiction). We
              do not knowingly collect personal data from children. If you believe we have collected data from a child
              under this age, please contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, and we will take steps
              to delete it.
            </p>
          </section>

          <section>
            <h2>9. Security Measures</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your information. However, no
              method of transmission over the internet or electronic storage is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>10. Third-Party Links</h2>
            <p>
              Our Service may include links to third-party websites or services. We are not responsible for the privacy
              practices of these third parties, and we encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2>11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, with the
              updated date at the top. We encourage you to review the Privacy Policy periodically.
            </p>
          </section>

          <section>
            <h2>12. Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, you can reach us at:</p>
            <LegalEntity className={styles.note} />
            <p>Thank you for playing our games and trusting {STUDIO_NAME}!</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
