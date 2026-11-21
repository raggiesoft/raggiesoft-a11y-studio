# RaggieSoft Accessibility Studio — Product Portal (`a11y.raggiesoft.com`)

Commercial product portal and technical documentation hub for **RaggieSoft Accessibility Studio** (`raggiesoft/accessibility-studio`), the enterprise Windows workstation IDE and headless CI/CD CLI for source-level **WCAG 2.2 Level AA** and **Revised Section 508 Web** compliance engineering.

## Architecture & Tech Stack
- **Design System**: IBM Carbon Design System (`@carbon/web-components` + `@carbon/styles` White/Gray-10 Light & Gray-90/Gray-100 Dark themes)
- **Language & Build**: TypeScript 5 + Vite 6 Static Site Generation (`scripts/prerender.mjs`)
- **Hosting**: Zero-database static HTML/CSS/ESM served by Nginx at [`https://a11y.raggiesoft.com`](https://a11y.raggiesoft.com)
- **IDE Source Repository**: [`https://github.com/raggiesoft/accessibility-studio`](https://github.com/raggiesoft/accessibility-studio)

## Local Development & Verification
```bash
npm install
npm run dev      # Start local dev server on port 4330
npm run build    # Type-check, bundle, and pre-render /, /features, /enterprise, /reports, /docs, and /404.html
```

## License
Source code is licensed under the **MIT License**. Creative & editorial copy across the RaggieSoft ecosystem is licensed under **CC BY-SA 4.0**.
