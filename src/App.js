import React from "react";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Shop from "./Components/Shop/Shop";
import Cart from "./Components/Shop/Cart";
import Library from "./Components/Library/Library";
import Reqs from "./Components/Reqs/Reqs";
import Story from "./Components/FinalStory/FinalStory";
import Community from "./Components/Community/Community";
import Register from "./Components/Auth/Register/Register";
import Create from "./Components/Create/Create";
import CreateSelect from "./Components/Create/CreateSelect";
import Review from "./Components/Create/Review";
import History from "./Components/History/History";
import CatchAll from "./Components/CatchAll/CatchAll";
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
        <Route path="/reqs" component={Reqs} />
        <Route exact path="/create" component={Create} />
        <Route path="/createselect" component={CreateSelect} />
        <Route path="/history" component={History} />
        <Route path="/library" component={Library} />
        <Route path="/community" component={Community} />
        <Route path="/story" component={Story} />
        <Route path="/register" component={Register} />
        <Route path="/review" component={Review} />
        <Route path="*" componen={CatchAll} />
      </Switch>
    </div>
  );
}

export default App;
