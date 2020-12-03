import {
  MESSAGE_DISLIKE,
  MESSAGE_LIKE
} from '../../shared/constants/actionTypes';
import {
  IMessagePopularity,
  MessagePopularity
} from '../models/MessagePopularity';

export const messagePopularityReducer = (prevState: IMessagePopularity = new MessagePopularity(), action: Action): IMessagePopularity => {
  switch (action.type) {
    case MESSAGE_DISLIKE: {
      const { userId } = action.payload;

      const newLikes = prevState.likes.delete(userId);
      const newDislikes = prevState.dislikes.add(userId);

      return prevState.with({
        likes: newLikes,
        dislikes: newDislikes,
      });
    }

    case MESSAGE_LIKE: {
      const { userId } = action.payload;

      const newLikes = prevState.likes.add(userId);
      const newDislikes = prevState.dislikes.delete(userId);

      return prevState.with({
        likes: newLikes,
        dislikes: newDislikes,
      });
    }

    default:
      return prevState;
  }
};
