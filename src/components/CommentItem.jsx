import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../utils';

function CommentItem({ content, createdAt, owner }) {
  return (
    <div className="talk-item">
      <div className="talk-item__user-photo">
        <img src={owner.avatar} alt={owner.name} />
      </div>
      <div className="talk-item__detail">
        <header>
          <div className="talk-item__user-info">
            <p className="talk-item__user-name">{owner.name}</p>
            <p className="talk-item__user-id">
              @
              {owner.id}
            </p>
          </div>
          <p className="talk-item__created-at">{postedAt(createdAt)}</p>
        </header>
        <article>
          <p className="talk-item__text">{content}</p>
        </article>
      </div>
    </div>
  );
}

const ownerCommentItemShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const CommentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerCommentItemShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  ...CommentItemShape,
};

export { CommentItemShape };

export default CommentItem;
