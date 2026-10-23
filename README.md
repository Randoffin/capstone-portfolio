# Portfolio

A personal developer portfolio built with Next.
js, TypeScript, React, and Tailwind CSS. The 
project showcases my development work, technical 
skills, learning journey, and practical software 
projects.

The portfolio also includes an AI-powered 
assistant designed to demonstrate how structured 
AI prompting and tool integration can be used to 
build practical software that meets real 
requirements.

## Project Purpose

This portfolio is both a professional portfolio 
and a practical demonstration of my software 
development and AI engineering skills.

My approach is centered around the following 
principle:

I use structured AI prompting to develop 
practical software that meets real requirements.

The project demonstrates how I can take 
requirements, plan an implementation, use 
appropriate technologies, integrate AI 
capabilities, and build functional user-facing 
software.

## Features

- Responsive personal portfolio
- Home page introducing the portfolio
- Work page for projects and case studies
- About page
- Contact page
- AI-powered chat assistant
- Server-side AI tool integration
- Structured rendering of AI tool results
- Tool lifecycle states for AI operations
- Designed tool error state
- API health-check endpoint
- Responsive interface for desktop and mobile devices
- Production deployment through Vercel
- Interactive 3D desk lamp configurator at `/fe-aa2`
- Real-time lamp colour and illumination controls
- Mouse and touch camera interaction with zoom and reset
- Lazy-loaded 3D experience using React Three Fiber
- WebGL fallback and bounded rendering resolution for performance

## Technology Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Three.js
- React Three Fiber
- React Three Drei

### AI

- Vercel AI SDK
- Anthropic Claude
- Zod for tool input validation

The AI provider can be changed without changing 
the application's overall tool architecture.

### Development and Deployment

- Node.js
- npm
- Git
- GitHub
- Vercel

## FE-AA2: Interactive 3D Experience

The `/fe-aa2` route contains an interactive 3D desk lamp
configurator built with Three.js, React Three Fiber, and Drei.

### Interactions

- Change the lamp finish using the colour selector.
- Switch the lamp illumination on and off.
- Rotate the scene and zoom using supported pointer or touch gestures.
- Reset the camera by remounting the scene.

### Performance considerations

- The 3D component is dynamically imported with server-side rendering disabled.
- Rendering resolution is limited to a device pixel ratio of 1–1.5.
- Shadow-map resolution is limited to 512 × 512.
- The scene uses geometric primitives rather than downloaded 3D models.

### Accessibility and compatibility

- Controls are implemented as semantic buttons.
- The lamp power control exposes its state through `aria-checked`.
- The scene does not run a continuous decorative animation.
- A fallback message is provided for environments where the 3D canvas cannot render.

Performance measurements and browser compatibility should be
verified before release.

## Project Structure

```text
portfolio/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts
│   │   └── health/
│   │       └── route.ts
│   ├── about/
│   ├── chat/
│   ├── contact/
│   ├── health/
│   ├── work/
│   ├── layout.tsx
│   └── page.js
│
├── components/
│   ├── Chat.tsx
│   ├── MetaTagsCard.tsx
│   └── Navbar.tsx
│
├── lib/
│   ├── ai/
│   │   └── config.ts
│   └── tools/
│       └── fetch-meta-tags.ts
│
├── public/
│
├── .env.local
├── .gitignore
├── package.json
└── README.md
