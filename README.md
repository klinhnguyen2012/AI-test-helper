# Assessment Simulator

Local-first mock assessment and practice app built with React, TypeScript, Vite and Tailwind CSS. It is a learning simulator, not an official entrance exam. Attempts and active sessions are stored in browser localStorage; no account, backend, or API key is needed.

## Run locally

```sh
cd frontend
npm install
npm run dev
```

The app source and `index.html` live at the repository root; npm dependencies and build configuration live in `frontend/`. Open the localhost URL printed by Vite. Run `npm run build` for a production build and `npm test` for the unit tests, both from `frontend/`.

## Included

- A Vietnamese question bank of 135 items across probability/matrices (39), Python/APIs/NumPy/Pandas (42), machine learning (32), and responsible AI (22). The 60-question mixed mock includes 4 long math-code reading questions, 5 written responses, and 2 Python coding prompts.
- Mixed, module, code-focused, and missed-question practice; difficulty and length filters.
- Two session types: untimed Mock practice and timed Exam simulation (90-minute default); both show answers and explanations after submission, while Exam also submits automatically when its timer expires.
- Multiple choice, multiple select, numeric tolerance, syntax-highlighted code questions, written Python answers without execution, essays with self-review rubrics, seeded question order, timer, autosaved active exam, explanations, result review, history, and JSON export/import.
- Objective exam scores are calculated automatically; essays and written Python responses are saved for self-review and are not included in the automatic score. Progress persists locally in the current browser.
