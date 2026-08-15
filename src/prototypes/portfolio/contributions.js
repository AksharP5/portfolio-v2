export const contributionGroups = [
  {
    name: "HyperFrames",
    repository: "heygen-com/hyperframes",
    url: "https://github.com/heygen-com/hyperframes",
    contributions: [
      {
        number: 3282,
        state: "merged",
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
        number: 3267,
        state: "open",
        title: "fix(catalog): sync tab labels with the sliding indicator",
        description:
          "Keeps active tab labels aligned with the sliding indicator and corrects inactive-label contrast.",
        url: "https://github.com/heygen-com/hyperframes/pull/3267",
      },
      {
        number: 3262,
        state: "open",
        title: "fix(registry): clear flowchart selection after click-away",
        description:
          "Clears flowchart selection outlines after click-away during normal playback and timeline seeking.",
        url: "https://github.com/heygen-com/hyperframes/pull/3262",
      },
      {
        number: 3258,
        state: "merged",
        title: "fix(catalog): restore the caption texture preview",
        description:
          "Repairs the texture asset path so the caption animation renders in the Catalog again.",
        url: "https://github.com/heygen-com/hyperframes/pull/3258",
      },
      {
        number: 3256,
        state: "merged",
        title: "fix(catalog): center the menu morph preview",
        description:
          "Centers the Menu Morph preview and keeps all three actions inside the Catalog frame.",
        url: "https://github.com/heygen-com/hyperframes/pull/3256",
      },
      {
        number: 3255,
        state: "merged",
        title: "fix(catalog): keep the text stagger preview inside the frame",
        description:
          "Resizes the Text Stagger preview to keep every word visible and fixes its label contrast.",
        url: "https://github.com/heygen-com/hyperframes/pull/3255",
      },
      {
        number: 3254,
        state: "merged",
        title: "fix(catalog): keep the animated bar chart preview in frame",
        description:
          "Resizes the chart preview so its full card and month labels remain visible.",
        url: "https://github.com/heygen-com/hyperframes/pull/3254",
      },
      {
        number: 3249,
        state: "merged",
        title: "fix(catalog): keep the typewriter preview inside the frame",
        description:
          "Keeps the full typewriter line and caret inside the Catalog frame throughout playback.",
        url: "https://github.com/heygen-com/hyperframes/pull/3249",
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
        number: 6785,
        state: "closed",
        title: "fix(shell): reload only the changed local plugin",
        description:
          "Reloads only the local shell plugin that changed, avoiding full rebuilds and unrelated state resets.",
        url: "https://github.com/basecamp/omarchy/pull/6785",
      },
      {
        number: 6775,
        state: "merged",
        title: "Recover the wallpaper picker after interrupted thumbnails",
        description:
          "Uses process-owned locks and cache validation to recover wallpaper thumbnails after interrupted generation.",
        url: "https://github.com/basecamp/omarchy/pull/6775",
      },
      {
        number: 5926,
        state: "closed",
        title: "Fix DaVinci Resolve focus lock",
        description:
          "An earlier Resolve focus-rule fix that was later superseded by pull request 6919.",
        url: "https://github.com/basecamp/omarchy/pull/5926",
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
        state: "merged",
        title: "fix(web): keep floating preview anchored after panel closes",
        description:
          "Keeps untouched previews anchored after the side panel closes while preserving user-moved positions.",
        url: "https://github.com/pingdotgg/t3code/pull/6547",
      },
      {
        number: 5468,
        state: "merged",
        title: "fix(codex): keep background memory out of chats",
        description:
          "Filters background memory-thread notifications before they can appear in the active conversation.",
        url: "https://github.com/pingdotgg/t3code/pull/5468",
      },
      {
        number: 4805,
        state: "open",
        title: "fix(web): preserve POSIX path casing in file links",
        description:
          "Preserves case-sensitive POSIX paths when T3 Code creates clickable file links.",
        url: "https://github.com/pingdotgg/t3code/pull/4805",
      },
    ],
  },
  {
    name: "OpenCode",
    repository: "anomalyco/opencode",
    url: "https://github.com/anomalyco/opencode",
    contributions: [
      {
        number: 17096,
        state: "closed",
        title: "fix(tui): make question footer actions clickable",
        description:
          "Makes question footer actions respond to mouse clicks in the terminal interface.",
        url: "https://github.com/anomalyco/opencode/pull/17096",
      },
      {
        number: 14484,
        state: "open",
        title: "fix(tui): make new-session prompt handoff deterministic",
        description:
          "Clears transferred prompt text and makes Ctrl+P handoff reliable across repeated new sessions.",
        url: "https://github.com/anomalyco/opencode/pull/14484",
      },
      {
        number: 12575,
        state: "closed",
        title: "fix: cli logo output",
        description:
          "Corrects how the OpenCode logo is rendered in command-line output.",
        url: "https://github.com/anomalyco/opencode/pull/12575",
      },
      {
        number: 12383,
        state: "merged",
        title: "feat(tui): highlight esc label on hover in dialog",
        description:
          "Adds theme-aware hover feedback to escape labels inside terminal dialogs.",
        url: "https://github.com/anomalyco/opencode/pull/12383",
      },
      {
        number: 11421,
        state: "merged",
        title: "fix(tui): allow mouse escape via \"esc\" labels in dialogs",
        description:
          "Lets users close terminal dialogs by clicking their visible esc labels.",
        url: "https://github.com/anomalyco/opencode/pull/11421",
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
        number: 8596,
        state: "merged",
        title: "fix: open help dialog with tui/open-help route",
        description:
          "Routes the open-help action through the command that actually opens the terminal help dialog.",
        url: "https://github.com/anomalyco/opencode/pull/8596",
      },
      {
        number: 8542,
        state: "closed",
        title: "feat: add project navigation to /session dialog in TUI",
        description:
          "Adds project navigation to the terminal session dialog.",
        url: "https://github.com/anomalyco/opencode/pull/8542",
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
    name: "awesome-ratatui",
    repository: "ratatui/awesome-ratatui",
    url: "https://github.com/ratatui/awesome-ratatui",
    contributions: [
      {
        number: 241,
        state: "merged",
        title: "Add blippy",
        description:
          "Adds blippy to the community list of Ratatui applications and developer tools.",
        url: "https://github.com/ratatui/awesome-ratatui/pull/241",
      },
    ],
  },
  {
    name: "Ralphy",
    repository: "michaelshimeles/ralphy",
    url: "https://github.com/michaelshimeles/ralphy",
    contributions: [
      {
        number: 84,
        state: "merged",
        title: "feat: add --json flag for json PRD support",
        description:
          "Adds the --json flag so Ralphy can read product requirements from JSON files.",
        url: "https://github.com/michaelshimeles/ralphy/pull/84",
      },
    ],
  },
];
