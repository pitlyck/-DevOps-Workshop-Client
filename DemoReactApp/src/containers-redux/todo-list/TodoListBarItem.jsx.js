import { connect } from 'react-redux';
import { TodoListBarItem } from '../../containers/todo-list/TodoListBarItem.jsx';
import {
    deleteItem,
    moveItem,
    startEditingItem,
    startDragging,
    stopDragging
} from '../../actions/todo-list/actionCreators';

const mapStateToProps = (state) => ({
    expandDisabled: !!state.editedItemId || state.isDragging,
    reorderDisabled: !!state.editedItemId ||  state.isDragging,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onDelete: () => dispatch(deleteItem(ownProps.item.id)),
    onExpand: () => dispatch(startEditingItem(ownProps.item.id)),
    onReorder: (moveItemId, destinationItemId) => dispatch(moveItem(moveItemId, destinationItemId)),
    onDragStarted: () => dispatch(startDragging()),
    onDragEnded: () => dispatch(stopDragging())
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(TodoListBarItem);

export { connectedComponent as TodoListBarItem };
