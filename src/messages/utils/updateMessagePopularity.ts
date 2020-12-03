import { IMessage } from '../models/Message';

export const likePopularity = (message: IMessage, userId: Uuid): IMessage => {
  const oldPopularity = message.popularity;
  const { likes, dislikes } = oldPopularity;
  const newPopularity = oldPopularity.with({ likes: likes.add(userId), dislikes: dislikes.delete(userId) });

  return message.with({ popularity: newPopularity });
};

export const dislikePopularity = (message: IMessage, userId: Uuid): IMessage => {
  const oldPopularity = message.popularity;
  const { likes, dislikes } = oldPopularity;
  const newPopularity = oldPopularity.with({ likes: likes.delete(userId), dislikes: dislikes.add(userId) });

  return message.with({ popularity: newPopularity });
};
