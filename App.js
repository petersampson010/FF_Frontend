import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Navigation from './Navigation';
import rootReducer from './rootReducer';
import FlashMessage from 'react-native-flash-message';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
        <Navigation />
        <FlashMessage position="top" />
    </Provider>
  );
}