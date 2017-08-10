import React from "react";
import { BrowserRouter, Route, Switch, HashRouter } from "react-router-dom";

import reducers from "./reducers";
import PostsIndex from "./components/posts_index";
import PostsNew from "./components/posts_new";
import PostsShow from "./components/post_show";

export default () => (
    <BrowserRouter>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
    </BrowserRouter>
);