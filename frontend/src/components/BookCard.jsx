import React, { useState } from "react";
import { MdDelete, MdDownload } from "react-icons/md";

const BookCard = ({
  book,
  handleDelete,
  handleDownload,
  handleDownloadFast,
}) => {
  const [show, setShow] = useState(false);
  return (
    <>
      {show && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Delete Book
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this book?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => handleDelete(book._id) && setShow(!show)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShow(!show)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col p-5 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 ">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGDgotBiU1p7CMvIUBSvod4n8c_cw1XStJcFu3jLmLIJ9-FmQHllZ9P1ZE27m9OUsWGnw&usqp=CAU"
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
            onClick={() => setShow(!show)}
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
