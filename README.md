# Minimal Library Management System 📚

<p align="center">
  <img src="https://media.giphy.com/media/l2JehQ2GitHGdVG9y/giphy.gif" alt="Library Animation" width="700"/>
</p>

## Project Overview

The **Minimal Library Management System** is a full-featured frontend application built with **React**, **TypeScript**, **Redux Toolkit + RTK Query**, and **TailwindCSS**, consuming a **Node.js + Express + MongoDB** backend.  

This system allows users to:
- View a list of books  
- Add, edit, delete books  
- Borrow books  
- See an aggregated borrow summary  

All pages are **public**, and the focus is on core library management functionality without authentication, payment, or categories.  

**Live Demo:** [https://ass4-library-frontend.vercel.app/](https://ass4-library-frontend.vercel.app/)

---

## Features 🚀

### 1. Public Routes
- Accessible without login.
- Focused on essential library operations.

### 2. Book Management 🛠️
**Book List Table / Grid**
- Columns: Title, Author, Genre, ISBN, Copies, Availability, Actions.
- Action buttons/icons:  
  - **Edit:** Edit existing books via a modal or page form.
  - **Delete:** Confirm before removing a book.
  - **Borrow:** Opens borrowing form, ensuring copies are available.
- **Availability Logic:** Automatically mark books as unavailable when copies = 0.

**Add New Book**
- Fields: Title, Author, Genre, ISBN, Description, Copies, Available (defaults to true).  
- Submit updates list instantly.

---

### 3. Borrow Book
- Form fields: Quantity, Due Date.
- **Logic:** Cannot borrow more than available copies.
- Updates backend and shows success notification.
- Redirects to **Borrow Summary** page.

---

### 4. Borrow Summary 📊
- Aggregated list of borrowed books.
- Columns: Book Title, ISBN, Total Quantity Borrowed.
- Data fetched via aggregation API in RTK Query.

---

## Pages & Routes 🗂️

| Route                  | Description                                      |
|------------------------|--------------------------------------------------|
| `/books`               | List of all books with actions (view, edit, delete, borrow) |
| `/create-book`         | Form to add a new book                            |
| `/books/:id`           | Detailed book view                               |
| `/edit-book/:id`       | Edit book form                                   |
| `/borrow/:bookId`      | Borrow form for a selected book                  |
| `/borrow-summary`      | Aggregated summary of borrowed books            |

---

## RTK Query Mutations & Queries ⚡

### Book Queries
- `useGetBooksQuery()` – Fetch all books.
- `useGetBookQuery(id)` – Fetch single book details.

### Book Mutations
- `useAddBookMutation()` – Add a new book.
- `useUpdateBookMutation()` – Update book details.
- `useDeleteBookMutation()` – Delete a book.

### Borrow Queries
- `useGetBorrowSummaryQuery()` – Fetch aggregated borrow summary.

### Borrow Mutations
- `useBorrowBookMutation()` – Borrow a book and update availability.

**Behavior:**  
All mutations automatically update the RTK Query cache, ensuring UI reflects changes instantly.

---

## Backend Requirements (MVC / Modular Pattern)

- **Database:** MongoDB with Mongoose  
  Collections:  
  - **Books:** title, author, genre, isbn, description, copies, available  
  - **Borrows:** book reference, quantity, dueDate  
- **Book CRUD:** Create, Read, Update, Delete operations  
- **Borrow Management:** Borrow, return, and summary aggregation  
- **Error Handling:** Friendly messages for validation and API errors  
- **Pagination:** Supports book listing and borrow retrieval  
- **Authentication Middleware:** Optional for private routes  

---

## API Endpoints & Sample Responses 📝

### Books Endpoints

| Method | Endpoint       | Description              | Sample Response |
|--------|----------------|--------------------------|----------------|
| GET    | `/api/books`   | Fetch all books          | ```json { "success": true, "message": "Books retrieved successfully", "data": [ { "_id": "6865aae45ca7ea02a7bf2904", "title": "The Theory of Everything", "author": "Stephen Hawking", "genre": "SCIENCE", "isbn": "9780553380163", "description": "An overview of cosmology and black holes.", "copies": 4, "available": true, "createdAt": "2025-07-02T21:55:48.361Z", "updatedAt": "2025-08-26T19:49:58.504Z" } ] }``` |
| POST   | `/api/books`   | Add a new book           | ```json { "success": true, "message": "Book created successfully", "data": { "_id": "newid", "title": "New Book", ... } }``` |
| GET    | `/api/books/:id` | Fetch single book       | ```json { "success": true, "data": { "_id": "id", "title": "Book Title", ... } }``` |
| PUT    | `/api/books/:id` | Update book details     | ```json { "success": true, "message": "Book updated successfully", "data": { ... } }``` |
| DELETE | `/api/books/:id` | Delete book             | ```json { "success": true, "message": "Book deleted successfully" }``` |

### Borrow Endpoints

| Method | Endpoint              | Description              | Sample Response |
|--------|-----------------------|--------------------------|----------------|
| POST   | `/api/borrows`        | Borrow a book           | ```json { "success": true, "message": "Book borrowed successfully", "data": { "book": "bookId", "quantity": 2, "dueDate": "2025-09-01" } }``` |
| GET    | `/api/borrows/summary` | Borrow summary          | ```json { "success": true, "message": "Books retrieved successfully", "data": [ { "bookTitle": "The Theory of Everything", "isbn": "9780553380163", "totalQuantityBorrowed": 3 } ] }``` |

---

## Frontend + API Integration

- **React + TypeScript** for robust UI development
- **Redux Toolkit + RTK Query** for state and API management  
- **API Calls:** Typed and organized with caching, invalidation, and automatic refetching
- **UI State:** Optional slices for modals or forms
- **Notifications:** React Hot Toast for success/error feedback
- **Animations:** Framer Motion for hover, cards, and toast animations

---

## Technology Stack

| Layer             | Technology                        |
|------------------|-----------------------------------|
| Frontend          | React + TypeScript                |
| State Management  | Redux Toolkit + RTK Query          |
| Backend           | Node.js + Express.js               |
| Database          | MongoDB + Mongoose                |
| Styling           | TailwindCSS                       |

<p align="center">
  <img src="https://img.shields.io/badge/React-%2361DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux-%23764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/RTK%20Query-%23008CFF?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-%236646FF?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/TailwindCSS-%2338B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-%23339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-%23404d59?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-%2347A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

---

## Setup & Installation

```bash
# Clone the repository
git clone https://github.com/AB-Anam/Ass4-Library-frontend.git
cd Ass4-Library-frontend

# Install dependencies
npm install

# Create a .env in root
VITE_BACKEND_URL=https://ass3-library-management.vercel.app/api

# Run development server
npm run dev

# Build production version
npm run build

Deployment

Frontend deployed via Vercel: https://ass4-library-frontend.vercel.app/

Backend can be deployed via Heroku / Render / Vercel Serverless Functions

Ensure environment variables are correctly set for production.

UI/UX Highlights ✨

Minimalist & Clean Design: Focus on functionality and readability

Responsive Layout: Works seamlessly across mobile, tablet, desktop

Hover & Card Animations: Framer Motion for interactive feel

Toasts: React Hot Toast with custom styling

Shimmer & Gradient Effects: Subtle visual enhancements on cards

Contribution

Contributions are welcome!

Fork the repository

Create a new branch for features/fixes

Submit a Pull Request

Follow existing coding style, component structure, and state management patterns.

Acknowledgements

React

Redux Toolkit

RTK Query

TailwindCSS
