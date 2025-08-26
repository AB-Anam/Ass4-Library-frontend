// src/components/BookForm.tsx
import { useForm, type SubmitHandler, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from 'framer-motion';
import { Type, User, Barcode, Text, Hash, Library, Save, Loader2, BookPlus, Edit } from 'lucide-react';

// ... (Genres, Zod Schema, Type, and Props interfaces remain exactly the same)
const genres = ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"] as const;

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.enum(genres),
  isbn: z.string().min(1, "ISBN is required"),
  description: z.string().optional(),
  copies: z.coerce.number({ invalid_type_error: "Copies must be a number" }).min(0, "Copies cannot be negative"),
});

export type BookFormValues = z.infer<typeof bookSchema>;

interface BookFormProps {
  defaultValues?: Partial<BookFormValues>;
  onSubmit: SubmitHandler<BookFormValues>;
  isLoading?: boolean;
  buttonLabel?: string;
  formInstance?: UseFormReturn<BookFormValues>;
}

const BookForm = ({
  defaultValues,
  onSubmit,
  isLoading,
  buttonLabel = "Submit",
  formInstance,
}: BookFormProps) => {
  const form = formInstance ?? useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 1,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="flex items-center justify-center gap-3 text-3xl font-bold text-slate-50 tracking-tight">
          {buttonLabel?.includes("Save") ? (
            <Edit className="w-8 h-8 text-amber-400" strokeWidth={2.5} />
          ) : (
            <BookPlus className="w-8 h-8 text-amber-400" strokeWidth={2.5} />
          )}
          <span>
            {buttonLabel?.includes("Save") ? "Edit Book Details" : "Add New Book"}
          </span>
        </h1>

        {/* --- THE FIX IS HERE --- */}
        {/* Changed text-slate-400 to text-amber-400 */}
        <p className="text-amber-400 mt-2">
          {buttonLabel?.includes("Save") ? "Update the book information below" : "Add a new book to the library"}
        </p>
      </div>

      {/* The rest of the form remains exactly the same */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        className="space-y-6"
      >
        {/* Title */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <label className="block text-slate-300 font-semibold mb-2">Title</label>
          <div className="relative">
            <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
            <input {...form.register("title")} className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-slate-50" placeholder="Enter book title" />
          </div>
        </motion.div>
        
        {/* Author */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <label className="block text-slate-300 font-semibold mb-2">Author</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
            <input {...form.register("author")} className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-slate-50" placeholder="Enter author name" />
          </div>
        </motion.div>

        {/* Genre */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <label className="block text-slate-300 font-semibold mb-2">Genre</label>
          <div className="relative">
            <Library className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
            <select {...form.register("genre")} className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all appearance-none text-slate-50">
              {genres.map((g) => (<option key={g} value={g}>{g}</option>))}
            </select>
          </div>
        </motion.div>

        {/* ISBN */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <label className="block text-slate-300 font-semibold mb-2">ISBN</label>
          <div className="relative">
            <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
            <input {...form.register("isbn")} className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-slate-50" placeholder="Enter ISBN number" />
          </div>
        </motion.div>
        
        {/* Description */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <label className="block text-slate-300 font-semibold mb-2">Description</label>
          <div className="relative">
            <Text className="absolute left-3 top-3.5 w-5 h-5 text-slate-500 pointer-events-none" />
            <textarea {...form.register("description")} className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none text-slate-50" placeholder="Enter a short description" rows={4} />
          </div>
        </motion.div>

        {/* Copies */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <label className="block text-slate-300 font-semibold mb-2">Copies</label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
            <input type="number" {...form.register("copies")} className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-slate-50" placeholder="Number of copies" />
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="pt-6">
          <motion.button type="submit" disabled={isLoading} whileHover={{ scale: isLoading ? 1 : 1.05 }} whileTap={{ scale: isLoading ? 1 : 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className="w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-xl text-white bg-gradient-to-r from-cyan-500 to-sky-600 shadow-lg shadow-cyan-500/20 hover:from-cyan-600 hover:to-sky-700 disabled:opacity-50 transition-all">
            {isLoading ? (
              <> <Loader2 className="w-5 h-5 animate-spin" /> Saving... </>
            ) : (
              <> {buttonLabel} <Save className="w-5 h-5" /> </>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </form>
  );
};

export default BookForm;