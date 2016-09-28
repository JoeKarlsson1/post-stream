/*
  eslint no-unused-vars: 0
*/

import React, { Component } from 'react';
import Header from './shared/header/Header';
import Footer from './shared/footer/Footer';
import normalize from './shared/styles/normalizer.scss';
import skeleton from './shared/styles/skeleton.scss';
import styles from './App.scss';

class App extends Component {

  render() {
    let children = null;
    const item = 'something'
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance to children
      })
    }
    return (
      <div className={styles.app}>
        <Header auth={this.props.route.auth}/>

        <div className={styles.content}>
          <div className={skeleton.container}>
            { children }
          </div>
        </div>

        <Footer />
      </div>
    );
  }
};

export default App;