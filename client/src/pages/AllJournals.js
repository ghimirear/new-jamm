import React, { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper/wrapper";
import apiConstant from "../constants/apiContants.js";
import { Link } from "react-router-dom";
import "./alljournals.css"; 
import "./allpages.css";

function AllJournals(props) {
 const [journals, setJournals]= useState([])
   const [formObject, setFormObject]= useState({})
  // function to delete journal
  props.fn()
  function deleteJournal(e){
    // console.log(e.target)
    const delid = e.target.getAttribute('id');
     apiConstant.deleteJournal(delid).then((res)=>{
       console.log(res);
       getJournal()
     }).catch(err=> console.log(err))
  }
  // on page load.
  useEffect(() => {
    getJournal()
    
  }, [journals]) 
  // handing input change
 function handleChange(e){
    const { name, value } = e.target;
    setFormObject({...formObject, [name]:value})
  };
 function  clearInput ()  {
    setFormObject( { ...formObject, journalName:""})
  };
  // function to get journal
 function  getJournal(){
    apiConstant.getJournal().then((res)=>{
      setJournals(res.data)
    })
  };
  // function to create new journal
 function addJournal (e){
    e.preventDefault();
    if(formObject.journalName){
    apiConstant.createJournal({journalName:formObject.journalName})
    .then((res)=>{
    getJournal();
    }).catch(err=>{
      console.log(err);
    })
    clearInput();}
  };

  
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
              onChange={handleChange}
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
                onClick={addJournal}
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>

        {journals.length ? (
          <div className="container-fluid card-container d-flex flex-wrap justify-content-center">
            {journals.map((result) => (
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
                        onClick={deleteJournal}
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
export default AllJournals;
