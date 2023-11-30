import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

import '../../assets/css/PopupStyle.css';
import assets from '../../assets';

type Props = {
  setFile: any;
  setImg: any;
  customWidth?: string;
  setError?: any;
  error?: any
};

function DragDropFile({ setError, error, setFile, setImg, customWidth }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<any>();

  const handleFile = (files: any) => {
    // console.log(files);
    setFile(files[0]);
  };

  const isSVGFile = (file: any) => {
    return file.type.startsWith('image/svg+xml');
  };

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
      handleFile(e.dataTransfer.files);
    }
    const droppedFile = e.dataTransfer.files[0]; // Get the dropped file
    setFile(droppedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result as string);
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(droppedFile);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      if (isSVGFile(uploadedFile)) {
        console.log('ss');
      } else {
        // setError("bannerImage", {
        //   type: "manual",
        //   message: ""
        // })
        const reader = new FileReader();
        reader.onload = () => {
          setImg(reader.result as string);
          setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(uploadedFile);
        // Optionally, you can send the file to a server here
        // For simplicity, I'll just log the file details
        console.log('File uploaded:', uploadedFile);
      }
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={`flex ${customWidth ? customWidth : "w-[400px]"} items-center justify-start`}>
      <div className=''>
        <FormControl
          className="FormControl"
          variant="standard"
          onDragEnter={handleDrag}
        >
          <input
            className="FormInput"
            accept="image/*,.jpg,.jpeg,.png"
            ref={inputRef}
            type="file"
            id="InputFileUpload"
            multiple
            onChange={handleChange}
          />
          <label
            id="LabelFileUpload"
            htmlFor="InputFileUpload"
            className={
              dragActive
                ? 'FormLabel DragActive '
                : 'FormLabel w-[200px] max-w-[200px]'
            }
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
        {/* <div>
          {error && error?.bannerImage?.type === 'manual' && (
            <span role="alert" style={{ color: 'red', fontSize: '12px' }}>{error.bannerImage.message}</span>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default DragDropFile;
