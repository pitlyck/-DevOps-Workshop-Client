import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  IAnnotatedUser,
  IMessageCallbackProps,
  IMessageDataProps,
  Message
} from '../components/Message';
import {
  dislikeMessageRequest,
  likeMessageRequest
} from '../actionCreators/requests/updateMessage';
import { IState } from '../../shared/models/IState';
import { deleteMessageRequest } from '../actionCreators/requests/deleteMessage';
import { IMessage } from '../models/Message';
import { getUser } from '../../profile/utils/usersUtils';

interface IMessageContainerDataProps {
  readonly message: IMessage;
}

const mapStateToProps = (state: IState, { message }: IMessageContainerDataProps): IMessageDataProps => {
  const currentUserId = state.usersInfo.currentUserId;
  const annotatedUsers = message.annotatedUsers
    .map((userId: Uuid): IAnnotatedUser => {
      const user = getUser(state.usersInfo, userId);
      return {
        id: userId,
        name: user.name,
        avatarPath: user.avatarPath,
      };
    })
    .toList();
  const messagePos = message.authorId === currentUserId
    ? 'message-pane-pos-right'
    : 'message-pane-pos-left';

  const messageAuthor = getUser(state.usersInfo, message.authorId);

  return {
    message,
    messagePos,
    messageAuthor,
    currentUserId,
    annotatedUsers,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IMessageCallbackProps => {
  return {
    onLikeMessage: (message: IMessage) => dispatch(likeMessageRequest(message)),
    onDislikeMessage: (message: IMessage) => dispatch(dislikeMessageRequest(message)),
    onDeleteMessage: (messageId: Uuid) => dispatch(deleteMessageRequest(messageId)),
  };
};

export const MessageContainer = connect(mapStateToProps, mapDispatchToProps)(Message);
