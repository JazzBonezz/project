import styles from './RegisterForm.module.css';
import {useForm, SubmitHandler} from "react-hook-form";
import {useNavigate} from "react-router-dom";


type Inputs = {
    username: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm = () => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        watch
    } = useForm<Inputs>({
        mode: 'onBlur',
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        localStorage.setItem('userData', JSON.stringify(data));
        navigate('/login');
    }
    const password = watch("password");

    return (

        <form className={styles['login-form']} onSubmit={handleSubmit(onSubmit)}>
            <h1>Registration</h1>
            <div className={styles['inputs']}>
                <label>
                    Username:<br/>
                    <input
                        type="text"
                        {...register('username', {
                            required: "Enter name!",
                            minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters long"
                            },
                            maxLength: {
                                value: 20, // Максимальная длина имени
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
                    Password:<br/>
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

                <label>
                    Confirm Password:<br />
                    <input
                        type="password"
                        {...register("confirmPassword", {
                            required: "Confirm your password",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                    />
                </label>


            </div>

            <div className={styles['buttons']}>
                <button disabled={!isValid} type={"submit"} className={styles['.button']}>Submit</button>
            </div>

            <div className={styles['error-text']}>
                {errors.password && <p role="alert">{errors.password.message}</p>}
                {errors.username && <p role="alert">{errors.username.message}</p>}
                {errors.confirmPassword && <p role="alert">{errors.confirmPassword.message}</p>}
            </div>

        </form>
    );
};

export default RegisterForm;