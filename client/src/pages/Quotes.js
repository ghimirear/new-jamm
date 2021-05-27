import React, { useEffect, useState } from "react";
import apiConstant from "../constants/apiContants.js";
import "./allpages.css";

function SavedQuotes() {
  //const [state, setState] = useState({});
  const [results, setResults]= useState([])
  // const id = useParams()
  useEffect(() => {
    getQuotes();

  }, [results])

  const getQuotes = () => {
    apiConstant.getQuote().then((res)=>{
      setResults(res.data)
    }).catch(error=> console.log(error))
  };

  const deleteQuote = (e) => {
    const delid = e.target.getAttribute('id');
    apiConstant.deleteQuote(delid).then(res=> console.log(res),
    getQuotes()
    ).catch(error=> console.log(error))
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

          {results ? (
            <tbody>
              {
                results.map(result => (
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