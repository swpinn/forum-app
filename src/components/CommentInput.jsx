import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ commentThread }) {
  const [content, setContent] = useState('');

  function commentThreadHandler() {
    if (content.trim()) {
      commentThread(content);
      setContent('');
    }
  }

  function handleTextChange({ target }) {
    if (target.value.length <= 320) {
      setContent(target.value);
    }
  }

  return (
    <div className="talk-reply-input">
      <textarea type="text" placeholder="Berikan Komentarmu" value={content} onChange={handleTextChange} />
      <p className="talk-reply-input__char-left">
        <strong>{content.length}</strong>
        /320
      </p>
      <button type="submit" onClick={commentThreadHandler}>comment</button>
    </div>
  );
}

CommentInput.propTypes = {
  commentThread: PropTypes.func.isRequired,
};

export default CommentInput;
