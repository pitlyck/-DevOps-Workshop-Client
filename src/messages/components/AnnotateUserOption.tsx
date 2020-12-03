import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Immutable from 'immutable';
import { IUser } from '../../profile/models/User';
import {
  Button,
  Checkbox,
  Modal
} from 'react-bootstrap';
import { Avatar } from '../../profile/components/Avatar';

export interface IAnnotateUserOptionProps {
  readonly users: Immutable.List<IUser>;
  readonly onAnnotationChange: (users: Immutable.Set<Uuid>) => void;
  readonly annotatedUserIds: Immutable.Set<Uuid>;
}

export interface IAnnotateUserOptionStateProps {
  readonly isOpen: boolean;
  readonly annotatedUserIds: Immutable.Set<Uuid>;
}

export class AnnotateUserOption extends React.PureComponent<IAnnotateUserOptionProps, IAnnotateUserOptionStateProps> {
  static displayName = 'AnnotateUserOption';
  static propTypes = {
    users: PropTypes.object.isRequired,
    annotatedUserIds: PropTypes.object.isRequired,

    onAnnotationChange: PropTypes.func.isRequired,
  };

  constructor(props: IAnnotateUserOptionProps) {
    super(props);
    this.state = {
      isOpen: false,
      annotatedUserIds: Immutable.Set<Uuid>(),
    };
  }

  componentWillReceiveProps(nextProps: IAnnotateUserOptionProps) {
    const { annotatedUserIds } = nextProps;
    if (!annotatedUserIds.equals(this.state.annotatedUserIds)) {
      this.setState(() => ({ annotatedUserIds }));
    }
  }

  _toggleAnnotated(id: Uuid): Immutable.Set<Uuid> {
    const { annotatedUserIds } = this.state;
    if (annotatedUserIds.contains(id)) {
      return annotatedUserIds.remove(id);
    }
    return annotatedUserIds.add(id);
  }

  _handleUserTick = (id: Uuid) => () => {
    const newUserIds = this._toggleAnnotated(id);
    // This component receives empty props.annotatedUserIds every fake message request for some reason.
    // Therefore this function is called and not just set.state
    this.props.onAnnotationChange(newUserIds);
  };

  _handleAnnotate = () => {
    const { onAnnotationChange } = this.props;
    onAnnotationChange(this.state.annotatedUserIds);
    this._closeModal();
  };

  _closeModal = () => {
    this.setState(() => ({ isOpen: false }));
  };

  _openModal = () => {
    this.setState(() => ({ isOpen: true }));
  };

  _isChecked = (userId: Uuid) => (
    this.state.annotatedUserIds.contains(userId)
  );

  render() {
    return (
      <div className="custom-rte-option">
        <div className="rdw-option-wrapper" onClick={this._openModal}>
          @
        </div>
        <Modal
          onHide={this._closeModal}
          show={this.state.isOpen}
          container={this}
        >
          <Modal.Header>
            <Modal.Title>Select users to annotate</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.props.users.map((user: IUser) => {
              return (
                <Checkbox
                  key={user.id}
                  onChange={this._handleUserTick(user.id)}
                  checked={this._isChecked(user.id)}
                >
                  <div className="annotated-user">
                    <Avatar
                      avatarPath={user.avatarPath}
                      avatarSize="annotated-avatar"
                    />
                    <span> {user.name} </span>
                  </div>
                </Checkbox>
              );
            })}
          </Modal.Body>

          <Modal.Footer className="form-group">
                  <Button
                    block
                    className="btn-block"
                    bsStyle="primary"
                    onClick={this._handleAnnotate}
                  >Annotate selected users</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
