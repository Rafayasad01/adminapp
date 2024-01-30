import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { useRef, useState } from 'react';

import assets from '../../assets';
import '../../assets/css/PopupStyle.css';
import { imageAllowedTypes } from '../../utils/constants';

type Props = {
  setFile: any;
  setImg: any;
  customWidth?: string;
  setError?: any;
  error?: any;
  setIsNotify?: any;
  setNotifyMessage?: any;
};

function DragDropFile({
  setFile,
  setImg,
  customWidth,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // const [imageUrl, setImageUrl] = useState<any>();

  const handleFile = (files: any) => {
    // console.log(files);
    setFile(files[0]);
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
    if (droppedFile) {
      const fileType = droppedFile.type;
      if (imageAllowedTypes.includes(fileType)) {
        setFile(droppedFile);
        const reader = new FileReader();
        reader.onload = () => {
          setImg(reader.result as string);
          // setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(droppedFile);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Only .png, .jpg, and .jpeg files are allowed',
          type: 'error',
        });
      }
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const fileType = uploadedFile.type;
      if (imageAllowedTypes.includes(fileType)) {
        const reader = new FileReader();
        reader.onload = () => {
          setImg(reader.result as string);
          // setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(uploadedFile);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Only .png, .jpg, and .jpeg files are allowed',
          type: 'error',
        });
      }
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={`flex ${
        customWidth || 'w-[400px]'
      } items-center justify-start`}
    >
      <div className="">
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
