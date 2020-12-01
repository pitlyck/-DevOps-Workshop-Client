import { connect } from 'react-redux';
import { Errors } from '../../components/shared/Errors.jsx';
import memoizee from 'memoizee';
import { dismissError } from '../../actions/shared/actionCreators';

const flattenErrors = errors => errors.valueSeq().toArray();
const flattenErorrsMemoized = memoizee(flattenErrors);

const mapStateToProps = (state) => ({
    errors: flattenErorrsMemoized(state.shared.errors),
});

const mapDispatchToProps = (dispatch) => ({
    onDismissClick: (errorId) => dispatch(dismissError(errorId)),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(Errors);

export { connectedComponent as Errors };
