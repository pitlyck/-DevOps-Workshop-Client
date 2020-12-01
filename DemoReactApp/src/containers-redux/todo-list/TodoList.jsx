import memoizee from 'memoizee';
import { connect } from 'react-redux';
import { TodoList } from '../../components/todo-list/TodoList.jsx';
import { openCreateNewForm } from '../../actions/todo-list/actionCreators';

const getListOfItems = (items) => items.allIds.map(id => items.byId.get(id)).toList();
const getListOfItemsMemoized = memoizee(getListOfItems);

const mapStateToProps = (state) => ({
    list: getListOfItemsMemoized(state.todoApp.items),
    editedItemId: state.todoApp.editedItemId,
    createNewFormVisible: state.todoApp.isCreateNewFormOpen,
});

const mapDispatchToProps = (dispatch) => ({
    onCreateNewClick: () => dispatch(openCreateNewForm()),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(TodoList);

export { connectedComponent as TodoListRedux };
