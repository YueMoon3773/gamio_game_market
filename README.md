
# 🎮 Gamio — Your Game Store, Your World

A full-stack game marketplace web application powered by the RAWG API — browse thousands of real games, manage a cart, save favorites, and experience a simulated game store with a sleek, fully responsive UI.



> ⚠️ **Disclaimer:** This is not an actual commercial site. Games are not available for real purchase. All prices are purely for display and simulation of a real game store. Enjoy 😄

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Gamio-e53e3e?style=for-the-badge)](https://gamio-game-market-one.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-gamio_game_market-181717?style=for-the-badge&logo=github)](https://github.com/YueMoon3773/gamio_game_market)
[![RAWG API](https://img.shields.io/badge/Powered_by-RAWG_API-orange?style=for-the-badge)](https://rawg.io/apidocs)


## 📖 Introduction

**Gamio** is a simulated game storefront built as a full-stack personal project. It pulls real game data from the [RAWG Video Games Database API](https://rawg.io/apidocs) — including screenshots, descriptions, ratings, genres, platforms, and store listings — and presents it in a polished, Steam-inspired shopping experience.

Users can browse curated game categories, search by title, view detailed game pages with screenshot galleries, add games to a cart, save favorites, and check out — all within a dark/light themed, fully responsive interface that works seamlessly on both desktop and mobile.
## ✨ Features

- **Landing Page with Quick Navigation** — Home page with quick-jump buttons to curated collections: Last 30 days, Popular in 2025, Best of this year, and All time top.
- **Browse by Category** — Navigate games via New Releases (Last 30 days / This week / Next week), Top charts, and Platforms (PC, PlayStation, Xbox, Android, iOS, Nintendo) from the sidebar.
- **Filter by Genre** — Browse games filtered by genre including Action, Strategy, RPG, Shooter, and more.
- **Search with Live result** — Real-time search bar with instant dropdown suggestions as you type.
- **Sort Results** — Order game listings by name or release date (Newest to Oldest / Oldest to Newest).
- **Favorites** — Wishlist any game via the heart icon; filled heart and "Favorite game added" toast confirms the action. Toggle to remove.
- **Game Detail Page** — Full detail view per game including a screenshot carousel, description, release date, rating, genres, platforms, stores, developer, and publisher. Expandable "Show more info" section.
- **Add to Cart / Remove from Cart** — Add games directly from the listing card or detail page, with instant toast feedback ("Game added to cart"). Remove from the cart page or in-card toggle.
- **Cart Page** — Dedicated cart showing all queued games, individual prices, a running total, and a simulated Checkout flow with confirmation dialog.
- **Authentication** — Full user registration and login system with live input validation (character count, uppercase/lowercase/number/symbol requirements shown in real time with color-coded indicators).
- **Theme Toggle** — Switch between Dark Mode and Light Mode at any time via the navbar.
- **Responsive Design** — Fully adapted for mobiles/tablets, with a hamburger-style menu and single-column card layout on small screens.
- **Scroll-to-Top Button** — Floating button to jump back to the top of long game lists.


## 🛠️ Tech Stack

### Front-End
| Technology | Purpose |
|---|---|
| React | Component-based UI framework |
| React Router | Client-side routing and page navigation |
| SCSS | Custom styling, theming, and responsive layouts |
| Fetch API | HTTP requests to the REST API and RAWG |

### Back-End
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | REST API framework and routing |
| PostgreSQL | Relational database (users, carts, favorites) |
| bcrypt | Secure password hashing |
| JWT / Sessions | User authentication and authorization 

### External API
| Technology | Purpose |
|---|---|
| RAWG Video Games Database API | Real game data — titles, screenshots, descriptions, ratings, genres, platforms, stores |



## 🎯 Project Purposes


This project was built with several concrete learning goals:

1. **Consume a third-party REST API** — Integrate the RAWG API to fetch, filter, and display real-world data dynamically, handling pagination, query parameters, and response shaping.
2. **Build a full e-commerce UI flow** — Implement a complete browse → search → view details → add to cart → checkout experience from scratch.
3. **Practice real authentication** — Build a secure login/registration system with bcrypt password hashing, JWT-based auth, and client-side input validation with live feedback.
4. **Design a responsive, polished UI** — Create a dark/light themed, mobile-first interface that holds up at both desktop and small screen sizes without a component library.
5. **Manage state across a multi-page app** — Handle cart state, favorites, authentication context, and theme preferences consistently across routes.
6. **Ship to production** — Deploy a full-stack application with front-end on Vercel and back-end API communicating in a live environment.
## 🚀 Live Demo

The application is live and fully explorable:

👉 **[Live demo](https://gamio-game-market-one.vercel.app)**

Browse games, add to cart, save favorites, and try the checkout flow — no real payment required.
## 📬 Contact

Created with ❤️ by **[YueMoon](https://github.com/YueMoon3773)**  
- ✉️ Email: [nguyenhuagiabao.98@gmail.com](nguyenhuagiabao.98@gmail.com)  
## 🎶 Ending Footer

Enjoy exploring games with **Gamio**! 🎮