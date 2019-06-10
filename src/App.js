import React from "react";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Shop from "./Components/Shop/Shop";
import Cart from "./Components/Shop/Cart";
import Register from "./Components/Auth/Register/Register";
import { Switch, Route, NavLink } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/shop">Shop</NavLink>
      </div>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/shopping/cart" component={Cart} />
        {/* <Route path='/library'/> */}
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
