import { useState, useEffect } from 'react';
import api from './api.json';

export default function SearchMovie() {
  const [typing, setTyping] = useState('');
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const data = api
        .filter((item) => item.title.toLowerCase().includes(typing.toLowerCase()))
        .map((i) => {
          return {
            id: i.episode_id,
            title: i.title,
            img: i.img,
          };
        });
      setMovieData(data);
    }

    getMovies();
    console.log(movieData);
  }, [typing]);

  function typingStart(e) {
    const typingTimeout = setTimeout(() => {
      setTyping(e.target.value);
    }, 500);

    return () => {
      clearTimeout(typingTimeout);
    };
  }

  return (
    <div>
      <div className="searchBar">
        <div className="mainSearchBar">
          <h2>Search Movie</h2>
          <input onChange={typingStart} type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="mainMovie">
        <div className="mainBoxs">
          {movieData.length === 0 && <p>Yok öyle bir şey!</p>}
          {movieData.map((item) => {
            return (
              <div key={item.id} className="boxs">
                <img src={item.img} alt="movie" />
                <div className="movieInfo">{item.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
