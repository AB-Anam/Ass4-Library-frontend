// src/components/Footer.tsx
import { Library } from 'lucide-react';

const Footer = () => {
  return (

    <footer className="text-center py-6 text-slate-500 text-md">
      <div className="flex justify-center items-center gap-2">
        {/* The consistent amber icon ties it to the navbar's branding */}
        <Library size={26} className="text-amber-400/50 " />
        <p>© {new Date().getFullYear()}Minimal Library Management System. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;