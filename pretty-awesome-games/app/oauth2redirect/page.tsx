import Link from "next/link"
import type { Metadata } from "next"
import Header from "../components/Header"
import Footer from "../components/Footer"
import styles from "./oauth2redirect.module.css"

/**
 * A leftover OAuth redirect target from the retired mobile titles, which used to
 * carry its own full copy of the privacy policy. Both of those games are delisted,
 * so that copy was stale *and* contradicted the current policy — it still promised
 * Google Analytics and Firebase — which is worse than useless on a legal page.
 *
 * The route is kept rather than deleted because the URL may still be registered as a
 * redirect URI on a Google Cloud OAuth client; removing it there is what makes this
 * page safe to delete. It stays out of the sitemap and disallowed in robots.ts.
 */
export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: false },
}

export default function Oauth2Redirect() {
  return (
    <>
      <Header showNavLinks={false} />
      <main className={styles.privacyPolicy} id="top">
        <div className={styles.container}>
          <h1>Privacy Policy</h1>

          <p className={styles.intro}>
            This page used to hold an older copy of our privacy policy, kept for a
            sign-in flow that no longer exists.
          </p>

          <p>
            The current policy — the only one that applies — lives at{" "}
            <Link href="/privacy-policy">/privacy-policy</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
