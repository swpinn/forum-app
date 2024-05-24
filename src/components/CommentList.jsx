import React from 'react';
import PropTypes from 'prop-types';
import CommentItem, { CommentItemShape } from './CommentItem';

function CommentList({ comments }) {
  return (
    <div className="talks-list">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(CommentItemShape)).isRequired,
};

export default CommentList;
