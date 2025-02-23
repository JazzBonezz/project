export const usernameValidation = {
    required: 'Enter name!',
    minLength: {
        value: 3,
        message: 'Name must be at least 3 characters long',
    },
    maxLength: {
        value: 20,
        message: 'Name must be no more than 20 characters long',
    },
    pattern: {
        value: /^[A-Za-z]+$/i,
        message: 'Name must contain only letters',
    },
};

export const passwordValidation = {
    required: 'Enter password',
    minLength: {
        value: 8,
        message: 'Password must be at least 8 characters long',
    },
    maxLength: {
        value: 20,
        message: 'Password must be no more than 20 characters long',
    },
    pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        message: 'Password must contain at least one letter, one number, and one special character',
    },
};
