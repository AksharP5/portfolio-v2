import PropTypes from "prop-types";
import { FaArrowLeft, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { profile } from "../../data";
import { ThemeToggle } from "./content";

function openDraft(event) {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const name = String(data.get("name")).trim();
  const email = String(data.get("email")).trim();
  const message = String(data.get("message")).trim();
  const subject = `Portfolio note from ${name}`;
  const body = [`Name: ${name}`, `Reply to: ${email}`, "", message].join("\n");

  window.location.assign(
    `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  );
}

export default function ContactPage({ colorMode, onToggleColorMode }) {
  return (
    <div className="contact-shell">
      <main className="contact-page">
        <header className="contact-navigation">
          <a className="contact-back" href="/prototypes/">
            <FaArrowLeft aria-hidden="true" />
            Portfolio
          </a>
          <ThemeToggle colorMode={colorMode} onToggle={onToggleColorMode} />
        </header>

        <section className="contact-intro" aria-labelledby="contact-title">
          <p>Contact</p>
          <h1 id="contact-title">Let&apos;s talk.</h1>
          <p>
            Have a role, project, or idea in mind? Send me a note and I&apos;ll get
            back to you.
          </p>
        </section>

        <form className="contact-form" onSubmit={openDraft}>
          <label>
            <span>Name</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="7" required />
          </label>

          <div className="contact-form-footer">
            <p>Opens a draft in your email app.</p>
            <button type="submit">
              Open email
              <FaArrowUpRightFromSquare aria-hidden="true" />
            </button>
          </div>
        </form>

        <p className="contact-direct">
          Or email me directly at <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      </main>
    </div>
  );
}

ContactPage.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
};
