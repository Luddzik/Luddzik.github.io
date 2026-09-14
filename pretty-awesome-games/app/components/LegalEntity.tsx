import type React from "react"
import { Fragment } from "react"
import {
  CONTACT_EMAIL,
  HAS_LEGAL_ENTITY,
  LEGAL_ENTITY,
  SITE_URL,
  STUDIO_NAME,
} from "../lib/brand"

/**
 * Who you are actually dealing with.
 *
 * "Iskra Games" is a trading name; the entity that trades is the founder's Polish
 * sole proprietorship. Both legal pages close with this block, so the registration
 * details can't drift apart between them.
 *
 * The registration lines render only once `app/lib/brand.ts` has been filled in — a
 * legal page must never carry a placeholder that reads like a real NIP.
 */
const LegalEntity: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <p>
      <b>{STUDIO_NAME}</b>
      <br />
      <b>Email:</b> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      <br />
      <b>Website:</b> <a href={SITE_URL}>{SITE_URL}</a>
    </p>

    {HAS_LEGAL_ENTITY && (
      <p>
        <b>Registered business</b>
        <br />
        {LEGAL_ENTITY.name}
        <br />
        {LEGAL_ENTITY.address.map((line) => (
          <Fragment key={line}>
            {line}
            <br />
          </Fragment>
        ))}
        NIP {LEGAL_ENTITY.nip} · REGON {LEGAL_ENTITY.regon}
        <br />
        Sole proprietorship entered in the Polish CEIDG register. {STUDIO_NAME} is a
        trading name of that business, not a separate company.
      </p>
    )}
  </div>
)

export default LegalEntity
