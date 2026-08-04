import Header from "../components/Header"
import Footer from "../components/Footer"
import styles from "./privacy-policy.module.css"

export default function PrivacyPolicy() {
  return (
    <>
      <Header showNavLinks={false} />
      <main className={styles.privacyPolicy} id="top">
        <div className={styles.container}>
          <h1>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last Updated: 4 August, 2026</p>

          <p className={styles.intro}>Thank you for playing our games!</p>

          <p>
            This Privacy Policy applies to all of Iskra Games, websites, stores, and related services
            (collectively referred to as the &ldquo;Service&rdquo;). We may occasionally update this Privacy Policy by posting a
            revised version on iskragames.com. If we make any significant changes, we will notify you in
            accordance with applicable laws, which may include placing a notice within the Service before the update
            becomes effective. Your continued use of the Service after the effective date signifies your agreement to
            the updated Privacy Policy.
          </p>

          <section>
            <h2>1. Information We Collect</h2>
            <p>
              We collect information to provide and enhance our Service. What is collected depends
              on <em>which</em> game you play and <em>where</em> you play it, so this section is split
              by platform. We do not sell your personal information.
            </p>

            <h3>a. Information you give us in-game</h3>
            <p>
              Some games let you choose a display name and a character. That is the only free-text
              input our games accept. We do not ask for your real name, address, date of birth, or
              phone number, and none of our games has an account or a password.
            </p>

            <h3>b. Games you install on a device (mobile and desktop)</h3>
            <p>
              Installed titles use third-party services to run, measure and fund themselves.
              Depending on the title, these may include analytics and crash reporting (Google
              Firebase), advertising (Google AdMob), player accounts and cloud saves (Microsoft Azure
              PlayFab), multiplayer networking (Photon), attribution measurement, and the store
              platform the game is distributed on (for example Apple App Store, Google Play, or
              Steam). Through those services we may receive:
            </p>
            <ul>
              <li>
                Device and platform details — device type, operating system, language, region,
                app version, unique advertising or device identifiers, and IP address.
              </li>
              <li>Gameplay activity — session length, progress, purchases, and crash reports.</li>
            </ul>
            <p>
              Each of those providers processes data under its own privacy policy. Advertising
              identifiers can be reset or limited in your device settings, and in the European Union,
              United Kingdom and other regions with equivalent rules you are asked for consent before
              any personalised advertising or optional analytics is enabled.
            </p>

            <h3>c. Games you play in a web browser</h3>
            <p>
              Our browser games — including <strong>Most Said</strong> — work differently, and
              deliberately collect less:
            </p>
            <ul>
              <li>
                <strong>No third-party analytics or advertising code of our own.</strong> There is no
                Google Analytics, no Firebase, and no advertising or tracking pixel inside the game.
              </li>
              <li>
                <strong>Ads and analytics belong to the portal.</strong> Where a game is published on
                a portal such as Poki, advertising and gameplay measurement are handled entirely by
                that portal&rsquo;s own software development kit. The events we send it are game
                milestones — a round started, a round finished — with no personal data attached. The
                portal&rsquo;s own privacy policy governs its advertising, analytics and cookies,
                including anything about personalised ads. For Poki, see{" "}
                <a href="https://poki.com/en/c/privacy-policy" rel="noopener noreferrer" target="_blank">
                  Poki&rsquo;s privacy policy
                </a>
                .
              </li>
              <li>
                <strong>Settings stay in your browser.</strong> Your display name, character choice,
                best score, whether you muted the sound, and which questions you have seen recently
                are saved in your browser&rsquo;s local storage. That never leaves your device, and
                clearing your browser data deletes it permanently. If your browser blocks local
                storage — private or incognito mode does — the game still works, it just will not
                remember anything between sessions.
              </li>
            </ul>

            <h3>d. Multiplayer play</h3>
            <p>
              When a game offers online multiplayer, joining a room means exchanging a small amount
              of information with our server so the other players can see you.
            </p>
            <p>
              For <strong>Most Said</strong>, this happens <em>only</em> when you join a Private Room.
              Solo play and Quick Match run entirely inside your browser against simulated opponents
              and send nothing anywhere. The server is{" "}
              <code>hive-mind-rooms.ludwik-bacmaga.workers.dev</code>, running on Cloudflare Workers
              and Durable Objects, reached over an encrypted connection. While you are in a room it
              relays your display name and character choice, your score and how many answers you have
              found, how many questions you have finished, and the four-character room code.
            </p>
            <p>
              <strong>It is a relay, not a database.</strong> Those details live on the open
              connection and are discarded when it closes; the only thing stored is the room&rsquo;s
              question set, so a player joining a moment late gets the same questions, and that
              disappears with the room. Nothing survives you closing the tab — there is no account,
              no history and no profile. Display names are filtered for offensive language on arrival,
              because other players see them.
            </p>

            <h3>e. Contact information</h3>
            <p>
              If you contact us by email or through an in-game feedback form, we receive your email
              address and whatever you choose to tell us, and we keep it only as long as needed to
              answer you.
            </p>

            <div className={styles.note}>
              Note: Our games do not collect or process any sensitive medical information. They are
              designed purely for entertainment.
            </div>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve the functionality of our Service.</li>
              <li>Monitor and analyze usage trends to enhance the user experience.</li>
              <li>Respond to user inquiries and provide customer support.</li>
              <li>Send updates and notifications about the Service, if applicable.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2>3. Legal Basis for Processing Personal Data (For Users in the EU/UK)</h2>
            <p>
              For individuals in the European Union or the United Kingdom, we process your data based on the following
              legal grounds:
            </p>
            <ul>
              <li>
                Consent: When you provide explicit consent (e.g., for optional analytics or marketing communications).
              </li>
              <li>Legitimate Interests: For operational purposes such as maintaining and improving the Service.</li>
              <li>Legal Obligation: When required to comply with applicable laws.</li>
            </ul>
          </section>

          <section>
            <h2>4. Sharing and Disclosure of Information</h2>
            <p>We only share your information under the following limited circumstances:</p>

            <h3>a. Service Providers</h3>
            <p>
              We may share information with third-party service providers who assist with hosting,
              analytics, advertising, multiplayer networking and customer support. Depending on the
              game, these include Google (Firebase and AdMob), Microsoft (Azure PlayFab), Photon,
              Cloudflare, the store or portal distributing the game, and our email provider. These
              providers are obligated to handle your data securely and only for the purposes we
              specify. A game&rsquo;s own in-game credits and section 1 above identify which apply.
            </p>

            <h3>b. Legal Compliance</h3>
            <p>
              We may disclose your information if required to do so by law or in response to valid legal requests by
              public authorities.
            </p>

            <h3>c. Business Transfers</h3>
            <p>
              If Iskra Games undergoes a merger, acquisition, or asset sale, your information may be
              transferred as part of that transaction. You will be notified of any such change.
            </p>
          </section>

          <section>
            <h2>5. International Data Transfers</h2>
            <p>
              Your information may be processed and stored outside your country of residence, including in the United
              States. We ensure that appropriate safeguards are in place to protect your data in accordance with
              applicable laws, such as the EU/UK General Data Protection Regulation (GDPR).
            </p>
          </section>

          <section>
            <h2>6. Data Retention</h2>
            <p>
              We retain your information only as long as necessary to fulfill the purposes outlined in this Privacy
              Policy, or as required by law. When information is no longer needed, we securely delete or anonymize it.
              Multiplayer room data is the shortest-lived: it is discarded when the room closes, and
              data kept only in your browser&rsquo;s local storage is deleted whenever you clear your
              browser data.
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
              <a href="mailto:contact@iskragames.com">contact@iskragames.com</a>. We will respond in
              accordance with applicable laws.
            </p>
          </section>

          <section>
            <h2>8. Children&rsquo;s Privacy</h2>
            <p>
              Our Service is not intended for children under 13 years old (or the minimum age in your jurisdiction). We
              do not knowingly collect personal data from children. If you believe we have collected data from a child
              under this age, please contact us at{" "}
              <a href="mailto:contact@iskragames.com">contact@iskragames.com</a>, and we will take steps
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
            <div className={styles.note}>
              <p>
                <b>Iskra Games</b>
                <br />
                <b>Email:</b> <a href="mailto:contact@iskragames.com">contact@iskragames.com</a>
                <br />
                <b>Website:</b> <a href="https://iskragames.com">https://iskragames.com</a>
              </p>
            </div>
            <p>Thank you for playing our games and trusting Iskra Games!</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
