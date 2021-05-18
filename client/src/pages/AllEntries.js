import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
// import Table from '../components/Table/table';
import "./allpages.css";

function AllEntries(props) {
  const [state, setState] = useState({
    journalId: '',
    userId: '',
    token: '',
    results: []
  });
  const { id } = useParams();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setState((prevState) => ({
      ...prevState,
      userId: user.id,
      token: user.token,
      name: user.name,
      journalId: id
    }));
    const apiUrl = '/article/';
    const authAxios = axios.create({
      baseURL: apiUrl,
      headers: {
        Authorization: `Bearer ${user.token}`,
        userId: user.id
      }
    });
    authAxios
      .get(`get/${id}`)
      .then((result) => {
        console.log(result.data.articles);
        if (result.data.articles) {
          setState((prevState) => ({
            ...prevState,
            results: result.data.articles
          }));
        }
      })
      .catch((error) => console.log(error));
    props.fn()
  }, []);
  const getEntries = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    setState((prevState) => ({
      ...prevState,
      userId: user.id,
      token: user.token,
      name: user.name,
      journalId: id
    }));
    const apiUrl = '/article/';
    const authAxios = axios.create({
      baseURL: apiUrl,
      headers: {
        Authorization: `Bearer ${user.token}`,
        userId: user.id
      }
    });
    authAxios
      .get(`get/${id}`)
      .then((result) => {
        console.log(result.data.articles);
        if (result.data.articles) {
          setState((prevState) => ({
            ...prevState,
            results: result.data.articles
          }));
        }
      })
      .catch((error) => console.log(error));
  };
  const deleteEntry = (e) => {
    const delid = e.target.getAttribute('id');
    console.log(delid);
    const apiUrl = '/article/';
    const authAxios = axios.create({
      baseURL: apiUrl,
      headers: {
        Authorization: `Bearer ${state.token} `,
        userId: state.userId,
        journalId: id
      }
    });
    authAxios.delete(`delete/${delid}`).then((res) => console.log(res)).catch((error) => console.log(error));
    getEntries();
  };
  //Render
  return (
    <div>
      {state.results.length ? (
        <div className="container container-entries ">
          <div className="row d-flex justify-content-center  ">
            <div className="col-sm-8 ">
              {state.results.map((result) => (
                <div className="entries text-left "
                  style={{ margin: '.5rem', fontStyle: "bold" }}>
                  <button
                    className="btn text-left"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#${result._id}`}
                    aria-expanded="false"
                    aria-controls={result._id}
                    style={{
                      height: '55px',
                      color: 'white',
                      width: "100%",
                      backgroundColor: "#000",

                    }}
                  >
                    {result.title}
                  </button>
                  <div className="collapse" id={result._id}>
                    <div className="card card-body cardEntries "
                      style={{ width: '100' }}>
                      <p className="pEntries" style={{ textAlign: 'left' }}>{result.body}</p>
                      <div className="text-right">
                        <button id={result._id}
                          className="text-right border-0 bg-transparent"
                          onClick={deleteEntry}>

                          <i className="fas fa-times" id={result._id}
                            style={{ color: "red", fontSize: "25px" }}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container container-entries ">
          <p className="messageEntries text-light">
            {' '}
					There are no entries in this journal
          <br />
            {' '}
            <br />
            <br />
            <Link to={'/create/' + id}>
              <button className="btn btn-light"><span className="jotEntries">write it all down!</span></button>
            </Link>
          </p>
        </div>
      )
      }
    </div >
  );
}
export default AllEntries;