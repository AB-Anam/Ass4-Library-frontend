// src/components/BorrowBook.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBorrowBookMutation, useGetBookQuery } from '../api/apiSlice';
import { motion } from 'framer-motion';
import { Calendar, Hash, Loader2, Send, AlertCircle, BookUp } from 'lucide-react'; // Icon added here
import { showToast } from './CustomToast';

interface BorrowBookProps {
  bookId: string;
}

const BorrowBook: React.FC<BorrowBookProps> = ({ bookId }) => {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const { data: book, isLoading: isFetching, isError } = useGetBookQuery(bookId);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
    setDueDate(twoWeeksFromNow.toISOString().split('T')[0]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;
    if (quantity < 1 || quantity > book.copies) {
      showToast('error', 'Invalid Quantity', 'Please enter a value between 1 and available copies.');
      return;
    }
    try {
      await borrowBook({ bookId, quantity, dueDate }).unwrap();
      showToast('success', 'Borrow Successful!', 'You will be redirected shortly.');
      setTimeout(() => {
        navigate('/borrow-summary');
      }, 2000);
    } catch (err: any) {
      console.error('Failed to borrow book:', err);
      showToast('error', 'Borrowing Failed', err?.data?.message || 'Could not process your request.');
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center bg-slate-950 min-h-screen text-slate-400">
        <Loader2 className="w-12 h-12 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!book || isError) {
    return (
      <div className="flex flex-col items-center justify-center bg-slate-950 min-h-screen text-slate-400 p-8">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-200">Book Not Found</h2>
        <p>We couldn't find the book you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="relative bg-slate-950 min-h-screen p-4 md:p-8 font-sans text-slate-200 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 opacity-70">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg bg-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-800"
      >
        <form onSubmit={handleSubmit}>
          
          {/* --- THE FIX IS HERE --- */}
          {/* The heading has been updated to include a contextual icon, just like the other forms */}
          <div className="text-center mb-8">
            <h2 className="flex items-center justify-center gap-3 text-3xl font-bold text-slate-50">
              <BookUp className="w-8 h-8 text-amber-400" strokeWidth={2.5} />
              <span>Borrow Book</span>
            </h2>
            <p className="mt-2 text-amber-400">{book.title}</p>
          </div>

          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-6">
              <label className="block text-slate-300 font-semibold mb-2">Quantity</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  max={book.copies}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                  className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-slate-50"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-right text-slate-400">Available copies: <span className='text-cyan-400 font-semibold'>{book.copies}</span></p>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-8">
              <label className="block text-slate-300 font-semibold mb-2">Due Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-slate-50 [color-scheme:dark]"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <motion.button
                type="submit"
                disabled={isBorrowing || book.copies < 1}
                whileHover={{ scale: (isBorrowing || book.copies < 1) ? 1 : 1.05 }}
                whileTap={{ scale: (isBorrowing || book.copies < 1) ? 1 : 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-xl text-white bg-gradient-to-r from-cyan-500 to-sky-600 shadow-lg shadow-cyan-500/20 hover:from-cyan-600 hover:to-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isBorrowing ? (
                  <> <Loader2 className="w-5 h-5 animate-spin" /> Processing... </>
                ) : (
                  <> Borrow Book <Send className="w-5 h-5" /> </>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default BorrowBook;