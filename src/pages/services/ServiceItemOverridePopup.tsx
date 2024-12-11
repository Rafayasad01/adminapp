// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
// import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';

import '../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { BarberCategoryServices } from '../../interfaces/services.interface';
import {
  // GENDER,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  // VALIDATE_NON_NEGATIVE_NUM,
  // imageAllowedTypes,
} from '../../utils/constants';
// import CustomDropDown from '../../components/common/CustomDropDown';
// import CustomInputBox from '../../components/common/CustomInputBox';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  formData: any;
  setNotifyMessage: any;
};

function ServiceItemOverridePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  formData,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  // const [image, setImage] = useState<any>(null);
  // const [imageName, setImageName] = useState<any>(null);

  const {
    register,
    handleSubmit,
    // setValue,
    // control,
    formState: { errors },
  } = useForm<BarberCategoryServices>();

  // console.log('🚀 ~ onSubmit ~ errors:', errors);

  const onSubmit = (data: BarberCategoryServices) => {
    if (data.name) {
      const res = {
        name: data.name,
        desc: data.description,
      };
      setOpenFormDialog(false);
      callback(res);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  const handleFormClose = () => setOpenFormDialog(false);

  // const handleFileChange = (event: any) => {
  //   const selectedFile = event.target.files[0];
  //   if (selectedFile) {
  //     const fileType = selectedFile.type;
  //     if (imageAllowedTypes.includes(fileType)) {
  //       setImage(event.target.files[0]);
  //       setImageName(event.target.files[0].name);
  //     } else {
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: 'Only .png, .jpg, and .jpeg files are allowed',
  //         type: 'error',
  //       });
  //     }
  //   }
  // };

  // const handleFileOnClick = (event: any) => {
  //   event.target.value = null;
  //   setImage(null);
  //   setImageName(null);
  // };

  // const handleCancelButton = () => {
  //   setImage(null);
  //   setImageName(null);
  //   setValue('avatar', '');
  // };

  // useEffect(() => {
  //   const icon = formData?.avatar?.split('/')?.slice(-1)[0];
  //   setImageName(icon);
  // }, []);
  // console.log('errors', errors);

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Override Service</span>
          </div>
          <div className="FormBody">
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel mt-2">Service Name</label>
                <Input
                  className="FormInput"
                  id="name"
                  placeholder="Enter service name"
                  {...register('name', {
                    value: formData?.name,
                    required: 'Name is required',
                    pattern: PATTERN.CHAR_NUM_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  disableUnderline
                />
                {errors.name?.type === 'required' && (
                  <ErrorSpanBox error={errors.name?.message} />
                )}
                {errors.name?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.name?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel mt-1">
                  Description{' '}
                  <span className="SubLabel">Write 01-350 Characters</span>
                </label>
                <TextField
                  className="FormTextarea"
                  id="message"
                  multiline
                  rows={4}
                  defaultValue=""
                  placeholder="Write Description"
                  {...register('description', {
                    value: formData?.description,
                    maxLength: {
                      value: 350,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                />
                {errors.description && (
                  <ErrorSpanBox error={errors.description?.message} />
                )}
              </FormControl>
            </div>
          </div>
          <div className="FormFooter">
            <Button
              className="btn-black-outline"
              onClick={handleFormClose}
              sx={{
                marginRight: '0.5rem',
                padding: '0.375rem 1.5rem !important',
              }}
            >
              Cancel
            </Button>
            <Input
              type="submit"
              value="Update"
              className="btn-black-fill"
              sx={{
                padding: '0.175rem 2rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default ServiceItemOverridePopup;
