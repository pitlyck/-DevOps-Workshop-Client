export const validateNonEmptyness = (fieldName) =>
    (value) =>
        value && value.length
            ? undefined
            : `Provide us with a ${fieldName}`;

export const validatePhone = (value) =>
    !value || /^\d+$/.test(value.replace(/[\s-]/g, ''))
        ? undefined
        : 'Leave some digits (using dashes and spaces freely) or omit the phone comptely.';

