# OpenSAST research website

Public static website for the OpenSAST master’s project at the School of Computing, Queen’s University.

This repository contains the reviewed HTML, CSS, JavaScript, diagrams and selected public research/documentation exports. It does not run the scanner, host a dashboard, accept source uploads or contain model weights or credentials. The analyzer source repository currently requires access; its public URL will be added when supplied.

## Publishing

GitHub Pages serves `main` from the repository root. `.nojekyll` preserves the static files without Jekyll processing. The report PDF and presentation are linked through Google Drive with public read-only access.

## Updating

Generate the website from the maintained project sources, review the export, then copy only the approved static files into this repository. Keep the `.nojekyll` marker. Do not copy private experiment runs, application data, credentials or the analyzer’s Git history.
