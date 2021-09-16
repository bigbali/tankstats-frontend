import HeaderNavigation from '../HeaderNavigation/HeaderNavigation.component';
import Logo from '../Logo';
import './Header.style.scss';

const Header = () => {
    return <header className="header">
        <Logo />
        <HeaderNavigation />
    </header>
}

export default Header