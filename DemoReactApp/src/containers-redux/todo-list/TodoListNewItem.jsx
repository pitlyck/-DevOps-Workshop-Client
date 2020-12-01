import { connect } from 'react-redux';
import {uuid} from '../../utils/uuidGenerator';
import { TodoListEditedItem } from '../../containers/todo-list/TodoListEditedItem.jsx';
import {
    createNewItem,
    closeCreateNewForm,
} from '../../actions/todo-list/actionCreators';

const mapStateToProps = () => ({
    submitButtonText: 'Create',
    item: {
        id: uuid(),
        title: '',
        description: ''
    }
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (item) => dispatch(createNewItem(item)),
    onCancel: () => dispatch(closeCreateNewForm()),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(TodoListEditedItem);

export { connectedComponent as TodoListNewItem };
