// src/pages/EditBook.tsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import BookForm from "../components/BookForm";
import type { BookFormValues } from "../components/BookForm";
import { useGetBookQuery, useUpdateBookMutation } from "../api/apiSlice";
import { Loader2, AlertCircle } from 'lucide-react';
import { showToast } from '../components/CustomToast'; // Use our custom toast

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: book, isLoading: isFetching, isError } = useGetBookQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const form = useForm<BookFormValues>();

  useEffect(() => {
    if (book) {
      form.reset({
        title: book.title,
        author: book.author,
        genre: (book.genre as BookFormValues["genre"]) || "FICTION",
        isbn: book.isbn,
        copies: book.copies,
        description: book.description || "",
      });
    }
  }, [book, form]);

  const handleEditBook = async (data: BookFormValues) => {
    if (!book) return;
    try {
      await updateBook({ id: book.id, ...data }).unwrap();

      // Use our custom success toast
      showToast("success", "Book Updated!", "The changes have been saved successfully.");
      
      // Delay navigation to allow the user to see the toast
      setTimeout(() => {
        navigate("/books");
      }, 2000);

    } catch (err: any) {
      console.error("Failed to update book:", err);
      // Use our custom error toast
      showToast("error", "Update Failed", err?.data?.message || "Please try again.");
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center bg-slate-950 min-h-screen text-slate-400">
        <Loader2 className="w-12 h-12 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (isError || !id) {
    return (
      <div className="flex flex-col items-center justify-center bg-slate-950 min-h-screen text-slate-400 p-8">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-200">Failed to Load Book</h2>
        <p>We couldn't find the book you are trying to edit.</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl bg-slate-950 min-h-screen p-4 md:p-8 font-sans text-slate-200 overflow-hidden flex items-center justify-center">
      
      <div className="absolute inset-0 z-0 opacity-70">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg bg-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-800">
        <BookForm
          onSubmit={handleEditBook}
          isLoading={isUpdating}
          buttonLabel="Save Changes"
          formInstance={form}
        />
      </div>
    </div>
  );
};

export default EditBook;