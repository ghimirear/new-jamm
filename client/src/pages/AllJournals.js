import React, { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper/wrapper";
import apiConstant from "../constants/apiContants.js";
import { Link } from "react-router-dom";
import "./alljournals.css"; 
import "./allpages.css";
import { toast } from 'react-toastify';

function AllJournals(props) {
 const [journals, setJournals]= useState([])
   const [formObject, setFormObject]= useState({})
  // function to delete journal
  props.fn()
  
  // on page load.
  useEffect(() => {
    getJournal();
    
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
 async function addJournal  (e){
    e.preventDefault();
    if(formObject.journalName){
    await  apiConstant.createJournal({journalName:formObject.journalName})
    .then((res)=>{
      toast.success(`Journal ${ formObject.journalName} is added sucessfully`)
    getJournal();
    }).catch(error=>{
      if (error){toast.error("Something went wrong!!");}
      
      console.log(error);
    })
    clearInput();}
  };
  function deleteJournal(e){

    const delid = e.target.getAttribute('id');

      apiConstant.deleteJournal(delid).then(res=>{
        toast.success(`${delid} Jounal is deleted sucessfully`);
      
    }).catch(error =>{
      console.log(error)
     // toast.error("Something went wrong")
    })
        
        
     
     
  }

  
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
              <div className="card card-journal border-0" key={result._id}>
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
                          <a href={result._id}
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
