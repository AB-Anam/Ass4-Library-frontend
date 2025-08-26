// src/components/ConfirmationModal.tsx
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText?: string;
  isLoading?: boolean;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText = 'Confirm',
  isLoading = false,
}: ConfirmationModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          {/* The backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            
            {/* --- THE FIX IS HERE --- */}
            {/* 1. This is a standard Dialog.Panel. It handles structure and accessibility. */}
            {/*    It no longer has any animation props, avoiding the conflict. */}
            <Dialog.Panel className="relative w-full max-w-md bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-slate-700 shadow-2xl shadow-red-500/10">
              
              {/* 2. The motion.div is now INSIDE the Dialog.Panel. */}
              {/*    It handles all the animations for the content. */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-red-500/10 p-2 rounded-full mt-1">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-grow">
                    <Dialog.Title className="text-xl font-bold text-slate-50">
                      {title}
                    </Dialog.Title>
                    <p className="mt-2 text-sm text-slate-300">
                      {message}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="px-6 py-2 font-semibold rounded-lg text-slate-300 bg-slate-700/50 hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-6 py-2 font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/20 disabled:opacity-50 transition-colors"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      confirmButtonText
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;