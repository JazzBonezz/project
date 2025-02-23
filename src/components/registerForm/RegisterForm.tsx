import styles from './RegisterForm.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { usernameValidation, passwordValidation } from '../../utils/validation/validation.ts';

type Inputs = {
    username: string;
    password: string;
    confirmPassword: string;
};

const RegisterForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<Inputs>({ mode: 'onBlur' });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        localStorage.setItem('userData', JSON.stringify(data));
        navigate('/login');
    };

    const password = watch('password');

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <h1>Registration</h1>
            <div className={styles.inputs}>
                <label>
                    Username:
                    <br />
                    <input type="text" {...register('username', usernameValidation)} />
                </label>

                <label>
                    Password:
                    <br />
                    <input type="password" {...register('password', passwordValidation)} />
                </label>

                <label>
                    Confirm Password:
                    <br />
                    <input
                        type="password"
                        {...register('confirmPassword', {
                            required: 'Confirm your password',
                            validate: (value) => value === password || 'Passwords do not match',
                        })}
                    />
                </label>
            </div>

            <div className={styles.buttons}>
                <button disabled={!isValid} type="submit" className={styles.button}>
                    Submit
                </button>
            </div>

            <div className={styles.errorText}>
                {errors.password && <p role="alert">{errors.password.message}</p>}
                {errors.username && <p role="alert">{errors.username.message}</p>}
                {errors.confirmPassword && <p role="alert">{errors.confirmPassword.message}</p>}
            </div>
        </form>
    );
};

export default RegisterForm;
