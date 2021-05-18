import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./allpages.css";

function SavedQuotes() {
  const [state, setState] = useState({
    userId: "",
    token: "",
    results: []
  });
  const id = useParams()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setState({

        userId: user.id,
        token: user.token,
        name: user.name,
      })
      const apiUrl = "/quote/"
      const authAxios = axios.create({
        baseURL: apiUrl,
        headers: {
          Authorization: `Bearer ${user.token}`,
          userId: user.id
        }
      })
      console.log(id.id)
      authAxios.get(`get/${id.id}`)
        .then((result) => {
          if (result.data) {
            setState(prevState => ({
              ...prevState,
              results: result.data
            }))
          }
        });

      //.catch(error => console.log(error))  
    };

  }, [])

  const getQuotes = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setState(prevState => ({
      ...prevState,
      userId: user.id,
      token: user.token,
      name: user.name,
    }))
    const apiUrl = "/quote/"
    const authAxios = axios.create({
      baseURL: apiUrl,
      headers: {
        Authorization: `Bearer ${user.token}`,
        userId: user.id
      }
    })
    authAxios.get(`get/${id.id}`)
      .then(result => {
        console.log(result.data);
        if (result.data) {
          setState(prevState => ({
            ...prevState,
            results: result.data
          }))
        }

      })
      .catch(error => console.log(error))
  };

  const deleteQuote = (e) => {
    const delid = e.target.getAttribute('id');
    console.log(delid);
    const apiUrl = "/quote/"
    const authAxios = axios.create({
      baseURL: apiUrl,
      headers: {
        Authorization: `Bearer ${state.token} `,
        userId: state.userId,
      }
    })
    authAxios.delete(`delete/${delid}`)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          getQuotes();
        }
      }
      )
      .catch(error => console.log(error));
  }


  return (
    // Original Code
    // <div  className="bg-dark " style={{opacity:"0.7"}}>
    //    <ul>
    //    {state.results ? (
    // <ul className="bg-dark" style={{opacity:"0.7", listStyleType :"none"}}>
    //   {state.results.map(result => (
    //     <li key={result._id} className="bg-primary cool_purple text-white font-weight-500">{result.name}
    //       <button id={result._id} className="btn btn-danger ml-3 mt-2" onClick={deleteQuote}>delete</button>
    //     </li>


    // New Code for div - see css on "allpages.css"
    <div>
      <div className="container">
        <table className="table table-borderless"
          style={{ marginTop: "70px", color: "#000" }}>
          <thead>
            <tr>
              <th className="quote-message border-bottom">Fave Zen Quotes</th>

              <th className="border-bottom">

                {/* <i className="fas fa-times"
                  style=
                  {{
                    color: "#000",
                    fontSize: "25px",
                    cursor: "pointer",
                    fontSize: "25px",
                  }}></i> */}
              </th>
            </tr>
          </thead>

          {state.results ? (
            <tbody>
              {
                state.results.map(result => (
                  <tr key={result._id}>
                    <td className="quote-text text-left">{result.name}</td>
                    <td>
                      <button id={result._id}
                        className="text-right border-0 bg-transparent"
                        onClick={deleteQuote}>

                        <i className="fas fa-times" id={result._id}
                          style={{ color: "red", fontSize: "25px" }}
                        ></i>
                      </button></td>
                  </tr>
                ))
              }
            </tbody>

          ) : (<h3 className="quote-message"> Save some wisdom and inspiration here! </h3>)}
        </table>
      </div>
    </div>

  );


}

export default SavedQuotes;