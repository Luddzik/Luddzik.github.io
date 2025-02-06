import Header from "../components/Header"
import Footer from "../components/Footer"
import BackgroundPaths from "../components/BackgroundPaths"
import styles from "./privacy-policy.module.css"

export default function PrivacyPolicy() {
  return (
    <>
      <Header showNavLinks={false} />
      <BackgroundPaths />
      <main className={styles.privacyPolicy} id="top">
        <div className={styles.container}>
          <h1>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last Updated: February, 2024</p>

          <p className={styles.intro}>Thank you for playing our games!</p>

          <p>
            This Privacy Policy applies to all of RedBear Studios's games, websites, stores, and related services
            (collectively referred to as the "Service"). We may occasionally update this Privacy Policy by posting a
            revised version on redbearstudios.com. If we make any significant changes, we will notify you in accordance
            with applicable laws, which may include placing a notice within the Service before the update becomes
            effective. Your continued use of the Service after the effective date signifies your agreement to the
            updated Privacy Policy.
          </p>

          <section>
            <h2>1. Information We Collect</h2>
            <p>
              We collect information to provide and enhance our Service. The types of information we may collect
              include:
            </p>

            <h3>a) Device and Usage Information</h3>
            <ul>
              <li>
                Details about the device or platform you use to access our games (e.g., device type, operating system,
                unique device identifiers, IP address).
              </li>
              <li>Gameplay activity, session duration, in-game interactions, and other usage data.</li>
            </ul>

            <h3>b) Analytics Data</h3>
            <p>
              We use analytics tools (e.g., Google Analytics, Google Analytics for Firebase, or similar services) to
              collect data on Service usage, crash reports, and other user interactions.
            </p>

            <h3>c) Contact Information</h3>
            <p>
              If you contact us via email or through any in-game feedback/contact forms, we may collect your name, email
              address, and any additional information you choose to provide.
            </p>

            <div className={styles.note}>
              Note: Our games do not collect or process any sensitive medical information. They are designed purely for
              entertainment.
            </div>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Provide and maintain our Service</li>
              <li>Improve and optimize our games and services</li>
              <li>Respond to your comments and questions</li>
              <li>Send you related information, including confirmations, updates, and security alerts</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>3. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@redbearstudios.com">privacy@redbearstudios.com</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

