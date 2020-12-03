import * as React from 'react';
import * as PropTypes from 'prop-types';
import { MessageListingContainer } from '../containers/MessageListingContainer';
import { Spinner } from '../../shared/components/Spinner';
import Timer = NodeJS.Timer;

export interface IMessageListingWrapperDataProps {
  readonly isLoading: boolean;
  readonly currentChannelId: Uuid;
}

export interface IMessageListingWrapperCallbackProps {
  readonly getMessages: () => Promise<Action>;
  readonly fakeReceiveMessages: () => Promise<Action>;
}

type MessageListingWrapperProps = IMessageListingWrapperDataProps & IMessageListingWrapperCallbackProps;

export class MessageListingWrapper extends React.PureComponent<MessageListingWrapperProps> {
  static displayName = 'Loader';
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    currentChannelId: PropTypes.string.isRequired,

    getMessages: PropTypes.func.isRequired,
    fakeReceiveMessages: PropTypes.func.isRequired,
  };
  _pendingTimeout: Timer;

  constructor(props: MessageListingWrapperProps) {
    super(props);
  }

  componentDidMount() {
    this._handleLoadMessages();
    this._handleReceiveMessage();
  }

  componentDidUpdate(prevProps: MessageListingWrapperProps) {
    const { currentChannelId } = this.props;

    if (prevProps.currentChannelId !== currentChannelId) {
      this._handleLoadMessages();
    }
  }

  componentWillUnmount() {
    clearTimeout(this._pendingTimeout);
  }

  _handleLoadMessages = () => this.props.getMessages();

  _handleReceiveMessage = () => {
    this._pendingTimeout = setInterval(() => this.props.fakeReceiveMessages(), 2500);
  };

  render() {
    const { isLoading } = this.props;
    return (
      <div className="message-list">
        {isLoading ?
          <Spinner/> : <MessageListingContainer/>}
      </div>
    );
  }
}
