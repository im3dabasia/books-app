import React from "react";
import { MdDelete, MdDownload } from "react-icons/md";

const BookCard = ({
  book,
  habdleDelete,
  handleDownload,
  handleDownloadFast,
}) => {
  return (
    <>
      <div className="flex flex-col p-5 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 ">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src="https://picsum.photos/536/354"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {book.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 ">
            Book Author : {book.author}
          </p>
          <p className="mb-3 font-normal text-gray-700 ">
            Book Genre : {book.genre}
          </p>
          <p className="mb-3 font-normal text-gray-700 ">
            Publication Year : {book.publicationYear}
          </p>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <button
            onClick={() => habdleDelete(book._id)}
            className="flex gap-2 justify-center px-4 py-2 text-sm font-medium text-white bg-lime-500 rounded-lg hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
          >
            <MdDelete size={20} />
            Delete
          </button>
          <button
            onClick={() => handleDownload(book._id)}
            className="flex gap-2 justify-center px-4 py-2 text-sm font-medium text-white bg-lime-500 rounded-lg hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
          >
            <MdDownload size={20} />
            Download
          </button>
          <button
            onClick={() => handleDownloadFast(book._id)}
            className="flex gap-2 justify-between items-center px-4 py-2 text-sm font-medium text-white bg-lime-500 rounded-lg hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
          >
            <MdDownload size={25} />
            Download Fast
          </button>
        </div>
      </div>
    </>
  );
};

export default BookCard;
