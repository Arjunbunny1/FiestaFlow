# AI Documentation

This document provides a record of at least 6 AI-assisted prompts, including the context, the changes made, and detailed explanations for each.

---

## Prompt 0: Frontend Planning and UI Design
**Context:**
- "I am working on event_management project, I completed the backend part (see backend folder). Now I have to start working on frontend. I want to make an eye-catching UI using React, so start step by step: first home page, then other pages."
**Change:**
- Planned the frontend development process, starting with the home page and then moving to other pages, focusing on modern, visually appealing UI using React and Material-UI.
**Explanation:**
- This prompt set the direction for a user-centric, attractive frontend, ensuring a stepwise approach to building out the UI for the event management system.

---

## Prompt 1: Fixing React Router Import Bug
**Context:**
- The Events page was not loading after login. The import in `App.js` was from an empty `Events.js` file instead of the actual `Events_New.js` implementation.
**Change:**
- Updated the import in `App.js` to use `Events_New.js`.
**Explanation:**
- This fixed the routing issue and allowed the events page to load after login.

---

## Prompt 2: Remove Title Sort Option
**Context:**
- Remove the sort-by-title option from the events list.
**Change:**
- Removed the title sort options from `SORT_OPTIONS` in `frontend/src/utils/constants.js`.
**Explanation:**
- This simplified the sort dropdown and removed unused functionality.

---

## Prompt 3: Use remainingSeats in Frontend
**Context:**
- Backend Event model had a `remainingSeats` virtual, but frontend was not displaying it.
**Change:**
- Updated `Events_New.js` to show both confirmed count and remaining seats, with color indicators.
**Explanation:**
- Improved user experience by showing how many seats are left for each event.

---

## Prompt 4: Add confirmedCount to EventForm
**Context:**
- The event creation/edit form did not allow setting `confirmedCount`.
**Change:**
- Added `confirmedCount` to form state, validation, submission, and as a new input field in `EventForm.js`.
**Explanation:**
- Now users can specify how many attendees are already confirmed when creating or editing an event.

---

## Prompt 5: Remove .env from GitHub
**Context:**
- The frontend `.env` file was accidentally pushed to GitHub.
**Change:**
- Used `git rm --cached .env`, updated `.gitignore`, committed, and pushed the change.
**Explanation:**
- This removed sensitive environment variables from the public repository and ensured they are ignored in the future.

---

## Prompt 6: Fix React Router 404 on Render
**Context:**
- Navigating directly to `/events/new` on the deployed frontend resulted in a 404 error.
**Change:**
- Advised to add a rewrite rule on Render: `/*` → `/index.html` (status 200).
**Explanation:**
- This allows React Router to handle all client-side routes, fixing the 404 issue on refresh or direct navigation.

---

## Note: AI Tool Used
**Throughout this project, I used `gemini_cli` for AI-powered coding assistance, prompt generation, and code review.**

This tool helped automate, debug, and document many steps in the development process.

---

Each prompt above includes the context, the code or configuration changes made, and a detailed explanation of why the change was necessary and how it improved the project.
