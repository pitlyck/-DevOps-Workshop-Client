import { connect } from 'react-redux';
import {IState} from '../../shared/models/IState';
import {IMessageListingDataProps, MessageListing} from '../components/MessageListing';

const mapStateToProps = (state: IState): IMessageListingDataProps => ({
  messages: state.messageListing.messages,
});

export const MessageListingContainer = connect(mapStateToProps)(MessageListing);
