import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import { NavLink } from "react-router-dom";
import { setHistory } from "../../ducks/HistoryReducer";
import "./Hist_Comm.css";

const socket = io.connect(`http://localhost:19711/`);

class History extends Component {
  componentWillMount() {
    this.getUserHistory();
  }

  toggleShare = (user, boo, id) => {
    if (boo === true) {
      axios
        .put(`/api/history/toggleshare/${user}`, {
          hist_id: id
        })
        .then(res => {
          this.props.setHistory(res.data);
          socket.emit("get comm");
        })
        .catch(err => {
          alert(
            "Uh Oh! We are unable to assist at the moment. Please try again later."
          );
        });
    } else {
      axios
        .put(`/api/history/toggleshare/${user}`, {
          hist_id: id
        })
        .then(res => {
          this.props.setHistory(res.data);
          socket.emit("get comm");
        })
        .catch(err => {
          alert(
            "Uh Oh! We are unable to assist at the moment. Please try again later."
          );
        });
    }
  };

  getUserHistory = () => {
    axios
      .get("/api/history")
      .then(res => {
        this.props.setHistory(res.data);
      })
      .catch(err => {
        alert("OH NO! It appears as though you don't have any history to view");
      });
  };

  deleteHistory = id => {
    axios
      .delete(`/api/history/${id}`)
      .then(res => {
        this.props.setHistory(res.data);
      })
      .catch(err => {
        alert(
          "OH NO! we couldn't delete this at the moment. Pease try again later."
        );
      });
    this.getUserHistory();
  };

  render() {
    const { history } = this.props.userHistory;
    console.log(history);
    const mappedHistory = history.map(e => {
      const { title, story, to_char, history_id, share, user_id } = e;
      let date = to_char;
      return (
        <div id="box" key={history_id}>
          <div className="histHead">
            <h3>{title}</h3>
            <div>
              <div id="mama">
                <NavLink to="/history">
                  <button
                    onClick={e => {
                      return this.deleteHistory(history_id);
                    }}
                  >
                    Delete From History
                  </button>
                </NavLink>

                {share === true ? (
                  <button
                    onClick={e => {
                      return this.toggleShare(user_id, share, history_id);
                    }}
                  >
                    Remove from Community
                  </button>
                ) : (
                  <button
                    onClick={e => {
                      return this.toggleShare(user_id, share, history_id);
                    }}
                  >
                    Add to Community
                  </button>
                )}
              </div>
              <div id="histstoryinfo">
                <p>{story}</p>
                <div>{date}</div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="outerbox">
        <h1>Your History</h1>
        <div className="innerbox">
          <div id="hcBut">
            <NavLink to="/">
              <button id="hcHome">Go Home</button>
            </NavLink>
          </div>
          <div id="hcBut">
            <NavLink to="/community">
              <button id="hcComm">Community</button>
            </NavLink>
          </div>
        </div>
        <span>{mappedHistory}</span>
        <div className="innerbox">
          <div id="hcBut">
            <NavLink to="/">
              <button id="hcHome">Go Home</button>
            </NavLink>
          </div>
          <div id="hcBut">
            <NavLink to="/community">
              <button id="hcComm">Community</button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setHistory
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(History);
