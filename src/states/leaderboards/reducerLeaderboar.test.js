/* eslint-disable quotes */
/**
 *  Test scenario for leaderboardsReducer
 *
 *  - should return the initial state when given by unknown action
 *  - should return the leaderboards when given by RECEIVE_LEADERBOARDS action
 */

import { describe, it, expect } from "vitest";
import leaderboardsReducer from "./reducer";

describe("LeaderboardsReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = [];
    const action = { type: "UNKNOWN" };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the leaderboards when given by RECEIVE_LEADERBOARDS action", () => {
    // arrange
    const initialState = [];
    const action = {
      type: "RECEIVE_LEADERBOARDS",
      payload: {
        leaderboards: [
          {
            avatar: "http//fotouser.com",
            name: "user-test",
            email: "user-test@gmail.com",
          },
        ],
      },
    };
    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
