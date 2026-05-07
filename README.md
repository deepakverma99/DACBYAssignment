# HN Stories — MERN Hacker News Reader

A professional, full-stack Hacker News reader built with the MERN stack. This application scrapes the latest top stories from Hacker News, extracts their content using high-fidelity readability tools, and presents them in a modern, responsive dashboard interface.

## 🚀 Key Features

- **Automated Web Scraping**: Scrapes the top 10 stories from Hacker News upon server startup using `Axios` and `Cheerio`.
- **Content Extraction**: Utilizes `@mozilla/readability` and `JSDOM` to fetch and parse the full text of linked articles for a seamless reading experience.
- **Secure Authentication**: Complete JWT-based authentication flow (Register/Login) with hashed passwords and protected routes.
- **Modern Dashboard UI**: 
  - **Split-Pane Layout**: Browse the list on the left and read on the right (Desktop).
  - **Independent Scrolling**: The story list and the article preview scroll separately for a fluid "dashboard" feel.
  - **Mobile-First Design**: On small screens, the reader transitions into a focused overlay with a native "Back to Stories" flow.
  - **Glassmorphism & Dark Mode**: A premium dark theme featuring Tailwind CSS v4 and backdrop-blur effects.
- **Bookmark System**: Users can save their favorite stories for later reading.

## 🛠️ Tech Stack

### Backend
- **Node.js & Express**: Robust server architecture with a clear controller/route/model separation.
- **MongoDB & Mongoose**: NoSQL database for storing scraped stories and user data.
- **JWT & BcryptJS**: Secure session management and password encryption.
- **Scraper**: Custom engine using `Cheerio` for parsing and `Readability` for content synthesis.

### Frontend
- **React 19 (Vite)**: Fast, modern UI development.
- **Tailwind CSS v4**: Utilizes the latest CSS-in-JS capabilities and modern theme engine.
- **React Router 7**: Sophisticated routing with protected navigation.
- **React Context API**: Efficient global state management for authentication.

---

## 📂 Project Structure

```text
dacbyassignment/
├── backend/
│   ├── config/          # DB connection logic
│   ├── controllers/     # Business logic for Auth and Stories
│   ├── middleware/      # JWT Authentication middleware
│   ├── models/          # Mongoose Schemas (User, Story)
│   ├── routes/          # API Route definitions
│   ├── scraper/         # Hacker News scraping logic
│   └── server.js        # Entry point
└── frontend/
    ├── src/
    │   ├── api/         # Axios instance & config
    │   ├── components/  # Reusable UI (Navbar, StoryCard, etc.)
    │   ├── context/     # AuthContext for state management
    │   ├── hooks/       # Custom hooks (useStories)
    │   ├── layouts/     # Main wrapper layout
    │   ├── pages/       # Home, Bookmarks, Login, Register
    │   └── index.css    # Tailwind v4 configuration
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd dacbyassignment
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```
Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Run the frontend:
```bash
npm run dev
```

---

## 📡 API Endpoints

| Method | Route | Auth | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | No | Register a new user |
| **POST** | `/api/auth/login` | No | Login and receive JWT |
| **GET** | `/api/stories` | No | Get paginated stories (sorted by points) |
| **GET** | `/api/stories/:id` | No | Get details for a single story |
| **POST** | `/api/stories/:id/bookmark` | **Yes** | Toggle bookmark status for a story |
| **POST** | `/api/scrape` | No | Manually trigger the scraper |

---

## 📹 Loom Video Walkthrough
[Insert Loom Link Here]

---

## 📝 Design Decisions & Trade-offs
- **Scraper Strategy**: Chose `Cheerio` over `Puppeteer` for performance and simplicity, as Hacker News serves static HTML.
- **Content Parsing**: Integrated `@mozilla/readability` to provide users with a clean, ad-free reading experience directly within the app.
- **UX**: Implemented a "Split-Pane" layout to mimic premium news apps, ensuring that the user never loses their scroll position in the feed while reading.
