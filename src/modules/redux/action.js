import store from './store';

const actionTypes = {
  SET_LOADING: 'SET_LOADING'
};

/**
 * showLoading() adalah fungsi untuk memunculkan
 * loading pada aplikasi
 * @param {*} value
 */
export const showLoading = (value = false) => {
  store.dispatch({
    type: actionTypes.SET_LOADING,
    value
  });
};
