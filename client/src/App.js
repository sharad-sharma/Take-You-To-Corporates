import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/screens/Home'
import Createpost  from './components/screens/Createpost'
import MyProfile from './components/screens/MyProfile'
import Signin from './components/screens/Signin'
import Usersbscribedpost from './components/screens/Usersubscribedpost'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom'
function App() {
  return (
    <>
    {/* imported navbar in each of the component right now we will show it accordingly after authentication */}
    <BrowserRouter>
    <Switch>
      {/* Here we have routed all the components */}
      
      <Route exact path="/">
        <Home/>
      </Route>
      <Route  path="/create">
        <Createpost/>
      </Route>
      <Route path="/profile">
        <MyProfile/>
      </Route>
      <Route  path="/signin">
        <Signin/>
      </Route>
      <Route path="/myfollowing">
        <Usersbscribedpost/>
      </Route>

    </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
