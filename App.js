import React from 'react';
import {Platform, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {Asset} from 'expo-asset';
import AppContainer from './navigation/AppContainer';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";

const initialState = [
    {
        title: "Test 1",
        description: "Description for test 1"
    },
    {
        title: "Test 2",
        description: "Description for test 2"
    }
];

const cardReducer = function(state = initialState, action) {
    switch(action.type) {
        case "SET_CARDS": return [...action.payload]
        default: return state;
    }
}

const rootReducer = combineReducers({
    cards: cardReducer
});

const store = createStore(rootReducer);

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                    <Provider store={store}><AppContainer/></Provider>
                </View>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            // Load images and cache them
            Asset.loadAsync([
                require('./assets/images/drawer_header.png'),
            ]),
            // Load fonts and cache them
            // Font.loadAsync({
            //     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
            // }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
