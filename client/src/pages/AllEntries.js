import React, {useState, useEffect } from 'react';
import { useParams, Link,  } from 'react-router-dom';
import apiConstant from "../constants/apiContants.js";
import Wrapper from '../components/Wrapper/wrapper.js';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';
// import Table from '../components/Table/table';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./allpages.css";

function AllEntries(props) {
  const [results, setResults]= useState([])
  const [deletingId, setDeletingId]= useState(null)

  // get all entries belongs to partivcular journal.

  useEffect(() => {
    getEntries();
  }, [deletingId]);


  // journal id 
  const { id } = useParams();


  // to get all the articles that belongs to the journal
  const getEntries = () => {
    apiConstant.getArticle(id).then((res)=>{
      setResults(res.data)
    }).catch(error=> console.log(error))
  };

  // to delete the article
  const deleteEntry = (e) => {
    const delid = e.target.getAttribute('id');
    setDeletingId(delid)
   
    apiConstant.deleteArticle(delid).then(res=>console.log(res),
    getEntries()
    ).catch(error => // console.log(error),
    toast.error(error.msg)
    )
  };


  // converting from htmal to regular text
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  //Render
  return (
    <Wrapper>
    <div className="mb-5">
      {results.length ? (
        <div className="container container-entries mb-5 ">
          <div className="row d-flex justify-content-center  ">
            <div className="col-sm-8 ">
              {results.map((result) => (
                <div className="entries text-left "
                  style={{ margin: '.5rem', fontStyle: "bold" }}key={result._id} >
                    
                    {result.image[0] ? <img src={"/uploads/"+result.image[0].name} alt ={result.image[0].name} style={{height:"200px", width:"200px", margin:"10px", alignSelf:"center"}}/>:null }
                   
                  <button
                    className="btn text-left text-capitalize"
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
                      borderRadius:"5px"

                    }}
                  >
                   <h4>{result.title}</h4> 
                  </button>
            
                  <div className="collapse" id={result._id}>
                    <div className="card card-body cardEntries "
                      style={{ width: '100' }}>
                      <div className="preview" dangerouslySetInnerHTML={createMarkup(result.body)}></div>
                      <div className="text-right">
                        <button id={result._id}
                          className="text-right border-0 bg-transparent"
                          onClick={deleteEntry}>

                          <i className="fas fa-times" id={result._id}
                            style={{ color: "red", fontSize: "25px" }}
                          ></i>
                        </button>
                        {result.image.length ? null  :<Link to={"/upload/" + result._id}>
                          <span>
                            <i class="fas fa-file-alt ml-2 mt-2"></i>
                          </span>
                          upload image{" "}
                        </Link> }
                       
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
    </Wrapper>
  );
}
export default AllEntries;