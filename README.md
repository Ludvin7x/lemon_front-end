# Little Lemon Restaurant — Front-End (React)

A web application built with **React 18** providing **Little Lemon** customers a complete table reservation system along with a digital menu and a modern, accessible, responsive interface.

> **Live Demo**
> [https://restaurant-littlelemon.netlify.app/](https://restaurant-littlelemon.netlify.app/)

---

## Table of Contents

1. [Key Features](#key-features)
2. [Screenshots](#screenshots)
3. [Tech Stack](#tech-stack)
4. [Installation & Usage](#installation--usage)
5. [Project Structure](#project-structure)
6. [Testing](#testing)
7. [Continuous Deployment](#continuous-deployment)
8. [Roadmap](#roadmap)
9. [Contributing](#contributing)
10. [License](#license)
11. [Author](#author)

---

## Key Features

* **Table Reservation System** connected to the backend REST API (Django + Djoser) for availability and booking.
* **Responsive design**, mobile-first approach supporting viewports down to 320px.
* **Accessibility (WCAG 2.1 AA)**: keyboard navigation, ARIA roles, and audit-tested.
* **Modular architecture** with reusable components and custom hooks.
* **Internationalization ready** (`react-intl`), currently supports English and Spanish.
* **Unit & Integration tests** using Jest + React Testing Library.
* **CI/CD**: branch protection + automated deployment on Netlify from `main` branch.

---

## Tech Stack

| Category           | Stack                                |
| ------------------ | ------------------------------------ |
| Language           | JavaScript (ES2022)                  |
| Framework          | React 18 + Vite                      |
| Routing            | React Router DOM 6                   |
| State Management   | Context API + `useReducer`           |
| API Requests       | Axios                                |
| Styling            | CSS Modules (BEM)                    |
| Testing            | Jest, React Testing Library          |
| Linting/Formatting | ESLint, Prettier, Husky, lint-staged |
| DevOps             | Netlify, GitHub Actions              |

---

## Installation & Usage

### Prerequisites

* **Node.js ≥ 20**
* **npm ≥ 10** (or pnpm/yarn)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/react-frontend.git
cd react-frontend

# 2. Install dependencies
npm install

# 3. Create environment variables file
cp .env.example .env
# Update API URL and other variables accordingly

# 4. Start development server
npm run dev

# 5. Run tests
npm test
```

App will be available at **[http://localhost:5173](http://localhost:5173)** (default Vite port).

---

## Project Structure

```
react-frontend/
├── public/
├── src/
│   ├── api/            # API service abstractions
│   ├── assets/         # Static assets
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Route-based views
│   ├── routes/         # Route definitions
│   ├── contexts/       # Global state providers
│   ├── tests/          # Test files
│   └── utils/          # Helper utilities
├── .env.example
└── ...
```

---

## Testing

```bash
# Run all tests in watch mode
npm test
```

Tests cover business logic, component rendering, accessibility, and user interaction.

---

## Continuous Deployment

Production builds are generated with:

```bash
npm run build
```

Each push to the `main` branch triggers a **GitHub Action** that:

1. Runs ESLint and unit tests.
2. Builds the optimized production bundle.
3. Deploys to **Netlify** using a secure token.

---

## Roadmap

Track progress via the **GitHub Projects** board. Key milestones:

* [x] 💡 **v0.3 – Project Assessment**
      Front-End MVP with reservations, menu, and auth flows.
* [ ] 🚀 **v0.4 – Performance & SEO**
      Optimize Core Web Vitals, lazy loading, metadata.
* [ ] 🌐 **v0.5 – PWA**
      Service Worker, offline cache, installable app.

<details>
  <summary><b>Detailed Changelog</b></summary>

### v0.3 – Project Assessment

* Front-End completed (May 2025).

### v0.2 – Interacting with the API

* Connected bookings page to the API (Nov 14, 2023).
* Updated unit tests (Nov 16, 2023).
* UX & responsive improvements (Nov 17–18, 2023).

### v0.1 – Table Booking System

* Initial booking system implementation (Sep–Oct 2023).

</details>

---

## Contributing

Contributions are welcome!
To report a bug or suggest a feature:

1. Open an **Issue** describing your change.
2. Tag it with `bug`, `enhancement`, or `question`.
3. Fork the project and create your branch: `git checkout -b feat/new-feature`.
4. Make sure to run `npm test` before opening a **Pull Request**.
5. Clearly describe changes and reference related Issues.



---