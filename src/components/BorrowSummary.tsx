// src/components/BorrowSummary.tsx
import { useGetBorrowSummaryQuery } from '../api/apiSlice';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BookCopy, Barcode, AlertCircle, Loader2 } from "lucide-react";

// --- Type Definition for your summary data ---
type SummaryItem = {
  bookTitle: string;
  isbn: string;
  totalQuantityBorrowed: number;
};

// --- The Main Component ---
const BorrowSummary = () => {
  const { data: summary, isLoading, isError, error, refetch } = useGetBorrowSummaryQuery();
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  // --- Styled Loading State ---
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center bg-slate-950 min-h-screen text-slate-400">
        <Loader2 className="w-12 h-12 animate-spin text-cyan-500 mb-4" />
        <p className="text-lg font-medium">Loading Summary...</p>
      </div>
    );
  }

  // --- Styled Error State ---
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center bg-slate-950 min-h-screen text-slate-400 p-8">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-200 mb-2">Failed to Load Summary</h2>
        <p className="text-center max-w-md">There was an error fetching the data. Please try again later.</p>
        <pre className="mt-4 p-2 bg-slate-800 rounded-md text-xs text-red-400">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  // --- The Main Design ---
  return (

    <div className="relative rounded-xl bg-slate-950 min-h-screen p-8 font-sans text-slate-200 overflow-hidden">
      {/* Aurora Background Blobs */}
      <div className="absolute inset-0 z-0 opacity-70">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-sky-500/30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-100 flex justify-center items-center gap-4"
        >
          <BookCopy className="w-10 h-10 text-amber-400" />
          <span>Borrowed Book Summary</span>
        </motion.h2>

        <motion.div 
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.1 }}
          className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {summary?.map((item: SummaryItem) => (
            <BookCard key={item.isbn} item={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- The Interactive Book Card Sub-Component ---
const BookCard = ({ item }: { item: SummaryItem }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "40%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={{
        initial: { opacity: 0, scale: 0.9, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
      }}
      className="relative rounded-xl p-6 overflow-hidden group border border-slate-800 bg-slate-900/50 backdrop-blur-md"
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          // --- FIX IS HERE ---
          // The ([xVal, yVal]) parameters were removed as they were unused.
          background: useTransform(
            [mouseXSpring, mouseYSpring],
            () => `radial-gradient(
              350px circle at ${left.get()} ${top.get()},
              rgba(14, 165, 233, 0.3),
              transparent 80%
            )`
          ),
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-amber-400/10 p-2 rounded-lg mt-1 flex-shrink-0">
            <BookCopy className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-50 leading-tight">
            {item.bookTitle}
          </h3>
        </div>

        <p className="flex items-center gap-3 text-sm text-slate-400 font-mono mb-6">
          <Barcode className="w-5 h-5 text-cyan-400/70" />
          <span>{item.isbn}</span>
        </p>

        <div className="mt-auto">
          <p className="text-4xl font-bold text-slate-50">
            {item.totalQuantityBorrowed}
          </p>
          <p className="text-sm text-slate-400 mb-6">Total Copies Borrowed</p>

          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(item.totalQuantityBorrowed * 5, 100)}%` }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="h-full bg-gradient-to-r from-cyan-500 to-sky-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BorrowSummary;