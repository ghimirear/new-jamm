
import React from 'react';


function Create(props) {
    return (
        // <div className="create-bar">
        //     <h1 key={props.id}>Welcome, {props.name}</h1>

        //     <div className="row">
        //         <div className="col-sm-6 input-col">
        //             <div className="input-group">
        //                 <div className="input-group-prepend">
        //                     <span className="input-group-text" id="">
        //                         Create New Journal
        // 					</span>
        //                 </div>
        //                 <input type="text" className="form-control" />
        //                 <button>+</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div class="input-group">
            <label class="input-group-text" for="inputGroupSelect01">Create Journal</label>
            <input type="text" class="form-control" />
            <button class="btn btn-warning" type="button" > + </button>
        </div>

    );
}
export default Create;