import { createStore } from 'redux';

const initialState = {
  loading: false
};

// reducer pada aplikasi
const reducer = (state = initialState, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value
    };
  }
  return state;
};

// membuat store untuk aplikasi via redux
const store = createStore(reducer);

export default store;
