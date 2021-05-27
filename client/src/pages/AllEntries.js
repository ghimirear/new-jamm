import React, {useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiConstant from "../constants/apiContants.js";
// import Table from '../components/Table/table';
import "./allpages.css";

function AllEntries(props) {
  const [results, setResults]= useState([])
  const { id } = useParams();
  useEffect(() => {
    getEntries();
    //props.fn()
  }, [results]);
  const getEntries = () => {
    apiConstant.getArticle(id).then((res)=>{
      setResults(res.data.articles)
    }).catch(error=> console.log(error))
  };
  const deleteEntry = (e) => {
    const delid = e.target.getAttribute('id');
    console.log(delid);
    apiConstant.deleteArticle(delid).then(res=>console.log(res),
    getEntries()
    ).catch(error => console.log(error))
  };
  //Render
  return (
    <div>
      {results.length ? (
        <div className="container container-entries ">
          <div className="row d-flex justify-content-center  ">
            <div className="col-sm-8 ">
              {results.map((result) => (
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