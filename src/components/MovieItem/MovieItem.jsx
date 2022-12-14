import React from 'react';
import './MovieItem.css';
import { Link } from 'react-router-dom';
import noImage from '../../assets/no_image2.png';

/*
    MovieItem component
*/
function MovieItem({
  title, coverImage, id, genres = ['-'],
}) {
  return (
    <div id={`item${id}`} className="item-container">
      <Link className="image-container" to={`/details/${id}`}>
        <img
          src={coverImage}
          alt=""
          onError={(e) => {
            e.target.onError = null;
            e.target.src = noImage;
          }}
        />
        <div className="details-container">
          <div className="movie-genre">
            <span className="genre">{genres[0]}</span>
          </div>
          <div className="show-details">
            <span className="btn">More details</span>
          </div>
        </div>
      </Link>
      <Link className="item-title" to={`/details/${id}`}>
        {title}
      </Link>
    </div>
  );
}

export default MovieItem;
