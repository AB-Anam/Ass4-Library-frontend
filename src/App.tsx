import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookListPage from './pages/BookListPage';
import AddBookPage from './pages/AddBookPage';
import EditBookPage from './pages/EditBookpage';
import BorrowBookPage from './pages/BorrowBookPage';
import BorrowSummaryPage from './pages/BorrowSummaryPage';
import { ToastContainer } from "react-toastify";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
<div className="relative bg-slate-950 min-h-screen font-sans text-slate-200 overflow-hidden">

        {/* The Aurora background that will appear on EVERY page */}
        <div className="absolute inset-0 z-0 opacity-70">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        {/* Your original flex layout, now inside the background container */}
        <div className="relative z-10 flex flex-col min-h-screen container mx-auto px-4 py-8">
          <Navbar />
          <main className="flex-grow py-8">
            <Toaster position="bottom-right" />
            <Routes>
              {/* Note: The default route now uses 'index' for best practice */}
              <Route index element={<BookListPage />} />
              <Route path="/books" element={<BookListPage />} />
              <Route path="/create-book" element={<AddBookPage />} />
              <Route path="/edit-book/:id" element={<EditBookPage />} />
              <Route path="/borrow/:bookId" element={<BorrowBookPage />} />
              <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
      {/* Toast container should be here */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </Router>
  );
}

export default App;