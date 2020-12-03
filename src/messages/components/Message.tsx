import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Immutable from 'immutable';
import { Editor } from 'react-draft-wysiwyg';
import { Avatar } from '../../profile/components/Avatar';
import { IMessage } from '../models/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  convertFromRaw,
  EditorState,
} from 'draft-js';
import { IUser } from '../../profile/models/User';
import { AnnotatedUserPane } from './AnnotatedUserPane';

export interface IMessageCallbackProps {
  readonly onLikeMessage: (message: IMessage) => Promise<Action>;
  readonly onDislikeMessage: (message: IMessage) => Promise<Action>;
  readonly onDeleteMessage: (messageId: Uuid) => void;
}

export interface IAnnotatedUser {
  readonly name: string;
  readonly avatarPath: string;
  readonly id: Uuid;
}

export interface IMessageDataProps {
  readonly messagePos: string;
  readonly messageAuthor: IUser;
  readonly message: IMessage;
  readonly currentUserId: Uuid;
  readonly annotatedUsers: Immutable.List<IAnnotatedUser>;
}

type MessageProps = IMessageCallbackProps & IMessageDataProps;

export class Message extends React.PureComponent<MessageProps> {
  static displayName = 'Message';
  static propTypes = {
    message: PropTypes.object.isRequired,
    messagePos: PropTypes.string.isRequired,
    messageAuthor: PropTypes.object.isRequired,
    currentUserId: PropTypes.string.isRequired,
    annotatedUsers: PropTypes.object.isRequired,

    onLikeMessage: PropTypes.func.isRequired,
    onDislikeMessage: PropTypes.func.isRequired,
  };

  _handleIndicatePreference = (indicatePreference: (message: IMessage) => Promise<Action>) => {
    const { message } = this.props;
    return indicatePreference(message);
  };

  _onLike = () => {
    this._handleIndicatePreference(this.props.onLikeMessage);
  };

  _onDislike = () => {
    this._handleIndicatePreference(this.props.onDislikeMessage);
  };

  _onDelete = () => {
    const { message, currentUserId, onDeleteMessage } = this.props;
    if (message.authorId === currentUserId) {
      onDeleteMessage(message.id);
    }
  };

  _messageContent = (): EditorState => {
    const { text } = this.props.message;
    if (text) {
      const contentState = convertFromRaw(text);
      const editorState = EditorState.createWithContent(contentState);
      return editorState;
    }
    return EditorState.createEmpty();
  };

  render(): JSX.Element {
    const { message, messagePos, messageAuthor, annotatedUsers } = this.props;
    const { likes, dislikes } = message.popularity;
    const messageLikesCount = likes.size - dislikes.size;

    return (
      <div className={messagePos}>
        <div className="message-pane">
          <Avatar
            avatarPath={messageAuthor.avatarPath}
            avatarPos="avatar-side"
            avatarSize="mini-avatar"
          />
          <div className="message-side">
            <div className="top-message-bar">
              <div className="--content-left">
                {messageAuthor.name}
              </div>
              <div className="--content-right">
                <div
                  className="small-icon glyphicon glyphicon-trash"
                  onClick={this._onDelete}
                />
                <div
                  className="small-icon glyphicon glyphicon-thumbs-down"
                  onClick={this._onDislike}
                />
                <div className="small-icon" style={{ fontWeight: 'bold' }}>
                  {messageLikesCount}
                </div>
                <div
                  className="small-icon glyphicon glyphicon-thumbs-up"
                  onClick={this._onLike}
                />
              </div>
            </div>
            <div className="text-container message-pane-block"/>
            <Editor
              readonly
              editorState={this._messageContent()}
              toolbarClassName="RTE-without-toolbar"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
            />
            <AnnotatedUserPane annotatedUsers={annotatedUsers}/>
          </div>
        </div>
      </div>
    );
  }
}
