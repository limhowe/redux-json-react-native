/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducers';
import { fetchData } from './redux/actions';

import { connect } from 'react-redux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

const middleware = [ thunk ];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  {
    isFetching: false,
    items: []
  },
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const createTextView = (item, i) => (
  <Text key={i}>
    {item.id}
  </Text>
);

export default class Myapp extends Component {

  handleFetchData = () => {
    const { dispatch } = this.props;
    dispatch(fetchData());
  }

  render() {
    const { items, isFetching } = this.props;
    const isEmpty = items.length === 0;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>

        <Button
          onPress={this.handleFetchData}
          title="FetchData"
          color="#841584"
          disabled = {isFetching}
        />

        {isEmpty
          ? (isFetching ? <Text>Loading...</Text> : <Text>Empty.</Text>)
          : items.map(createTextView)
        }


      </View>
    );
  }
}

const mapStateToProps = ({ isFetching, items })  => ({ isFetching, items });
let ReduxApp = connect(mapStateToProps)(Myapp);

const App = () => (
  <Provider store={store}>
    <ReduxApp />
  </Provider>
);

AppRegistry.registerComponent('myapp', () => App);
