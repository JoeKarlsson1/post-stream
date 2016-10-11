import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchUserPosts } from '../../../actions/profile/profileActions';
import { getUserProfile } from '../../../actions/user/userActions';
import PostList from './postList/PostList';
import ProfileDetails from './ProfileDetails';
import FollowButton from './followButton/FollowButton';
import styles from './Profile.scss';

class Profile extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { userName} = this.props.params;
    dispatch(getUserProfile(userName));
    dispatch(fetchUserPosts(userName));
  };

  render() {
    const {
      posts,
      isAuthenticated,
      profile,
    } = this.props;
    const { userName} = this.props.params;

    return (
      <div className={ styles.Profile }>

        <h1>{ userName }'s PostStream</h1>

        { isAuthenticated &&
          <div>
            { !profile &&
              <ProfileDetails profile={ profile }></ProfileDetails>
            }
            [ <Link to={`/user/${ profile.user_id }/edit`}>edit profile</Link> ]
            <FollowButton user_id={ profile.user_id } />
            <hr />
          </div>
        }

        <PostList
          posts={ posts }
        />

      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { profile, user } = state.root;

  return {
    isAuthenticated: profile.get('isAuthenticated'),
    profile: user.get('profile').toJS(),
    posts: profile.get('posts').toJS(),
  }
};

export default connect(
  mapStateToProps
)(Profile);