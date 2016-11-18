import RedditClient from '../api/RedditClient'

const types = {
  FETCH_POSTS_PENDING: 'FETCH_POSTS_PENDING',
  FETCH_POSTS_SUCCESS: 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_FAILURE: 'FETCH_POSTS_FAILURE'
}

const fetchPostsSuccess = (items, subreddit) => {
  return {
    type: types.FETCH_POSTS_SUCCESS,
    subreddit,
    items
  }
}

const fetchPosts = (subreddit) => async (dispatch, getState) => {
  dispatch({type: types.FETCH_POSTS_PENDING, timestamp: Date.now()})
  console.log(subreddit)
  new RedditClient(getState().user.token).getPosts(subreddit)
    .then((result) => {
      if (result.error) {
        dispatch(actionCreators.fetchPostsFailure(
          `${result.error}: ${result.message}`
        ))
      } else {
        let items = null
        if (Array.isArray(result)) {
          items = result.reduce((all, subitems) => all.concat(subitems.data.children), [])
        } else {
          items = result.data.children
        }
        dispatch(actionCreators.fetchPostsSuccess(items, subreddit))
      }
    })
    .catch((error) => {
      dispatch(actionCreators.fetchPostsFailure(error, subreddit))
    })
}

const fetchPostsFailure = (error) => {
  return {
    type: types.FETCH_POSTS_FAILURE,
    error
  }
}

// implement actionCreators
export const actionCreators = {
  fetchPosts,
  fetchPostsSuccess,
  fetchPostsFailure
}

const initialState = {
  isFetching: false,
  token: null,
  timestamp: null,
  subreddits: {
    hot: [],
    random: [],
  }
}

//implement your reducer
export const reducer = (state = initialState, action) => {
  const {type, payload} = action

  switch(type) {
    case types.FETCH_POSTS_PENDING: {
      return {
        ...state,
        isFetching: true,
        timestamp: action.timestamp,
        error: null
      }
    }
    case types.FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        subreddits: {
          ...state.subreddits,
          [action.subreddit]: action.items || [],
        },
        error: null
      }
    }
    case types.FETCH_POSTS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        subreddits: {
          ...state.subreddits,
          [action.subreddit]: [],
        },
        error: action.error
      }
    }
    default: {
      return state
    }
  }
}
