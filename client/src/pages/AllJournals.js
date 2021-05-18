import axios from "axios";
import React, { Component } from "react";
import Wrapper from "../components/Wrapper/wrapper";

import { Link } from "react-router-dom";
import "./alljournals.css";
import "./allpages.css";

class AllJournals extends Component {
  state = {
    userId: "",
    token: "",
    journalId: "",
    name: "",
    results: [],
    journalName: "",
  };
  // function to delete journal
  deleteJournal = (e) => {
    console.log(e.target)
    const delid = e.target.getAttribute('id');
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.setState({
        userId: user.id,
        token: user.token,
        name: user.name,
      });
      console.log(delid);
      const apiUrl = "/user/"
      const authAxios = axios.create({
        baseURL: apiUrl,
        headers: {
          Authorization: `Bearer ${this.state.token} `,
          userId: this.state.userId,
        }
      })
      authAxios.delete(`journal/${delid}`)
        .then(res => console.log(res),
          this.getJournal()
        )
        .catch(error => console.log(error));

    }
  }
  // on page load.
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.setState({
        userId: user.id,
        token: user.token,
        name: user.name,
      });
      console.log(user);
      // creating header
      const apiUrl = "/user/";
      const authAxios = axios.create({
        baseURL: apiUrl,
        headers: {
          Authorization: `Bearer ${user.token}`,
          userId: user.id,
        },
      });
      authAxios.get(`journal/${user.id}`)
        .then((result) => {
          console.log(result.data);
          this.setState({
            results: result.data,
          });
        });
    }
    this.props.fn()

  }
  // handing input change
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  clearInput = () => {
    this.setState({
      journalName: "",
    });
  };
  // function to get journal
  getJournal = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.setState({
        userId: user.id,
        token: user.token,
        name: user.name,
      });
      console.log(user);
      // creating header
      const apiUrl = "/user/";
      const authAxios = axios.create({
        baseURL: apiUrl,
        headers: {
          Authorization: `Bearer ${user.token}`,
          userId: user.id,
        },
      });
      authAxios.get(`journal/${user.id}`).then((result) => {
        console.log(result.data);
        this.setState({
          results: result.data,
        });
      });
    }
  };
  // function to create new journal
  addJournal = (e) => {
    e.preventDefault();
    if (this.state.journalName === "") return
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const apiUrl = "/user/";
      const authAxios = axios.create({
        baseURL: apiUrl,
        headers: {
          Authorization: `Bearer ${user.token} `,
          userId: user.id,
        },
      });
      if (this.state.journalName === "") return
      authAxios
        .post("journal", this.state)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            this.getJournal()
          }
        }

        )
        .catch((error) => console.log(error));
    }

    this.clearInput();
  };

  render() {
    return (
      <Wrapper>
        <div className="container">
          <div class="input-group input-group-lg create-journal">
            <div className="input-group-prepend ">
              <label
                className="input-group-text input-group-text-lg bg-secondary text-white border-0"
                for="inputGroupSelect01"
              >
                Create Journal
              </label>
            </div>
            <input
              required
              onChange={this.handleChange}
              value={this.state.journalName}
              type="text"
              className="form-control input-group-lg"
              placeholder="Journal Name"
              name="journalName"
              id="journalName"
              style={{ height: "60px" }}
            ></input>

            <div className="input-group-append">
              <button
                className="btn btn-dark text-light search-button text-capitalize"
                id="button-addon2"
                type="submit"
                onClick={this.addJournal}
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>

        {this.state.results.length ? (
          <div className="container-fluid card-container d-flex flex-wrap justify-content-center">
            {this.state.results.map((result) => (
              <div className="card card-journal border-0">
                {/* <CardJournal> */}
                <div className="card-body vl card-body-journal d-flex flex-wrap justify-content-center align-items-center">
                  <div>
                    <div className="card-content card-content-journal">
                      <strong><h3 className="card-title text-center ">{result.name}</h3></strong>
                      <hr />
                      <p className="card-text card-text-journal">
                        <Link to={"/books/" + result._id}>
                          <span>
                            <i class="fas fa-file-alt ml-2 mt-2"></i>
                          </span>
                          See All Jots{" "}
                        </Link>
                      </p>
                      <hr />
                      <p className="card-text card-text-journal">
                        <Link to={"/create/" + result._id}>
                          <a
                            className="text-capitalize text-center"
                            onClick={this.createEntry}
                            id={result._id}
                          >
                            <span>
                              <i className="fas fa-edit ml-2 mt-2"></i>
                            </span>{" "}
                            Create new jot
                          </a>
                        </Link>
                      </p>
                    </div>
                    <br />
                    <p className="text-right">
                      {/* <i class="fas fa-cog"></i> */}
                      <button
                        type="button"
                        className="btn btn-sm d-inline-block "
                        onClick={this.deleteJournal}
                        id={result._id}
                      >
                        <i
                          className="fas fa-times" id={result._id}
                          style={{ color: "red", fontSize: "25px" }}
                        ></i>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="container container-journals">
            <p className="messageJournals text-light">You don't have any journals.
            <br />
              <br />
    Create Some!</p>
          </div>
        )}
        {/* <Footer /> */}
      </Wrapper>
    );
  }
}
export default AllJournals;
