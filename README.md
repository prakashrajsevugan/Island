# Interactive 3D Island Showcase

A cinematic React + Three.js experience built with Vite, React Three Fiber, and Drei. The app renders a stylized island scene with lighting, fog, particles, ambient audio, and interactive hotspots.

## Highlights

- Interactive 3D scene rendered with React Three Fiber
- Orbit controls for exploring the world
- Dynamic sky, fog, and lighting effects
- Floating particles for atmosphere
- Clickable display panel that opens a full-screen image overlay
- Tree proximity interaction that reveals an information card
- Looping background audio triggered from the scene
- Lil-GUI debug panels for light and world tuning during development

## Tech Stack

- React 19
- Vite
- Three.js
- @react-three/fiber
- @react-three/drei
- @react-three/postprocessing
- GSAP
- Tailwind CSS 4
- lil-gui

## Project Structure

- src/App.jsx — App shell
- src/components/Front.jsx — Scene wrapper and UI overlays
- src/components/FrontModel/FrontModel.jsx — Main 3D canvas and world setup
- src/components/FrontModel/FrontLight.jsx — Lighting and debug controls
- src/components/FrontModel/New.jsx — Generated GLTF scene model
- src/components/FrontModel/Particles.jsx — Atmospheric particle system
- public/models/new.glb — 3D asset used in the scene
- public/images/ — Overlay and particle textures
- public/texture/alpha.webp — Water / plane alpha texture
- public/new.mp3 — Background audio

## Features in Detail

### Scene interaction

- Drag to rotate the camera
- Scroll to zoom in and out
- Hovering is not required; interactions are click and proximity based

### Hotspots

- Click the display inside the scene to open an image card
- Move the camera near the cut tree to reveal the info panel

### Debug controls

Two `lil-gui` panels are available in development:

- Light Debug — adjusts ambient and spotlight colors
- World Debug — changes scene spin duration and triggers a one-time spin

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint the project

```bash
npm run lint
```

## Controls

- Left mouse drag: rotate the camera
- Mouse wheel: zoom
- Click the in-scene display: open image overlay
- Move close to the cut tree: show tree information card

## Notes

- The app uses full-screen layout styling and hides page overflow for an immersive presentation.
- Asset paths are loaded from the public directory, so they must remain in place for the scene to render correctly.
- If you add more GLTF or texture assets, keep them under public/ and update the scene imports accordingly.

## Credits

Built with React, Vite, Three.js, and React Three Fiber.
