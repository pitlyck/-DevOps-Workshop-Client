import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ChannelEditModalContainer } from '../containers/ChannelEditModalContainer';
import { DropdownButton, Glyphicon, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SPECIFIC_CHANNEL_VIEW_ROUTE } from '../../shared/constants/routes';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

interface IChannelBarItemProps {
  readonly channelName: string;
  readonly channelId: Uuid;
  readonly channelIndex: number;
  readonly onDeleteChannel: (id: Uuid) => void;
  readonly onSelectChannel: (id: Uuid) => void;
}

interface IChannelBarItemState {
  showChannelModal: boolean;
}

export class ChannelBarItem extends React.PureComponent<IChannelBarItemProps, IChannelBarItemState> {
  static displayName = 'ChannelBarItem';

  static propTypes = {
    channelName: PropTypes.string.isRequired,
    channelId: PropTypes.string.isRequired,
    channelIndex: PropTypes.number.isRequired,
    onDeleteChannel: PropTypes.func.isRequired,
    onSelectChannel: PropTypes.func.isRequired,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      showChannelModal: false,
    };
  }

  _closeModal = () => {
    this.setState(() => ({
      showChannelModal: false,
    }));
  };

  _openModal = () => {
    this.setState(() => ({
      showChannelModal: true,
    }));
  };

  _handleUpdate = () => {
    this._openModal();
  };

  _selectChannel = () => {
    this.props.onSelectChannel(this.props.channelId);
  };


  _deleteChannel = () => {
    this.props.onDeleteChannel(this.props.channelId);
  };

  render(): JSX.Element {
    return (
      <Draggable key={this.props.channelId} draggableId={this.props.channelId} index={this.props.channelIndex}>
        {(provided: DraggableProvided) => (
          <div className="channel-bar-item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <span
              className="glyphicon glyphicon-sort channel-bar-item_drag-icon visible-on-hover"
              title="Reordered channels"
              aria-hidden="true"
            />
            <Link
              to={SPECIFIC_CHANNEL_VIEW_ROUTE(this.props.channelId)}
              className="channel-bar-item_channel-label"
              onClick={this._selectChannel}
            >
              <span>
                {this.props.channelName}
              </span>
            </Link>
            <DropdownButton
              bsStyle="link"
              title={
                <div style={{ display: 'inline-block' }}>
                  <Glyphicon glyph="option-vertical" />
                </div>}
              noCaret
              pullRight
              id="dropdown-no-caret"
              className="channel-bar-item_open-options-icon"
            >
              <MenuItem onClick={this._handleUpdate}>Edit</MenuItem>
              <MenuItem onClick={this._deleteChannel}>Delete</MenuItem>
            </DropdownButton>
            {this.state.showChannelModal ? <ChannelEditModalContainer show={this.state.showChannelModal} onClose={this._closeModal} channelId={this.props.channelId} /> : null}
          </div>
        )}
      </Draggable>
    );
  }
}
