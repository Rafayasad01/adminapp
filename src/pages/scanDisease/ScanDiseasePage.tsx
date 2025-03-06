import { useState } from 'react';
import {
  Box,
  Button,
  LinearProgress,
  LinearProgressProps,
  Typography,
  linearProgressClasses,
} from '@mui/material';
import TopBar from '../../components/common/Md-Alder/TopBar';
import SmileFace from '../../assets/images/SmileFace.png';
import OpenCamera from '../../assets/images/open-camera.png';
import ScanDiseaseWebCamModal from './ScanDieseaseWebCamModal';

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          sx={{
            height: 10,
            borderRadius: 5,
            [`&.${linearProgressClasses.colorPrimary}`]: {
              backgroundColor: 'var(--theme-faded)',
            },
            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 5,
              backgroundColor: 'var(--theme-background)',
            },
          }}
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const ScanDiseasePage = () => {
  const [imagePreview, setImagePreview] = useState<string | undefined | null>(
    null
  );
  const [capturePreview, setCapturePreview] = useState<
    string | undefined | null
  >(null);
  const [webCam, setWebCam] = useState(false);

  const handleOpenCamera = () => {
    setWebCam(true);
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result?.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <TopBar title="Scan Disease" />
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-2 gap-10">
          <div className="alder-card-border p-8 ">
            <div
              className="flex min-h-[400px] items-center justify-center rounded-[15px] bg-faded"
              onClick={handleOpenCamera}
            >
              {capturePreview ? (
                <div className="w-full">
                  <img
                    src={capturePreview}
                    alt="Preview"
                    className="max-h-[400px] w-full rounded-[15px]"
                  />
                </div>
              ) : (
                <div>
                  <div className="flex w-full justify-center">
                    <img
                      src={OpenCamera}
                      alt="Open Camera"
                      className="h-[63px]"
                    />
                  </div>
                  <h2 className="mt-5">Open Camera</h2>
                </div>
              )}
            </div>
            {capturePreview && (
              <div className="mt-10">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    className="bg-background p-3"
                    onClick={handleOpenCamera}
                    variant="contained"
                  >
                    Retake
                  </Button>

                  <Button className="bg-background p-3" variant="contained">
                    Analyze
                  </Button>
                </div>
                <div className="mt-5">
                  <p className="text-sm">
                    <span className="text-gray-400">Disease:</span>
                    <span className="text-black">Acne</span>
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="text-gray-400">Patient</span>
                  </p>
                  <LinearProgressWithLabel value={46} />
                </div>
              </div>
            )}
          </div>
          <div className="alder-card-border p-8">
            <div
              className="flex min-h-[400px] items-center justify-center rounded-[15px] bg-faded"
              onClick={() => document?.getElementById('imageInput')?.click()}
            >
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-[400px] w-full"
                />
              )}
              <div className={`${imagePreview ? 'hidden' : ''}`}>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleUploadImage}
                  style={{ display: 'none' }}
                />
                <div className="flex w-full justify-center">
                  <img src={SmileFace} alt="Upload" className="h-[63px]" />
                </div>
                <h2 className="mt-5">Upload Image</h2>
              </div>
            </div>
            {imagePreview && (
              <div className="mt-10">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    className="bg-background p-3"
                    onClick={() =>
                      document?.getElementById('imageInput')?.click()
                    }
                    variant="contained"
                  >
                    Choose a file
                  </Button>

                  <Button className="bg-background p-3" variant="contained">
                    Analyze
                  </Button>
                </div>
                <div className="mt-5">
                  <p className="text-sm">
                    <span className="text-gray-400">Disease:</span>
                    <span className="text-black">Acne</span>
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="text-gray-400">Patient</span>
                  </p>
                  <LinearProgressWithLabel value={46} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ScanDiseaseWebCamModal
        open={webCam}
        setOpen={setWebCam}
        setImage={setCapturePreview}
      />
    </>
  );
};
export default ScanDiseasePage;
