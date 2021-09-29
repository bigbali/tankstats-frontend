import { NavLink } from 'react-router-dom';
import './HeaderNavigation.style.scss';

const HeaderNavigation = () => {
    return <div className="header-navigation">
        <NavLink
            activeClassName="active"
            className="header-navigation-link"
            exact
            to="/"
        >
            Home
        </NavLink>
        <NavLink
            activeClassName="active"
            className="header-navigation-link"
            to="/statistics"
        >
            Statistics
        </NavLink>
        <NavLink
            activeClassName="active"
            className="header-navigation-link"
            to="/maps"
        >
            Maps
        </NavLink>
    </div>
}

export default HeaderNavigation