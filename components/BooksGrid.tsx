import React from "react";

type Book = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
};

type BooksGridProps = {
  books: Book[];
};

const BooksGrid: React.FC<BooksGridProps> = ({ books }) => {
  return (
    <div className="grid-container">
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book.id} className="book-card">
            <h2 className="book-title">{book.volumeInfo.title}</h2>
            <p className="book-author">
              {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author"}
            </p>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.png"}
              alt={book.volumeInfo.title || "Book Cover"}
              className="book-image"
            />
          </div>
        ))
      ) : (
        <p>No books found</p>
      )}
    </div>
  );
};

export default BooksGrid;
