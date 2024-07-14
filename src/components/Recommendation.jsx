import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart,FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";
import "../styles/home.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(1);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favoriteAnimes");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const fetchAnimeRecommendations = async () => {
    setLoading(true);
    try {
      let url = `https://api.jikan.moe/v4/recommendations/anime?page=${currentPage}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      const { data, pagination } = await response.json();
      console.log("Recommendations fetched:", data);
      setRecommendations(data);
      setLastPage(pagination.last_visible_page);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnimeRecommendations();
  }, [currentPage]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteAnimes");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

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

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="anime-features text-center py-8 mt-20">
        <h2 className="md:text-4xl font-bold text-black mb-2">
          Recommended Anime
        </h2>
        <hr className="mb-2" />
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : recommendations.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 p-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
              {recommendations.map((recommendation, index) => (
                <div
                  key={`${recommendation.entry[0].mal_id}-${index}`}
                  className="border p-2 rounded-lg shadow-md anime-card relative flex flex-col justify-between"
                >
                  <Link to={`/anime/${recommendation.entry[0].mal_id}`}>
                    {recommendation.entry[0].images &&
                      recommendation.entry[0].images.jpg && (
                        <img
                          src={recommendation.entry[0].images.jpg.image_url}
                          alt={recommendation.entry[0].title}
                          className="w-full h-64 object-cover rounded-lg mb-4 anime-image"
                        />
                      )}
                    <h3 className="text-md font-semibold">
                      {recommendation.entry[0].title}
                    </h3>
                  </Link>
                  <button
                    onClick={() => handleFavorite(recommendation.entry[0])}
                    className="self-end text-red-500 text-xl mt-2"
                  >
                    {isFavorited(recommendation.entry[0]) ? (
                      <FaHeart color="red" size={24} />
                    ) : (
                      <FaRegHeart color="grey" size={24} />
                    )}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
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
          </>
        ) : (
          <p className="text-lg text-gray-500">No recommendations available.</p>
        )}
      </div>
    </>
  );
};

export default Recommendation;
