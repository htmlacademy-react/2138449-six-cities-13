import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Logo from '../../components/logo/logo';
import LoginForm from '../../components/login-form/login-form';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import { setActiveCity } from '../../store/offers-data/offers-data';
import { AppRoute, AuthorizationStatus, CityMap } from '../../const';
import { getRandomCity } from '../../utils';

function LoginPage(): JSX.Element {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const randomCity = getRandomCity(CityMap);
  const dispatch = useAppDispatch();

  const handleButtonRandomClick = () => {
    dispatch(setActiveCity(randomCity));
    navigate(AppRoute.Main);
  };

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authStatus, navigate]);

  return (
    <>
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <div className="page page--gray page--login">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Logo />
              </div>
            </div>
          </div>
        </header>

        <main className="page__main page__main--login">
          <div className="page__login-container container">

            <LoginForm />

            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <button
                  type='button'
                  className="locations__item-link"
                  onClick={handleButtonRandomClick}
                >
                  <span>{randomCity.name}</span>
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default LoginPage;
