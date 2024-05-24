import React from 'react';

import { useDispatch } from 'react-redux';
import { asyncAddThread } from '../states/threads/action';
import ThreadInput from '../components/ThreadInput';

function CreateThread() {
  const dispatch = useDispatch();

  // This function dispatches an action to add a new thread
  const onThreadInput = async (title, body, category) => {
    await dispatch(asyncAddThread({ title, body, category }));
  };

  return (
    <section className="create-thread">
      <ThreadInput threadInput={onThreadInput} />
    </section>
  );
}

export default CreateThread;
