import {
  Button,
  FormControl,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  TextareaAutosize,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import TopBar from '../../components/common/Md-Alder/TopBar';
import ChipsInput from '../../components/common/ChipsInput';
import SmileFace from '../../assets/images/smile-dark.png';
import Photo from '../../assets/images/PhotoLessRounded.png';
import DoctorsCreateSchedulePopup from './DoctorsCreateSchedulePopup';

const DoctorsEditPage = () => {
  const [scheduleAddPopup, setScheduleAddPopup] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | undefined | null>(
    Photo
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
      <TopBar title="Add Doctor Profile" />
      <DoctorsCreateSchedulePopup
        scheduleAddPopup={scheduleAddPopup}
        setScheduleAddPopup={setScheduleAddPopup}
      />
      <div className="mt-10 pr-5">
        <div className="alder-content alder-patient-visit-logs mt-10 p-5">
          <div className="">
            <div className="">
              <h4 className="alder-content-title capitalize">Add details</h4>
              <div className="w-100 my-4 grid grid-cols-12 gap-2 py-4">
                <div className="grid grid-cols-12 md:col-span-8">
                  {/* First Name */}
                  <div className="col-span-6 px-3 py-2">
                    <FormGroup>
                      <FormControl variant="outlined" fullWidth>
                        <Input
                          disableUnderline
                          type="text"
                          name="first_name"
                          className="form-control alder-form-control"
                          defaultValue="Jhon"
                          placeholder="First Name"
                        />
                      </FormControl>
                    </FormGroup>
                  </div>
                  {/* Last Name */}
                  <div className="col-span-6 px-3 py-2">
                    <FormGroup>
                      <FormControl variant="outlined" fullWidth>
                        <Input
                          disableUnderline
                          type="text"
                          name="last_name"
                          defaultValue="Doe"
                          className="form-control alder-form-control"
                          placeholder="Last Name"
                        />
                      </FormControl>
                    </FormGroup>
                  </div>
                  {/* Gender */}
                  <div className="col-span-6 px-3 py-2">
                    <FormGroup>
                      <FormControl variant="outlined" fullWidth>
                        <Select
                          disableUnderline
                          type="text"
                          name="gender"
                          className="form-control alder-form-control"
                          placeholder="Select gender"
                          defaultValue="Male"
                        >
                          <MenuItem value={0} selected disabled>
                            Select
                          </MenuItem>
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </div>

                  {/* phone number */}
                  <div className="col-span-6 px-3 py-2">
                    <FormGroup>
                      <FormControl variant="outlined" fullWidth>
                        <Input
                          disableUnderline
                          type="text"
                          name="phone"
                          defaultValue="132 456 469"
                          className="form-control alder-form-control"
                          placeholder="Number"
                        />
                      </FormControl>
                    </FormGroup>
                  </div>

                  {/* Email */}
                  <div className="col-span-6 px-3 py-2">
                    <FormGroup>
                      <FormControl variant="outlined" fullWidth>
                        <Input
                          disableUnderline
                          type="email"
                          name="email"
                          defaultValue="jhon@example.com"
                          className="form-control alder-form-control"
                          placeholder="Email"
                        />
                      </FormControl>
                    </FormGroup>
                  </div>

                  {/* Age */}
                  <div className="col-span-6 px-3 py-2">
                    <FormGroup>
                      <FormControl variant="outlined" fullWidth>
                        <Input
                          disableUnderline
                          type="number"
                          name="age"
                          defaultValue="45"
                          className="form-control alder-form-control"
                          placeholder="Age"
                        />
                      </FormControl>
                    </FormGroup>
                  </div>
                  {/* Address */}
                  <div className="col-span-12 px-3 py-2">
                    <FormGroup>
                      <FormControl variant="outlined" fullWidth>
                        <Input
                          disableUnderline
                          type="text"
                          name="address"
                          defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting"
                          className="form-control alder-form-control"
                          placeholder="Address"
                          endAdornment={
                            <InputAdornment position="end">
                              <LocationOnIcon />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </FormGroup>
                  </div>

                  {/* Designations */}
                  <div className="col-span-6 px-3 py-2">
                    <FormGroup>
                      <FormControl variant="outlined" fullWidth>
                        <Select
                          disableUnderline
                          type="text"
                          name="designations"
                          className="form-control alder-form-control"
                          IconComponent={KeyboardArrowDownIcon}
                          placeholder="Select Designations"
                          defaultValue={0}
                        >
                          <MenuItem value={0} selected disabled>
                            Designations
                          </MenuItem>
                          <MenuItem value="Specialist">Specialist</MenuItem>
                          <MenuItem value="Surgeon">Surgeon</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </div>
                  {/* Expertise */}
                  <div className="col-span-6 px-3 py-2">
                    <FormGroup>
                      <FormControl variant="outlined" fullWidth>
                        <Select
                          disableUnderline
                          type="text"
                          name="expertise"
                          className="form-control alder-form-control"
                          IconComponent={KeyboardArrowDownIcon}
                          placeholder="Select Expertise"
                          defaultValue={0}
                        >
                          <MenuItem value={0} selected disabled>
                            Expertise
                          </MenuItem>
                          <MenuItem value="Specialist">Specialist</MenuItem>
                          <MenuItem value="Surgeon">Surgeon</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </div>
                  {/* Board Certification */}
                  <div className="col-span-6 px-3 py-2">
                    <FormGroup>
                      <FormControl variant="outlined" fullWidth>
                        <Select
                          disableUnderline
                          type="text"
                          name="certification"
                          className="form-control alder-form-control"
                          IconComponent={KeyboardArrowDownIcon}
                          placeholder="Select Board Certification"
                          defaultValue={0}
                        >
                          <MenuItem value={0} selected disabled>
                            Board Certification
                          </MenuItem>
                          <MenuItem value="Specialist">Specialist</MenuItem>
                          <MenuItem value="Surgeon">Surgeon</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </div>
                  {/* College */}
                  <div className="col-span-6 px-3 py-2">
                    <FormGroup>
                      <FormControl variant="outlined" fullWidth>
                        <Select
                          disableUnderline
                          type="text"
                          name="certification"
                          className="form-control alder-form-control"
                          placeholder="Select Board Certification"
                          IconComponent={KeyboardArrowDownIcon}
                          defaultValue={0}
                        >
                          <MenuItem value={0} selected disabled>
                            College
                          </MenuItem>
                          <MenuItem value="Specialist">Specialist</MenuItem>
                          <MenuItem value="Surgeon">Surgeon</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </div>
                  {/* College */}
                  <div className="col-span-6 px-3 py-2">
                    <FormGroup>
                      <FormControl variant="outlined" fullWidth>
                        <Select
                          disableUnderline
                          type="text"
                          name="university"
                          className="form-control alder-form-control"
                          IconComponent={KeyboardArrowDownIcon}
                          placeholder="Select Board Certification"
                          defaultValue={0}
                        >
                          <MenuItem value={0} selected disabled>
                            University
                          </MenuItem>
                          <MenuItem value="Specialist">Specialist</MenuItem>
                          <MenuItem value="Surgeon">Surgeon</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </div>
                  {/* Fellowship */}
                  <div className="col-span-6 px-3 py-2">
                    <FormGroup>
                      <FormControl variant="outlined" fullWidth>
                        <Select
                          disableUnderline
                          type="text"
                          name="certification"
                          className="form-control alder-form-control"
                          IconComponent={KeyboardArrowDownIcon}
                          placeholder="Select Fellowship"
                          defaultValue={0}
                        >
                          <MenuItem value={0} selected disabled>
                            Fellowship
                          </MenuItem>
                          <MenuItem value="Specialist">Specialist</MenuItem>
                          <MenuItem value="Surgeon">Surgeon</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </div>
                  {/* Experience */}
                  <div className="col-span-12 mb-2 px-3">
                    <ChipsInput
                      name="experience"
                      maxChips={3}
                      defaultChips={[
                        'MACY GENERAL HOSPITAL',
                        'MACY GENERAL HOSPITAL',
                        'MACY GENERAL HOSPITAL',
                      ]}
                    />
                  </div>
                  <div className="col-span-12 mb-2 px-3">
                    <ChipsInput name="skills" maxChips={3} />
                  </div>
                  <div className="col-span-12 mb-2 px-3">
                    <ChipsInput name="languages" maxChips={3} />
                  </div>
                  <div className="col-span-12 mb-2 px-3">
                    <ChipsInput name="social" maxChips={3} />
                  </div>
                  <div className="col-span-12 px-3">
                    <FormGroup>
                      <FormControl
                        variant="outlined"
                        className="cursor-pointer"
                        fullWidth
                      >
                        <Input
                          disableUnderline
                          onClick={() => setScheduleAddPopup(true)}
                          type="button"
                          className="form-control alder-form-control text-gray-400"
                          value="Add Dates & Time"
                          componentsProps={{
                            input: {
                              className: 'text-left',
                            },
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setScheduleAddPopup(true)}
                              >
                                <AddIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </FormGroup>
                    {/* <Button
                      onClick={() => setScheduleAddPopup(true)}
                      className="btn btn-primary"
                    >
                      Add selection
                    </Button> */}
                  </div>
                </div>
                <div className="py-4 md:col-span-4">
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

                  <div className="mt-5">
                    <FormGroup>
                      <FormControl variant="outlined" fullWidth>
                        <TextareaAutosize
                          className="alder-form-control"
                          placeholder="Bio"
                          name="bio"
                          minRows={12}
                          defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                        />
                      </FormControl>
                    </FormGroup>
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
                      <Button className="btn-black-fill rounded-xl border-primary text-primary">
                        <SendIcon className="mr-3" />
                        Save{' '}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(DoctorsEditPage);
