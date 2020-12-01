import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Avatar } from '../../containers-redux/profile/Avatar.jsx';
import { Details } from '../../containers-redux/profile/Details.jsx';
import { Loader } from '../../containers-redux/shared/Loader.jsx';

class Profile extends React.PureComponent {
    static propTypes = {
        fetchDetails: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.fetchDetails();
    }

    render() {
        return [
            <div className="col-xs-12 col-md-4" key="picture">
                <Loader stateLoadingSelector={state => state.profile.isFetchingAvatar}>
                    <Avatar />
                </Loader>
            </div>,
            <div className="col-xs-12 col-md-8" key="details">
                <Loader stateLoadingSelector={state => state.profile.isFetchingDetails}>
                    <Details />
                </Loader>
            </div>
        ];
    }
}

export { Profile };