import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';

import ThreadList from '../components/ThreadList';
import {
  asyncToggleDownVoteThread,
  asyncToggleNeutralDownVoteThread,
  asyncToggleNeutralUpVoteThread,
  asyncToggleUpVoteThread,
} from '../states/threads/action';
import CategoryList from '../components/CategoryList';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states); // @TODO: get talks, users, and authUser state from store

  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  useEffect(() => {
    // @TODO: dispatch async action to populate threads and users data
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onLike = (id) => {
    // @TODO: dispatch async action to toggle like talk
    dispatch(asyncToggleUpVoteThread(id));
  };

  const onDislike = (id) => {
    // @TODO: dispatch async action to toggle dislike thread
    dispatch(asyncToggleDownVoteThread(id));
  };

  const onNeutralLike = (id) => {
    // @TODO: dispatch async action to toggle neutral like thread
    dispatch(asyncToggleNeutralUpVoteThread(id));
  };

  const onNeutralDislike = (id) => {
    // @TODO: dispatch async action to toggle neutral dislike thread
    dispatch(asyncToggleNeutralDownVoteThread(id));
  };

  const uniqueCategories = threads.filter((thread, index) => (
    threads.findIndex((obj) => obj.category === thread.category) === index
  ));

  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const threadList = threads.filter((thread) => {
    if (selectedCategory === 'all') {
      return true;
    }
    return thread.category === selectedCategory;
  }).map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <section className="home-page">
      <CategoryList
        threads={uniqueCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <ThreadList
        threads={threadList}
        like={onLike}
        dislike={onDislike}
        neutralLike={onNeutralLike}
        neutralDislike={onNeutralDislike}
      />
    </section>
  );
}

export default HomePage;
