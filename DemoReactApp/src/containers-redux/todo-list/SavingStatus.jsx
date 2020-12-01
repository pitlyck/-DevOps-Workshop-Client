import { connect } from 'react-redux';
import { SavingStatus } from '../../components/todo-list/SavingStatus.jsx';
import { saveItems } from '../../actions/todo-list/saveItems';

const mapStateToProps = (state) => ({
    watchedEntity: state.todoApp.items,
    isSaving: state.todoApp.isSaving,
});

const mapDispatchToProps = (dispatch) => ({
    save: () => dispatch(saveItems())
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(SavingStatus);

export { connectedComponent as SavingStatus };
