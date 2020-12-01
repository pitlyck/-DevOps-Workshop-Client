import { connect } from 'react-redux';
import { TodoListEditedItem } from '../../containers/todo-list/TodoListEditedItem.jsx';
import {
    cancelEditingItem,
    updateItem,
} from '../../actions/todo-list/actionCreators';

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (item) => dispatch(updateItem(item)),
    onCancel: () => dispatch(cancelEditingItem()),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(TodoListEditedItem);

export { connectedComponent as TodoListEditedItem };
