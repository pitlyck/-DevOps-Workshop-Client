import * as React from 'react';
import * as PropTypes from 'prop-types';

class Error extends React.PureComponent {
    static propTypes = {
        error: PropTypes.shape({
            id: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
        }).isRequired,
        onClick: PropTypes.func.isRequired,
    };

    _onClick = () => this.props.onClick(this.props.error.id);

    render()
    {
        return (<div
                className="alert alert-danger alert-dismissible text-center"
                role="alert"
            >
                <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={this._onClick}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>Oh snap!</strong>
                &nbsp;
                {this.props.error.message}
            </div>
        );
    }
}

const Errors = ({ errors, onDismissClick }) => (
    (errors || [])
    && errors.map(error => (
        <Error key={error.id} error={error} onClick={onDismissClick} />
    ))
);

Errors.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    }).isRequired),
    onDismissClick: PropTypes.func.isRequired,
};

export { Errors };