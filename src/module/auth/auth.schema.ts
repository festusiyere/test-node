import { object, string, ref } from 'yup';

/**registration validator */
export const register = object({
    body: object({
        name: string().required('Name is required'),
        password: string()
            .required('Password is required')
            .min(6, 'Password is too short - should be 6 chars minimum.')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
        passwordConfirmation: string().required('Password Confirmation is required').oneOf([ref('password'), null], 'Passwords must match'),
        email: string().email('Must be a valid email').required('Email is required')
    })
});

/**login validator */
export const login = object({
    body: object({
        password: string()
            .required('Password is required')
            .min(6, 'Password is too short - should be 6 chars minimum.')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),

        email: string().email('Must be a valid email').required('Email is required')
    })
});

/**forget password validator */
export const forgetPassword = object({
    body: object({
        email: string().email('Must be a valid email').required('Email is required')
    })
});

/**rest password validdator */
export const resetPassword = object({
    body: object({
        password: string()
            .required('Password is required')
            .min(6, 'Password is too short - should be 6 chars minimum.')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
        passwordConfirmation: string().required('Password Confirmation is required').oneOf([ref('password'), null], 'Passwords must match')
    })
});
