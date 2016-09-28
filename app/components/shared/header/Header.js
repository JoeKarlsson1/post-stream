import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavLink from '../navigation/NavLink';
import styles from './Header.scss';

class Header extends Component {

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    this.props.auth.logout()
    this.context.router.push('/login');
  }

  render() {
    const { loggedIn, getProfile, login, getToken } = this.props.auth;
    const isLoggedIn = loggedIn();
    const profile = getProfile();
    console.log('profile: ', profile);
    console.log('isLoggedIn: ', isLoggedIn);
    console.log('getToken: ', getToken());

    return (
      <div>
        <header className={styles.header_bar}>
          <NavLink to='/' onlyActiveOnIndex={true} className={styles.header_logo}>PostStream</NavLink>
          <ul className={styles.header_nav}>
            <li>[ <NavLink to='/about'>?</NavLink> ]</li>
            { isLoggedIn === false &&
              <li>[ <NavLink to='/register'>register</NavLink> ]</li>
            }
            { isLoggedIn === false &&
              <li>[ <span onClick={ login.bind(this) }>login</span> ]</li>
            }
            { isLoggedIn === true &&
              <span>
                <li>[ <NavLink to='/logout' onClick={ this.handleLogout }>logout</NavLink> ]</li>
              </span>
            }
            { isLoggedIn === true &&
              <span>
                <li>[ <NavLink to={`/user/${ profile.nickname }`}>profile</NavLink> ]</li>
              </span>
            }
          </ul>
        </header>
        <hr/>
      </div>
    )
  }
}

Header.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.rootReducer.authReducer.get('isLoggedIn'),
  }
};

export default connect(
  mapStateToProps
)(Header);

