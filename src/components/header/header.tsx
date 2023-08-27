import Logo from '../logo/logo';
import HeaderNavigation from './header-navigation';

type HeaderProps = {
  login?: boolean;
}

function Header({login = false}: HeaderProps): JSX.Element {

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>

          {!login && <HeaderNavigation />}
        </div>
      </div>
    </header>
  );
}

export default Header;
