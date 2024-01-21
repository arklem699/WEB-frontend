import '../styles/NavBar.css';
import { Link } from "react-router-dom";


const NavBar = () => {

    return (
        <div>
            <nav>
            <Link to={"/"}>
                Главная
            </Link>
            </nav>
        </div>
    )
};

export default NavBar;