import { MESSAGE_CREATE } from '../../shared/constants/actionTypes';
import { RawDraftContentState } from 'draft-js';

export interface ICreateMessageDependencies {
  readonly text: RawDraftContentState;
  readonly authorId: Uuid;
  readonly channelId: Uuid;
}

export const createMessageFactory = (idGenerator: () => Uuid, timestampGenerator: () => number): ((dependencies: ICreateMessageDependencies) => Action) =>
  (dependencies: ICreateMessageDependencies): Action => ({
    type: MESSAGE_CREATE,
    payload: {
      id: idGenerator(),
      text: dependencies.text,
      channelId: dependencies.channelId,
      authorId: dependencies.authorId,
      timeStamp: timestampGenerator(),
    },
  });
