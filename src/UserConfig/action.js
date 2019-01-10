import axios from 'axios';

export const setAuthTokenInHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  window.sessionStorage.setItem('token', token);
};

export const deleteAuthToken = () => {
  delete axios.defaults.headers.common.Authorization;
  sessionStorage.clear();
};

export const loginState = () => ({
  type: 'CHECK_LOGINSTATE',
  payload: true,
});
export const registerState = () => ({
  type: 'CHECK_REGISTER',
  payload: true,
});
export const queryLogin = data => ({
  type: 'QUERY_LOGIN',
  payload: data,
});
export const errorHappened = data => ({
  type: 'SHOW_ERROR',
  payload: data,
});
export const queryRegister = data => ({
  type: 'QUERY_REGISTER',
  payload: data,
});

export const loginAction = (userData, callBack) => (dispatch) => {
  axios.post('https://nepal.sk8tech.io/wp-json/jwt-auth/v1/token/', userData)
    .then((res) => {
      console.log(res);
      setAuthTokenInHeader(res.data.token.token);
      window.sessionStorage.setItem('user_id', res.data.user_id);
      window.sessionStorage.setItem('user_email', res.data.token.user_email);
      !!callBack && dispatch(callBack());
      dispatch(loginState());
    })
    .catch((err) => {
      dispatch(queryLogin(false));
      dispatch(errorHappened(true));
      console.log(err);
    });
};
export const registerAction = userData => (dispatch) => {
  axios.post('/users/register', userData)
    .then(
      (res) => {
        dispatch(loginAction({ username: userData.username, password: userData.password }, registerState));
      },
    )
    .catch((err) => {
      dispatch(queryRegister(false));
      dispatch(errorHappened(true));
      console.log(err);
    });
};
