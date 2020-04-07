import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ApolloProvider} from 'react-apollo'
import ApolloClient from 'apollo-boost'

const clientEndpoint = { uri: 'http://localhost:4000/graphql' }

const client = new ApolloClient(clientEndpoint, {onError: ({ networkError, graphQLErrors }) => {
  console.log('graphQLErrors', graphQLErrors)
  console.log('networkError', networkError)
}})

const ApolloApp = AppCompnent => (
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppCompnent />
    </ApolloProvider>
  </React.StrictMode>
)

ReactDOM.render(
  ApolloApp(App),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
