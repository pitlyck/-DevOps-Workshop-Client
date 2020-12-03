import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Immutable from 'immutable';
import { MessageContainer } from '../containers/MessageContainer';
import { IMessage } from '../models/Message';

export interface IMessageListingDataProps {
  readonly messages: Immutable.OrderedMap<Uuid, IMessage>;
}

export class MessageListing extends React.PureComponent<IMessageListingDataProps>   {
  static displayName = 'MessageListing';
  static propTypes = {
    messages: PropTypes.object,
  };
  private messagesBottomRef = React.createRef<HTMLDivElement>();

  constructor(props: IMessageListingDataProps) {
    super(props);
  }


  _prepareMessages = (messages: Immutable.OrderedMap<Uuid, IMessage>) => {
    return (messages && messages.map((message: IMessage, key: Uuid) => {
      return (
        <li key={key}>
          <MessageContainer message={message} />
        </li>
      );
    })
    ).toArray();
  };

  _scrollToBottom = () => {
    const node = this.messagesBottomRef.current;
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }

  componentDidMount() {
    setTimeout(this._scrollToBottom, 200);
  }

  componentDidUpdate(oldProps: IMessageListingDataProps) {
    const oldFirstMessageId = oldProps.messages.keySeq().toArray()[0];
    const newFirstMessageId = this.props.messages.keySeq().toArray()[0];
    const oldCount = oldProps.messages.count();
    const newCount = this.props.messages.count();
    if (oldFirstMessageId === newFirstMessageId && newCount > oldCount) {
      setTimeout(this._scrollToBottom, 200);
    }
  }

  render = () => (
    <ol className="none-list">
      {this._prepareMessages(this.props.messages)}
      <div ref={this.messagesBottomRef} />
    </ol>
  );

}


