# slumber-squad

> Encouraging marginalized genders to adopt AI tools in the workplace — closing the AI usage gap.

[![Netlify Status](https://api.netlify.com/api/v1/badges/66a90228-7c4a-4fb7-a79b-473f72bd97f5/deploy-status)](https://app.netlify.com/projects/slumber-squad/deploys)

## About

slumber-squad is a web app designed to encourage marginalized genders to use AI in the workplace, helping close the AI adoption gap. [Add one or two sentences on the core feature once your squad finalizes the concept.]

## Tech Stack

- **React** (via Vite) — UI framework
- **Tailwind CSS** — styling
- **ESLint + Prettier** — linting and formatting
- **Netlify** — hosting + continuous deployment

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (bundled with Node)

### Installation

```bash
# Clone the repo
git clone https://github.com/cherryontech/slumber-squad.git

# Move into the project folder
cd slumber-squad

# Install dependencies
npm install
```

### Running locally

```bash
npm run dev
```

Then open the local URL printed in your terminal (usually http://localhost:5173).

## Scripts

| Script | Command | What it does |
|---|---|---|
| **dev** | `npm run dev` | Starts the local development server with hot reload. Use this while building. |
| **build** | `npm run build` | Bundles the app for production into the `dist/` folder. This is what Netlify runs to deploy. |
| **preview** | `npm run preview` | Serves the production build locally so you can test what will actually deploy. |
| **lint** | `npm run lint` | Runs ESLint to catch code problems across the project. |
| **format** | `npm run format` | Runs Prettier to auto-format all files to a consistent style. |

> These scripts live in the `"scripts"` section of `package.json`. Run any of them with `npm run <name>`.

## Deployment

This project auto-deploys via **Netlify**:

- **Production:** every merge into `main` triggers a production deploy to [slumber-squad.netlify.app](https://slumber-squad.netlify.app).
- **Deploy previews:** every pull request gets its own temporary preview URL so you can see changes before merging.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for our branching, PR, and review process.

## License

This project is licensed under the Hippocratic License 3.0 — see [LICENSE.md](./LICENSE.md).