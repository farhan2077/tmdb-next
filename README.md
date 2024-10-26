# tmdb-task

## Todos

- [x] Build a responsive movie search and details app using Next.js 13/14 and the TMDB API.

**Homepage:** `/`

- [x] Implement infinite scrolling or a load more button on the homepage (Client-Side Pagination)
- [x] Search bar in homepage

**Movie details page:** `/movies/[id]`

- [x] Should be dynamic route
- [x] Use SSR with ISR
- [x] Show ecommendations (ISR)

**Favorites/Watchlist with Server Actions** `/watchlist`

- [x] Using server action add to Favorites/Watchlist (store in localstorage)

**OPTIONAL**

- [ ] Dark mode toggle or watchlist and store it using global state (zustand or react context)

**EXTRA (ADVANCED)**

- [ ] Zod for API Response Validation
- [x] React Hook Form for Search
- [x] Dynamic Caching for API Calls
- [x] Optimistic UI for Watchlist
- [x] Middleware for Authentication (protect `/watchlist`)

## Prerequisites

- [Node.js](https://nodejs.org/en/) `v18.17.1`
- [Git](https://git-scm.com/) `v2.3+`
- [Prettier editor integration](https://prettier.io/docs/en/editors.html)

## Install & development

1. Clone repository

```sh
git clone https://github.com/farhan2077/tmdb-task
```

2. Change directory

```sh
cd tmdb-task
```

3. Install dependencies

```sh
npm install
```

4. Add environment variables similar to [`.env.example`](https://github.com/farhan2077/tmdb-task/blob/main/.env.example)

5. Start development server

```sh
npm run dev
```

Open `http://localhost:3000` in your browser.
