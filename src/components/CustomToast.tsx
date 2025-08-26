// src/components/CustomToast.tsx
import { toast, type Toast } from 'react-hot-toast'; 
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, X } from 'lucide-react';
import { Toaster } from "react-hot-toast";

// Define the types of toasts we can show
type ToastType = 'success' | 'error';

interface ToastProps {
  t: Toast; // The toast object from react-hot-toast
  type: ToastType;
  title: string;
  message: string;
}

// Configuration for different toast types
const toastConfig = {
  success: {
    icon: CheckCircle,
    iconColor: 'text-cyan-400',
    bgColor: 'bg-cyan-500',
    shadowColor: 'shadow-cyan-500/20',
  },
  error: {
    icon: AlertTriangle,
    iconColor: 'text-red-400',
    bgColor: 'bg-red-500',
    shadowColor: 'shadow-red-500/20',
  },
};



// The custom toast component that react-hot-toast will render
const CustomToast = ({ t, type, title, message }: ToastProps) => {
  const { icon: Icon, iconColor, bgColor, shadowColor } = toastConfig[type];


  return (
<motion.div
      initial={{ opacity: 0, y: 0, scale: 0.7 }} // start smaller in the middle
      animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : 0, scale: t.visible ? 1 : 0.7 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className={`relative w-full max-w-md bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-slate-700 shadow-2xl ${shadowColor}`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`flex-shrink-0 ${iconColor}`}>
          <Icon className="w-8 h-8" />
        </div>
        
        {/* Text Content */}
        <div className="flex-grow">
          <h3 className="font-bold text-slate-50 text-lg md:text-xl">{title}</h3>
          <p className="text-sm md:text-base text-amber-400">{message}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => toast.dismiss(t.id)}
          className="p-1 rounded-full text-slate-400 hover:bg-slate-700/50 transition-colors flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Animated Progress Bar */}
      {t.duration && t.duration > 0 && (
         <motion.div
            className={`absolute bottom-0 left-0 h-1 ${bgColor}`}
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: t.duration / 1000, ease: 'linear' }}
        />
      )}
    </motion.div>
  );
};


const ToastContainer = () => {
  return (
    <Toaster
      containerStyle={{
        top: "70%",
        right: 10,
        transform: "translateY(-80%)",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    />
  );
};




// --- The function called from the components ---
export const showToast = (
  type: ToastType,
  title: string,
  message: string,
  duration: number = 4000
) => {
  toast.custom(
    (t) => (
      <CustomToast t={t} type={type} title={title} message={message} />
    ),
    { duration }
  );
};

export default ToastContainer;