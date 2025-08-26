<!-- Animated Header -->
<p align="center">
  <img src="https://your-gif-url.com/library-typing.gif" alt="Library Catalog Typing Animation" width="700"/>
</p>

<h2 align="center" style="color:#0EA5E9; font-size: 24px;">📚 Welcome to John's Library Catalog</h2>

<p align="center" style="font-size:16px; color:#475569;">
A modern, fully responsive Library Management Frontend application built with <strong>React, Redux Toolkit, RTK Query</strong> and <strong>TailwindCSS</strong>.  
This app allows users to browse, add, edit, and borrow books with real-time updates and interactive UI.
</p>

---

<h2 style="color:#0EA5E9;">🎯 Project Overview</h2>

<p style="font-size:16px; color:#334155;">
The goal of this project is to create an intuitive, high-performance frontend for a library system that interacts seamlessly with a backend API.  
Users can view available books, track borrowed books, manage inventory, and get notifications for every action.  
This project demonstrates the power of <strong>RTK Query</strong> in handling API requests, caching, and state management efficiently.  
</p>

---

<h2 style="color:#0EA5E9;">✨ Key Features</h2>

<ul style="font-size:16px; color:#334155;">
  <li>📖 <strong>Browse Books:</strong> View all books in the library with detailed information.</li>
  <li>➕ <strong>Add Book:</strong> Add new books with title, author, ISBN, genre, description, and number of copies.</li>
  <li>✏️ <strong>Edit Book:</strong> Update book details quickly and efficiently.</li>
  <li>🗑️ <strong>Delete Book:</strong> Remove books from the library.</li>
  <li>📚 <strong>Borrow Book:</strong> Borrow books and update availability in real-time.</li>
  <li>📊 <strong>Borrowed Book Summary:</strong> See a live summary of all borrowed books with quantities.</li>
  <li>🔔 <strong>Custom Toast Notifications:</strong> User-friendly notifications for every action using <strong>React Hot Toast</strong>.</li>
  <li>🌐 <strong>Responsive Design:</strong> Works perfectly on mobile, tablet, and desktop using <strong>TailwindCSS</strong>.</li>
  <li>💨 <strong>Animations:</strong> Smooth card hover animations and sparkles using <strong>Framer Motion</strong>.</li>
</ul>

---

<h2 style="color:#0EA5E9;">💻 Tech Stack</h2>

<p align="center">
  <img src="https://img.shields.io/badge/React-%2361DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux-%23764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/RTK%20Query-%23008CFF?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-%236646FF?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Framer_Motion-%23F5A623?style=for-the-badge&logo=framer&logoColor=white" />
</p>

<p style="font-size:16px; color:#334155;">
This project demonstrates **modern frontend development** practices including:
<ul>
  <li>Component-based architecture with <strong>React</strong></li>
  <li>State management using <strong>Redux Toolkit</strong> and <strong>RTK Query</strong></li>
  <li>Interactive UI with <strong>TailwindCSS</strong> and <strong>Framer Motion</strong></li>
  <li>Environment variable management for API URLs</li>
</ul>
</p>

---

<h2 style="color:#0EA5E9;">⚡ RTK Query Details</h2>

<p style="font-size:16px; color:#334155;">
RTK Query provides automatic data fetching, caching, invalidation, and request status tracking.  
All API interactions are centralized in <code>apiSlice.ts</code>. This includes both **queries** (read operations) and **mutations** (write operations).
</p>

<h3 style="color:#0EA5E9;">Queries (Read Operations)</h3>
<ul style="font-size:16px; color:#334155;">
  <li><code>useGetBooksQuery</code> - Fetch all books from the backend.</li>
  <li><code>useGetBorrowSummaryQuery</code> - Get a live summary of borrowed books.</li>
</ul>

<h3 style="color:#0EA5E9;">Mutations (Write Operations)</h3>
<table>
  <tr>
    <th>Mutation</th>
    <th>Purpose</th>
  </tr>
  <tr>
    <td><code>useAddBookMutation</code></td>
    <td>Add a new book to the library database.</td>
  </tr>
  <tr>
    <td><code>useUpdateBookMutation</code></td>
    <td>Edit/update book details like title, author, copies, etc.</td>
  </tr>
  <tr>
    <td><code>useDeleteBookMutation</code></td>
    <td>Remove a book from the library.</td>
  </tr>
  <tr>
    <td><code>useBorrowBookMutation</code></td>
    <td>Borrow a book and update availability in real-time.</td>
  </tr>
</table>

---

<h2 style="color:#0EA5E9;">🗂️ Project Structure</h2>

<pre style="background:#f1f5f9; padding:10px; border-radius:8px;">
📦 src
 ┣ 📂 api
 ┃ ┗ 📜 apiSlice.ts
 ┣ 📂 components
 ┃ ┣ 📜 BookForm.tsx
 ┃ ┣ 📜 BookList.tsx
 ┃ ┣ 📜 BorrowBook.tsx
 ┃ ┗ 📜 BorrowSummary.tsx
 ┣ 📂 pages
 ┃ ┣ 📜 AddBookPage.tsx
 ┃ ┣ 📜 BookListPage.tsx
 ┃ ┣ 📜 BorrowBookPage.tsx
 ┃ ┗ 📜 BorrowSummaryPage.tsx
 ┣ 📜 App.tsx
 ┣ 📜 main.tsx
 ┗ 📜 index.css
</pre>

---

<h2 style="color:#0EA5E9;">⚙️ Setup & Installation</h2>

<pre style="background:#f1f5f9; padding:10px; border-radius:8px;">
# Clone the repo
git clone https://github.com/AB-Anam/Ass4-Library-frontend.git
cd Ass4-Library-frontend

# Install dependencies
npm install

# Create .env file in root
VITE_BACKEND_URL=https://ass3-library-management.vercel.app/api

# Run locally
npm run dev

# Build for production
npm run build
</pre>

---

<h2 style="color:#0EA5E9;">🚀 Live Demo</h2>

<p style="font-size:16px; color:#334155;">
Check the live application here: <a href="https://ass4-library-frontend.vercel.app/" target="_blank">https://ass4-library-frontend.vercel.app/</a>
</p>

---

<h2 style="color:#0EA5E9;">👨‍💻 Author</h2>

<p style="font-size:16px; color:#334155;">
<strong>AB-Anam</strong> <br/>
GitHub: <a href="https://github.com/AB-Anam" target="_blank">AB-Anam</a> <br/>
Project Repo: <a href="https://github.com/AB-Anam/Ass4-Library-frontend" target="_blank">Frontend</a>
</p>

---

<h2 style="color:#0EA5E9;">📢 Contribution</h2>

<p style="font-size:16px; color:#334155;">
This project is open for contributions. Feel free to fork the repo, open issues, or submit pull requests.  
Please ensure all code follows the existing architecture and styling conventions.
</p>

