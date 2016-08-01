import React, { Component } from 'react';
import CommentCount from './CommentCount';

class Post extends Component {
  constructor() {
    super();

    this.state = {
      showChild: false,
      isParentPost: null,
      real_name: '',
      username: '',
      body: '',
      created_at: '',
      comments: [],
      childId: null,
      childContext: {}
    };

    this.handleShowingChild = this.handleShowingChild.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleShowingChild() {
    if (this.props.comments.length) {
      this.setState({showComments: !this.state.showComments});
    }
  }

  componentDidMount() {
    let newState = {
      isParentPost: this.props.isParentPost,
      real_name: this.props.real_name,
      username: this.props.username,
      body: this.props.body,
      created_at: this.props.created_at,
      comments: this.props.comments
    };

    if (newState.comments.length) {
      newState.childId = 0;
      newState.childContext = newState.comments[0];
    }

    this.setState(newState);
  }

  handlePrev(e) {
    let newChildId = this.state.childId - 1;

    if (!!~newChildId) {
      let newState = {
        childId: newChildId,
        childContext: this.state.comments[newChildId]
      };

      this.setState(newState);
    }
  }

  handleNext(e) {
    let newChildId = this.state.childId + 1;

    if (newChildId < this.state.comments.length) {
      let newState = {
        childId: newChildId,
        childContext: this.state.comments[newChildId]
      };

      this.setState(newState);
    }
  }

  render() {
    return (
      <div className="post">
        <header>
          <span>{this.state.real_name}</span>
          <span>{this.state.username}</span>
          <span>{this.state.created_at}</span>
        </header>
        <p>{this.props.body}</p>
        <div className="comment-count" onClick={this.handleShowingChild}>
          <CommentCount
            numOfComments={this.state.comments.length}
            togglePostComments={this.toggleComments}
          />
        </div>
        {
          this.state.showComments &&
            <div className="replies">
            <span onClick={this.handlePrev}>left</span>
            <span onClick={this.handleNext}>right</span>
              <Post
                {...this.state.childContext}
                isParentPost={false}
                key={this.state.childContext.id}
              />
            </div>
        }
      </div>
    );
  }
}
 export default Post;