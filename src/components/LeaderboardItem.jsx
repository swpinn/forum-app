import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ user, score }) {
  return (
    <section className="talk-detail">
      <header>
        <img src={user.avatar} alt={user.name} />
        <div className="talk-detail__user-info">
          <p className="talk-detail__user-name">{user.name}</p>
          <p className="talk-detail__user-id">
            @
            {user.id}
          </p>
        </div>
      </header>
      <article>
        <h2 className="talk-detail__text">
          score:
          {' '}
          {score}
        </h2>
      </article>
    </section>
  );
}

const userLeaderboardItemShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const leaderboardItemShape = {
  user: PropTypes.shape(userLeaderboardItemShape).isRequired,
  score: PropTypes.number.isRequired,
};

LeaderboardItem.propTypes = {
  ...leaderboardItemShape,
};

export { leaderboardItemShape };

export default LeaderboardItem;
