import { IState } from '../../shared/models/IState';
import { Dispatch } from 'redux';
import { selectChannel } from '../ActionCreators/channelActionCreators';
import { reorderChannelsRequest } from '../ActionCreators/requests/putChannelOrder';
import { deleteChannelRequest } from '../ActionCreators/requests/deleteChannel';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import {
  IChannelListingCallbackProps,
  IChannelListingDataProps,
  ChannelListing
} from '../components/ChannelListing';

const mapStateToProps = (state: IState): IChannelListingDataProps => {
  return {
    channels: state.channelListing.channels,
    channelIds: state.channelListing.channelIds
  };
};

const mapDispatchToProps = (dispatch: Dispatch /*,ownProps: IChannelListingContainerOwnProps*/): IChannelListingCallbackProps => {
  return {
    onDeleteChannel: (id: Uuid) => dispatch(deleteChannelRequest(id)),
    onSelectChannel: (id: Uuid) => dispatch(selectChannel(id)),
    onReorderChannels: (newChannelIds: Immutable.OrderedSet<Uuid>) => dispatch(reorderChannelsRequest(newChannelIds)),
  };
};

export const ChannelListingContainer = connect(mapStateToProps, mapDispatchToProps)(ChannelListing);
