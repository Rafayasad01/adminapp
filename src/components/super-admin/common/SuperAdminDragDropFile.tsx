import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

import assets from '../../../assets';

function SuperAdminDragDropFile() {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // const handleFile = (files: any) => {
  //   // console.log(files);
  // };

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFile(e.dataTransfer.files);
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFile(e.target.files);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <FormControl
      className="FormControl"
      variant="standard"
      onDragEnter={handleDrag}
    >
      <input
        className="FormInput"
        ref={inputRef}
        type="file"
        id="InputFileUpload"
        multiple
        onChange={handleChange}
      />
      <label
        id="LabelFileUpload"
        htmlFor="InputFileUpload"
        className={dragActive ? 'FormLabel DragActive' : 'FormLabel'}
      >
        <img src={assets.images.fileUpload} alt="" />
        <span className="FileUploadText mt-2">Drag & drop files</span>
        <div className="FileUploadText">
          <span>or</span>
          <Button
            className="UploadButton"
            onClick={onButtonClick}
            variant="text"
            sx={{
              margin: 0,
              padding: '0 !important',
              textTransform: 'capitalize',
            }}
          >
            Browse
          </Button>
        </div>
      </label>
      {dragActive && (
        <div
          id="DragFileElement"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />
      )}
    </FormControl>
  );
}

export default SuperAdminDragDropFile;
