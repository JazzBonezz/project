import styles from './LogInForm.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { usernameValidation, passwordValidation } from '../../utils/validation/validation.ts';

type Inputs = {
    username: string;
    password: string;
};

const LogInForm = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<Inputs>({
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const userData = localStorage.getItem('userData');

        if (userData) {
            const parsedUserData = JSON.parse(userData);
            if (
                data.username === parsedUserData.username &&
                data.password === parsedUserData.password
            ) {
                localStorage.setItem('username', data.username);
                navigate('/feed');
                window.location.reload(); // лучше я ничего не придумал
            } else {
                message.error('Invalid username or password');
            }
        } else {
            message.error('User not found');
        }
    };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
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
            </div>

            <div className={styles.buttons}>
                <button type="submit" disabled={!isValid}>
                    Submit
                </button>
            </div>

            <div className={styles.errorText}>
                {errors.password && <p role="alert">{errors.password.message}</p>}
                {errors.username && <p role="alert">{errors.username.message}</p>}
            </div>
        </form>
    );
};

export default LogInForm;
