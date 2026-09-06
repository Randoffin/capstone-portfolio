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

## Technology Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

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
