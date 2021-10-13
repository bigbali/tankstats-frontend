import HeaderAccount from '../HeaderAccount';
import HeaderNavigation from '../HeaderNavigation/HeaderNavigation.component';
import HeaderSearchForm from '../HeaderSearchForm/HeaderSearchForm.component';
import Logo from '../Logo';
import './Header.style.scss';

const Header = () => {
    return (
        <header className="header">
            <Logo />
            <HeaderNavigation />
            <HeaderSearchForm />
            <HeaderAccount />
        </header>
    )
}

export default Header