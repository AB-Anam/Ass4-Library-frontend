// src/pages/AddBook.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm"; // Correct path to your reusable form
import type { BookFormValues } from "../components/BookForm"; // Correct path
import { useAddBookMutation } from "../api/apiSlice";
import { showToast } from "../components/CustomToast"; // Correct path
import { motion } from 'framer-motion'; // Make sure this is imported

const AddBookPage: React.FC = () => { // Renamed to AddBookPage for clarity
  const navigate = useNavigate();
  const [addBook, { isLoading }] = useAddBookMutation();

  const handleAddBook = async (data: BookFormValues) => {
    try {
      await addBook(data).unwrap();

      // Use our consistent, custom success toast
      showToast(
        'success',
        'Book Added!',
        'The new book is now available in the library.'
      );

      // Delay navigation to allow the user to see the beautiful toast
      setTimeout(() => {
        navigate("/books"); // Navigate to the main book list
      }, 2000);

    } catch (err: any) {
      // Use our consistent, custom error toast
      showToast(
        'error',
        'Failed to Add Book',
        err.data?.message || 'An unexpected error occurred.'
      );
    }
  };

  return (
    // This is the main page container, IDENTICAL to BorrowBook.tsx and EditBook.tsx
    <div className="relative bg-slate-950 min-h-screen p-4 md:p-8 font-sans text-slate-200 overflow-hidden flex items-center justify-center">
      
      {/* The IDENTICAL Aurora background */}
      <div className="absolute inset-0 z-0 opacity-70">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* The IDENTICAL single, large, rounded "glass" container with the correct width */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg bg-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-800"
      >
        {/* The reusable BookForm component is rendered inside our perfect container */}
        <BookForm 
          onSubmit={handleAddBook} 
          isLoading={isLoading} 
          buttonLabel="Add Book to Library" 
        />
      </motion.div>
    </div>
  );
};

export default AddBookPage; // Export with the new name