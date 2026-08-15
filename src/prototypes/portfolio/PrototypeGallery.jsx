import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { SocialMorph } from "../../social-preview";
import { profile, projects } from "../../data";
import ContactPage from "./ContactPage";
import OpeningSequence from "./OpeningSequence";
import PortfolioPrototype from "./PortfolioPrototype";
import ProjectPage from "./ProjectPage";
import ProjectsPage from "./ProjectsPage";

const returnMarker = "portfolio-prototype-returning-home";
const isReturningHome = window.sessionStorage.getItem(returnMarker) === "true";
if (isReturningHome) window.sessionStorage.removeItem(returnMarker);

function initialColorMode() {
  const saved = window.localStorage.getItem("portfolio-prototype-color-mode");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function initialSoundEnabled() {
  return window.localStorage.getItem("portfolio-prototype-click-sound") !== "off";
}

export default function PrototypeGallery() {
  const [routeHref, setRouteHref] = useState(() => window.location.href);
  const route = new URL(routeHref);
  const pathname = route.pathname.replace(/\/+$/, "");
  const isContactPage = pathname === "/prototypes/contact";
  const isProjectsPage = pathname === "/prototypes/projects";
  const projectId = pathname.match(/^\/prototypes\/projects\/([^/]+)$/)?.[1];
  const project = projects.find((item) => item.id === projectId);
  const isSubpage = isContactPage || isProjectsPage || Boolean(project);
  const [colorMode, setColorMode] = useState(initialColorMode);
  const [soundEnabled, setSoundEnabled] = useState(initialSoundEnabled);
  const [openingRun, setOpeningRun] = useState(0);
  const [showOpening, setShowOpening] = useState(
    () => !isSubpage
      && !isReturningHome
      && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useLayoutEffect(() => {
    let pageTitle = "Portfolio prototype - Akshar";
    if (isContactPage) pageTitle = "Contact Akshar";
    else if (project) pageTitle = `${project.title} - Akshar`;
    else if (isProjectsPage) pageTitle = "Projects - Akshar";
    document.title = pageTitle;

    const scrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    if (route.hash) {
      document.getElementById(route.hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }

    document.documentElement.style.scrollBehavior = scrollBehavior;
  }, [isContactPage, isProjectsPage, project, route.hash]);

  useLayoutEffect(() => {
    document.documentElement.dataset.colorMode = colorMode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      colorMode === "dark" ? "#0c0c0c" : "#f2f2f2",
    );
    window.localStorage.setItem("portfolio-prototype-color-mode", colorMode);
  }, [colorMode]);

  useEffect(() => {
    window.localStorage.setItem(
      "portfolio-prototype-click-sound",
      soundEnabled ? "on" : "off",
    );
  }, [soundEnabled]);

  useEffect(() => {
    const handleNavigation = (event) => {
      if (
        event.defaultPrevented
        || event.button !== 0
        || event.metaKey
        || event.ctrlKey
        || event.shiftKey
        || event.altKey
      ) return;

      const target = event.target instanceof Element
        ? event.target.closest("a[href]")
        : null;
      if (
        !target
        || target.hasAttribute("download")
        || (target.target && target.target !== "_self")
      ) return;

      const nextRoute = new URL(target.href);
      if (
        nextRoute.origin !== window.location.origin
        || !nextRoute.pathname.startsWith("/prototypes/")
      ) return;

      event.preventDefault();
      window.history.pushState(null, "", nextRoute.href);
      setRouteHref(nextRoute.href);
    };

    const handleHistoryChange = () => setRouteHref(window.location.href);

    document.addEventListener("click", handleNavigation);
    window.addEventListener("popstate", handleHistoryChange);
    return () => {
      document.removeEventListener("click", handleNavigation);
      window.removeEventListener("popstate", handleHistoryChange);
    };
  }, []);

  useEffect(() => {
    if (isSubpage) {
      window.sessionStorage.setItem(returnMarker, "true");
      return undefined;
    }

    const clearReturnMarker = () => {
      window.sessionStorage.removeItem(returnMarker);
    };

    clearReturnMarker();
    window.addEventListener("pageshow", clearReturnMarker);
    return () => window.removeEventListener("pageshow", clearReturnMarker);
  }, [isSubpage]);

  useEffect(() => {
    if (!showOpening) return undefined;
    const fallback = window.setTimeout(() => setShowOpening(false), 2400);
    return () => window.clearTimeout(fallback);
  }, [openingRun, showOpening]);

  const replayOpening = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOpeningRun((run) => run + 1);
    setShowOpening(true);
  }, []);

  const toggleColorMode = () => {
    setColorMode((mode) => (mode === "dark" ? "light" : "dark"));
  };

  if (isContactPage) {
    return (
      <div id="stage" className="prototype-stage">
        <ContactPage
          colorMode={colorMode}
          onToggleColorMode={toggleColorMode}
        />
        <div className="social-dock"><SocialMorph resumeHref="/resume?from=prototype" /></div>
      </div>
    );
  }

  if (project) {
    return (
      <div id="stage" className="prototype-stage">
        <ProjectPage
          colorMode={colorMode}
          onToggleColorMode={toggleColorMode}
          project={project}
        />
        <div className="social-dock"><SocialMorph resumeHref="/resume?from=prototype" /></div>
      </div>
    );
  }

  if (isProjectsPage) {
    return (
      <div id="stage" className="prototype-stage">
        <ProjectsPage
          colorMode={colorMode}
          onToggleColorMode={toggleColorMode}
        />
        <div className="social-dock"><SocialMorph resumeHref="/resume?from=prototype" /></div>
      </div>
    );
  }

  return (
    <>
      <div id="stage" className="prototype-stage">
        <PortfolioPrototype
          colorMode={colorMode}
          soundEnabled={soundEnabled}
          onToggleColorMode={toggleColorMode}
          onReplayOpening={replayOpening}
          onToggleSound={() => setSoundEnabled((enabled) => !enabled)}
        />
        <div className="social-dock"><SocialMorph resumeHref="/resume?from=prototype" /></div>
      </div>

      {showOpening ? (
        <OpeningSequence
          key={openingRun}
          name={profile.name}
          onComplete={() => setShowOpening(false)}
        />
      ) : null}
    </>
  );
}
