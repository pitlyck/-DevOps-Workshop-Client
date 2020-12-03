import * as React from 'react';
import { IChannel } from '../models/Channel';
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  Modal,
  Table,
} from 'react-bootstrap';
import * as Immutable from 'immutable';
import { IUser } from '../../profile/models/User';
import { List } from 'immutable';
import { ICreateChannelDependencies } from '../ActionCreators/createChannelFactory';
import { toggleChannelMember } from '../utils/channelUtils';


export interface IChannelEditModalStateProps {
  readonly channel: IChannel;
  readonly users: List<IUser>;
}

export interface IChannelEditModalDispatchProps {
  readonly onAddChannel: (dependencies: ICreateChannelDependencies) => void;
  readonly onUpdateChannel: (id: Uuid, name?: string, users?: Immutable.List<Uuid>) => void;
}

export interface IChannelEditModalOwnProps {
  readonly onClose: () => void;
  readonly onSave: (channelName: string) => void;
  readonly show: boolean;
  readonly channel?: IChannel;
}

export type ChannelEditModalProps = IChannelEditModalOwnProps & IChannelEditModalStateProps & IChannelEditModalDispatchProps;

interface IChannelEditState {
  readonly nameValue: string;
  readonly membersIds: Immutable.List<Uuid>;
}

export class ChannelEditModal extends React.PureComponent<ChannelEditModalProps, IChannelEditState> {
  constructor(props: ChannelEditModalProps) {
    super(props);
    if (props.channel != null) {
      this.state = {
        nameValue: props.channel.name,
        membersIds: props.channel.users,
      };
    } else {
      this.state = {
        nameValue: '',
        membersIds: Immutable.List([]),
      };
    }
  }

  _handleNameChange = (event: any) => {
    const newName = event.target.value;
    this.setState(() => ({
      nameValue: newName
    }));
  };

  _handleUserChange = (id: Uuid) => {
    const newMembersIds = toggleChannelMember(id, this.state.membersIds);
    this.setState(() => ({
      membersIds: newMembersIds
    }));
  };

  _handleKeyPress = (event: React.KeyboardEvent<FormControl>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.props.channel) {
        this._updateChannel();
      }
      else {
        this._createChannel();
      }
    }
  };

  _updateChannel = () => {
    const id = this.props.channel.id;
    const name = this.state.nameValue;
    const users = this.state.membersIds;

    this.props.onUpdateChannel(id, name, users);
    this._resetForm();
    this.props.onClose();
  };

  _createChannel = () => {
    const dependencies: ICreateChannelDependencies = {
      name: this.state.nameValue,
      users: this.state.membersIds
    };

    this.props.onAddChannel(dependencies);
    this._resetForm();
    this.props.onClose();
  };

  _resetForm = () => {
    this.setState(() => ({
      nameValue: '',
      membersIds: Immutable.List([]),
    }));
  };

  render(): JSX.Element {
    return (
      <Modal show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.channel ? `Edit channel: ${this.props.channel.name}` : 'Create new channel'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup>
              <ControlLabel>Channel name</ControlLabel>
              <FormControl
                type="text"
                value={this.state.nameValue}
                placeholder="Enter channel name"
                onChange={this._handleNameChange}
                autoFocus
                onKeyPress={this._handleKeyPress}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Users</ControlLabel>
              <Table hover>
                <tbody>
                  {this.props.users.map((user: IUser) => (
                    <tr
                      key={user.id}
                      onClick={() => this._handleUserChange(user.id)}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: this.state.membersIds.contains(user.id) ? '#B7CBE3' : 'white'}}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <input type="checkbox"
                          checked={this.state.membersIds.contains(user.id)}
                          readOnly
                          // onChange={() => this._handleUserChange(user.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {this.props.channel ?
            <Button onClick={this._updateChannel}>Update channel</Button> :
            <Button onClick={this._createChannel}>Create channel</Button>}
        </Modal.Footer>
      </Modal>
    );
  }
}


