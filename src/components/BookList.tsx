// src/components/BookList.tsx
import React, { useState } from 'react'; // Add useState
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useGetBooksQuery, useDeleteBookMutation } from '../api/apiSlice';
import { showToast } from './CustomToast';
import { Loader2, AlertCircle, Edit, Trash2, BookUp, PlusCircle, Library } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal'; // Import our new modal

// --- Type Definition for a single book ---
type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  copies: number;
};

const BookList: React.FC = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  // --- ADD THIS STATE ---
  // State to control the modal's visibility and which book is targeted
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  // --- MODIFY THIS FUNCTION ---
  // This function now just opens the modal
  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Give a moment for the animation to finish before clearing the book
    setTimeout(() => setBookToDelete(null), 300);
  };

  // --- ADD THIS FUNCTION ---
  // This function runs when the user confirms deletion in the modal
  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;

    try {
      await deleteBook(bookToDelete.id).unwrap();
      showToast('success', 'Book Deleted', `"${bookToDelete.title}" has been removed from the library.`);
    } catch (err) {
      console.error('Failed to delete the book: ', err);
      showToast('error', 'Deletion Failed', 'The book could not be deleted.');
    } finally {
      handleCloseModal(); // Close the modal on success or error
    }
  };

  return (
    <div className="relative bg-slate-950 min-h-screen p-4 md:p-8 font-sans text-slate-200 overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-70">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-7xl mx-auto bg-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-800"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 text-3xl md:text-4xl font-bold text-slate-100"
          >
            <Library className="w-9 h-9 text-amber-400" strokeWidth={2.5} />
            <span>Library Catalog</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/create-book">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 md:mt-0 flex items-center justify-center gap-2 py-3 px-6 font-semibold rounded-xl text-white bg-gradient-to-r from-cyan-500 to-sky-600 shadow-lg shadow-cyan-500/20 hover:from-cyan-600 hover:to-sky-700 transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                Add New Book
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-12 h-12 animate-spin text-cyan-500" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center h-64 text-red-400">
              <AlertCircle className="w-12 h-12 mb-4" />
              <p className="text-xl font-semibold">Failed to load books.</p>
            </div>
          ) : (
            <table className="min-w-full text-left">
              <thead className="border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4 uppercase font-semibold text-sm text-slate-400">Title</th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm text-slate-400">Author</th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm text-slate-400">Genre</th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm text-slate-400 text-center">Copies</th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm text-slate-400">Status</th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <motion.tbody
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
              >
                {books?.map((book: Book) => (
                  <motion.tr
                    key={book.id}
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                    className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-slate-50">{book.title}</td>
                    <td className="py-3 px-4 text-slate-300">{book.author}</td>
                    <td className="py-3 px-4 text-slate-300">{book.genre}</td>
                    <td className="py-3 px-4 text-slate-300 text-center">{book.copies}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${book.copies > 0 ? 'bg-cyan-500/10 text-cyan-300' : 'bg-amber-500/10 text-amber-300'}`}>
                        {book.copies > 0 ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Link to={`/edit-book/${book.id}`}>
                          <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-700/50 hover:bg-slate-700 text-amber-300 hover:text-amber-200 transition-colors">
                            <Edit size={14} />
                            Edit
                          </motion.button>
                        </Link>
                        <motion.button
                          // --- MODIFY THIS onClick ---
                          onClick={() => handleDeleteClick(book)}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-700/50 hover:bg-slate-700 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={14} />
                          Delete
                        </motion.button>
                        <Link to={`/borrow/${book.id}`}>
                           <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-700/50 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 transition-colors">
                            <BookUp size={14} />
                            Borrow
                          </motion.button>
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          )}
        </div>
      </motion.div>

      {/* --- ADD THIS AT THE END --- */}
      {/* This renders our beautiful modal when it's open */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete Book"
        message={`Are you sure you want to permanently delete "${bookToDelete?.title}"? This action cannot be undone.`}
        confirmButtonText="Delete"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default BookList;