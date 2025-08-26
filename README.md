<!-- Animated Header -->
<p align="center">
  <img src="https://your-gif-url.com/library-typing.gif" alt="Library Catalog Typing Animation" width="700"/>
</p>

<h2 align="center" style="color:#0EA5E9; font-size: 24px;">📚 Welcome to John's Library Catalog</h2>

<p align="center" style="font-size:16px; color:#475569;">
A modern, fully responsive Library Management System Frontend built with <strong>React, Redux Toolkit, RTK Query</strong>, and <strong>TailwindCSS</strong>.  
It seamlessly interacts with a backend API to manage books, borrows, and summaries in real-time with an intuitive UI.
</p>

---

<h2 style="color:#0EA5E9;">🎯 Project Overview</h2>

<p style="font-size:16px; color:#334155;">
John's Library Catalog is designed to provide a **complete library management solution**.  
It allows librarians and users to manage books, track borrowed copies, and maintain summaries in a visually interactive dashboard.  
The frontend consumes backend APIs via **RTK Query** for efficient data fetching, caching, and state management.  
The system ensures real-time updates, user-friendly notifications, and responsive design across all devices.
</p>

---

<h2 style="color:#0EA5E9;">🛠 Backend Requirements & Features</h2>

<p style="font-size:16px; color:#334155;">
The backend follows a **modular MVC pattern** for better structure, maintainability, and scalability.
</p>

<ul style="font-size:16px; color:#334155;">
  <li>🗄 <strong>Database:</strong> MongoDB with collections:
    <ul>
      <li><strong>Books:</strong> title, author, genre, isbn, description, copies, available</li>
      <li><strong>Borrows:</strong> linked to book, quantity, dueDate, etc.</li>
    </ul>
  </li>
  <li>📚 <strong>Book Management:</strong> Full CRUD operations (Create, Read, Update, Delete).</li>
  <li>📖 <strong>Borrow Management:</strong> Borrow, return, and summary of books. Copies levels are checked before borrowing.</li>
  <li>⚠ <strong>Error Handling:</strong> Consistent, user-friendly error messages for frontend display.</li>
  <li>📄 <strong>Pagination:</strong> Backend supports paginated book listings and borrow records.</li>
  <li>🔒 <strong>Authentication Middleware:</strong> Protect private routes if needed.</li>
</ul>

<p style="font-size:16px; color:#334155;">
You can use an existing backend or modify a previous version to support these requirements.
</p>

---

<h2 style="color:#0EA5E9;">💻 Frontend & API Integration</h2>

<p style="font-size:16px; color:#334155;">
The frontend integrates seamlessly with backend APIs using **RTK Query**, enabling typed, organized, and efficient API calls.  
All state and data related to books and borrows are managed via **Redux Toolkit + RTK Query**, ensuring reactivity and performance.
</p>

<h3 style="color:#0EA5E9;">✅ Queries (Read Operations)</h3>
<ul style="font-size:16px; color:#334155;">
  <li><code>useGetBooksQuery</code> - Fetch all books with optional pagination.</li>
  <li><code>useGetBorrowSummaryQuery</code> - Get a live summary of borrowed books.</li>
</ul>

<h3 style="color:#0EA5E9;">✅ Mutations (Write Operations)</h3>
<table>
  <tr>
    <th>Mutation</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>useAddBookMutation</code></td>
    <td>Add a new book to the library.</td>
  </tr>
  <tr>
    <td><code>useUpdateBookMutation</code></td>
    <td>Edit book details like title, author, copies, genre, description.</td>
  </tr>
  <tr>
    <td><code>useDeleteBookMutation</code></td>
    <td>Delete a book from the library database.</td>
  </tr>
  <tr>
    <td><code>useBorrowBookMutation</code></td>
    <td>Borrow a book and update availability in real-time.</td>
  </tr>
</table>

---

<h2 style="color:#0EA5E9;">✨ Features & Highlights</h2>

<ul style="font-size:16px; color:#334155;">
  <li>📖 Browse all books with detailed information.</li>
  <li>➕ Add new books to the library database.</li>
  <li>✏️ Edit existing books quickly and efficiently.</li>
  <li>🗑 Delete books from the library database.</li>
  <li>📚 Borrow books with availability checks.</li>
  <li>📊 Borrowed Book Summary with live data.</li>
  <li>🔔 Custom Toast Notifications for all actions using <strong>React Hot Toast</strong>.</li>
  <li>🎨 Beautiful UI with <strong>TailwindCSS</strong> and subtle animations via <strong>Framer Motion</strong>.</li>
  <li>🌐 Fully responsive design: mobile, tablet, and desktop optimized.</li>
</ul>

---

<h2 style="color:#0EA5E9;">🗂 Project Structure</h2>

<pre style="background:#f1f5f9; padding:10px; border-radius:8px;">
📦 src
 ┣ 📂 api
 ┃ ┗ 📜 apiSlice.ts         # RTK Query API calls
 ┣ 📂 components
 ┃ ┣ 📜 BookForm.tsx        # Form for Add/Edit Book
 ┃ ┣ 📜 BookList.tsx        # List all books
 ┃ ┣ 📜 BorrowBook.tsx      # Borrow book component
 ┃ ┗ 📜 BorrowSummary.tsx   # Summary cards for borrowed books
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

# Run the development server
npm run dev

# Build for production
npm run build
</pre>

---

<h2 style="color:#0EA5E9;">🚀 Live Demo</h2>

<p style="font-size:16px; color:#334155;">
Check out the live application here: <a href="https://ass4-library-frontend.vercel.app/" target="_blank">https://ass4-library-frontend.vercel.app/</a>
</p>

---

<h2 style="color:#0EA5E9;">💻 Tech Stack</h2>

<p align="center">
  <img src="https://img.shields.io/badge/React-%2361DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux-%23764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/RTK%20Query-%23008CFF?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-%236646FF?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/TailwindCSS-%2338B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-%23F5A623?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-%23339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-%23404d59?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-%2347A248?style=for-the-badge&logo=mongodb&logoColor=white" />
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
Contributions are welcome! Fork the repository, create a branch, and submit a pull request.  
Ensure all code follows the existing structure, styling, and architecture conventions.
</p>
