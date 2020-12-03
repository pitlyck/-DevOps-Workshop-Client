import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IChannelListingWrapperCallbackProps, IChannelListingWrapperDataProps, ChannelListingWrapper } from '../components/ChannelListingWrapper';
import { IState } from '../../shared/models/IState';
import { fetchChannels } from '../ActionCreators/requests/fetchChannels';

const mapStateToProps = (state: IState): IChannelListingWrapperDataProps => ({
  isLoading: state.appInfo.isLoadingChannels,
});

const mapDispatchToProps = (dispatch: Dispatch): IChannelListingWrapperCallbackProps => {
  return ({
    getChannels: () => dispatch(fetchChannels()),
  });
};

export const ChannelListingWrapperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelListingWrapper);
