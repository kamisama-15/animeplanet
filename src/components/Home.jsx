import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { Link } from "react-router-dom";
import "../styles/home.css";
import { FaHeart, FaRegHeart,FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favoriteAnimes");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const typedTextRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    const options = {
      strings: ["Anime"],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
    };

    const typedInstances = typedTextRefs.map((ref) => {
      return new Typed(ref.current, options);
    });

    return () => {
      typedInstances.forEach((typed) => typed.destroy());
    };
  }, []);

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
      setLoading(true);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setLoading(true);
    }
  };

  const handleFavorite = (anime) => {
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.some(
        (fav) => fav.mal_id === anime.mal_id
      );
      const updatedFavorites = isFavorited
        ? prevFavorites.filter((fav) => fav.mal_id !== anime.mal_id)
        : [...prevFavorites, anime];

      localStorage.setItem("favoriteAnimes", JSON.stringify(updatedFavorites));
      if (isFavorited) {
        toast.error(`${anime.titles[0].title} removed from favorites!`, {
          autoClose: 2000,
        });
      } else {
        toast.success(`${anime.titles[0].title} added to favorites!`, {
          autoClose: 2000,
        });
      }
      return updatedFavorites;
    });
  };

  const isFavorited = (anime) => {
    return favorites.some((fav) => fav.mal_id === anime.mal_id);
  };

  const fetchAnimeData = async (query = "") => {
    setLoading(true);
    try {
      const endpoint = query
        ? `https://api.jikan.moe/v4/anime?q=${query}&page=${currentPage}`
        : `https://api.jikan.moe/v4/top/anime?page=${currentPage}`;

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { data, pagination } = await response.json();

      if (Array.isArray(data)) {
        setAnimeList(data);
        setLastPage(pagination.last_visible_page);
      } else {
        console.error("Unexpected data structure:", data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching anime data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeData();
  }, [currentPage]);

  const handleSearch = () => {
    fetchAnimeData(searchQuery);
  };

  return (
    <>
      <ToastContainer />
      <div className="carousel w-full h-[70vh] md:h-[100vh] sm:h-[70vh] relative">
        <div id="slide1" className="carousel-item relative w-full">
          <span className="font-black text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-4xl font-bold">
            Welcome to <span ref={typedTextRefs[0]}></span>
            <span className="text-rose-600">Planet</span>
          </span>
          <img
            src="https://images.alphacoders.com/134/thumb-1920-1343747.png"

            className="w-full"
            alt="Slide 1"
          />
          <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <span className="font-black text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-3xl font-bold">
            Welcome to <span ref={typedTextRefs[1]}></span>
            <span className="text-rose-600">Planet</span>
          </span>
          <img
            src="https://images3.alphacoders.com/131/1314151.jpg"
            className="w-full"
            alt="Slide 2"
          />
          <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <span className="font-black text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-3xl font-bold">
            Welcome to <span ref={typedTextRefs[2]}></span>
            <span className="text-rose-600">Planet</span>
          </span>
          <img
            src="https://images.alphacoders.com/131/thumb-1920-1311951.jpg"
            className="w-full"
            alt="Slide 3"
          />
          <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <span className="font-black text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-3xl font-bold">
            Welcome to <span ref={typedTextRefs[3]}></span>
            <span className="text-rose-600">Planet</span>
          </span>
          <img
            src="https://images6.alphacoders.com/134/thumb-1920-1345576.jpeg"
            className="w-full"
            alt="Slide 4"
          />
          <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="anime-features text-center py-8">
          <h2 className="md:text-4xl font-bold text-black mb-4">
            Top Anime of All Time
          </h2>
          <p className="md:text-lg text-red-300">
            Explore the latest and greatest in anime entertainment.
          </p>
          <div className="search-bar flex justify-center mt-8 ">
            <input
              type="text"
              placeholder="Search for an anime..."
              className="border rounded-l px-4 py-2 md:w-1/2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
            >
              Search
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 p-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-8">
            {animeList.map((anime) => (
              <div
                key={anime.mal_id}
                className="border p-2 shadow-md rounded-lg anime-card flex flex-col justify-between"
              >
                <Link to={`/anime/${anime.mal_id}`}>
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className="w-full h-64 object-cover rounded-lg mb-4 anime-image"
                  />
                  <h3 className="text-md font-semibold">
                    {anime.titles[0].title}
                  </h3>
                </Link>
                <button
                  onClick={() => handleFavorite(anime)}
                  className="self-end mt-2"
                >
                  {isFavorited(anime) ? (
                    <FaHeart color="red" size={24} />
                  ) : (
                    <FaRegHeart color="grey" size={24} />
                  )}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-row justify-center">
            <button
              onClick={handlePrevPage}
              className="bg-gray-200 hover:bg-gray-300 flex flex-cols items-center text-gray-800 font-bold py-2 px-4 rounded-l mr-2"
              disabled={currentPage === 1}
            >
            <FaArrowAltCircleLeft className="mr-2"/>
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="bg-gray-200 hover:bg-gray-300 flex flex-cols items-center text-gray-800 font-bold py-2 px-4 rounded-r"
              disabled={currentPage === lastPage}
            >
              Next
              <FaArrowAltCircleRight className="ml-2"/>

            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
