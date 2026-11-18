# OpenSAST research website

Public static website for the OpenSAST master’s project at the School of Computing, Queen’s University.

This repository contains the reviewed HTML, CSS, JavaScript, diagrams and selected public research/documentation exports. It does not run the scanner, host a dashboard, accept source uploads or contain model weights or credentials. The analyzer source is public at [marwanahmedaly/opensast](https://github.com/marwanahmedaly/opensast). Installation and operation are documented there and in the [website documentation](https://marwanahmedaly.github.io/opensast-website/documentation.html).

## Project resources

- [Research website](https://marwanahmedaly.github.io/opensast-website/)
- [Source code and installation](https://github.com/marwanahmedaly/opensast)
- [Final report](https://drive.google.com/file/d/1hhNG6HU7Aa3Z5_3LBudpV9SnH3_EqK_i/view)
- [Presentation](https://docs.google.com/presentation/d/1rBd8PrAxw52E2QHSfeiTVEfaaAH_tE2KkPV5pimKUz8)
- [Dashboard walkthrough](https://marwanahmedaly.github.io/opensast-website/docs-dashboard.html)

## What is in this repository

- **Pages:** overview, research journey, evaluation and resources, plus a "your first scan" guide and 15 documentation pages (installation, scanning, results and human review, dashboard walkthrough, accounts and workspaces, incremental scanning, GitHub Actions and CI, a copyable workflow, inference and configuration, deployment, troubleshooting, a command reference and three long reference pages).
- **Assets:** 6 SVG diagrams (desktop and mobile versions) and 4 dashboard screenshots, one stylesheet and one small script. No build step.
- **Downloads:** the thesis in Markdown, evaluation results (CSV and JSON), an example evidence packet, provenance record and model response, a BibTeX file, and the installation, product and GitHub Actions guides.

## Run locally

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Reuse

No license has been declared for the site content. Ask before reusing it.

## Publishing

GitHub Pages serves `main` from the repository root. `.nojekyll` preserves the static files without Jekyll processing. The report PDF and presentation are linked through Google Drive with public read-only access.

## Updating

Generate the website from the maintained project sources, review the export, then copy only the approved static files into this repository. Keep the `.nojekyll` marker. Do not copy private experiment runs, application data, credentials or the analyzer’s Git history.
