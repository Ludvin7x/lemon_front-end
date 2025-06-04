# Little Lemon Restaurant — Front-End (React)

A web application built with **React 18** providing **Little Lemon** customers a complete table reservation system along with a digital menu and a modern, accessible, responsive interface.

> **Live Demo**
> [https://lemon-front.netlify.app](https://lemon-front.netlify.app)

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
| Routing            | React Router DOM 7                   |
| State Management   | Context API + `useReducer`           |
| API Requests       | Fetch                                |
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
git clone https://github.com/ludvin7x/lemon_front-end.git

# 2. Install dependencies
npm install

# 3. Create environment variables file, run: generateEnvFiles.js 
node generateEnvFiles.js
# Update API URL and other variables accordingly

# 4. Start development server
npm run dev

```

App will be available at **[http://localhost:5173](http://localhost:5173)** (default Vite port).


---

## Roadmap

Track progress via the **GitHub Projects** board. Key milestones:


Current Milestone: Version 1.0 - Full Release (Current)
This release marks a significant milestone, integrating core functionalities for a comprehensive and complete user experience.

<details>
  <summary><b>Detailed Changelog</b></summary>

API Integration: Established robust connectivity to the backend API, enabling seamless data retrieval and submission for all dynamic content.

Menu & Online Ordering System: Implemented a full-featured menu display with intuitive browsing and a streamlined ordering process for customers.

Shopping Cart Functionality: Developed a persistent and interactive shopping cart, allowing users to effortlessly add, remove, and manage items before checkout.

Reservation Management: Integrated a user-friendly reservation form, facilitating convenient booking for tables or services.

Responsive UI with Bootstrap: Enhanced the user interface and overall user experience through the strategic adoption of the Bootstrap framework, ensuring responsive design and consistent component styling.

Dynamic Image Delivery (Dual API Support): Incorporated two distinct image APIs (e.g., Unsplash, Pexels) to provide diverse, high-quality, and dynamically loaded visuals for menu items and across the application.

Past Releases
Version 0.5 - Core Infrastructure & User Management
This version focused on establishing the foundational technological stack and essential user interaction features.

Frontend Migration to React Vite: Successfully migrated the entire frontend development environment to React with Vite, significantly improving development speed and optimizing build processes for production.

Initial Bootstrap Integration: Laid the groundwork for UI/UX consistency with the initial implementation of the Bootstrap framework for foundational styling and responsive layout.

Secure User Authentication & Registration: Developed a robust user authentication system, encompassing user registration, secure login, and efficient session management.

Django Backend Connectivity: Established and meticulously configured the primary connection to the Django backend, enabling seamless and reliable data exchange between the frontend and the server.

Version 0.4 - Security & Detail Views
This release introduced critical security measures and enhanced content presentation capabilities.

JWT Token-Based Authentication: Implemented a JSON Web Token (JWT) system for secure, stateless authentication, ensuring authenticated access to all protected routes and resources.

Dedicated Menu Item Detail Page: Developed a comprehensive detail page for individual menu items, providing users with in-depth information and a richer browsing experience.

Upcoming Milestones
[ ] 🚀 v0.4 – Performance & SEO

Optimize Core Web Vitals for faster loading and responsiveness.

Implement lazy loading for images and components to improve initial page load times.

Enhance metadata and structured data for improved search engine optimization.

[ ] 🌐 v0.5 – Progressive Web App (PWA) Capabilities

Integrate a Service Worker for advanced caching and offline functionality.

Enable offline content access and basic application functionality without an internet connection.

Make the application installable on user devices for a native app-like experience.

Version 0.5

Integrated React Router for client-side navigation.

Setup ESLint and Prettier for code consistency.

Initial database schema design for users and menu items.

... (more specific features/fixes for v0.5)

Version 0.4

Created authentication middleware for protected routes.

Implemented refresh token mechanism for JWTs.

Dynamic content rendering for menu item details.

* [ ] 🌐 **v0.5 – PWA**
      Service Worker, offline cache, installable app.



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