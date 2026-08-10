import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Baseline from "./Baseline";
import Chapters from "./Chapters";
import Disclosure from "./Disclosure";
import Ledger from "./Ledger";
import SplitView from "./SplitView";
import Timeline from "./Timeline";

const variants = [
  { shortName: "Base", name: "Baseline", Component: Baseline },
  { shortName: "Open", name: "Disclosure", Component: Disclosure },
  { shortName: "Line", name: "Timeline", Component: Timeline },
  { shortName: "Log", name: "Ledger", Component: Ledger },
  { shortName: "Story", name: "Chapters", Component: Chapters },
  { shortName: "Split", name: "Split view", Component: SplitView },
];

function initialVariant() {
  const value = Number(new URLSearchParams(window.location.search).get("v"));
  return Number.isInteger(value) && value >= 1 && value <= variants.length ? value - 1 : 0;
}

export default function ExperienceExplorer() {
  const [activeIndex, setActiveIndex] = useState(initialVariant);
  const [ready, setReady] = useState(false);
  const pickerRef = useRef(null);
  const highlightRef = useRef(null);
  const itemRefs = useRef([]);
  const { Component } = variants[activeIndex];

  const selectVariant = (index) => {
    setActiveIndex(index);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(index + 1));
    window.history.replaceState({}, "", url);
  };

  useLayoutEffect(() => {
    const updateHighlight = () => {
      const item = itemRefs.current[activeIndex];
      const highlight = highlightRef.current;
      if (!item || !highlight) return;
      highlight.style.transform = `translateX(${item.offsetLeft}px)`;
      highlight.style.width = `${item.offsetWidth}px`;
    };

    updateHighlight();
    window.addEventListener("resize", updateHighlight);
    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setReady(true));
    });

    return () => {
      window.removeEventListener("resize", updateHighlight);
      window.cancelAnimationFrame(firstFrame);
    };
  }, [activeIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      if (
        event.metaKey
        || event.ctrlKey
        || event.altKey
        || target instanceof HTMLInputElement
        || target instanceof HTMLTextAreaElement
        || target instanceof HTMLSelectElement
        || target?.isContentEditable
      ) return;

      const number = Number(event.key);
      if (Number.isInteger(number) && number >= 1 && number <= variants.length) {
        selectVariant(number - 1);
        return;
      }

      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      selectVariant((activeIndex + direction + variants.length) % variants.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <>
      <Component key={activeIndex} />
      {createPortal(
        <div
          ref={pickerRef}
          className="proto-picker"
          data-position="top"
          data-ready={ready ? "true" : "false"}
          aria-label="Experience prototype picker"
        >
          <span ref={highlightRef} className="proto-picker__highlight" aria-hidden="true" />
          {variants.map((variant, index) => (
            <button
              ref={(node) => { itemRefs.current[index] = node; }}
              className="proto-picker__item"
              type="button"
              aria-pressed={activeIndex === index}
              aria-label={`${index + 1}. ${variant.name}`}
              title={`${index + 1}. ${variant.name}`}
              key={variant.name}
              onClick={() => selectVariant(index)}
            >
              {variant.shortName}
            </button>
          ))}
        </div>,
        document.body,
      )}
    </>
  );
}
