import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import {Helmet} from 'react-helmet-async';
import { AppRoute } from '../../const';
import styles from './not-found-page.module.css';

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
      <div className={`page ${styles.notFoundPage}`}>
        <Helmet>
          <title>6 cities: 404</title>
        </Helmet>
        <h1 className={styles.title}>Error 404
          <br />
          <small>Page not found</small>
        </h1>
        <p className={styles.text}>
          <Link to={AppRoute.Main} className={styles.link}>Go to main page</Link>
        </p>
      </div>
    </>
  );
}

export default NotFoundPage;
