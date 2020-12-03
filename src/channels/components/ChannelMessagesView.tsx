import * as React from 'react';
import * as PropTypes from 'prop-types';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { RichTextEditorContainer } from '../../messages/containers/RichTextEditorContainer';
import {
  Route,
  RouteComponentProps
} from 'react-router';
import { withRouterPropTypes } from '../../shared/utils/routerProps';
import { SPECIFIC_CHANNEL_VIEW_ROUTE } from '../../shared/constants/routes';
import { MessageListingWrapperContainer } from '../../messages/containers/MessageListingWrapperContainer';
import { Spinner } from '../../shared/components/Spinner';

export interface IChannelViewDataProps extends RouteComponentProps {
  readonly channelName: string | null;
  readonly currentChannelId: Uuid | null;
  readonly areUsersLoaded: boolean;
}

export class ChannelMessagesView extends React.PureComponent<IChannelViewDataProps> {
  static displayName = 'ChannelMessagesView';
  static propTypes = {
    channelName: PropTypes.string,
    areUsersLoaded: PropTypes.bool.isRequired,
    currentChannelId: PropTypes.string,
    ...withRouterPropTypes,
  };

  render() {
    const { channelName, currentChannelId, areUsersLoaded, history } = this.props;
    return (
      <span className="channel-view-flex-container">
        <div className="top-bar-cont">
          <h1>{channelName ? channelName : null}</h1>
        </div>
        <div className="channel-view-cont">
          {currentChannelId && areUsersLoaded ?
            <Route
              path={SPECIFIC_CHANNEL_VIEW_ROUTE(currentChannelId)}
              location={history.location}
              component={MessageListingWrapperContainer}
            /> : <Spinner />}
        </div>
        <RichTextEditorContainer />
      </span>
    );
  }
}
