import Header from "../components/Header"
import Footer from "../components/Footer"
import BackgroundPaths from "../components/BackgroundPaths"
import styles from "./oauth2redirect.module.css"

export default function Oauth2Redirect() {
  return (
    <>
      <Header showNavLinks={false} />
      <BackgroundPaths />
      <main className={styles.privacyPolicy} id="top">
        <div className={styles.container}>
          <h1>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last Updated: 16 May, 2025</p>

          <p className={styles.intro}>Thank you for playing our games!</p>

          <p>
            This Privacy Policy applies to all of Pretty Awesome Games, websites, stores, and related services (collectively referred to as the "Service"). We may occasionally update this Privacy Policy by posting a revised version on prettyawesomegames.com. If we make any significant changes, we will notify you in accordance with applicable laws, which may include placing a notice within the Service before the update becomes effective. Your continued use of the Service after the effective date signifies your agreement to the updated Privacy Policy.
          </p>

          <section>
            <h2>1. Information We Collect</h2>
            <p>We collect information to provide and enhance our Service. The types of information we may collect include:</p>

            <h3>a. Device and Usage Information</h3>
            <ul>
              <li>Details about the device or platform you use to access our games (e.g., device type, operating system, unique device identifiers, IP address).</li>
              <li>Gameplay activity, session duration, in-game interactions, and other usage data.</li>
            </ul>

            <h3>b. Analytics Data</h3>
            <p>We use analytics tools (e.g., Google Analytics, Google Analytics for Firebase, or similar services) to collect data on Service usage, crash reports, and other user interactions.</p>

            <h3>c. Contact Information</h3>
            <p>If you contact us via email or through any in-game feedback/contact forms, we may collect your name, email address, and any additional information you choose to provide.</p>

            <div className={styles.note}>
              Note: Our games do not collect or process any sensitive medical information. They are designed purely for entertainment.
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
            <p>For individuals in the European Union or the United Kingdom, we process your data based on the following legal grounds:</p>
            <ul>
              <li>Consent: When you provide explicit consent (e.g., for optional analytics or marketing communications).</li>
              <li>Legitimate Interests: For operational purposes such as maintaining and improving the Service.</li>
              <li>Legal Obligation: When required to comply with applicable laws.</li>
            </ul>
          </section>

          <section>
            <h2>4. Sharing and Disclosure of Information</h2>
            <p>We only share your information under the following limited circumstances:</p>

            <h3>a. Service Providers</h3>
            <p>We may share information with third-party service providers who assist in tasks such as hosting, analytics, and customer support. These providers are obligated to handle your data securely and only for the purposes we specify.</p>

            <h3>b. Legal Compliance</h3>
            <p>We may disclose your information if required to do so by law or in response to valid legal requests by public authorities.</p>

            <h3>c. Business Transfers</h3>
            <p>If Pretty Awesome Games undergoes a merger, acquisition, or asset sale, your information may be transferred as part of that transaction. You will be notified of any such change.</p>
          </section>

          <section>
            <h2>5. International Data Transfers</h2>
            <p>Your information may be processed and stored outside your country of residence, including in the United States. We ensure that appropriate safeguards are in place to protect your data in accordance with applicable laws, such as the EU/UK General Data Protection Regulation (GDPR).</p>
          </section>

          <section>
            <h2>6. Data Retention</h2>
            <p>We retain your information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, or as required by law. When information is no longer needed, we securely delete or anonymize it.</p>
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
            <p>To exercise these rights, please contact us at <a href="mailto:contact@prettyawesomegames.com">contact@prettyawesomegames.com</a>. We will respond in accordance with applicable laws.</p>
          </section>

          <section>
            <h2>8. Children's Privacy</h2>
            <p>Our Service is not intended for children under 13 years old (or the minimum age in your jurisdiction). We do not knowingly collect personal data from children. If you believe we have collected data from a child under this age, please contact us at <a href="mailto:contact@prettyawesomegames.com">contact@prettyawesomegames.com</a>, and we will take steps to delete it.</p>
          </section>

          <section>
            <h2>9. Security Measures</h2>
            <p>We implement reasonable technical and organizational measures to protect your information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2>10. Third-Party Links</h2>
            <p>Our Service may include links to third-party websites or services. We are not responsible for the privacy practices of these third parties, and we encourage you to review their privacy policies.</p>
          </section>

          <section>
            <h2>11. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, with the updated date at the top. We encourage you to review the Privacy Policy periodically.</p>
          </section>

          <section>
            <h2>12. Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, you can reach us at:</p>
            <div className={styles.note}>
              <p>
                <b>Pretty Awesome Games</b><br />
                <b>Email:</b> <a href="mailto:contact@prettyawesomegames.com">contact@prettyawesomegames.com</a><br />
                <b>Website:</b> <a href="https://prettyawesomegames.com">https://prettyawesomegames.com</a>
              </p>
            </div>
            <p>Thank you for playing our games and trusting Pretty Awesome Games!</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
