import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import Preloader from '../../common/Preloader';
import noImage from '../../assets/no_image2.png';
import Comment from './Comment/Comment';
import './MovieDetail.css';

/*
    MovieDetail component
*/

function MovieDetail() {
  const { id } = useParams();
  const src = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;
  const [movie, setMovie] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [genre, setGenre] = useState('');
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(`comments${id}`); // Get comments from localStorage
    const initialComments = JSON.parse(saved);
    return initialComments || [];
  });
  const [newComment, setNewComment] = useState({
    id: 0,
    nickName: '',
    commentBody: '',
  });
  useEffect(() => {
    axios
      .get(src)
      .then((data) => {
        setMovie(data.data.data.movie);
        setGenre(data.data.data.movie.genres[0]);
        setIsFetching(true);
        document.title = `${data.data.data.movie.title}`;
      });
    localStorage.setItem(`comments${id}`, JSON.stringify(comments)); // Save comments to localStorage
  }, [id, comments, src]);

  if (!isFetching) {
    <Preloader />;
  }
  const handleRemove = (commentId) => {
    const newComments = [...comments].filter((item) => item.id !== commentId);
    setComments(newComments);
  };

  const handleChangeNickName = (e) => {
    setNewComment({
      ...newComment,
      nickName: e.target.value,
    });
  };
  const handleChangeCommentBody = (e) => {
    setNewComment({
      ...newComment,
      commentBody: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    newComment.id = comments.length || 0;
    setComments([...comments, newComment]);
    setNewComment({ id: 0, nickName: '', commentBody: '' });
  };
  return (
    <div className="movie-detail__wrapper">
      <div className="movie-detail__details">
        <div className="movie-detail__poster">
          <img
            src={movie.large_cover_image}
            alt=""
            onError={(e) => {
              e.target.onError = null;
              e.target.src = noImage;
            }}
          />
        </div>
        <div className="movie-detail__info">
          <div className="movie-detail__title">
            <h1>{movie.title}</h1>
          </div>
          <div className="movie-detail__year">
            <span>{movie.year}</span>
          </div>
          <div className="movie-detail__genre">
            <span>{genre}</span>
          </div>
          <div className="movie-detail__description">
            <p>{movie.description_full}</p>
          </div>
        </div>
      </div>
      <div className="movie-detail__comments">
        <div className="movie-detail__comments-title">Comments</div>
        {
                    comments.map((item) => (
                      <Comment
                        id={item.id}
                        nickName={item.nickName}
                        commentBody={item.commentBody}
                        handleRemove={handleRemove}
                      />
                    ))
                }
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="movie-detail__add-comment">
        <input
          type="text"
          maxLength="40"
          onChange={(e) => handleChangeNickName(e)}
          value={newComment.nickName}
          className="movie-detail__nickname"
          placeholder="Your nickname..."
        />
        <textarea
          maxLength="200"
          onChange={(e) => handleChangeCommentBody(e)}
          className="movie-detail__comment-body"
          value={newComment.commentBody}
          placeholder="Your comment..."
        />
        <input type="submit" className="movie-detail__btn--add" />
      </form>
    </div>
  );
}

export default MovieDetail;
