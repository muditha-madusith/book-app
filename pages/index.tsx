import React, { useEffect, useState } from "react";
import BooksGrid from "../components/BooksGrid";

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

const fetchBooks = async (page: number): Promise<Book[]> => {
  const startIndex = (page - 1) * 10;
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=devops=free-ebooks&startIndex=${startIndex}&maxResults=12&key=AIzaSyD1rS30pQ3_2H7TOOiIYGgq_cuhh7OPUFc`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      const data = await fetchBooks(page);
      setBooks(data);
      setLoading(false);
    };
    getBooks();
  }, [page]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <h1 className="page-title">DevOps Books Collection</h1>
      {loading ? (
        <div className="main">
          <div className="loader"></div>
        </div>
      ) : (
        <BooksGrid books={books} />
      )}
      <div className="button-container">
        <button onClick={handleNextPage} className="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
