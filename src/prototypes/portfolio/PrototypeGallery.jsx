import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import AnnotatedIndex from "./variants/AnnotatedIndex";
import ChapterStack from "./variants/ChapterStack";
import SocialOrbit from "./variants/SocialOrbit";
import SplitLedger from "./variants/SplitLedger";
import VisualShelf from "./variants/VisualShelf";

const variants = [
  { name: "Annotated Index", component: AnnotatedIndex },
  { name: "Split Ledger", component: SplitLedger },
  { name: "Visual Shelf", component: VisualShelf },
  { name: "Chapter Stack", component: ChapterStack },
  { name: "Social Orbit", component: SocialOrbit },
];

function initialVariant() {
  const value = Number.parseInt(new URLSearchParams(window.location.search).get("v"), 10);
  return Number.isInteger(value) && value >= 1 && value <= variants.length ? value - 1 : 0;
}

export default function PrototypeGallery() {
  const [active, setActive] = useState(initialVariant);
  const [replay, setReplay] = useState(0);
  const pickerRef = useRef(null);
  const highlightRef = useRef(null);
  const itemRefs = useRef([]);
  const Variant = variants[active].component;

  const moveHighlight = useCallback(() => {
    const item = itemRefs.current[active];
    const highlight = highlightRef.current;
    if (!item || !highlight) return;
    highlight.style.width = `${item.offsetWidth}px`;
    highlight.style.transform = `translateX(${item.offsetLeft}px)`;
  }, [active]);

  const select = useCallback((index) => {
    if (index < 0 || index >= variants.length) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    setActive(index);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(index + 1));
    window.history.replaceState(null, "", url);
  }, []);

  useLayoutEffect(() => {
    moveHighlight();
    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => pickerRef.current?.setAttribute("data-ready", ""));
    });
    window.addEventListener("resize", moveHighlight);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.removeEventListener("resize", moveHighlight);
    };
  }, [moveHighlight]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const number = Number.parseInt(event.key, 10);
      if (number >= 1 && number <= variants.length) select(number - 1);
      else if (event.key === "ArrowRight") select((active + 1) % variants.length);
      else if (event.key === "ArrowLeft") select((active - 1 + variants.length) % variants.length);
      else if (event.key === "r" || event.key === "R") setReplay((value) => value + 1);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, select]);

  return (
    <>
      <div id="stage" key={`${active}-${replay}`}>
        <Variant />
      </div>

      <nav ref={pickerRef} className="proto-picker" data-position="top" aria-label="Prototype variants">
        <span ref={highlightRef} className="proto-picker-highlight" aria-hidden="true"></span>
        {variants.map((variant, index) => (
          <button
            ref={(node) => { itemRefs.current[index] = node; }}
            key={variant.name}
            className="proto-picker-item"
            type="button"
            title={variant.name}
            aria-label={`${index + 1}: ${variant.name}`}
            aria-current={active === index ? "true" : undefined}
            data-active={active === index ? "" : undefined}
            onClick={() => select(index)}
          >
            {index + 1}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden="true"></span>
        <button
          className="proto-picker-item proto-picker-replay"
          type="button"
          aria-label="Replay animation (R)"
          onClick={() => setReplay((value) => value + 1)}
        >↻</button>
      </nav>
    </>
  );
}
