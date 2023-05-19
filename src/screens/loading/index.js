import React, { useEffect } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { userActions } from '../../state/actions';

import { ROUTES } from '../../constants';
import has from 'lodash/has';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './style.scss';
import { Redirect } from '../../components';

const Loading = ({ user, setIsNewUser, isNewUser }) => {
  const userExists = has(user, 'id');
  const history = useHistory();

  const handleRedirect = async param => {
    if (user) {
      history.push({
        pathname: ROUTES.CLIENT.HOME,
      });
    } else {
      history.push({
        pathname: ROUTES.CLIENT.TERMS,
      });
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => handleRedirect(userExists), 4000);
    return () => clearTimeout(timer);
  }, [user]);

  return (
    <Redirect>
      <div id='loading-screen'>
        <Loader type='BallTriangle' color='#fff' height={80} width={80} />
        <h3>Loading...</h3>
      </div>
    </Redirect>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setIsNewUser: value => dispatch(userActions.setIsNewUser(value)),
  };
};

const mapStateToProps = state => {
  const {
    user: { isNewUser },
    employee: { selected },
    navigation: { text },
  } = state;
  return { user: selected, text, isNewUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
