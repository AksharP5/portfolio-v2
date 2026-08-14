import PropTypes from "prop-types";
import { useState } from "react";
import { FaArrowLeft, FaCheck, FaPaperPlane } from "react-icons/fa6";
import { profile } from "../../data";
import { ThemeToggle } from "./content";

const web3FormsAccessKey = "e824487e-2f68-4a24-bd25-460b589e2df8";

const submitLabels = {
  idle: "Send message",
  submitting: "Sending",
  success: "Message sent",
  error: "Try again",
};

const statusMessages = {
  idle: "Messages go straight to my inbox.",
  submitting: "Sending your message.",
  success: "Thanks. I'll get back to you soon.",
  error: "That didn't send. Try again or use the email link below.",
};

async function submitContactForm(form) {
  const data = new FormData(form);
  data.set("access_key", web3FormsAccessKey);
  data.set("subject", "New message from your portfolio");
  data.set("from_name", "Akshar's Portfolio");

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: data,
  });
  const result = await response.json();

  if (!response.ok || result.success !== true) {
    throw new Error("Contact form submission failed");
  }
}

export default function ContactPage({ colorMode, onToggleColorMode }) {
  const [status, setStatus] = useState("idle");
  const SubmitIcon = status === "success" ? FaCheck : FaPaperPlane;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");

    try {
      await submitContactForm(form);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="contact-page">
      <header className="contact-navigation">
        <a className="contact-back" href="/prototypes/">
          <FaArrowLeft aria-hidden="true" />
          <span>Portfolio</span>
        </a>
        <div className="contact-navigation-title">
          <strong>Akshar</strong>
          <span>Contact</span>
        </div>
        <ThemeToggle colorMode={colorMode} onToggle={onToggleColorMode} />
      </header>

      <main className="contact-shell">
        <section className="contact-intro" aria-labelledby="contact-title">
          <h1 id="contact-title">Let&apos;s talk.</h1>
          <p>
            Have a role, project, or idea in mind? Send me a note and I&apos;ll get
            back to you.
          </p>
        </section>

        <form
          className="contact-form"
          aria-busy={status === "submitting"}
          onChange={() => {
            if (status === "success" || status === "error") setStatus("idle");
          }}
          onSubmit={handleSubmit}
        >
          <input
            className="contact-botcheck"
            name="botcheck"
            type="checkbox"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
          />
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
            <p
              id="contact-form-status"
              data-status={status}
              role={status === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {statusMessages[status]}
            </p>
            <button
              type="submit"
              data-status={status}
              disabled={status === "submitting" || status === "success"}
              aria-describedby="contact-form-status"
            >
              <span>{submitLabels[status]}</span>
              <span className="contact-submit-icon">
                <SubmitIcon aria-hidden="true" />
              </span>
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
