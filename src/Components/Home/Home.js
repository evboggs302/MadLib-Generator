import { Component } from "react";
import { connect } from "react-redux";
import { setStory } from "../../ducks/StoryReducer";
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";
import "./Home.css";
import {
  FaBookOpen,
  FaRegCalendar,
  FaRegListAlt,
  FaReact,
  FaRandom
} from "react-icons/fa";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/reqs" />;
    }
  };

  getRandomTemplate = () => {
    const id = Math.floor(Math.random() * 4) + 1;
    axios.get(`/api/library/random/${id}`).then(res => {
      this.props.setStory(res.data);
    });
    this.setRedirect();
  };

  render() {
    const { user } = this.props.user;
    return (
      <div className="home_container">
        {!user ? (
          <div className="home_container">
            <h2>Words, Bruh. Words!!</h2>
            <p>
              {"  "}Welcome to the place where the words are made up, and the
              stories don't matter. If you'd like to enjoy, and possibly create,
              more madlibs on this site, please login above. I too enjoy
              ocassionally living life on the edge. Simply click the "Random"
              button below to get started.
            </p>
            <div>
              {this.renderRedirect()}
              <button
                className="home_page_buttton"
                onClick={this.getRandomTemplate}
              >
                <span>
                  Random <FaRandom />
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="home_container">
            <h2>
              Welcome<span>{user.call_name}</span>!
            </h2>
            <p>
              Welcome back to the place where the words are made up, and the
              stories don't matter! To enjoy already created madlibs, click
              "Library." To create your own madlib, click "Create." See the
              saved stories you've previously completed, by clicking "History".
              If you want to laugh, hop on over to our Community page to share
              in some of the shenanigans. If you're just feeling lucky, simply
              click "Random" to get started!
            </p>
            <div className="home_page_button_container">
              <NavLink to="/history">
                <button className="home_page_buttton">
                  <span>
                    History <FaRegCalendar />
                  </span>
                </button>
              </NavLink>
              <NavLink to="/community">
                <button className="home_page_buttton">
                  <span>
                    Community <FaRegListAlt />
                  </span>
                </button>
              </NavLink>
              <NavLink to="/create">
                <button className="home_page_buttton">
                  <span>
                    Create <FaReact />
                  </span>
                </button>
              </NavLink>
              <NavLink to="/reqs">
                <button
                  className="home_page_buttton"
                  onClick={this.getRandomTemplate}
                >
                  <span>
                    Random <FaRandom />
                  </span>
                </button>
              </NavLink>
              <NavLink to="/library">
                <button className="home_page_buttton">
                  <span>
                    Library <FaBookOpen />
                  </span>
                </button>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setStory
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(Home);
