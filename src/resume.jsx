import { useLayoutEffect } from "react";
import { FaArrowLeft, FaDownload } from "react-icons/fa6";
import "./resume.css";

export const resumePath = "/resume/Akshar-Patel-Resume.pdf";

function getColorMode() {
  const saved = window.localStorage.getItem("portfolio-prototype-color-mode");
  if (saved === "light" || saved === "dark") return saved;
  return "dark";
}

export default function ResumePage() {
  const colorMode = getColorMode();
  const backHref = new URLSearchParams(window.location.search).get("from") === "prototype"
    ? "/prototypes/"
    : "/";

  useLayoutEffect(() => {
    const previousTitle = document.title;
    document.documentElement.dataset.colorMode = colorMode;
    document.title = "Resume - Akshar Patel";

    return () => {
      delete document.documentElement.dataset.colorMode;
      document.title = previousTitle;
    };
  }, [colorMode]);

  return (
    <main className="resume-page">
      <header className="resume-toolbar">
        <a className="resume-back" href={backHref}>
          <FaArrowLeft aria-hidden="true" />
          <span>Portfolio</span>
        </a>
        <div className="resume-title">
          <strong>Akshar Patel</strong>
          <span>Resume</span>
        </div>
        <a className="resume-download" href={resumePath} download>
          <FaDownload aria-hidden="true" />
          <span>Download</span>
        </a>
      </header>

      <iframe
        className="resume-viewer"
        src={`${resumePath}#page=1&zoom=100&pagemode=none`}
        title="Akshar Patel resume"
      />
    </main>
  );
}
