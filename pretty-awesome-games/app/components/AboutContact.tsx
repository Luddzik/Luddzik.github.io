import { FaEnvelope, FaDiscord } from "react-icons/fa"
import styles from "./AboutContact.module.css"

export default function AboutContact() {
  return (
    <section className={styles.aboutContact}>
      <div className={styles.container}>
        <div className={styles.about}>
          <h2>About Us</h2>
          <div className={styles.aboutContent}>
            <div className={styles.aboutImage}>
              <img src="/images/team.jpg" alt="Pretty Awesome Games Team" />
            </div>
            <div className={styles.aboutText}>
              <p>
                Pretty Awesome Games is an indie game development studio dedicated to creating challenging, fun, and engaging
                gaming experiences. Our passion lies in crafting games that not only entertain but also build lasting
                connections with players.
              </p>
              <p>
                Initially focusing on mobile platforms, we are excited to expand our projects across various platforms
                in the near future. At Pretty Awesome Games, we believe in the power of gaming to connect people and foster
                community.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.contact}>
          <h2>Contact Us</h2>
          <div className={styles.contactLinks}>
            <a href="mailto:contact@prettyawesomegames.com" className={styles.contactLink}>
              <FaEnvelope />
              <span>contact@prettyawesomegames.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

