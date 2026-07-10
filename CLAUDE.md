# obsidian-relative-line-numbers

- Keep `typescript` <6.1.0 — `eslint-plugin-obsidianmd`'s type-aware rules (`@typescript-eslint/typescript-estree`) don't support newer majors and fail with a cryptic Cjs/undefined crash, not a clear version error.
- `bun run deploy` writes directly into the user's live Obsidian vault plugin folder — treat as a real deploy, not a build check.
- Undocumented Obsidian API access: no `@ts-ignore`/`any` (blocked by lint). Type a minimal local interface, cast `this.app.vault` through `as unknown as Interface`.
- Don't mark `onload`/`onunload` `async` unless the body truly awaits — push async work into a private helper, call with `void`.
- Always `bun run build` after `eslint --fix` — the any→unknown autofix can break `tsc` silently (unknown has no members).
- Can't inline-disable obsidianmd/* or no-explicit-any/no-deprecated/no-nodejs-modules — scope exceptions via file overrides in eslint.config.mjs instead.
