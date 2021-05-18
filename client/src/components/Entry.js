import React from 'react';

function Entry() {
    return (
        <div className="main">
            <div className="card">
                <h5 className="card-header">
                    <div className="form-outline">
                        <label className="form-label" for="textAreaExample">
                            Title
						</label>
                        <textarea className="form-control" id="textAreaExample" rows="1" />
                    </div>
                    <button>Save</button>
                </h5>
                <div className="card-body">
                    <div className="form-outline">
                        <label className="form-label" for="textAreaExample">
                            Date:
						</label>
                        <textarea className="form-control" id="textAreaExample" rows="1" />
                    </div>
                    <hr />
                    <div className="form-outline">
                        <textarea className="form-control" id="textAreaExample" rows="15" />
                        <label className="form-label" for="textAreaExample" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Entry;