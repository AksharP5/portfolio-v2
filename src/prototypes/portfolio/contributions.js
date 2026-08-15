export const contributionGroups = [
  {
    name: "OpenCode",
    repository: "anomalyco/opencode",
    url: "https://github.com/anomalyco/opencode",
    contributions: [
      {
        number: 14484,
        state: "open",
        title: "fix(tui): make new-session prompt handoff deterministic",
        description:
          "Clears transferred prompt text and makes Ctrl+P handoff reliable across repeated new sessions.",
        url: "https://github.com/anomalyco/opencode/pull/14484",
      },
      {
        number: 8802,
        state: "merged",
        title: "feat: add version to session header and /status dialog",
        description:
          "Adds the running version to the session header and the /status dialog.",
        url: "https://github.com/anomalyco/opencode/pull/8802",
      },
      {
        number: 8351,
        state: "merged",
        title: "feat: show connected providers in /connect dialog",
        description:
          "Marks already-connected providers in the /connect list so setup state is clear.",
        url: "https://github.com/anomalyco/opencode/pull/8351",
      },
    ],
  },
  {
    name: "HyperFrames",
    repository: "heygen-com/hyperframes",
    url: "https://github.com/heygen-com/hyperframes",
    contributions: [
      {
        number: 3282,
        state: "open",
        title: "feat(studio): add a preview volume control",
        description:
          "Adds a persistent 0-100% preview volume control without changing rendered composition audio.",
        url: "https://github.com/heygen-com/hyperframes/pull/3282",
      },
      {
        number: 3269,
        state: "open",
        title: "feat(registry): add kinetic center build component",
        description:
          "Ports Kinetic Center Build as a native, seek-safe component with editable text and motion settings.",
        url: "https://github.com/heygen-com/hyperframes/pull/3269",
      },
      {
        number: 3258,
        state: "merged",
        title: "fix(catalog): restore the caption texture preview",
        description:
          "Repairs the texture asset path so the caption animation renders in the Catalog again.",
        url: "https://github.com/heygen-com/hyperframes/pull/3258",
      },
    ],
  },
  {
    name: "Omarchy",
    repository: "basecamp/omarchy",
    url: "https://github.com/basecamp/omarchy",
    contributions: [
      {
        number: 6919,
        state: "open",
        title: "Stop DaVinci Resolve dialogs from recapturing pointer focus",
        description:
          "Stops Resolve preference dialogs from recapturing pointer focus while keeping its other popups clickable.",
        url: "https://github.com/basecamp/omarchy/pull/6919",
      },
      {
        number: 6775,
        state: "merged",
        title: "Recover the wallpaper picker after interrupted thumbnails",
        description:
          "Uses process-owned locks and cache validation to recover wallpaper thumbnails after interrupted generation.",
        url: "https://github.com/basecamp/omarchy/pull/6775",
      },
    ],
  },
  {
    name: "T3 Code",
    repository: "pingdotgg/t3code",
    url: "https://github.com/pingdotgg/t3code",
    contributions: [
      {
        number: 6550,
        state: "open",
        title: "feat(web): send prompts to new threads with Alt+Enter",
        description:
          "Adds Alt+Enter to send the current draft into a new thread in the same project.",
        url: "https://github.com/pingdotgg/t3code/pull/6550",
      },
      {
        number: 6547,
        state: "open",
        title: "fix(web): keep floating preview anchored after panel closes",
        description:
          "Keeps untouched previews anchored after the side panel closes while preserving user-moved positions.",
        url: "https://github.com/pingdotgg/t3code/pull/6547",
      },
    ],
  },
];
