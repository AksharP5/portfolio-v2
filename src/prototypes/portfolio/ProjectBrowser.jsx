import PropTypes from "prop-types";
import { useState } from "react";
import { createPortal } from "react-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { ProjectLink } from "./content";

const projectShape = PropTypes.shape({
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  stack: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
});

export default function ProjectBrowser({ projects }) {
  const [preview, setPreview] = useState(null);
  const activeProject = projects.find((project) => project.id === preview?.id);

  const showPreview = (id, element) => {
    const rect = element.getBoundingClientRect();
    const viewportPadding = 16;
    const gap = 14;
    const availableWidth = window.innerWidth - rect.right - gap - viewportPadding;
    const width = Math.max(220, Math.min(320, availableWidth));
    const height = width * 0.6 + 24;
    const maxTop = Math.max(viewportPadding, window.innerHeight - height - viewportPadding);

    setPreview({
      animatePosition: preview !== null,
      id,
      left: rect.right + gap,
      top: Math.min(Math.max(viewportPadding, rect.top), maxTop),
      width,
    });
  };

  const previewElement = (
    <div
      className="project-preview-positioner"
      data-moving={preview?.animatePosition ? "true" : undefined}
      style={preview ? {
        left: preview.left,
        transform: `translate3d(0, ${preview.top}px, 0)`,
        width: preview.width,
      } : undefined}
      aria-hidden="true"
    >
      <figure
        className="project-preview"
        data-visible={activeProject ? "true" : "false"}
      >
        <div className="project-preview-frame">
          {projects.map((project, index) => (
            <img
              className={project.id === preview?.id ? "is-active" : undefined}
              src={`/projects/${project.id}.webp`}
              alt=""
              loading={index === 0 ? "eager" : "lazy"}
              key={project.id}
            />
          ))}
        </div>
        <figcaption>
          <span>{activeProject?.title ?? ""}</span>
          <span>{activeProject ? "Read project" : ""}</span>
        </figcaption>
      </figure>
    </div>
  );

  return (
    <>
      <div className="project-browser">
        <ol
          className="project-list"
          onPointerLeave={() => setPreview(null)}
        >
          {projects.map((project) => (
            <li
              data-active={project.id === preview?.id ? "true" : "false"}
              key={project.id}
            >
              <ProjectLink
                className="project-row"
                project={project}
                onBlur={() => setPreview(null)}
                onFocus={(event) => showPreview(project.id, event.currentTarget)}
                onPointerEnter={(event) => showPreview(project.id, event.currentTarget)}
              >
                <div className="project-row-copy">
                  <div className="project-title-row">
                    <h3>{project.title}</h3>
                    <span>{project.stack.slice(0, 2).join(" / ")}</span>
                  </div>
                  <p>{project.description}</p>
                </div>
                <FaArrowUpRightFromSquare aria-hidden="true" />
              </ProjectLink>
            </li>
          ))}
        </ol>
      </div>

      {createPortal(previewElement, document.body)}
    </>
  );
}

ProjectBrowser.propTypes = {
  projects: PropTypes.arrayOf(projectShape).isRequired,
};
