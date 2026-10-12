# Project Architecture

- Keep the portfolio guide stateless and globally mounted from the root layout so it appears on home and case-study pages; its model call streams through `/api/portfolio-guide` with all conversation turns sent each request.