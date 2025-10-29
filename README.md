📚 Book Finder App

A modern, responsive book search application built with React and the Open Library API, designed for seamless book discovery and exploration.
---
🎯 Project Overview

Book Finder helps users search, filter, and explore books using the Open Library API
.
Built for Alex (a college student persona), it focuses on fast search, smooth UI, and detailed book insights.

🧩 Key Features

🔍 Smart Search – Find books by title, author, or ISBN (with 600ms debouncing)

🧠 Advanced Filters – Filter by genres like Fiction, Science, History, etc.

🧱 View Modes – Toggle between Grid and List views

📖 Book Details Modal – View descriptions, publishers, and publication years

📄 Pagination – 12 books per page for smooth navigation

📱 Fully Responsive – Optimized for desktop, tablet, and mobile

⚙️ Error & Empty States – Friendly feedback for network or empty results.
---
| Category       | Technology                 |    Purpose                          |
| -------------- | -------------------------- | -------------------------------- |
| **Frontend**   | React 18.2                 | Core framework                   |
| **Styling**    | Tailwind CSS (CDN)         | Utility-first responsive design  |
| **Icons**      | Lucide React               | Clean and modern icon set        |
| **API**        | Open Library               | Public book data source          |
| **State Mgmt** | React Hooks                | useState, useEffect ,useCallback |
| **Deployment** | CodeSandbox            | Free and accessible hosting|
---
🔌 API Integration

Base URL:https://openlibrary.org/search.json?q={query}&page={page}&limit=12

---
Book Details Endpoint:https://openlibrary.org/works/{work_id}.json
---
Cover Image URL: https://covers.openlibrary.org/b/id/{cover_id}-M.jpg

---
Example Request
const res = await fetch(
  'https://openlibrary.org/search.json?q=javascript&page=1&limit=12'
);
const data = await res.json();
---
🧩 Project Structure
---
book-finder/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── BookCard.jsx
│   │   ├── BookDetail.jsx
│   │   ├── Pagination.jsx
│   │   ├── LoadingStates.jsx
│   │   ├── EmptyState.jsx
│   │   └── ErrorMessage.jsx
│   ├── hooks/
│   │   └── useDebounce.js
│   ├── services/
│   │   └── bookService.js
│   ├── utils/
│   │   └── constants.js
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
---
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Thatikonda-Teja/book-finder-app.git
cd book-finder-app

2️⃣ Install Dependencies
npm install

3️⃣ Start Development Server
npm start

4️⃣ Visit in Browser
http://localhost:3000

📲 How to Use

Enter a keyword (e.g., “Harry Potter”, “JavaScript”, “History”) in the search bar.

Apply filters like Science or Fiction.

Toggle between Grid and List layouts.

Click a book to view detailed information.

Use pagination to navigate between result pages.

✨ Performance Optimizations

600ms Debouncing – Reduces unnecessary API calls by ~90%.

Pagination – Loads only 12 books per page for faster rendering.

Memoization – useCallback and React.memo for performance.

Lazy Loading – Efficient image rendering.

🎨 Design Highlights

🎯 Minimal UI using Tailwind CSS utilities

⚡ Skeleton Loaders for smooth feedback

💬 Error & Empty States for user clarity

♿ Accessibility: ARIA labels + keyboard navigation

📱 Responsive Layouts across all screen sizes

🤖 AI Collaboration

Developed with partial assistance from Claude AI for code structuring, API debugging, and UX suggestions.
All implementation, testing, and optimization were done manually.

🔗 AI Conversation Log: https://claude.ai/share/888ab4d9-725d-4c0d-80d2-74791ad658e8

📈 Future Improvements

🌙 Dark mode toggle

❤️ Favorites / Saved Books (localStorage)

🧾 ISBN-based search

📱 PWA support for offline usage

🧪 Unit tests (Jest + React Testing Library)

🌐 Multi-language support

👨‍💻 Author

Thatikonda Teja

📧 Email: [thatikondateja2002@gmail.com
]
💼 LinkedIn: https://www.linkedin.com/in/teja-thatikonda-0938b7253/
🐙 GitHub: (https://github.com/Thatikonda-Teja)

🌐 Portfolio: https://teja-protfolio.vercel.app/
📜 License

This project was created as a UI Take-Home Challenge submission and is open for learning and reference purposes.

💖 Acknowledgments

Open Library
 – Free book data API

React
 – UI library

Tailwind CSS
 – Styling framework

Lucide React
 – Icon library

CodeSandbox
 – Cloud development environment

🌟 Built with Passion, React, and Tailwind CSS

“AI can assist — but creativity, polish, and problem-solving come from you.”