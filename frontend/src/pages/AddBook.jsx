import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [data, setData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationYear: "",
  });
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("genre", data.genre);
    formData.append("publicationYear", data.publicationYear);
    formData.append("file", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post("/books", formData, config)
      .then((res) => console.log(res.data))
      .then(() => {
        setData({
          title: "",
          author: "",
          genre: "",
          publicationYear: "",
        });
        setFile(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center w-full p-10">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-2/4 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-300 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 ">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 ">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFile}
            />
          </label>
        </div>

        <div className="flex w-full justify-center">
          <div className="flex flex-col w-2/4 justify-center p-10 gap-5">
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 "
                placeholder="John"
                required
                value={data.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="author"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 "
                placeholder="Doe"
                required
                value={data.author}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="genre"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Genre
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 "
                placeholder="Action"
                value={data.genre}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="publicationYear"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Publication Year
              </label>
              <input
                type="number"
                id="publicationYear"
                name="publicationYear"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 "
                placeholder="1234"
                value={data.publicationYear}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="text-white bg-lime-500 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddBook;
