import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import {
  Container,
} from 'reactstrap';

import ArticleCreate from './articles/Create';
import ArticleList from './articles/List';
import ArticleSingle from './articles/Single';
import Header from './layout/Header';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Container className='MainContainer'>
            <Switch>
              <Route exact path='/' component={ArticleList} />
              <Route exact path='/articles/' component={ArticleList} />
              <Route exact path='/articles/create' component={ArticleCreate} />
              <Route exact path='/articles/:articleId/' component={ArticleSingle} />
              <Route component={() => '404! No Route found'} />
            </Switch>
          </Container>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
