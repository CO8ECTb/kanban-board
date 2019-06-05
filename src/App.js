import React from 'react';
import MainPage from "./components/MainPage";
import { createStore} from 'redux';
import allReducers from './reducers/Reducers'
import { Provider } from 'react-redux';


export default class App extends  React.Component{

    render() {
        const store = createStore(allReducers);

        return (
            <div className="App">
                <Provider store={store}>
                    <MainPage/>
                </Provider>
            </div>
        );
    }
}
