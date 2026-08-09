import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PrototypeGallery from "./PrototypeGallery";
import "../../social-preview.css";
import "./prototype.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrototypeGallery />
  </StrictMode>,
);
