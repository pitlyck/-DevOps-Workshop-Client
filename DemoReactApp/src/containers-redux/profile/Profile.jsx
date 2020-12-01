import { connect } from 'react-redux';
import { Profile } from '../../components/profile/Profile.jsx';
import { fetchUserDetails } from '../../actions/profile/fetchUserDetails';

const mapDispatchToProps = (dispatch) => ({
    fetchDetails: () => dispatch(fetchUserDetails())
});

const stateEnhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = stateEnhancer(Profile);

export { connectedComponent as Profile };
