import {
  bobId,
  dislikedByBobPopularity,
  likedByBobPopularity,
  messageId
} from '../../helpers/messages';
import { messagePopularityReducer } from '../../../src/messages/reducers/messagePopularityReducer';
import {
  dislikeMessage,
  likeMessage
} from '../../../src/messages/actionCreators/messageActionCreators';

describe('messagePopularityReducer likes and dislikes messages correctly', () => {
  const likeAction = likeMessage(messageId, bobId);
  const dislikeAction = dislikeMessage(messageId, bobId);

  const likeCases = [
    {
      name: 'adds the id of a user who liked a message to its likes',
      state: undefined,
    },
    {
      name: 'adds the id of a user who liked a message to its likes and removes it from the dislikes',
      state: dislikedByBobPopularity,
    },
    {
      name: 'returns the same popularity if a user who already liked a message likes it again',
      state: likedByBobPopularity,
    },

  ];

  const dislikeCases = [
    {
      name: 'adds the id of a user who disliked a message to its dislikes',
      state: undefined,
    },
    {
      name: 'adds the id of a user who disliked a message to its dislikes and removes it from the likes',
      state: likedByBobPopularity,
    },
    {
      name: 'returns the same popularity if a user who already disliked a message dislikes it again',
      state: dislikedByBobPopularity,
    },

  ];

  likeCases.forEach(testCase => {
    it(testCase.name, () => {
      const expected = likedByBobPopularity;
      const state = testCase.state;

      const tested = messagePopularityReducer(state, likeAction);

      expect(tested).toEqual(expected);
    });
  });

  dislikeCases.forEach(testCase => {
    it(testCase.name, () => {
      const expected = dislikedByBobPopularity;

      const tested = messagePopularityReducer(testCase.state, dislikeAction);

      expect(tested).toEqual(expected);
    });
  });
});
