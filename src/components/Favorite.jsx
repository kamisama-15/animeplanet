import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteAnimes');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div className='bg-white min-h-screen p-8 mt-20'>
      <h2 className='md:text-4xl font-bold text-black mb-4 text-center'>Favorite Animes</h2>
      <hr />
      {favorites.length === 0 ? (
        <p className='text-center text-lg mt-4'>No favorite anime selected.</p>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 p-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-8'>
          {favorites.map((anime) => (
            <div
              key={anime.mal_id}
              className='border p-2 shadow-md rounded-lg anime-card relative flex flex-col justify-between'
            >
              <Link to={`/anime/${anime.mal_id}`}>
                {anime.images && anime.images.jpg && (
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className='w-full h-64 object-cover rounded-lg mb-4 anime-image'
                  />
                )}
                <h3 className='text-md font-semibold text-center'>
                  {anime.titles && anime.titles.length > 0 ? anime.titles[0].title : anime.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
