import PropTypes from 'prop-types';
import React from 'react';
import { StatusPane } from './SavingStatus.styles.jsx';
import { SavingSpinner } from '../shared/SavingSpinner.jsx';

export class SavingStatus extends React.PureComponent {

    static propTypes = {
        watchedEntity: PropTypes.object.isRequired,
        isSaving: PropTypes.bool.isRequired,
        save: PropTypes.func.isRequired,
    };

    componentWillUpdate(nextProps) {
        if (this.props.watchedEntity !== nextProps.watchedEntity) {
            this.props.save();
        }
    }

    render() {
        const text = this.props.isSaving ? 'Saving' : 'Saved';
        const icon = this.props.isSaving
            ? <SavingSpinner />
            : <i className="glyphicon glyphicon-check" alt="Saved"/>;

        return (
            <StatusPane className="navbar-right">
                {icon}{'\u00A0'}{text}
            </StatusPane>
        );
    }
}
