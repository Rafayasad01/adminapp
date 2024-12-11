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
import { CategoryService } from '../../interfaces/category.interface';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  // imageAllowedTypes,
} from '../../utils/constants';

type CategoriesServicesEditPopupProps = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  formData: any;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function CategoriesServicesOverridePopup({
  openFormDialog,
  setOpenFormDialog,
  formData,
  callback,
  setIsNotify,
  setNotifyMessage,
}: CategoriesServicesEditPopupProps) {
  // const [image, setImage] = useState<any>(null);
  // const [imageName, setImageName] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryService>();
  const onSubmit = (data: CategoryService) => {
    // if (image !== null) {
    //   const res = {
    //     name: data.name,
    //     desc: data.desc,
    //     price: formData.price,
    //     loyaltyCoins: formData.loyaltyCoins,
    //     icon: image,
    //   };
    //   setOpenFormDialog(false);
    //   callback(res);
    // } else if (data.name) {
    //   const res = {
    //     name: data.name,
    //     desc: data.desc,
    //     price: formData.price,
    //     loyaltyCoins: formData.loyaltyCoins,
    //   };
    //   setOpenFormDialog(false);
    //   callback(res);
    // } else {
    //   setIsNotify(true);
    //   setNotifyMessage({
    //     text: 'All fields are required!',
    //     type: 'error',
    //   });
    // }
    if (data.name) {
      const res = {
        name: data.name,
        desc: data.desc,
        // price: formData.price,
        // loyaltyCoins: formData.loyaltyCoins,
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
  // };

  // useEffect(() => {
  //   if (formData.icon !== 'null') {
  //     let icon = formData.icon.split('/').slice(-1)[0];
  //     const regexExp = /[a-z,0-9,-]{36}/;
  //     if (regexExp.test(icon)) {
  //       icon = icon.split('-').splice(5)[0].at(0);
  //     }
  //     setImageName(icon);
  //   }
  // }, [formData]);

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
            <span className="Title">Over-Write Product Details</span>
          </div>
          <div className="FormBody">
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel mt-2">Name</label>
                <Input
                  className="FormInput"
                  id="name"
                  placeholder="Enter service name"
                  {...register('name', {
                    required: 'Name is required',
                    value: formData.name,
                    pattern: PATTERN.CHAR_SPACE_DASH,
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
                <label className="FormLabel mt-2">
                  Message{' '}
                  <span className="SubLabel">Write 01-250 Characters</span>
                </label>
                <TextField
                  className="FormTextarea"
                  id="message"
                  multiline
                  rows={4}
                  defaultValue=""
                  placeholder="Write Description"
                  {...register('desc', {
                    // required: 'Description is required',
                    value: formData.desc,
                    // minLength: {
                    //   value: 1,
                    //   message: 'Minimum One Characters',
                    // },
                    maxLength: {
                      value: 250,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                />
                {errors.desc && <ErrorSpanBox error={errors.desc?.message} />}
              </FormControl>
            </div>
            {/* <div className="FormField">
              <label className="FormLabel">
                Upload Image
                <span className="SubLabel">
                  Image should be 1080px x 1080px
                </span>
              </label>
              <div className="ImageBox">
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
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
                />
                <label htmlFor="raised-button-file" className="ImageLabel">
                  <Button component="span" className="ImageBtn">
                    <FileUploadOutlinedIcon sx={{ marginRight: '0.5rem' }} />
                    Upload image
                  </Button>
                </label>
                {imageName ? (
                  <div className="ShowImageBox">
                    <label className="ShowImageLabel">{imageName}</label>
                    <IconButton
                      className="btn-dot"
                      onClick={() => setImageName(null)}
                    >
                      <CloseOutlinedIcon
                        sx={{
                          color: '#1D1D1D',
                          fontSize: '1rem',
                          lineHeight: '1.5rem',
                        }}
                      />
                    </IconButton>
                  </div>
                ) : (
                  ''
                )}
              </div>
              {/* {image === null && imageName === null && (
                <ErrorSpanBox error="Image is required" />
              )} */}
            {/* </div> */}
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
                padding: '0.375rem 2rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default CategoriesServicesOverridePopup;
