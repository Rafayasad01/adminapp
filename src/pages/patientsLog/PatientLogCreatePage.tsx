import {
  Button,
  FormControl,
  Input,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import SmileFace from '../../assets/images/smile-dark.png';
import TopBar from '../../components/common/Md-Alder/TopBar';
import { Patient } from '../../interfaces/patient.interface';
import {
  imageAllowedTypes,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../utils/constants';
import service from '../../services/adminapp/adminPatient';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import CustomDropDown from '../../components/common/CustomDropDown';
import CustomInputBox from '../../components/common/CustomInputBox';
import { useSnackbar } from '../../components/hooks/useSnackbar';

const PatientLogCreatePage = () => {
  const { showMessage } = useSnackbar();
  const [imagePreview, setImagePreview] = useState<string | undefined | null>(
    null
  );
  const [image, setImage] = useState<any>(null);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<Patient>();

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

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result?.toString());
      };
      reader.readAsDataURL(selectedFile);
      const fileType = selectedFile.type;
      if (imageAllowedTypes.includes(fileType)) {
        setImage(event.target.files[0]);
      } else {
        showMessage('Only .png, .jpg, and .jpeg files are allowed', 'error');
      }
    }
  };

  const handleFileOnClick = (event: any) => {
    event.target.value = null;
    setImage(null);
  };

  const onSubmitHandler = (data: Patient) => {
    setIsLoader(true);
    const formData = new FormData();
    formData.append('name', `${data.firstName} ${data.lastName}`);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('occupation', data.occupation);
    formData.append('desc', data.desc);
    formData.append('address', data.address);
    formData.append('age', data.age);
    formData.append('gender', data.gender);
    if (image) formData.append('avatar', image);
    service
      .create(formData)
      .then((item) => {
        if (item.data.success) {
          showMessage(item.data.message, 'success');
          setIsLoader(false);
        } else {
          showMessage(item.data.message, 'error');
          setIsLoader(false);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        showMessage(err.message, 'error');
      });
  };

  return (
    <>
      <TopBar title="Add New Patient" />
      <div className="mt-10 pr-5">
        <div className="alder-content ">
          <h4 className="alder-content-title capitalize">Patient info form</h4>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex gap-5">
              <div className="w-2/3">
                <div className="mt-5 grid grid-cols-2 gap-5">
                  <FormControl className="FormControl" variant="standard">
                    <Input
                      {...register('firstName', {
                        required: true,
                        pattern: PATTERN.CHAR_NUM_DASH,
                        validate: (value) => value.length <= 100,
                      })}
                      className="FormInput alder-form-control"
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      disableUnderline
                    />
                    {errors.firstName?.type === 'required' && (
                      <ErrorSpanBox error="First name is required" />
                    )}
                    {errors.firstName?.type === 'pattern' && (
                      <ErrorSpanBox error={INVALID_CHAR} />
                    )}
                    {errors.firstName?.type === 'validate' && (
                      <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                    )}
                  </FormControl>

                  <FormControl className="FormControl" variant="standard">
                    <Input
                      {...register('lastName', {
                        // required: true,
                        pattern: PATTERN.CHAR_NUM_DASH,
                        validate: (value) => value.length <= 100,
                      })}
                      className="FormInput alder-form-control"
                      id="lastName"
                      name="lastName"
                      placeholder="Smith"
                      disableUnderline
                    />
                    {errors.lastName?.type === 'required' && (
                      <ErrorSpanBox error="Last name is required" />
                    )}
                    {errors.lastName?.type === 'pattern' && (
                      <ErrorSpanBox error={INVALID_CHAR} />
                    )}
                    {errors.lastName?.type === 'validate' && (
                      <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                    )}
                  </FormControl>
                  <FormControl
                    className="FormControl w-full"
                    variant="standard"
                  >
                    <CustomDropDown
                      validateRequired
                      id="gender"
                      control={control}
                      error={errors}
                      setValue={setValue}
                      register={register}
                      options={{
                        roles: [
                          { id: 'male', name: 'Male' },
                          { id: 'female', name: 'Female' },
                        ],
                      }}
                      customHeight="h-[40px] rounded-xl alder-form-control"
                      customClassInputTitle="font-semibold"
                      // inputTitle=""
                      defaultValue="Select Gender"
                    />
                  </FormControl>
                  <FormControl
                    className="FormControl w-full"
                    variant="standard"
                  >
                    <CustomInputBox
                      pattern={PATTERN.ONLY_NUM}
                      maxLetterLimit={15}
                      // inputTitle="Phone"
                      placeholder="+92345345345"
                      id="phone"
                      customFontClass="font-semibold mb-1"
                      customClass="alder-form-control"
                      register={register}
                      // requiredType
                      error={errors.phone}
                      inputType="number"
                      // typeImportant
                    />
                  </FormControl>
                  <FormControl
                    className="FormControl w-full"
                    variant="standard"
                  >
                    <CustomInputBox
                      requiredType
                      pattern={PATTERN.CHAR_NUM_DOT_AT}
                      placeholder="johnsmith@gmail.com"
                      id="email"
                      customFontClass="font-semibold mb-1"
                      customClass="alder-form-control"
                      register={register}
                      error={errors.email}
                      inputType="text"
                    />
                  </FormControl>

                  <FormControl
                    className="FormControl w-full"
                    variant="standard"
                  >
                    <CustomInputBox
                      pattern={PATTERN.ONLY_NUM}
                      maxLetterLimit={3}
                      // inputTitle="Phone"
                      placeholder="Enter age ex: 34"
                      id="age"
                      customFontClass="font-semibold mb-1"
                      customClass="alder-form-control"
                      register={register}
                      requiredType
                      error={errors.age}
                      inputType="number"
                      typeImportant
                    />
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <Input
                      {...register('occupation', {
                        // required: true,
                        pattern: PATTERN.CHAR_NUM_DASH,
                        validate: (value) => value.length <= 100,
                      })}
                      className="FormInput alder-form-control"
                      id="occupation"
                      name="occupation"
                      placeholder="Enter occupation ex: Manager"
                      disableUnderline
                    />
                    {errors.occupation?.type === 'required' && (
                      <ErrorSpanBox error="occupation is required" />
                    )}
                    {errors.occupation?.type === 'pattern' && (
                      <ErrorSpanBox error={INVALID_CHAR} />
                    )}
                    {errors.occupation?.type === 'validate' && (
                      <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                    )}
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <Input
                      {...register('address', {
                        // required: true,
                        pattern: PATTERN.CHAR_NUM_DASH,
                        validate: (value) => value.length <= 100,
                      })}
                      className="FormInput alder-form-control"
                      id="address"
                      name="address"
                      placeholder="Enter address ex: gulburg street # 2"
                      disableUnderline
                    />
                    {errors.address?.type === 'required' && (
                      <ErrorSpanBox error="address is required" />
                    )}
                    {errors.address?.type === 'pattern' && (
                      <ErrorSpanBox error={INVALID_CHAR} />
                    )}
                    {errors.address?.type === 'validate' && (
                      <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                    )}
                  </FormControl>
                </div>
                <div className="w-full">
                  <FormControl
                    className="FormControl w-full"
                    variant="standard"
                  >
                    <label className="alder-content-title my-4 capitalize">
                      Any Patient Description{' '}
                    </label>
                    <TextField
                      className="FormTextarea w-full bg-foreground"
                      id="desc"
                      multiline
                      rows={7}
                      defaultValue=""
                      placeholder="Write Note..."
                      {...register('desc', {
                        maxLength: {
                          value: 250,
                          message: MAX_LENGTH_EXCEEDED,
                        },
                      })}
                    />
                    {errors.desc && (
                      <ErrorSpanBox error={errors.desc?.message} />
                    )}
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
                          // onChange={handleUploadImage}
                          {...register(
                            'avatar'
                            //  { required: 'Icon is required' }
                          )}
                          onChange={(
                            event: React.InputHTMLAttributes<HTMLInputElement>
                          ) => {
                            handleFileChange(event);
                          }}
                          onClick={(
                            event: React.InputHTMLAttributes<HTMLInputElement>
                          ) => {
                            handleFileOnClick(event);
                          }}
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
                        <button
                          onClick={() => {
                            setImagePreview(null);
                            setImage(null);
                          }}
                          className="mx-3 flex h-[40px] w-[117px] items-center justify-center rounded-[10px] border-2 border-background"
                        >
                          <RefreshIcon
                            fontSize="inherit"
                            className="mr-2 text-background"
                          />
                          <span className="mt-1">Reset</span>
                        </button>
                        <button
                          type="submit"
                          className="flex h-[40px] w-[117px] items-center justify-center rounded-[10px] border-primary bg-background px-2 text-center text-primary"
                        >
                          {isLoader ? (
                            <CircularProgress
                              size={20}
                              className="text-foreground"
                            />
                          ) : (
                            <>
                              <SendIcon fontSize="inherit" className="mr-2" />
                              <span className="mt-1">Save</span>
                            </>
                          )}
                        </button>
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
