import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <div className="page">
        <h1>Error 404.
          <br />
          <small>Page not found</small>
        </h1>
        <Link to="/">Go to main page</Link>
      </div>
    </>
  );
}

export default NotFoundPage;