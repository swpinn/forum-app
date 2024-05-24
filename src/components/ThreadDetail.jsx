import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import CommentItem, { CommentItemShape } from './CommentItem';
import { postedAt } from '../utils';
import CommentInput from './CommentInput';

function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  comments,
  authUser,
  like,
  dislike,
  neutralLike,
  neutralDislike,
  addCommentThread,
}) {
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

  return (
    <section className="talk-detail">
      <header>
        <img src={owner.avatar} alt={owner.name} />
        <div className="talk-detail__user-info">
          <p className="talk-detail__user-name">{owner.name}</p>
          <p className="talk-detail__user-id">
            @
            {owner.id}
          </p>
        </div>
      </header>
      <article>
        <h1 className="category-item">{category}</h1>
        <h1 className="talk-detail__text">{title}</h1>
        <p className="talk-detail__text">{body}</p>
      </article>
      <footer>
        <div className="talk-detail__like">
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
        </div>
        <p className="talk-detail__created-at">{postedAt(createdAt)}</p>
      </footer>
      <CommentInput commentThread={addCommentThread} />
      <div className="talk-detail__text">
        <p className="talk-detail__text">{`Comments (${comments.length})`}</p>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} {...comment} />
          ))
        ) : (
          <p>- No Comment -</p>
        )}
      </div>
    </section>

  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  like: PropTypes.func,
  dislike: PropTypes.func,
  neutralLike: PropTypes.func,
  neutralDislike: PropTypes.func,
  addCommentThread: PropTypes.func,
  comments: PropTypes.arrayOf(PropTypes.shape(CommentItemShape))
    .isRequired,
};

ThreadDetail.defaultProps = {
  like: null,
  dislike: null,
  neutralLike: null,
  neutralDislike: null,
  addCommentThread: null,
};

export { userShape };

export default ThreadDetail;
