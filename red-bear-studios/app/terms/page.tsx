import Header from "../components/Header"
import Footer from "../components/Footer"
import BackgroundPaths from "../components/BackgroundPaths"
import styles from "./terms.module.css"

export default function Terms() {
  return (
    <>
      <Header showNavLinks={false} />
      <BackgroundPaths />
      <main className={styles.terms} id="top">
        <div className={styles.container}>
          <h1>Terms and Conditions</h1>
          <p className={styles.lastUpdated}>Last Updated: February, 2024</p>

          <p className={styles.intro}>
            Welcome to RedBear Studios! These Terms and Conditions govern your use of our games, websites, and services.
          </p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, or using our games or services, you agree to be bound by these Terms. If you
              do not agree to these Terms, please do not use our Service.
            </p>
          </section>

          <section>
            <h2>2. License to Use</h2>
            <p>
              RedBear Studios grants you a personal, non-exclusive, non-transferable, revocable license to use our games
              and services for personal, non-commercial purposes, subject to these Terms.
            </p>
          </section>

          <section>
            <h2>3. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use our Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Modify, adapt, or hack our Service</li>
              <li>Use cheats, exploits, automation software, or bots</li>
              <li>Sell, lease, or sublicense our games or any game content</li>
            </ul>
          </section>

          <section>
            <h2>4. Intellectual Property</h2>
            <p>
              All rights, title, and interest in and to our Service, including all intellectual property rights, are
              owned by or licensed to RedBear Studios.
            </p>
          </section>

          <section>
            <h2>5. Disclaimer of Warranties</h2>
            <p>
              Our Service is provided "as is" without any warranties, expressed or implied. RedBear Studios does not
              warrant that our Service will be uninterrupted or error-free.
            </p>
          </section>

          <section>
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:legal@redbearstudios.com">legal@redbearstudios.com</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

