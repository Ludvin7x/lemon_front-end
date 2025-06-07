
# Little Lemon Restaurant — Front-End (React)

A web application built with **React 18** providing **Little Lemon** customers a complete table reservation system along with a digital menu and a modern, accessible, and responsive interface.

> **Live Demo:**  
> [https://lemon-front.netlify.app](https://lemon-front.netlify.app)

---

## Table of Contents

1. [Key Features](#key-features)  
(#search--sorting-functionality)  
2. [Tech Stack](#tech-stack)  
3. [Installation & Usage](#installation--usage)  
4. [Project Structure](#project-structure)  
5. [Testing](#testing)  
6. [Continuous Deployment](#continuous-deployment)  
7. [Roadmap](#roadmap)     
8. [Author](#author)

---

## Key Features

* **Table Reservation System** connected to the backend REST API JWT access token.  
* **Responsive Design** with mobile-first approach supporting viewports down to 320px.  
* **Accessibility (WCAG 2.1 AA)**: keyboard navigation, ARIA roles.  
* **Modular Architecture** with reusable components and custom hooks for maintainability.   
* **Unit & Integration Testing** using Jest and React Testing Library.  
* **CI/CD Pipeline**: branch protection and automated deployment on Netlify from the `main` branch.
* **Search Bar:**  
  Enables users to quickly find menu items or reservations by typing keywords such as dish names, categories, or customer names.
* **Dynamic Sorting:**  
  Allows sorting menu items or reservation lists by multiple criteria like price, or alphabetical order. Sorting can be toggled between ascending and descending.
* **Filter Options:**  
  Provides filters for categories, availability status, or other relevant parameters to narrow down results effectively.

---


## Tech Stack

| Category           | Stack                                |
| ------------------ | ------------------------------------ |
| Framework          | React 19.1 + Vite                    |
| Routing            | React Router DOM 7                   |
| API Requests       | Fetch                                |
| Styling            | TailwindCss, Shadnc                  |
| Testing            | Jest, React Testing Library          |
| Linting/Formatting | ESLint, Prettier,                    |
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

# 3. Create environment variables file.
# Then update API URL and other variables accordingly
node generateEnvFiles.js

# 4. Start development server
npm run dev
```

App will be available at **[http://localhost:5173](http://localhost:5173)** (default Vite port).

---

## Roadmap

Track progress via the **GitHub Projects** board. Key milestones:

Current Milestone: Version 1.2 - Full Release (Current)  
This release marks a significant milestone, integrating core functionalities for a comprehensive and complete user experience.

<details>
  <summary><b>Detailed Changelog</b></summary>

API Integration: Established robust connectivity to the backend API, enabling seamless data retrieval and submission for all dynamic content.

Menu & Online Ordering System: Implemented a full-featured menu display with intuitive browsing and a streamlined ordering process for customers.

Shopping Cart Functionality: Developed a persistent and interactive shopping cart, allowing users to effortlessly add, remove, and manage items before checkout.

Reservation Management: Integrated a user-friendly reservation form, facilitating convenient booking for tables or services.

Responsive UI with Bootstrap: Enhanced the user interface and overall user experience through the strategic adoption of the Bootstrap framework, ensuring responsive design and consistent component styling.

Dynamic Image Delivery (Dual API Support): Incorporated two distinct image APIs (e.g., Unsplash, Pexels) to provide diverse, high-quality, and dynamically loaded visuals for menu items and across the application.

Core Infrastructure & User Management  
This version focused on establishing the foundational technological stack and essential user interaction features.

Frontend Migration to React Vite: Successfully migrated the entire frontend development environment to React with Vite, significantly improving development speed and optimizing build processes for production.

Initial Bootstrap Integration: Laid the groundwork for UI/UX consistency with the initial implementation of the Bootstrap framework for foundational styling and responsive layout.

Secure User Authentication & Registration: Developed a robust user authentication system, encompassing user registration, secure login, and efficient session management.

Django Backend Connectivity: Established and meticulously configured the primary connection to the Django backend, enabling seamless and reliable data exchange between the frontend and the server.

Security & Detail Views  
This release introduced critical security measures and enhanced content presentation capabilities.

JWT Token-Based Authentication: Implemented a JSON Web Token (JWT) system for secure, stateless authentication, ensuring authenticated access to all protected routes and resources.

Dedicated Menu Item Detail Page: Developed a comprehensive detail page for individual menu items, providing users with in-depth information and a richer browsing experience.

Optimize Core Web Vitals for faster loading and responsiveness.

Implement lazy loading for images and components to improve initial page load times.

Enhance metadata and structured data for improved search engine optimization.

Integrate a Service Worker for advanced caching and offline functionality.

Enable offline content access and basic application functionality without an internet connection.

Make the application installable on user devices for a native app-like experience.

</details>

---

## Author

Ludwing — [GitHub Profile](https://github.com/ludvin7x)