/*
  eslint-disable jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-noninteractive-element-interactions
*/
import React from 'react';
import './Comment.css';
import removeIcon from '../../../assets/remove_icon.png';

function Comment({
  id, nickName, commentBody, handleRemove,
}) {
  return (
    <div id={`comment${id}`} className="comment--wrapper">
      <div className="comment__nickname">
        <p>{nickName}</p>
      </div>
      <div className="comment__body">
        <p>{commentBody}</p>
      </div>
      <div className="comment__btn--delete">
        <img src={removeIcon} alt="delete comment" onClick={() => handleRemove(id)} onKeyDown={() => {}} />
      </div>
    </div>
  );
}

export default Comment;
