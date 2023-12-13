import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);

  const deleteBook = async (id) => {
    await axios.delete(`/books/${id}`);
    // alert(`Book deleted successfully!`);
    fetchBooks();
  };

  const handleDownload = (response, time) => {
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "book.pdf");

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    alert(`Total download time: ${time.toFixed(2)} milliseconds`);
  };

  const downloadBook = async (id) => {
    const start = performance.now();
    const res = await axios.post(`/books/no-stream/${id}`);
    const end = performance.now();
    const time = end - start;
    handleDownload(res, time);
  };

  const downloadBookFast = async (id) => {
    const start = performance.now();
    const res = await axios.post(`/books/stream/${id}`);
    const end = performance.now();
    const time = end - start;
    handleDownload(res, time);
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
              handleDelete={(id) => deleteBook(id)}
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
