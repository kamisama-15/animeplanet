import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/animedetail.css';

const AnimeDetail = () => {
  const { animeId } = useParams();
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedCharactersCount, setDisplayedCharactersCount] = useState(10);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favoriteAnimes');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${animeId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch anime");
        }
        const data = await response.json();
        console.log("Fetched anime:", data);
        setAnime(data);
      } catch (error) {
        console.error("Error fetching anime:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${animeId}/characters`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch characters");
        }
        const data = await response.json();
        console.log("Fetched characters:", data);
        setCharacters(data.data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    if (animeId) {
      fetchAnime();
      fetchCharacters();
    }
  }, [animeId]);

  const handleShowMore = () => {
    setDisplayedCharactersCount(prevCount => prevCount + 10);
  };

  const handleFavorite = (anime) => {
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.some(fav => fav.mal_id === anime.mal_id);
      const updatedFavorites = isFavorited
        ? prevFavorites.filter(fav => fav.mal_id !== anime.mal_id)
        : [...prevFavorites, anime];

      localStorage.setItem('favoriteAnimes', JSON.stringify(updatedFavorites));

      // Show toast notification
      if (isFavorited) {
        toast.error(`${anime.title} removed from favorites!`, { autoClose: 2000 });
      } else {
        toast.success(`${anime.title} added to favorites!`, { autoClose: 2000 });
      }

      return updatedFavorites;
    });
  };

  const isFavorited = (anime) => {
    return favorites.some(fav => fav.mal_id === anime.mal_id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!anime) {
    return <p>Anime not found.</p>;
  }

  return (
    <div className="anime-detail flex flex-col md:flex-row p-4 mt-20 justify-center">
      <div className="md:w-1/5 border p-3 flex flex-col content-center">
        <h2 className="text-xl text-center font-bold mb-4">{anime.data.title}</h2>
        <img
          src={anime.data.images?.jpg?.image_url || "placeholder.jpg"}
          alt={anime.data.title}
          className="rounded-lg shadow-lg"
          style={{ maxWidth: "400px" }}
        />
        <button
          onClick={() => handleFavorite(anime.data)}
          className={`text-white flex flex-row items-center font-bold py-2 px-4 rounded mt-4 ${
            isFavorited(anime.data) ? 'bg-red-500' : 'bg-blue-500 hover:bg-blue-700'
          }`}
        >
          <FaHeart className="mr-2"/>
          {isFavorited(anime.data) ? 'Unfavorite' : 'Add to Favorites'}
        </button>
        <h6 className="mt-4 font-bold">Alternative Titles</h6>
        <hr />
        <p className="text-xs mt-2"><strong>Japanese: </strong>{anime.data.title_japanese}</p>
        <p className="text-xs mt-2"><strong>Synonyms: </strong>{anime.data.title_synonyms.join(', ')}</p>
        <p className="text-xs mt-2 mb-4"><strong>English: </strong>{anime.data.title_english}</p>

        <h6 className="font-bold">Information</h6>
        <hr />
        <h6 className="text-xs mt-2"><strong>Type: </strong>{anime.data.type}</h6>
        <h6 className="text-xs mt-2"><strong>Episodes: </strong>{anime.data.episodes}</h6>
        <h6 className="text-xs mt-2"><strong>Status: </strong>{anime.data.status}</h6>
        <h6 className="text-xs mt-2"><strong>Aired: </strong>{anime.data.aired.string}</h6>
        <h6 className="text-xs mt-2"><strong>Season: </strong>{anime.data.season}</h6>
        <h6 className="text-xs mt-2"><strong>Broadcast: </strong>{anime.data.broadcast.string}</h6>
        <h6 className="text-xs mt-2"><strong>Producers: </strong>
          {anime.data.producers.map((producer, index) => (
            <span className="text-blue-400" key={producer.mal_id}>
              <a href={producer.url} target="_blank" rel="noopener noreferrer">
                {producer.name}
              </a>
              {index < anime.data.producers.length - 1 ? ', ' : ''}
            </span>
          ))}
        </h6>
        <h6 className="text-xs mt-2"><strong>Studios: </strong>
          {anime.data.studios.map((studio, index) => (
            <span className="text-blue-400" key={studio.mal_id}>
              <a href={studio.url} target="_blank" rel="noopener noreferrer">
                {studio.name}
              </a>
              {index < anime.data.studios.length - 1 ? ', ' : ''}
            </span>
          ))}
        </h6>
        <h6 className="text-xs mt-2"><strong>Source: </strong>{anime.data.source}</h6>
        <h6 className="text-xs mt-2"><strong>Genre: </strong>
          {anime.data.genres.map((genre, index) => (
            <span key={genre.mal_id}>
              {genre.name}
              {index < anime.data.genres.length - 1 ? ', ' : ''}
            </span>
          ))}
        </h6>
        <h6 className="text-xs mt-2"><strong>Demographics: </strong>
          {anime.data.demographics.map((demographic, index) => (
            <span key={demographic.mal_id}>
              {demographic.name}
              {index < anime.data.demographics.length - 1 ? ', ' : ''}
            </span>
          ))}
        </h6>
        <h6 className="text-xs mt-2"><strong>Duration: </strong>{anime.data.duration}</h6>
        <h6 className="text-xs mt-2 mb-5"><strong>Rating: </strong>{anime.data.rating}</h6>

        <h6 className="font-bold">Statistics</h6>
        <hr />
        <h6 className="text-xs mt-2"><strong>Rating: </strong>{anime.data.score} (scored by {anime.data.scored_by})</h6>
        <h6 className="text-xs mt-2"><strong>Ranked: </strong>#{anime.data.rank}</h6>
        <h6 className="text-xs mt-2"><strong>Popularity: </strong>#{anime.data.popularity}</h6>
        <h6 className="text-xs mt-2"><strong>Members: </strong>{anime.data.members}</h6>
        <h6 className="text-xs mt-2"><strong>Favorites: </strong>{anime.data.favorites}</h6>
      </div>
      <div className="md:w-2/2 border p-2">
        <strong>Synopsis</strong>
        <hr />
        <p className="text-gray-700 my-4">{anime.data.synopsis}</p>
        <hr />
        {anime.data.trailer && anime.data.trailer.embed_url ? (
          <div className="my-4">
            <h3 className="text-lg font-semibold mb-2">Trailer</h3>
            <iframe
              className="w-full"
              height="315"
              src={anime.data.trailer.embed_url}
              title={`${anime.data.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p className="text-center">No trailer available.</p>
        )}
        <strong>Characters</strong>
        <hr />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
          {characters.slice(0, displayedCharactersCount).map((character, index) => (
            <div key={character.character.mal_id} className="flex flex-row border p-2">
              <div className="w-1/2 flex flex-row ">
                <img
                  src={character.character.images.jpg.image_url}
                  alt={character.character.name}
                  className="w-15 h-20"
                />
                <div className="ml-2">
                  <h6 className="font-bold text-sm">
                    <a href={character.character.url} target="_blank" rel="noopener noreferrer">
                      {character.character.name}
                    </a>
                  </h6>
                  <p className="text-xs">Role: {character.role}</p>
                </div>
              </div>
              <div className="w-1/2 ">
                <div className="text-xs flex flex-row">
                  {character.voice_actors.length > 0 ? (
                    <div key={character.voice_actors[0].person.mal_id} className="flex">
                      <img
                        src={character.voice_actors[0].person.images.jpg.image_url}
                        alt={character.voice_actors[0].person.name}
                        className="w-15 h-20"
                      />
                      <div className="ml-2">
                        <a href={character.voice_actors[0].person.url} target="_blank" rel="noopener noreferrer">
                          {character.voice_actors[0].person.name}
                        </a>
                        <span className="ml-1">({character.voice_actors[0].language})</span>
                      </div>
                    </div>
                  ) : (
                    <p>N/A</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {displayedCharactersCount < characters.length && (
          <div className="text-center mt-4">
            <button
              onClick={handleShowMore}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Show More
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AnimeDetail;
