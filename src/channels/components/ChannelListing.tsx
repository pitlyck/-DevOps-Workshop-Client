import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Immutable from 'immutable';
import { ChannelBarItem } from './ChannelBarItem';
import { ChannelEditModalContainer } from '../containers/ChannelEditModalContainer';
import { IChannel } from '../models/Channel';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult
} from 'react-beautiful-dnd';

export interface IChannelListingDataProps {
  readonly channels: Immutable.Map<Uuid, IChannel>;
  readonly channelIds: Immutable.OrderedSet<Uuid>;
}

export interface IChannelListingCallbackProps {
  readonly onDeleteChannel: (id: Uuid) => void;
  readonly onSelectChannel: (id: Uuid) => void;
  readonly onReorderChannels: (newChannelIds: Immutable.OrderedSet<Uuid>) => void;
}

type ChannelListingProps = IChannelListingDataProps & IChannelListingCallbackProps;

interface IChannelListingStateProps {
  readonly showChannelModal: boolean;
}

export class ChannelListing extends React.PureComponent<ChannelListingProps, IChannelListingStateProps> {
  static displayName = 'ChannelListing';
  static propTypes = {
    channels: PropTypes.object,
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

  _onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newChannelIds: Uuid[] = this.props.channelIds.toArray();
    newChannelIds.splice(source.index, 1); // Remove the moved channel ID from array
    newChannelIds.splice(destination.index, 0, draggableId); // Add the moved ID to the destination index
    const newOrderedSet = Immutable.OrderedSet<Uuid>(newChannelIds);
    this.props.onReorderChannels(newOrderedSet);
  };

  render(): JSX.Element {
    return (
      <>
        <div className="channel-taskbar">
          <span className="channel-taskbar_title">Channels</span>
          <span className="glyphicon glyphicon-plus add-channel-icon"
                title="Add a channel"
                onClick={this._openModal}
                aria-hidden="true"/>
        </div>
        <DragDropContext
          onDragEnd={this._onDragEnd}
        >
          <Droppable droppableId={'Channel-listing-droppable'}>
            {(provided: DroppableProvided) => (
              <ol className="channels-ordered-list" ref={provided.innerRef}>
                {this.props.channelIds.toArray().map((channelId: Uuid, index: number) => {
                  const channel = this.props.channels.get(channelId);
                  return channel ? (
                    <li key={channel.id}>
                      <ChannelBarItem
                        channelName={channel.name}
                        channelId={channel.id}
                        key={channel.id}
                        channelIndex={index}
                        onSelectChannel={this.props.onSelectChannel}
                        onDeleteChannel={this.props.onDeleteChannel}
                      />
                    </li>) : null;
                })}
                {provided.placeholder}
              </ol>
            )}
          </Droppable>
        </DragDropContext>
        <ChannelEditModalContainer show={this.state.showChannelModal} onClose={this._closeModal}/>
      </>
    );
  }
}
