import React from "react"
import { HashRouter, Route } from "react-router-dom"
import LoggedInRoute from "../common/components/LoggedInRoute"
import Info from "../info/Info"
import NewPet from "../pets/NewPet"
import Pets from "../pets/Pets"
import Profile from "../profile/Profile"
import Login from "../user/Login"
import Password from "../user/Password"
import Register from "../user/Register"
import Welcome from "../welcome/Welcome"
import "./App.css"
import Menu from "./Menu"
import Toolbar from "./Toolbar"
import People from "../people/people"
import Feed from "../feed/feed"
import MyFeed from "../feed/myFeed"
import newPost from "../post/newPost"
import Explore from "../feed/explore"
import MyPeople from "../people/myPeople"

export default function App() {
  return (
    <HashRouter>
      <table className="app_table">
        <thead>
          <tr className="app_toolbar">
            <td colSpan={2} >
              <Toolbar />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="app_menu">
              <Menu />
            </td>
            <td id="content" className="app_content">
              <Route exact path="/" component={Welcome} />
              <Route exact path="/login" component={Login} />
              <Route path="/newUser" component={Register} />
              <LoggedInRoute path="/info" component={Info} />
              <LoggedInRoute path="/password" component={Password} />
              <LoggedInRoute path="/profile" component={Profile} />
              <LoggedInRoute path="/pets" component={Pets} />
              <LoggedInRoute path="/editPet" component={NewPet} />
              <LoggedInRoute path="/editPet/:id" component={NewPet} />
              <LoggedInRoute path="/browsePeople" component={People} />
              <LoggedInRoute path="/my-following" component={MyPeople} />
              <LoggedInRoute path="/profile/:profileId" component={Feed} />
              <LoggedInRoute path="/my-feed" component={MyFeed} />
              <LoggedInRoute path="/posts/newPost" component={newPost} />
              <LoggedInRoute path="/posts/edit/:id" component={newPost} />
              <LoggedInRoute path="/explore-feed" component={Explore} />
            </td>
          </tr>
        </tbody>
      </table>
    </HashRouter >
  )
}
