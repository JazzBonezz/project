import {Link, useNavigate} from "react-router-dom";
import styles from "./NavBar.module.css";
import {useState, useEffect} from "react";
import {AiFillPieChart} from "react-icons/ai";
import {FaUser} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";


const NavBar = () => {
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            setUsername(localStorage.getItem("username"));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username");
        setUsername(null);
        navigate("/login");
    };

    return (
        <nav className={styles["navBar"]}>
            <div className={styles.logo}>
                <Link to="/feed" className={styles.logo}>Umbrella</Link>
            </div>

            <div className={styles.burger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <GiHamburgerMenu />
            </div>
            <ul className={styles["navList"]}>
                {username ? (
                    <>
                        <li>
                            <Link to="/login" onClick={handleLogout} className={styles["navBar-link"]}>
                                Exit
                            </Link>
                        </li>

                        <li className={styles["navItem"]}>
                            <Link to="/analytics" className={styles["navBar-link"]}>
                                <AiFillPieChart/>
                                Analytics
                            </Link>
                        </li>

                        <li>
                            <Link to="/feed" className={styles["navBar-link"]}>
                                <FaUser/> {username}
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/register" className={styles["navBar-link"]}>
                                Register
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className={styles["navBar-link"]}>
                                Login
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
