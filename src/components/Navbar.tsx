// src/components/Navbar.tsx
import { motion } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';
import {
   Book, PlusCircle, ClipboardList } from 'lucide-react';

const Navbar = () => {
  const navLinkClasses = "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200";
  
  const getNavLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${navLinkClasses} bg-cyan-500/10 text-cyan-300`
      : `${navLinkClasses} text-slate-300 hover:bg-slate-700/50 hover:text-slate-100`;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
      // This is now a self-contained glass panel
      className="bg-slate-900/30 backdrop-blur-sm rounded-2xl p-4 border border-slate-800"
    >
      <div className="flex justify-between items-center">
        {/* Branding / Logo Section */}
        <Link to="/books" className="flex items-center gap-3">
          <span className="hidden sm:block text-2xl font-bold text-slate-50">
           🌿 Evergreen Library Management 
          </span>
        </Link>
        
        {/* Navigation Links Section */}
        <div className="flex items-center space-x-2">
          <NavLink to="/books" className={getNavLinkStyle} end>
            <Book size={16} />
            <span className="hidden md:inline">All Books</span>
          </NavLink>
          <NavLink to="/create-book" className={getNavLinkStyle}>
            <PlusCircle size={16} />
            <span className="hidden md:inline">Add Book</span>
          </NavLink>
          <NavLink to="/borrow-summary" className={getNavLinkStyle}>
            <ClipboardList size={16} />
            <span className="hidden md:inline">Summary</span>
          </NavLink>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;