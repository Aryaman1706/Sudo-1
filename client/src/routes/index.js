import React from "react";
import { Switch } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import ProfileFollower from "../pages/ProfileFollowers";
import ProfileFollowing from "../pages/ProfileFollowing";
import PeerCodeRoom from "../pages/PeerCodeRoom";
import Forum from "../pages/Forum";
import Route from "./Route";
import ForumExplore from "../pages/ForumExplore";
import LearningPath from "../pages/LearningPath";
import LearningPathDetail from "../pages/LearningPathDetail";
import Login from "../pages/Login";
import Articles from "../pages/Articles";
import SearchUser from "../pages/SearchUser";
import Monaco from "../components/CRDTRoom/Monaco";
import { Route as RRoute } from "react-router-dom";

const Routes = () => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} isPrivate />
        <Route exact path="/profile" component={Profile} isPrivate />
        <Route
          exact
          path="/profile/followers"
          component={ProfileFollower}
          isPrivate
        />
        <Route
          exact
          path="/profile/following"
          component={ProfileFollowing}
          isPrivate
        />
        <Route exact path="/forums" component={ForumExplore} isPrivate />
        <Route exact path="/forum/:id" component={Forum} isPrivate />
        <Route
          exact
          path="/coderoom/:roomId"
          component={PeerCodeRoom}
          isPrivate
        />
        <Route exact path="/learningpath" component={LearningPath} isPrivate />
        <Route exact path="/articles" component={Articles} isPrivate />
        <Route
          exact
          path="/learningpath/id"
          component={LearningPathDetail}
          isPrivate
        />
        <Route exact path="/users" component={SearchUser} isPrivate />

        <RRoute exact path="/crdt_room/:roomName" component={Monaco} />
      </Switch>
    </div>
  );
};
export default Routes;
