import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer({ user }) {
    return (
        <footer>
            <ul>
                <li><a href='https://github.com/GJMattia' target="_blank">Github</a></li>
                <li><a href='https://www.linkedin.com/in/greg-mattia/' target="_blank">LinkedIn</a></li>
                {user &&
                    <li> <Link to='/help'>Help</Link></li>
                }
                <li><a href='https://www.gregmattia.dev/' target="_blank">&copy; GM 2024</a></li>
            </ul>
        </footer>
    )
}