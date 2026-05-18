# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Electron desktop app for "洛克王国世界" (Roco Kingdom) type relationship checker. Shows 18 elemental types and their damage multipliers (super effective, resisted, immune).

## Commands

- `npm start` — Run the app locally with Electron
- `npm run build` — Build Windows portable .exe via electron-builder

## Architecture

Electron app with vanilla HTML/CSS/JS (no UI framework, zero external runtime dependencies).

**Main process**: `main.js` — creates BrowserWindow (1280×800), loads `renderer/index.html`
**Preload**: `preload.js` — exposes `electronAPI.platform` via contextBridge
**Renderer** (all in `renderer/`):
- `typeData.js` — defines `TYPE_DATA` (18 types with id/name/color/icon) and `TYPE_CHART` (attack multiplier matrix: `TYPE_CHART[attacker][defender]` → 0, 0.5, 1, or 2). Loaded first as a global script.
- `app.js` — renders type grid, handles click selection, computes and displays relations (super effective / weak against / resisted / resistant-to / immune). Depends on globals from `typeData.js`.
- `style.css` — dark theme with CSS custom properties in `:root`
- `index.html` — CSP locked to `'self'` with `'unsafe-inline'` for scripts/styles

## Type Data

18 types: normal, grass, fire, water, psychic (光), ground, ice, dragon, electric, poison, bug, fighting, flying (翼), fairy (萌), ghost (幽), dark, steel (机械), illusion (幻).

Icons are `.png` files in `renderer/icons/` (named by Chinese type name). SVG versions also exist but the app uses PNGs.

## Key Conventions

- Type identifiers use English `id` strings (e.g., `'fire'`, `'psychic'`, `'illusion'`)
- Display names are Chinese (`'火'`, `'光'`, `'幻'`)
- Multiplier 0 = immune, 0.5 = resisted, 1 = neutral, 2 = super effective
- Relation list items are clickable — clicking navigates to that type's detail view
