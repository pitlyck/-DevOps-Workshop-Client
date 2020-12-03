import { connect } from 'react-redux';
import {
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import { IState } from '../../shared/models/IState';
import {
  ContentWrapper,
  IContentWrapperCallbackProps,
  IContentWrapperDataProps
} from '../../shared/components/ContentWrapper';
import { Dispatch } from 'redux';
import { fetchAllUsers } from '../../profile/actionCreators/requests/fetchAllUsers';

const mapStateToProps = (state: IState, ownProps: RouteComponentProps<any>): IContentWrapperDataProps => ({
  ...ownProps,
  isLoadingUsers: state.appInfo.isLoadingUsers,
});

const mapDispatchToProps = (dispatch: Dispatch): IContentWrapperCallbackProps => ({
  loadAllUsers: () => dispatch(fetchAllUsers()),
});

export const ContentWrapperContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ContentWrapper));
