import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaFilm, FaDragon, FaLeaf, FaHeart, FaMagic, FaSkull, FaLaughBeam, FaRobot,
  FaAward, FaUserAlt, FaUsers, FaDrum, FaTheaterMasks, FaPaw, FaBrain, FaCar,
  FaRedo, FaHandHoldingHeart, FaSchool, FaRocket, FaChess, FaHandRock, FaHeartbeat,
  FaPalette, FaBuilding, FaChild, FaFistRaised, FaUserTie, FaMap, FaHistory,
  FaFemale, FaMale, FaSnowflake, FaInfinity, FaCross, FaGavel, FaAtom, FaDollarSign,
  FaFlask, FaMusic, FaFeather, FaEye, FaGamepad, FaSyringe, FaHammer,
  FaWrench, FaCut, FaStar, FaTree
} from 'react-icons/fa';
import {
  GiDualityMask, GiDramaMasks, GiSpy, GiNightSleep, GiCrossedSwords,
  GiChefToque, GiAbstract004, GiDragonOrb, GiDelighted, GiAlgae, GiDiceFire,GiFulguroPunch
} from 'react-icons/gi';
import {
  MdWork, MdMovieFilter, MdOutlinePsychology, MdChildFriendly
  , MdVideogameAsset, MdOutlineAutorenew,MdSchool
} from 'react-icons/md';
import '../styles/curtain.css';

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchAnimeGenre = async () => {
    try {
      const url = `https://api.jikan.moe/v4/genres/anime`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch genres");
      }
      const { data } = await response.json();
      setGenres(data);
      console.log('Anime Genre fetched:', data);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeGenre();
  }, []);

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre.mal_id}`, { state: { genreName: genre.name } });
  };

  const genreIcons = {
    Action: <FaFilm />,
    Adventure: <FaDragon />,
    'Avant Garde': <GiAbstract004 />,
    'Award Winning': <FaAward />,
    'Boys Love': <FaUserAlt />,
    Comedy: <FaLaughBeam />,
    Drama: <GiDramaMasks />,
    Fantasy: <FaMagic />,
    'Girls Love': <FaUsers />,
    Gourmet: <GiChefToque />,
    Horror: <FaSkull />,
    Mystery: <GiSpy />,
    Romance: <FaHeart />,
    'Sci-Fi': <FaRobot />,
    'Slice of Life': <FaLeaf />,
    Sports: <GiCrossedSwords />,
    Supernatural: <GiDragonOrb />,
    Suspense: <GiDualityMask />,
    Ecchi: <FaHandHoldingHeart />,
    Erotica: <GiNightSleep />,
    Hentai: <GiAlgae />,
    'Adult Cast': <FaUserTie />,
    Anthropomorphic: <FaPaw />,
    CGDCT: <GiDelighted />,
    Childcare: <MdChildFriendly />,
    'Combat Sports': <GiFulguroPunch />,
    Crossdressing: <FaFemale />,
    Delinquents: <FaMale />,
    Detective: <GiSpy />,
    Educational: <MdSchool />,
    'Gag Humor': <FaLaughBeam />,
    Gore: <FaSkull />,
    Harem: <FaUsers />,
    'High Stakes Game': <GiDiceFire />,
    Historical: <FaHistory />,
    'Idols (Female)': <FaFemale />,
    'Idols (Male)': <FaMale />,
    Isekai: <FaSnowflake />,
    Iyashikei: <GiNightSleep />,
    'Love Polygon': <FaHeartbeat />,
    'Magical Sex Shift': <FaMagic />,
    'Mahou Shoujo': <FaMagic />,
    'Martial Arts': <FaFistRaised />,
    Mecha: <FaRobot />,
    Medical: <FaSyringe />,
    Military: <FaHammer />,
    Music: <FaMusic />,
    Mythology: <FaFeather />,
    'Organized Crime': <FaGavel />,
    'Otaku Culture': <MdVideogameAsset />,
    Parody: <GiDelighted />,
    'Performing Arts': <FaTheaterMasks />,
    Pets: <FaPaw />,
    Psychological: <MdOutlinePsychology />,
    Racing: <FaCar />,
    Reincarnation: <FaRedo />,
    'Reverse Harem': <FaUsers />,
    'Romantic Subtext': <FaHeart />,
    Samurai: <FaCross />,
    School: <MdSchool />,
    Showbiz: <FaTheaterMasks />,
    Space: <FaRocket />,
    'Strategy Game': <FaChess />,
    'Super Power': <FaHandRock />,
    Survival: <FaHandRock />,
    'Team Sports': <FaUsers />,
    'Time Travel': <MdOutlineAutorenew />,
    Vampire: <FaStar />,
    'Video Game': <FaGamepad />,
    'Visual Arts': <FaPalette />,
    Workplace: <MdWork />,
    Josei: <FaFemale />,
    Kids: <MdChildFriendly />,
    Seinen: <FaMale />,
    Shoujo: <FaFemale />,
    Shounen: <FaMale />,
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="mt-20 px-8">
          <h1 className="text-4xl font-bold text-center mb-8">Anime Genres</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {genres.map((genre) => (
              <div
                key={genre.mal_id}
                className="p-4 bg-white rounded-lg shadow-md curtain-effect border-0"
              >
                <button
                  onClick={() => handleGenreClick(genre)}
                  className="w-full flex items-center justify-center text-center text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                >
                  {genreIcons[genre.name] || <FaFilm />} 
                  <span className="ml-2">{genre.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Genre;
