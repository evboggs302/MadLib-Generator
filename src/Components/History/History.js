import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
  setHistory,
  setHistoryDate,
  setHistoryStory,
  setHistoryTitle,
  setID,
  setShare
} from "../../ducks/HistoryReducer";
import { setFinal } from "../../ducks/StoryReducer";

class History extends Component {
  componentDidMount() {
    this.getUserHistory();
  }

  //   sortByTitle = () => {
  //     axios
  //       .put("/api/history/bytitle")
  //       .then(res => {
  //         console.log("history data:", res.data);
  //         this.props.setHistory(res.data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   };
  //   sortByDate = () => {
  //     axios
  //       .put("/api/history/bydate")
  //       .then(res => {
  //         console.log("history data:", res.data);
  //         this.props.setHistory(res.data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   };

  toggleShare = (user, boo, id) => {
    if (boo === true) {
      axios
        .put(`/api/history/toggleshare/${user}`, {
          hist_id: id
        })
        .then(res => {
          this.props.setHistory(res.data);
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
  };

  render() {
    const { history } = this.props.userHistory;
    const mappedHistory = history.map(e => {
      const { title, story, to_char, history_id, share, user_id } = e;
      let date = to_char;
      return (
        <div key={history_id}>
          <br />
          <div>
            <h4>{title}</h4>
            <div>
              <button
                onClick={e => {
                  return this.deleteHistory(history_id);
                }}
              >
                Delete
              </button>
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
          </div>
          <div>
            <p>{story}</p>
            <div>{date}</div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <h2>Your History</h2>
        <span>{mappedHistory}</span>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setHistory,
  setHistoryDate,
  setHistoryStory,
  setHistoryTitle,
  setID,
  setShare,
  setFinal
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(History);
