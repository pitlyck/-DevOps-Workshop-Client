import * as React from 'react';
import {
  Route,
  RouteComponentProps
} from 'react-router-dom';
import { ChannelListingWrapperContainer } from '../../channels/containers/ChannelListingWrapperContainer';
import { UserCardContainer } from '../../profile/containers/UserCardContainer';
import { withRouterPropTypes } from '../utils/routerProps';
import { ProfileView } from '../../profile/components/ProfileView';
import {
  CHANNEL_VIEW_ROUTE,
  PROFILE_VIEW_ROUTE
} from '../constants/routes';
import { ChannelMessagesViewContainer } from '../../channels/containers/ChannelMessagesViewContainer';
import * as PropTypes from 'prop-types';
import { Spinner } from './Spinner';

export interface IContentWrapperDataProps extends RouteComponentProps<any> {
  readonly isLoadingUsers: boolean;
}

export interface IContentWrapperCallbackProps {
  readonly loadAllUsers: () => void;
}

type ContentWrapperProps = IContentWrapperCallbackProps & IContentWrapperDataProps;

export class ContentWrapper extends React.PureComponent<ContentWrapperProps> {
  static displayName = 'ContentWrapper';
  static propTypes = {
    ...withRouterPropTypes,
    isLoadingUsers: PropTypes.bool.isRequired,

    loadAllUsers: PropTypes.func.isRequired,
  };

  stopListening: Function | null;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const { history, loadAllUsers } = this.props;
    loadAllUsers();
    this.stopListening = history.listen(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.stopListening) {
      this.stopListening();
    }
  }

  render(): JSX.Element {
    const { isLoadingUsers } = this.props;
    return (
      <div className="content-wrapper full-height">
        <div className="sidebar-container">
          <div className="user-card">
            {isLoadingUsers ? <Spinner/> : <UserCardContainer/>}
          </div>
          <ChannelListingWrapperContainer/>
        </div>
        <div className="content-container">
          <Route
            exact
            location={this.props.history.location}
            path={PROFILE_VIEW_ROUTE}
            component={ProfileView}
          />
          <Route
            location={this.props.history.location}
            path={CHANNEL_VIEW_ROUTE}
            component={ChannelMessagesViewContainer}
          />
        </div>
      </div>
    );
  }
}
