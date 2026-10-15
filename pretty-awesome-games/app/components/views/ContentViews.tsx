"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { games, type Game } from "../../lib/games"
import { CONTACT_EMAIL, HAS_LEGAL_ENTITY, LEGAL_ENTITY_LINE } from "../../lib/brand"
import ui from "./Ui.module.css"
import styles from "./ContentViews.module.css"

/*
 * The inner pages: Games, Company, Press, Contact, and a game's footage. Each
 * is a readable column on a flat surface inside the stationary frame. None of
 * the copy here counts the games — it all derives from `lib/games.ts`.
 */

export const GamesIndexView: React.FC = () => (
  <>
    <div className={styles.masthead} data-tgroup="">
      <span className={ui.kicker}>Iskra / Games</span>
      <h1 className={styles.h1}>Games</h1>
      <p className={styles.lede}>Explore our games, watch gameplay and wishlist them on Steam.</p>
    </div>

    <div className={styles.catalog} data-tgroup="">
      {games.map((game) => (
        <a key={game.slug} className={styles.card} href={`#${game.slug}`}>
          <div className={styles.cardArt} style={{ backgroundImage: `url(${game.art.world})` }}>
            <img src={game.art.characters} alt={game.art.alt} loading="lazy" />
          </div>
          <h2>
            {game.title} <span aria-hidden="true">↗</span>
          </h2>
          <p className={styles.cardTagline}>{game.tagline}</p>
          <dl className={styles.cardMeta}>
            {game.meta.slice(0, 3).map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </a>
      ))}
    </div>
  </>
)

const STUDIO_FACTS = [
  { label: "Studio", value: "Independent, small by choice" },
  { label: "Based in", value: "Poland" },
  { label: "Engine", value: "Unity" },
  { label: "Platform", value: "PC (Steam)" },
]

export const CompanyView: React.FC = () => (
  <div className={styles.company}>
    <div data-tgroup="">
      <span className={ui.kicker}>Iskra / Company</span>
      <h1 className={styles.h1}>Company</h1>
      <div className={styles.largeSlash} aria-hidden="true">
        /
      </div>
    </div>

    <div className={styles.prose} data-tgroup="">
      <h2>A spark is only the beginning.</h2>
      <p>
        <i>Iskra</i> means &ldquo;spark&rdquo; in Polish. We&rsquo;re an independent game studio
        based in Poland, making games with their own character.
      </p>
      <p>
        We pick ideas we can finish, build them properly, and put them in front of players rather
        than sitting on them. That means taking on a handful of things at a time and giving each one
        real attention — systems that hold up when you look at the numbers behind them, and a first
        session that teaches itself.
      </p>
      <p>Everything we ship is built in-house, from first prototype to store page.</p>

      <dl className={styles.facts}>
        {STUDIO_FACTS.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.actions}>
        <a className={ui.action} href="#games">
          Explore the games <span aria-hidden="true">↗</span>
        </a>
        <a className={ui.textLink} href="#contact">
          Publishing enquiries
        </a>
      </div>
    </div>
  </div>
)

/* Every game sits under section 01, so each carries its number rather than counting on. */
const PressGame: React.FC<{ game: Game }> = ({ game }) => (
  <div className={styles.pressGame}>
    <div className={styles.sectionLabel}>
      <span>01</span>
      <h3>{game.title}</h3>
      <span className={styles.status}>
        {game.meta.find((item) => item.label === "Status")?.value}
      </span>
    </div>
    <p className={styles.summary}>
      {game.tagline} {game.description}
    </p>
    <dl className={styles.facts}>
      {game.pressFacts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
    <div className={styles.actions}>
      {game.store && (
        <a className={ui.action} href={game.store.href} target="_blank" rel="noopener noreferrer">
          {game.store.label} <span aria-hidden="true">↗</span>
        </a>
      )}
      {game.factSheet && (
        <a className={ui.textLink} href={game.factSheet} download>
          Download game facts ↓
        </a>
      )}
    </div>
  </div>
)

export const PressView: React.FC = () => (
  <>
    <div className={`${styles.masthead} ${styles.ruled}`} data-tgroup="">
      <span className={ui.kicker}>Iskra / Press</span>
      <h1 className={styles.h1}>Press &amp; media</h1>
      <p className={styles.lede}>Game information and images for coverage of Iskra Games.</p>
    </div>

    <div className={styles.pressLayout} data-tgroup="">
      <nav className={styles.index} aria-label="Press contents">
        <a href="#press-facts">01 / Game facts</a>
        <a href="#press-assets">02 / Media assets</a>
        <a href="#press-enquiries">03 / Enquiries</a>
      </nav>

      <div className={styles.pressBody}>
        <section id="press-facts" aria-labelledby="press-facts-title">
          <h2 id="press-facts-title" className="visually-hidden">
            Game facts
          </h2>
          {games.map((game) => (
            <PressGame key={game.slug} game={game} />
          ))}
        </section>

        <section id="press-assets" aria-labelledby="press-assets-title">
          <div className={styles.sectionLabel}>
            <span>02</span>
            <h2 id="press-assets-title">Media assets</h2>
          </div>
          {games.map((game) => (
            <div key={game.slug} className={styles.assets}>
              {games.length > 1 && <h3 className={styles.assetsTitle}>{game.title}</h3>}
              <div className={styles.assetGrid}>
                {game.screenshots.map((shot) => (
                  <a key={shot.src} href={shot.download} download>
                    <img src={shot.src} alt={shot.alt} loading="lazy" />
                    <span>
                      {shot.label} <b>PNG ↓</b>
                    </span>
                  </a>
                ))}
              </div>
              {game.footage && (
                <div className={styles.downloads}>
                  <a href={game.footage.src} download={`${game.slug}-gameplay.mp4`}>
                    {game.title} gameplay footage <span>MP4 ↓</span>
                  </a>
                </div>
              )}
            </div>
          ))}
          <div className={styles.downloads}>
            <a href="/brand/wordmark.svg" download="iskra-wordmark.svg">
              Iskra wordmark, light <span>SVG ↓</span>
            </a>
            <a href="/brand/wordmark-ink.svg" download="iskra-wordmark-ink.svg">
              Iskra wordmark, dark <span>SVG ↓</span>
            </a>
          </div>
          <p className={styles.small}>Screenshots and footage show games in development.</p>
        </section>

        <section id="press-enquiries" aria-labelledby="press-enquiries-title">
          <div className={styles.sectionLabel}>
            <span>03</span>
            <h2 id="press-enquiries-title">Press enquiries</h2>
          </div>
          <p className={styles.summary}>For coverage, interviews or additional materials:</p>
          <a
            className={ui.textLink}
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Press enquiry")}`}
          >
            {CONTACT_EMAIL} ↗
          </a>
        </section>
      </div>
    </div>
  </>
)

export const ContactView: React.FC = () => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2200)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
    } catch {
      /* Clipboard blocked — the mailto link beside this still works. */
    }
  }

  return (
    <>
      <div data-tgroup="">
        <span className={ui.kicker}>Iskra / Contact</span>
        <h1 className={styles.h1}>Contact</h1>
        <p className={styles.lede}>
          Players, publishers, press and potential partners — we&rsquo;d like to hear from you. We
          read everything and reply to what we can.
        </p>
        <div className={styles.emailRow}>
          <a className={styles.email} href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL} <span aria-hidden="true">↗</span>
          </a>
          <button type="button" className={styles.copy} onClick={copyAddress} aria-live="polite">
            {copied ? "Copied" : "Copy address"}
          </button>
        </div>
      </div>

      <div className={styles.audiences} data-tgroup="">
        <a href="#games">
          <span>Players</span>
          <h2>Play our games ↗</h2>
          <p>Gameplay, store pages and what we&rsquo;re working on now.</p>
        </a>
        <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Publishing enquiry")}`}>
          <span>Publishers</span>
          <h2>Publishing enquiries ↗</h2>
          <p>Talk to us about our projects.</p>
        </a>
        <a href="#press">
          <span>Press &amp; creators</span>
          <h2>Facts &amp; media ↗</h2>
          <p>Game information, screenshots and footage.</p>
        </a>
      </div>

      <div className={styles.details} data-tgroup="">
        <span className={ui.kicker}>Based in Poland</span>
        {HAS_LEGAL_ENTITY && <p>{LEGAL_ENTITY_LINE}</p>}
      </div>
    </>
  )
}

export const GameplayView: React.FC<{ game: Game }> = ({ game }) => (
  <>
    <div className={styles.footageHeading} data-tgroup="">
      <div>
        <span className={ui.kicker}>
          {game.title} / {game.meta.find((item) => item.label === "Status")?.value}
        </span>
        <h1 className={styles.h1Small}>Gameplay</h1>
      </div>
      <a className={ui.textLink} href={`#${game.slug}`}>
        Back to {game.title} ↗
      </a>
    </div>
    {game.footage && (
      <video
        className={styles.video}
        controls
        playsInline
        preload="none"
        poster={game.footage.poster}
        src={game.footage.src}
        aria-label={`${game.title} gameplay footage`}
        data-tgroup=""
      />
    )}
    <p className={styles.small}>Footage shows a game in development.</p>
  </>
)
