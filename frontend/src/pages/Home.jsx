import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);

  const deleteBook = async (id) => {
    await axios.delete(`/books/${id}`);
    fetchBooks();
  };

  const downloadBook = async (id) => {
    await axios.post(`/books/no-stream/${id}`);
  };

  const downloadBookFast = async (id) => {
    await axios.post(`/books/stream/${id}`);
  };

  const fetchBooks = async () => {
    const res = await axios.get("/books");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <h1 className="flex justify-center items-center text-4xl font-extrabold leading-none text-gray-900 tracking-tight m-4">
        Book List
      </h1>
      <div className="flex justify-center items-center p-10">
        <div className="grid grid-cols-2 gap-4 p-10">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              habdleDelete={(id) => deleteBook(id)}
              handleDownload={(id) => downloadBook(id)}
              handleDownloadFast={(id) => downloadBookFast(id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
