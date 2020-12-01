import { connect } from 'react-redux';
import { LogoutButton } from '../../components/app/LogoutButton.jsx';
import { logoutUser } from '../../actions/shared/logoutUser';

const mapDispatchToProps = (dispatch) => ({
    onClick: () => dispatch(logoutUser())
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(LogoutButton);

export { connectedComponent as LogoutButton };
