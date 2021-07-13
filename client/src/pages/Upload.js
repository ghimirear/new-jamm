import React, { Fragment, useState } from 'react';
import Message from '../components/Message';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  //const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  //const [uploadPercentage, setUploadPercentage] = useState(0);
    const {id} = useParams();
  const onChange = e => {
      console.log(id);
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append("articleId", id)
    try {
      const res = await axios.post('/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
       
      });
      console.log(res);
      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
     
    }
  };

  return (
      <div className="container bg-dark mt-5 align-items-center" style={{height:"300px", width:"400px"}}>
    <Fragment >
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit} >
        <div className='custom-file mb-4 mt-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>


        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>

    </Fragment>
    </div>
  );
};

export default FileUpload;