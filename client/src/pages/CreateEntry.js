import React, { useState} from "react";
import { useParams } from "react-router-dom";
import { Row } from "../components/Grid/grid";
import Wrapper from "../components/Wrapper";
import "./createentry.css";
import { Link } from "react-router-dom";
import apiContants from "../constants/apiContants.js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from 'react-toastify';

let today = new Date().toDateString();

function CreateEntry() {
    const [formObject, setFormObject] = useState({});
    const [editorState, setEditorState]= useState(() => EditorState.createEmpty());
    
   
    const { id } = useParams();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormObject({...formObject, [name]:value})
       // console.log( convertToHTML( editorState.getCurrentContent()));
    }
    
    //const [contentState, setContentState] = useState(raw)
    // const onEditorStateChange = (e) => {
    //   setEditorState(e.target)
    // };

    const addArticle = (e) => {
        e.preventDefault();
        if (formObject.title === undefined || convertToHTML( editorState.getCurrentContent()) === undefined ) {
            console.log("undefined");
            return
        }
       // console.log(formObject.title);
      const article =  {
        title:formObject.title, 
        body:convertToHTML( editorState.getCurrentContent()), 
        journalId:id
    }
       apiContants.createArticle(article)
       .then(res=> 
        console.log(res),
        toast.success(`Article ${formObject.title } is added sucessfully`)
        
       ).catch(error => console.log(error))
    };
 
    return (
      
        <Wrapper>

            <div className="container ">
                <Row className="d-flex justify-content-center">
                    <div className="col-md-9 offset-md-1 createform">
                        <form className="mt-40 createentry">
                            <div class="text-right">
                                <button
                                    onClick={addArticle}
                                    type="submit"
                                    className="btn btn-sm btn-dark "
                                >
                                    Save
                </button>
                                <div>
                                    <br />
                                    <Link to={"/alljournals"}>
                                        <span
                                            style={{ color: "darkgrey " }}>
                                            <i class="fas fa-arrow-left fa-3x color-purple mr-2"></i>
                      Back to journal
                    </span>
                                    </Link>
                                </div>
                            </div>

                            <div className="input-group createinput">
                                <input
                                    onChange={handleChange}
                                    className="form-control form-control-lg fs-3 createinput createtitle"
                                    style={{ background: "#fff9f6" }}
                                    type="text"
                                    placeholder="Title"
                                    name="title"
                                    id="title"
                                ></input>
                            </div>

                            <div className="input-group createinput">
                                <input
                                    className="form-control form-control-lg createinput date"
                                    style={{ background: "#fff9f6" }}
                                    type="text"
                                    placeholder={today}
                                />
                            </div>

                            <div className="form-group border-0 createinput2">
                            <Editor
                                 defaultEditorState={editorState}
                                toolbarClassName="toolbarClassName"
                               wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={setEditorState}
                                
                               />
                                {/* <textarea
                                              
                                    className="form-control createinput2 entrybody"
                                    style={{ background: "#fff9f6", paddingTop: "5px" }}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Write it all down"
                                    name="body"
                                    id="body"
                                    
                                    rows="15"
                                ></textarea> */}
                            </div>
                        </form>

                    </div>
                </Row>
            </div>
        </Wrapper>
    );

}

export default CreateEntry

// export default  class CreateEntry extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           editorState: EditorState.createEmpty(),
//         };
//       }
    
//       onEditorStateChange = (editorState) => {
//         this.setState({
//           editorState,
//         });
//       };
    

//     render (){
//         const  {editorState} = this.state;
//     console.log(convertToRaw(editorState.getCurrentContent()));
//         return(
//            <div className="card-card">
//                         <Editor
//          editorState={editorState}
//          toolbarClassName="toolbarClassName"
//         wrapperClassName="wrapperClassName"
//          editorClassName="editorClassName"
//          onEditorStateChange={this.onEditorStateChange}
         
//         />
//         <button className="btn btn-primary save-button">save</button>
//          </div>   
            
        
//         )

//     }
// };
