import { Button, IconButton, Modal } from '@mui/material';
import React, { useMemo } from 'react';
import Webcam from 'react-webcam';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import assets from '../../../assets';

const videoConstraints = {
  width: 482,
  height: 400,
  facingMode: 'user',
};

interface ScanDiseaseWebCamModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImage: React.Dispatch<React.SetStateAction<string | undefined | null>>;
}

const WebCamModal: React.FC<ScanDiseaseWebCamModalProps> = ({
  open,
  setOpen,
  setImage,
}) => {
  const webcamRef = React.useRef<Webcam>(null);
  const handleClose = () => setOpen(false);

  const capture = React.useCallback(() => {
    setImage(webcamRef?.current?.getScreenshot());
    handleClose();
    // const imageSrc = webcamRef?.current?.getScreenshot();
  }, [webcamRef]);
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal h-auto">
        <div className="modal-header">
          <div className="header-heading-box">
            <img src={assets.images.iconOverDue} alt="" />
            <span className="modal-heading">Capture Image</span>
          </div>
          <div className="header-close-btn">
            <IconButton onClick={handleClose}>
              <HighlightOffIcon />
            </IconButton>
          </div>
        </div>
        <hr className="divider horizontal" style={{ margin: '0.625rem 0' }} />
        <div className="modal-body h-auto">
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={482}
            videoConstraints={videoConstraints}
          />
          <div className="relative top-[-50px] flex justify-center">
            <Button
              variant="contained"
              color="secondary"
              className="bg-background"
              onClick={capture}
            >
              Capture photo
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(WebCamModal);
