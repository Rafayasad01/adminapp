import {
  Button,
  FormControl,
  Input,
  MenuItem,
  Select,
  TextareaAutosize,
} from '@mui/material';
import { useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import SmileFace from '../../assets/images/smile-dark.png';
import TopBar from '../../components/common/Md-Alder/TopBar';

const PatientLogCreatePage = () => {
  const [imagePreview, setImagePreview] = useState<string | undefined | null>(
    null
  );

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
      <TopBar title="Add New Patient" />
      <div className="mt-10 pr-5">
        <div className="alder-content ">
          <h4 className="alder-content-title capitalize">Patient info form</h4>
          <form action="">
            <div className="flex gap-5">
              <div className="w-2/3">
                <div className="mt-5 grid grid-cols-2 gap-5">
                  <FormControl className="FormControl" variant="standard">
                    <Input
                      variant="outlined"
                      className="FormInput alder-form-control"
                      type="text"
                      name="first_name"
                      disableUnderline
                      placeholder="Patient First Name"
                    />
                  </FormControl>

                  <FormControl className="FormControl" variant="standard">
                    <Input
                      variant="outlined"
                      className="FormInput alder-form-control"
                      type="text"
                      name="last_name"
                      disableUnderline
                      placeholder="Patient Last Name"
                    />
                  </FormControl>

                  <FormControl className="FormControl" variant="standard">
                    <Select
                      value=""
                      className=" alder-form-control text-gray-400"
                      type="text"
                      name="gender"
                      displayEmpty
                      disableUnderline
                      variant="outlined"
                      //   placeholder="Patient Last Name"
                    >
                      <MenuItem value="">Patient Gender</MenuItem>
                      <MenuItem value={1}>Male</MenuItem>
                      <MenuItem value={0}>Male</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl className="FormControl" variant="standard">
                    <Input
                      variant="outlined"
                      className="FormInput alder-form-control"
                      type="tel"
                      name="phone"
                      disableUnderline
                      placeholder="Patient Number"
                    />
                  </FormControl>

                  <FormControl className="FormControl" variant="standard">
                    <Input
                      variant="outlined"
                      className="FormInput alder-form-control"
                      type="email"
                      name="email"
                      disableUnderline
                      placeholder="Patient Email"
                    />
                  </FormControl>

                  <FormControl className="FormControl" variant="standard">
                    <Input
                      variant="outlined"
                      className="FormInput alder-form-control"
                      type="number"
                      name="age"
                      disableUnderline
                      placeholder="Patient Email"
                    />
                  </FormControl>

                  <FormControl className="FormControl" variant="standard">
                    <Select
                      value=""
                      className=" alder-form-control text-gray-400"
                      type="text"
                      name="gender"
                      displayEmpty
                      disableUnderline
                      variant="outlined"
                    >
                      <MenuItem value="">Patient Status</MenuItem>
                      <MenuItem value={1}>InActive</MenuItem>
                      <MenuItem value={0}>Active</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl className="FormControl" variant="standard">
                    <Input
                      variant="outlined"
                      className="FormInput alder-form-control"
                      type="text"
                      name="occupation"
                      disableUnderline
                      placeholder="Patient Occupation"
                    />
                  </FormControl>
                </div>

                <div className="mt-4 ">
                  <FormControl className=" w-full" variant="standard">
                    <TextareaAutosize
                      className="FormInput alder-form-control"
                      minRows={6}
                      placeholder="Patient Address"
                    />
                  </FormControl>
                </div>
              </div>
              <div className="w-1/3">
                <div className="mt-5">
                  <div className="alder-card-border ">
                    <div
                      className="flex min-h-[400px] items-center justify-center rounded-[15px] bg-[#FFF]"
                      onClick={() =>
                        document?.getElementById('imageInput')?.click()
                      }
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
                          <img
                            src={SmileFace}
                            alt="Upload"
                            className="h-[63px]"
                          />
                        </div>
                        <h2 className="mt-5">Upload Image</h2>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flex justify-end">
                        <Button
                          variant="outlined"
                          onClick={() => setImagePreview(null)}
                          className="mx-5 rounded-xl border-primary text-primary"
                        >
                          <RefreshIcon className="mr-3" />
                          Reset{' '}
                        </Button>
                        <Button
                          variant="fill"
                          className="btn-black-fill rounded-xl border-primary text-primary"
                        >
                          <SendIcon className="mr-3" />
                          Save{' '}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PatientLogCreatePage;
