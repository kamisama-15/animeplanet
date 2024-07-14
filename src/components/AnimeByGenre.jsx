import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart,FaArrowAltCircleRight,FaArrowAltCircleLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/home.css";

const AnimeByGenre = () => {
  const { id } = useParams();
  const location = useLocation();
  const [animeList, setAnimeList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const genreName = location.state?.genreName || "Genre";

  const fetchAnimeByGenre = async (genreId, page) => {
    setIsLoading(true);
    try {
      const url = `https://api.jikan.moe/v4/anime?genres=${genreId}&page=${page}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch anime by genre");
      }
      const { data, pagination } = await response.json();
      setAnimeList(data);
      setTotalPages(pagination.last_visible_page);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching anime by genre:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setAnimeList([]);
    fetchAnimeByGenre(id, 1);
  }, [id]);

  const handleAnimeClick = (animeId) => {
    navigate(`/anime/${animeId}`);
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
        toast.error(`${anime.title} removed from favorites!`, {
          autoClose: 2000,
        });
      } else {
        toast.success(`${anime.title} added to favorites!`, {
          autoClose: 2000,
        });
      }
      return updatedFavorites;
    });
  };

  const isFavorited = (anime) => {
    return favorites.some((fav) => fav.mal_id === anime.mal_id);
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      await fetchAnimeByGenre(id, nextPage);
    }
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      await fetchAnimeByGenre(id, prevPage);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mt-20 px-8">
        <h1 className="md:text-4xl font-bold text-center mb-8">{genreName}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            animeList.map((anime, index) => (
              <div
                key={`${anime.mal_id}-${index}`}
                onClick={() => handleAnimeClick(anime.mal_id)}
                className="p-4 bg-white anime-card flex flex-col justify-between rounded-lg shadow-lg cursor-pointer"
              >
                <img
                  src={anime.images?.jpg?.image_url || "placeholder.jpg"}
                  alt={anime.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h2 className="text-md text-center mb-2">{anime.title}</h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(anime);
                  }}
                  className="self-end mt-2"
                >
                  {isFavorited(anime) ? (
                    <FaHeart color="red" size={24} />
                  ) : (
                    <FaRegHeart color="grey" size={24} />
                  )}
                </button>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handlePrevPage}
            className="bg-gray-200 hover:bg-gray-300 flex flex-row items-center text-gray-800 font-bold py-2 px-4 rounded-l mr-2"
            disabled={currentPage === 1 || isLoading}
          >
          <FaArrowAltCircleLeft className="mr-2"/>
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="bg-gray-200 flex flex-row items-center hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
            disabled={currentPage === totalPages || isLoading}
          >
            Next
            <FaArrowAltCircleRight className="ml-2"/>
          </button>
        </div>
      </div>
    </>
  );
};

export default AnimeByGenre;
