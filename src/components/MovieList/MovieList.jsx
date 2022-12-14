import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import Preloader from '../../common/Preloader';
import MovieItem from '../MovieItem/MovieItem';
import './MovieList.css';

/*
    MovieList component
*/

function MovieList() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'aboba',
      slug: 'aboba-2022',
      year: 2022,
      synopsis: 'just Aboba',
      background_image: '',
      cover_image: '',
      genres: [''],
    },
  ]);
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const src = `https://yts.mx/api/v2/list_movies.json?page=${currentPage}&limit=${pageSize}`;

  useEffect(() => {
    axios
      .get(src)
      .then((data) => {
        setTotalCount(data.data.data.movie_count);
        setPageSize(data.data.data.limit);
        setMovies(data.data.data.movies);
        setIsFetching(true);
      });
    document.title = 'Movie List';
  }, [currentPage, src]);

  if (!isFetching) return <Preloader />;
  return (
    <div>
      <div id="pagination-container" className="pagination-container">
        {isFetching && (
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={
                        (page) => {
                          setCurrentPage(page);
                          setIsFetching(false);
                        }
}
          />
        )}
      </div>
      <div className="movielist-container">
        <div className="movielist-container items">
          {movies.map((item) => (
            <div key={item.id}>
              <MovieItem
                title={item.title}
                coverImage={item.medium_cover_image}
                id={item.id}
                slug={item.slug}
                genres={item.genres}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default MovieList;
