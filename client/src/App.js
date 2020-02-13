import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { ConnectedRouter as Router } from 'connected-react-router';
import styled, { createGlobalStyle } from 'styled-components';
import { history } from './store/configureStore';
import Join from './components/Join';
import Room from './components/Room';

import bg from './svgs/BG.svg';

const Styled = {
  GlobalStyle: createGlobalStyle`
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'NanumSquare', 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
  `,
  Container: styled.div`
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${props => props.bg});
  `
}

function App() {
  return (
    <Styled.Container bg={bg}>
      <Styled.GlobalStyle />
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Join />
          </Route>
          <Route exact path="/room">
            <Redirect to="/" />
          </Route>
          <Route path="/room/:id">
            <Room />
          </Route>
        </Switch>
      </Router>
    </Styled.Container>
  );
}

export default App;
