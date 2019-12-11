import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
// import the views
import Home from "./views/Home";

import Dashboard from "./views/Dashboard";
import Menu from "./views/Menu";
import MyAccount from "./views/MyAccount";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import inDelivery from "./views/InDelivery";
import AdminManage from "./views/AdminManage";
import AdminCreate from "./views/AdminCreate";
import AdminDashboard from "./views/AdminDashboard";

// import component (view partials)
import NavMain from "./components/NavMain";
import Account from "./components/Account";
// import SearchBar from "./components/SearchBar";

// auth
import { useAuth } from "./auth/UseAuth";
import UserContext from "./auth/UserContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";

const App = function App(props) {
  const { isLoading } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);

  // MANDATORY TO GET/SET currentUser according to server response
  // check src/auth/UserContext
  const UserContextValue = {
    currentUser,
    setCurrentUser
  };

  return (
    // the context provider will make currentUser informations down the component tree
    <UserContext.Provider value={UserContextValue}>
      {isLoading ? null : (
        <React.Fragment>
          <header id="header-main">
            <NavMain />
            {/* <SearchBar /> */}
          </header>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/menu" component={Menu} />
              <ProtectedRoute path="/myaccount" component={MyAccount} />
              <Route path="/signIn" component={SignIn} />
              <Route path="/signUp" component={SignUp} />
              <Route path="/indelivery" component={inDelivery} />
              <Route path="/admin-dashboard" component={AdminDashboard} />
              <Route path="/admin-manage" component={AdminManage} />
              <Route path="/admin-create" component={AdminCreate} />
              {/* //my account user// dashboard delivery // admin  */}
            </Switch>
          </div>
        </React.Fragment>
      )}
    </UserContext.Provider>
  );
};

export default App;
