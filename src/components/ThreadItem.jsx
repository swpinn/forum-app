import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { TfiComment } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';

import { postedAt } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
  authUser,
  like,
  dislike,
  neutralLike,
  neutralDislike,
}) {
  const navigate = useNavigate();
  const isThreadLiked = upVotesBy.includes(authUser);
  const isThreadDisliked = downVotesBy.includes(authUser);

  const onLikeClick = (event) => {
    event.stopPropagation();
    if (!isThreadLiked && !isThreadDisliked) {
      like(id);
    } else if (isThreadDisliked) {
      neutralDislike(id);
      like(id);
    } else if (isThreadLiked) {
      neutralLike(id);
    }
  };

  const onDislikeClick = (event) => {
    event.stopPropagation();
    if (!isThreadLiked && !isThreadDisliked) {
      dislike(id);
    } else if (isThreadLiked) {
      neutralLike(id);
      dislike(id);
    } else if (isThreadDisliked) {
      neutralDislike(id);
    }
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <div role="button" tabIndex={0} className="talk-item" onClick={onThreadClick} onKeyDown={onThreadPress}>
      <div className="talk-item__user-photo">
        <img src={user.avatar} alt={user.name} />
      </div>
      <div className="talk-item__detail">
        <header>
          <div className="talk-item__user-info">
            <p className="talk-item__user-name">{user.name}</p>
            <p className="talk-item__user-id">
              @
              {user.id}
            </p>
          </div>
          <p className="talk-item__created-at">{postedAt(createdAt)}</p>
        </header>
        <article>
          <h1 className="category-item">{category}</h1>
          <h1 className="talk-item__text">{title}</h1>
          <p className="talk-item__text">{body}</p>
        </article>
        {
          like && (
            <div className="talk-item__likes">
              <p>
                <button type="button" onClick={onLikeClick}>
                  {isThreadLiked ? (
                    <AiOutlineLike style={{ color: 'blue' }} />
                  ) : (
                    <AiOutlineLike />
                  )}
                </button>
                {isThreadLiked ? (
                  <span style={{ color: 'green' }}>{upVotesBy.length}</span>
                ) : (
                  <span>{upVotesBy.length}</span>
                )}
              </p>
              <p>
                <button type="button" onClick={onDislikeClick}>
                  {isThreadDisliked ? (
                    <AiOutlineDislike style={{ color: 'red' }} />
                  ) : (
                    <AiOutlineDislike />
                  )}
                </button>
                {isThreadDisliked ? (
                  <span style={{ color: 'green' }}>{downVotesBy.length}</span>
                ) : (
                  <span>{downVotesBy.length}</span>
                )}
              </p>
              <p>
                <button type="button" href="/detail-thread">
                  <TfiComment />
                </button>
                {totalComments}
              </p>
            </div>
          )
        }
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  like: PropTypes.func,
  dislike: PropTypes.func,
  neutralLike: PropTypes.func,
  neutralDislike: PropTypes.func,
};

ThreadItem.defaultProps = {
  like: null,
  dislike: null,
  neutralLike: null,
  neutralDislike: null,
};

export { threadItemShape };

export default ThreadItem;
