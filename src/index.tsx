import React, { Component, Props } from "react";
import { render } from "react-dom";
import { Route, Switch } from "react-router-dom";
import { combineReducers, createStore, AnyAction, Store } from "redux";
import { LocalizeProvider, localizeReducer } from "react-localize-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import "./index.css";
import App from "./App";
import NotFound from "./sections/NotFound";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { GraphQl } from './config';

interface IAppCompProps {
  store: Store<any, AnyAction>;
  history: History<any>;
}

const client = new ApolloClient(GraphQl);

const initial = {something: [{ id: 1, text: 'test 1' }, { id: 2, text: 'test 2' }], f: null};

const rootReducer = (state = initial, action: AnyAction) => {
  // tslint:disable-next-line:no-console
  console.log('rootReducer', state, action);
  switch (action.type) {
    case '@@ProdConf/setFilter':
        state.f = action.f;
      return state;
    default:
      return state;
  }
}

class Main extends Component<Props<IAppCompProps>, IAppCompProps> {
  constructor(props: Readonly<Props<IAppCompProps>>) {
    super(props);

    const history = createBrowserHistory();

    this.state = {
      store: createStore(
        combineReducers({
          router: connectRouter(history),
          localize: localizeReducer,
          rootReducer
        }),
        composeWithDevTools()
      ),
      history
    };
  }

  public render() {
    return (
      <LocalizeProvider>
        <Provider store={this.state.store}>
          <ApolloProvider client={client}>
            <ConnectedRouter history={this.state.history}>
              <Switch>
                <Route exact path="/" component={App} />
                <Route path="/test" component={App} />
                <Route path="/users" component={App} />
                <Route path="/usersred" component={App} />
                <Route path="/user/:userId" component={App} />
                <Route component={() => <NotFound />} />
              </Switch>
            </ConnectedRouter>
          </ApolloProvider>
        </Provider>
      </LocalizeProvider>
    );
  }
}

render(<Main />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
