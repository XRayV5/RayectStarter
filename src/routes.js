import React from 'react'
import { Route, IndexRoute, Router, browserHistory, hashHistory } from 'react-router'

import App from './components/app'
import PostsIndex from './components/posts_index'
// import PostsNew from './components/posts_new'
// import PostsShow from './components/post_show'

function errorLoading(error) {
  throw new Error(`Dynamic page loading failed: ${error}`);
}

export const componentRoutes = {
  component: App,
  path: '/',
  indexRoute: { component: PostsIndex },
  childRoutes: [
    {
      path: 'posts/new',
      getComponent(location, cb) {
        System.import('./components/posts_new')
        .then(module => cb(null, module.default))
        .catch(errorLoading)
      }
    },
    {
      path: 'posts/:id',
      getComponent(location, cb) {
        System.import('./components/post_show')
        .then(module => cb(null, module.default))
        .catch(errorLoading)
      }
    }
  ]
}

export default () => <Router history={ browserHistory } routes={componentRoutes} />
