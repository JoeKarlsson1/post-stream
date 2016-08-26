import { Map, List } from 'immutable';

const initialState = Map({
  isFetchingPosts: false,
  isFetchingComments: false,
  didInvalidate: false,
  lastUpdated: null,
  newPostBody: '',
  submittingPost: false,
  receivedAt: null,
  posts: List()
});

const postReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'INVALIDATE_POSTS':
      return state.set('didInvalidate', true);

    case 'REQUEST_POSTS':
      return state.set('isFetchingPosts', true)
        .set('didInvalidate', false);

    case 'RECEIVE_POSTS':
      return state.updateIn(['posts'], (posts) => {
        return posts.clear().concat(
          action.posts.map((post) => {
            post.showComments = false;
            post.isParentPost = true;
            post.realName = 'Joe Karlsson';
            post.username = 'joejoebinks3';
            post.comments = [];
            post.childId = 0;
            post.childContext = {};
            post.didInvalidate = false;
            return post;
          })
        )
      })
      .set('isFetchingPosts', false)
      .set('didInvalidate', false)
      .set('lastUpdated', action.receivedAt);

    case 'HANDLE_NEW_POST_BODY_CHANGE':
      return state.set('newPostBody', action.body);

    case "REQUEST_NEW_POSTS":
      return state.set('submittingPost', true);

    case "RECEIVE_NEW_POST":
      return state.updateIn(['posts'], (posts) => {
        return posts.push(action.newPost);
      })
      .set('submittingPost', false)
      .set('newPostBody', '');

    case 'INVALIDATE_COMMENTS':
      return state.set('didInvalidate', true);

    case 'REQUEST_COMMENTS':
      return state.set('isFetchingComments', true)
        .set('didInvalidate', false);

    case 'RECEIVE_COMMENTS':
      return state.updateIn(['posts'], (posts) => {
        return posts.updateIn([action.postId - 1], (post) => {
          let copy = Object.assign({}, post);
          action.comments.forEach((comment) => {
            copy.comments.push(comment);
          });
          copy.showComments = true;
          copy.childContext = action.comments[0];
          return copy;
        })
      })
      .set('isFetchingPosts', false)
      .set('didInvalidate', false);

    case "HANDLE_NEXT_COMMENT":
      return state.updateIn(['posts'], (posts) => {
        return posts.updateIn([action.postId - 1], (post) => {
          let copy = Object.assign({}, post);
          copy.childId = action.newChildId;
          copy.childContext = copy.comments[action.newChildId];
          return copy;
        })
      })

    case "HANDLE_PREV_COMMENT":
      return state.updateIn(['posts'], (posts) => {
        return posts.updateIn([action.postId - 1], (post) => {
          let copy = Object.assign({}, post);
          copy.childId = action.newChildId;
          copy.childContext = copy.comments[action.newChildId];
          return copy;
        })
      })

    default:
      return state;
  }
};

export default postReducer;