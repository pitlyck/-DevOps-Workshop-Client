import * as Immutable from 'immutable';
import {
  AnnotateUserOption,
  IAnnotateUserOptionProps,
} from '../components/AnnotateUserOption';
import { IState } from '../../shared/models/IState';
import { connect } from 'react-redux';

interface AnnotateUserOptionContainerOwnProps {
  readonly onAnnotationChange: (users: Immutable.Set<Uuid>) => void;
  readonly annotatedUserIds: Immutable.Set<Uuid>;
}

const mapStateToProps = (state: IState, ownProps: AnnotateUserOptionContainerOwnProps): IAnnotateUserOptionProps => ({
  users: state.usersInfo.users.toList(),
  annotatedUserIds: ownProps.annotatedUserIds,
  onAnnotationChange: ownProps.onAnnotationChange,
});

export const AnnotateUserOptionContainer = connect(mapStateToProps)(AnnotateUserOption);
