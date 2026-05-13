# Project Plan

This document outlines the development plan for the Council Chambers game.

## Phase 1: Audio Overhaul (Beginner)

*   **Goal:** Replace the custom `audioManager` with a robust library like `howler.js` and add more sound effects.
*   **Steps:**
    1.  Install `howler.js`: `npm install howler`.
    2.  Create a new `audioService.ts` in `src/utils` to encapsulate all audio-related logic.
    3.  In `audioService.ts`, create a new `AudioManager` class that uses `howler.js` to load and play sounds.
    4.  Replace the existing `audioManager` with the new `AudioManager` in all components.
    5.  Find and add more sound effects for different interactions (e.g., button clicks, screen transitions, etc.).

## Phase 2: State Management Refactoring (Intermediate)

*   **Goal:** Refactor the application's state management to use a dedicated library like Zustand for better organization and scalability.
*   **Steps:**
    1.  Install `zustand`: `npm install zustand`.
    2.  Create a new `store.ts` file in `src/` to define the application's state and actions.
    3.  In `store.ts`, create a Zustand store that manages the game's state (e.g., `view`, `playerName`, `scores`, etc.).
    4.  Refactor the `App.tsx` component to use the Zustand store instead of `useState` for managing the game's state.
    5.  Refactor the other components to get the state and actions from the Zustand store.

## Phase 3: Gameplay Enhancements (Intermediate)

*   **Goal:** Implement a more complex scoring system and add more advanced animations.
*   **Steps:**
    1.  **Scoring System:**
        *   Brainstorm and design a more complex scoring system that takes into account more factors.
        *   Update the `scoring.ts` utility to implement the new scoring logic.
        *   Update the `ResultScreen.tsx` component to display the new scoring data.
    2.  **Animations:**
        *   Explore the `framer-motion` documentation to learn about more advanced animations and transitions.
        *   Implement more advanced animations for screen transitions, component entrances, and other interactions.
        *   Consider adding layout animations for a more dynamic user experience.

## Phase 4: Code Cleanup and Final Polish (Beginner)

*   **Goal:** Move all inline styles to a separate CSS file or use a CSS-in-JS solution for better organization and maintainability.
*   **Steps:**
    1.  Create a new `theme.css` file in `src/styles` to store all the theme-related styles.
    2.  Move all the inline styles from the components to the `theme.css` file.
    3.  Replace the inline styles with CSS classes.
    4.  Review the entire application for any remaining code smells or areas for improvement.
