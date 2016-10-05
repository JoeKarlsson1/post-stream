import React, { Component } from 'react';
import { connect } from 'react-redux';
import { destroyPost } from '../../../actions/posts/destroyPostActions';
import styles from './DestroyPostButton.scss';

class DestroyPostButton extends Component {
  constructor() {
    super();
    this.handleDeletingPost = this.handleDeletingPost.bind(this);
  }

  handleDeletingPost() {
    const { dispatch, id, index } = this.props;
    dispatch(destroyPost(id, index));
  }

  render() {
    return (
      <div className={styles.destroyPost}>
        <div
          className="removePost"
          onClick={this.handleDeletingPost}
        >
          [ destroy ]
        </div>
      </div>
    );
  }
};

DestroyPostButton.propTypes = {
  id: React.PropTypes.number,
};

const mapStateToProps = (state) => {
  return {

  }
};

export default connect(
  mapStateToProps
)(DestroyPostButton);
