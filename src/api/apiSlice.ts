// src/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// --- TYPE DEFINITIONS ---

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// The raw book object from the backend has `_id`
interface BackendBook {
  _id: string; 
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
  description?: string;
}

// The Book interface our frontend uses will always have `id`
export interface Book extends Omit<BackendBook, '_id'> {
  id: string;
}

export type NewBook = Omit<Book, 'id' | 'available'>;

export interface BorrowRequest {
  quantity: number;
  dueDate: string;
}

export interface BorrowSummary {
    bookTitle: string;
    isbn: string;
    totalQuantityBorrowed: number;
}

interface BackendBorrowSummary {
    book: {
        title: string;
        isbn: string;
    };
    totalQuantity: number;
}

// --- API SLICE DEFINITION ---

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Book', 'Borrow'],
  endpoints: (builder) => ({

    getBooks: builder.query<Book[], void>({
      query: () => '/api/books',
      transformResponse: (response: ApiResponse<BackendBook[]>) =>
        response.data.map(({ _id, ...rest }) => ({ id: _id, ...rest })),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Book' as const, id })), { type: 'Book', id: 'LIST' }]
          : [{ type: 'Book', id: 'LIST' }],
    }),

    getBook: builder.query<Book, string>({
      query: (id) => `/api/books/${id}`,
      transformResponse: (response: ApiResponse<BackendBook>) => {
        const { _id, ...rest } = response.data;
        return { id: _id, ...rest };
      },
      providesTags: (_result, _error, id) => [{ type: 'Book', id }],
    }),

    

    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => '/api/borrow',
      transformResponse: (response: ApiResponse<BackendBorrowSummary[]>) =>
        response.data.map(item => ({
          bookTitle: item.book.title,
          isbn: item.book.isbn,
          totalQuantityBorrowed: item.totalQuantity
        })),
      providesTags: [{ type: 'Borrow', id: 'SUMMARY' }],
    }),

    addBook: builder.mutation<Book, NewBook>({
      query: (book) => ({
        url: '/api/books',
        method: 'POST',
        body: book,
      }),
      transformResponse: (response: ApiResponse<BackendBook>) => {
        const { _id, ...rest } = response.data;
        return { id: _id, ...rest };
      },
      invalidatesTags: [{ type: 'Book', id: 'LIST' }],
    }),

    // --- Updated updateBook mutation ---
    updateBook: builder.mutation<Book, Omit<Book, 'available'> & { id: string }>({
      query: ({ id, ...bookData }) => ({
        url: `/api/books/${id}`,
        method: 'PUT', // full update
        body: bookData,
      }),
      transformResponse: (response: ApiResponse<BackendBook>) => {
        const { _id, ...rest } = response.data;
        return { id: _id, ...rest };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Book', id }, { type: 'Book', id: 'LIST' }],
    }),

    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Book', id }, { type: 'Book', id: 'LIST' }],
    }),

borrowBook: builder.mutation<void, { bookId: string; quantity: number; dueDate: string }>({
  query: ({ bookId, quantity, dueDate }) => ({
    url: `/api/borrow`,   
    method: 'POST',
    body: {
      book: bookId,     
      quantity,
      dueDate,
    },
  }),
  invalidatesTags: (_result, _error, { bookId }) => [
    { type: 'Book', id: 'LIST' },
    { type: 'Book', id: bookId },
    { type: 'Borrow', id: 'SUMMARY' },
  ],
}),

  }),
});

// Export the auto-generated hooks
export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = apiSlice;
