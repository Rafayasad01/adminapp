import { Button, FormControl, FormGroup, Input } from '@mui/material';
import React, { useRef, useState } from 'react';
import camera from '../../../assets/images/camera-dark.png';
import ScanDiseaseWebCamModal from '../../scanDisease/ScanDieseaseWebCamModal';

const PatientScanCard = ({ index, callback }: any) => {
  const [capturePreview, setCapturePreview] = useState<
    string | undefined | null
  >(null);
  const [capturePreviewFile, setCapturePreviewFile] = useState<any>(null);
  const [caption, setCaption] = useState('');
  const [webCam, setWebCam] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);

  const handleOpenCamera = () => {
    setWebCam(true);
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    console.log('FILEE', file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturePreview(reader.result?.toString());
        setCapturePreviewFile(file);
        callback(index, { image: file || null, caption });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
    callback(index, { image: capturePreviewFile, caption: e.target.value });
  };

  return (
    <div className="alder-camera-scan-card">
      <div className="flex h-[200px] flex-col items-center  justify-center rounded-xl bg-white">
        <input
          type="file"
          id="imageInput"
          ref={imageInput}
          accept="image/*"
          onChange={handleUploadImage}
          style={{ display: 'none' }}
        />
        {!capturePreview ? (
          <div className="flex flex-col justify-center">
            <img src={camera} alt="camera" className="h-[78px]" />
            <h2 className="mt-1 font-medium">Open Camera</h2>
          </div>
        ) : (
          <img
            src={capturePreview}
            alt="camera"
            className="h-full w-full rounded-xl"
          />
        )}
      </div>
      <div className="mt-5 grid grid-cols-12 items-center gap-2">
        <div className="col-span-6">
          <FormGroup>
            <FormControl fullWidth>
              <Input
                name="caption"
                className="alder-form-control"
                placeholder="Caption"
                value={caption}
                onChange={handleCaptionChange}
                disableUnderline
              />
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-span-3">
          <Button
            onClick={() => imageInput?.current?.click()}
            className="nohover h-[45px] w-full rounded-xl border-primary bg-background text-primary"
          >
            Upload
          </Button>
          {/* <Button
            onClick={() => imageInput?.current?.click()}
            className="btn-black-fill rounded-10 w-full py-3"
          >
            Upload
          </Button> */}
        </div>
        <div className="col-span-3">
          <Button
            variant="outlined"
            onClick={handleOpenCamera}
            className="h-[45px] w-full rounded-xl border-2 border-background text-background"
          >
            Retake
          </Button>
          {/* <Button
            variant="outlined"
            onClick={handleOpenCamera}
            className=" rounded-10 w-full border-primary py-3 font-bold capitalize text-primary"
          >
            Retake
          </Button> */}
        </div>
      </div>
      <ScanDiseaseWebCamModal
        open={webCam}
        setOpen={setWebCam}
        setImage={setCapturePreview}
      />
    </div>
  );
};

export default React.memo(PatientScanCard);
