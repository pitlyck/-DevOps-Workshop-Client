import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input } from './Input.jsx';
import { UpdatePane } from './UpdatePane.jsx';
import {
    validateNonEmptyness,
    validatePhone
} from '../../utils/validation';
import * as formStates from '../../constants/formStates';

const validateFullName = validateNonEmptyness('full name');

const getFormState = (dirty, valid, submitting ) => {
    if(!dirty) {
        return formStates.NOT_CHANGED;
    }

    if(!valid) {
        return formStates.INVALID;
    }

    if(submitting) {
        return formStates.SAVING_NOW;
    }

    return formStates.SAVEAVBLE;
};

const Details = ({ handleSubmit, valid, dirty, submitting }) => (
    <div className="panel panel-default">
        <div className="panel-body">
            <form onSubmit={handleSubmit}>
                <Field
                    type="email"
                    placeholder="undefined@null.zero"
                    screenReaderName="E-mail"
                    glyphiconClassName="glyphicon-envelope"
                    readOnly
                    required
                    name="email"
                    component={Input}
                />
                <Field
                    type="text"
                    placeholder="David Allen"
                    screenReaderName="Full name"
                    glyphiconClassName="glyphicon-user"
                    name="fullName"
                    required
                    component={Input}
                    validate={validateFullName}
                />
                <Field
                    type="tel"
                    placeholder="0118 999 881 999 119 7253"
                    screenReaderName="Phone number"
                    glyphiconClassName="glyphicon-phone"
                    name="phone"
                    component={Input}
                    validate={validatePhone}
                />

                <UpdatePane formState={getFormState(dirty, valid, submitting)}/>
            </form>
        </div>
    </div>
);

Details.propTypes = {
    valid: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export { Details };