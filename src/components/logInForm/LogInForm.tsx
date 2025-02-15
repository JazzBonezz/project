import styles from './LogInForm.module.css';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate} from "react-router-dom";

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
            if (data.username === parsedUserData.username && data.password === parsedUserData.password) {
                localStorage.setItem("username", data.username);

                window.dispatchEvent(new Event("storage"));

                navigate('/feed');
            } else {
                alert("Invalid username or password");
            }
        } else {
            alert("User not found");
        }
    };

    return (
        <form className={styles['login-form']} onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <div className={styles['inputs']}>
                <label>
                    Username:<br />
                    <input
                        type="text"
                        {...register('username', {
                            required: "Enter name!",
                            minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters long"
                            },
                            maxLength: {
                                value: 20,
                                message: "Name must be no more than 20 characters long"
                            },
                            pattern: {
                                value: /^[A-Za-z]+$/i,
                                message: "Name must contain only letters"
                            }
                        })}
                    />
                </label>

                <label>
                    Password:<br />
                    <input
                        type="password"
                        {...register('password', {
                            required: "Enter password",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long"
                            },
                            maxLength: {
                                value: 20,
                                message: "Password must be no more than 20 characters long"
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                message: "Password must contain at least one letter, one number, and one special character"
                            }
                        })}
                    />
                </label>
            </div>

            <div className={styles['buttons']}>
                <button type="submit" disabled={!isValid}>Submit</button>
            </div>

            <div className={styles['error-text']}>
                {errors.password && <p role="alert">{errors.password.message}</p>}
                {errors.username && <p role="alert">{errors.username.message}</p>}
            </div>
        </form>
    );
};

export default LogInForm;
