// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import FormControl from '@mui/material/FormControl';
// import Input from '@mui/material/Input';
// import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import { useForm, Controller } from 'react-hook-form';
// import TextField from '@mui/material/TextField';
// import { createTheme } from '@mui/material';
// import FormControl from '@mui/material/FormControl';
// import ThemeProvider from '@mui/material/styles/ThemeProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
import '../../assets/css/PopupStyle.css';
import // ALL_PERMISSIONS,
// CONSTRUCTION_TYPE,
// INVALID_CHAR,
// MAX_LENGTH_EXCEEDED,
// PATTERN,
// PROJECT_PLAN_TYPE,
// VALIDATE_NON_NEGATIVE_NUM,
'../../utils/constants';
// import { Project } from '../../interfaces/projectPlan.interface';
// import ErrorSpanBox from '../../components/common/ErrorSpanBox';
// import CustomDropDown from '../../components/common/CustomDropDown';
// import { listingRolePermission } from '../../utils/helper';
// import { useAppSelector } from '../../redux/redux-hooks';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';
import productServices from '../../services/adminapp/adminProjectProducts';
import assets from '../../assets';
import {
  Product,
  // ProductCustomization,
} from '../../interfaces/projectProduct.interface';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
// import { useAppSelector } from '../../redux/redux-hooks';
import Notify from '../../components/common/Notify';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  VALIDATE_NON_NEGATIVE_NUM,
} from '../../utils/constants';
import { formatCurrency } from '../../utils/helper';
// import CustomBgDropdown from '../../components/common/CustomBgDropdown';
import CustomDropDown from '../../components/common/CustomDropDown';
import { useAppSelector } from '../../redux/redux-hooks';
import TopBar from '../../components/common/TopBar';

function ProductAddPopup() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      stockAvailability: 'Yes',
      spareAvailability: 'Available',
      // warranty: 'No',
      rustProof: 'No',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productCustomization', // Name of the array field
    keyName: 'key',
  });

  const {
    fields: featureFields,
    append: featureAppend,
    remove: featureRemove,
  } = useFieldArray({
    control,
    name: 'features', // Name of the array field
    keyName: 'key',
  });

  const authState: any = useAppSelector((state) => state?.authState);
  const [
    ,
    // file
    setFile,
  ] = useState<any>(null);
  const [files, setFiles] = useState<any>([]);
  const [images, setImages] = useState<any>([]);
  const [vendors, setVendors] = useState<any>([]);
  const [isLoader, setIsLoader] = useState<any>(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});

  useEffect(() => {
    productServices
      .getVendorLov()
      .then((item: any) => {
        if (item.data.success) {
          setVendors(item.data.data);
        }
      })
      .catch((err: Error) => {
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  }, []);

  const onSubmit = (data: any) => {
    const featureArr: any = [];
    data.features.forEach((element: any) => featureArr.push(element.feature));
    setIsLoader(true);
    const formData = new FormData();
    formData.append('productGroup', data.productGroup);
    formData.append('productName', data.productName);
    formData.append('mobileNumber', data.mobileNumber);
    formData.append('vendorId', data.vendorId);
    formData.append('itemCode', data.itemCode);
    formData.append('brandName', data.brandName);
    formData.append('costPrice', String(Number(data.costPrice)));
    formData.append('tax', String(Number(data.tax)));
    formData.append('itemWeight', String(Number(data.itemWeight)));
    formData.append('itemDimension', String(Number(data.itemDimension)));
    formData.append('address', data.address);
    formData.append('desc', data.desc);
    formData.append('vendorDiscount', String(Number(data.vendorDiscount)));
    formData.append('stockAvailability', data.stockAvailability);
    formData.append('stockQuantity', data.stockQuantity);
    formData.append('stockDimension', data.stockDimension);
    formData.append('stockDimensionType', data.stockDimensionType);
    formData.append(
      'sparePartAvailability',
      JSON.stringify(data.spareAvailability)
    );
    formData.append('warranty', data.warranty);
    formData.append('serviceCenter', String(Number(data.serviceCenter)));
    formData.append('rustProof', data.rustProof);
    formData.append('averageLife', data.averageLife);
    formData.append('features', featureArr.join(', ') ?? '');
    formData.append(
      'productCustomization',
      JSON.stringify(data.productCustomization) ?? []
    );
    files.forEach((imageFile: any) => {
      formData.append('productImages', imageFile);
    });
    formData.append('tenant', authState.user.tenant);

    productServices
      .create(formData)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err: Error) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const handleProductCustomizationServices = () => {
    const obj = {
      color: watch('color'),
      price: watch('price'),
      tax: watch('ColorTax'),
    };
    if (watch('color') && watch('price') && watch('ColorTax')) {
      append(obj);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'All Fields are Required',
        type: 'error',
      });
    }
  };

  const handleProductFeatures = () => {
    const obj = {
      feature: watch('feature'),
    };
    featureAppend(obj);
    // else {
    //   setIsNotify(true);
    //   setNotifyMessage({
    //     text: 'Features are Required',
    //     type: 'error',
    //   });
    // }
  };

  const handleFileChange = (onChange: any, event: any | undefined) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (
        fileType === 'image/jpeg' ||
        fileType === 'image/png' ||
        fileType === 'image/jpg'
      ) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setImages((prevImages: any) =>
              Array.isArray(prevImages)
                ? [...prevImages, reader.result as string]
                : [reader.result as string]
            );
          }
        };

        reader.readAsDataURL(selectedFile);
        setFile(selectedFile);
        setFiles((prevFile: any) => [...prevFile, selectedFile]);
        onChange(selectedFile);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Only .jpeg, .jpg, .png image files are allowed',
          type: 'error',
        });
      }
    }
  };

  const handleFileOnClick = (event: any) => {
    event.target.value = null;
    setFile(null);
    setValue('file', '');
  };

  const handleSelectedFileImages = (imgIndex: number) => {
    setImages((prevImages: any) => {
      return [
        ...prevImages.slice(0, imgIndex),
        ...prevImages.slice(imgIndex + 1),
      ];
    });
    setFiles((prevFiles: any) => {
      return [
        ...prevFiles.slice(0, imgIndex),
        ...prevFiles.slice(imgIndex + 1),
      ];
    });
    // const temp = [...images];
    // if (temp?.length <= 0) {

    // }
  };

  useEffect(() => {
    if (images?.length === 0) {
      setFile(null);
      setValue('file', '');
    }
  }, [images]);

  const handleStockAvailability = (type: string) => {
    setValue('stockAvailability', type);
  };

  const handleSpareAvailability = (type: string) => {
    setValue('spareAvailability', type);
  };

  return (
    // <Dialog
    //   open={openFormDialog}
    //   onClose={handleFormClose}
    //   PaperProps={{
    //     className: 'Dialog',
    //     style: { maxWidth: '100%', maxHeight: 'auto' },
    //   }}
    // >
    //   <div className="Content">
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <div className="FormHeader w-full">
    //         <span className="Title">Add Project</span>
    //       </div>
    //       <div className="FormBody mt-2">
    //         <div className="FormFields">
    //           <FormControl className="FormControl" variant="standard">
    //             <label className="FormLabel">Project Name</label>
    //             <Input
    //               className="FormInput"
    //               {...register('name', {
    //                 required: true,
    //                 pattern: PATTERN.CHAR_SPACE_DASH,
    //                 validate: (value) => value.length <= 150,
    //               })}
    //               placeholder="Enter Project Name"
    //               type="text"
    //               id="name"
    //               disableUnderline
    //             />
    //             {errors.name?.type === 'required' && (
    //               <ErrorSpanBox error="Project Name is required" />
    //             )}
    //             {errors.name?.type === 'pattern' && (
    //               <ErrorSpanBox error={INVALID_CHAR} />
    //             )}
    //             {errors.name?.type === 'validate' && (
    //               <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
    //             )}
    //           </FormControl>
    //           <FormControl className="FormControl" variant="standard">
    //             <CustomDropDown
    //               validateRequired
    //               id="type"
    //               control={control}
    //               error={errors}
    //               register={register}
    //               options={{ roles: PROJECT_PLAN_TYPE }}
    //               customClassInputTitle="font-bold"
    //               inputTitle="Project Type"
    //               defaultValue="Select type"
    //             />
    //           </FormControl>
    //         </div>
    //         <div className="FormFields">
    //           <div className="w-full">
    //             <ThemeProvider theme={darkTheme}>
    //               <LocalizationProvider dateAdapter={AdapterDayjs}>
    //                 {/* <DemoItem label="Desktop variant"> */}
    //                 <div>
    //                   <span className="text-sm">Select Start Date</span>
    //                 </div>
    //                 <Controller
    //                   name="startDate"
    //                   control={control}
    //                   rules={{
    //                     required: 'Start date is required',
    //                   }}
    //                   defaultValue={dayjs()}
    //                   render={({ field }) => (
    //                     <DesktopDatePicker
    //                       {...field}
    //                       className="custom-border-2 w-full"
    //                       onChange={(date) => handleDateChange(date, field)}
    //                       // onChange={(date) => field.onChange(date)}
    //                       value={field.value || dayjs()}
    //                       // minDate={dayjs()}
    //                     />
    //                   )}
    //                 />
    //                 {errors && errors.startDate && (
    //                   <ErrorSpanBox error={errors.startDate.message} />
    //                 )}
    //                 {/* </DemoItem> */}
    //               </LocalizationProvider>
    //             </ThemeProvider>
    //           </div>
    //           <div className="w-full">
    //             <ThemeProvider theme={darkTheme}>
    //               <LocalizationProvider dateAdapter={AdapterDayjs}>
    //                 {/* <DemoItem label="Desktop variant"> */}
    //                 <div>
    //                   <span className="text-sm">Select End Date</span>
    //                 </div>
    //                 <Controller
    //                   name="endDate"
    //                   control={control}
    //                   rules={{
    //                     required: 'End date is required',
    //                   }}
    //                   // defaultValue={dayjs()}
    //                   render={({ field }) => (
    //                     <DesktopDatePicker
    //                       {...field}
    //                       className="custom-border-2 w-full"
    //                       onChange={(date) => handleDateChange(date, field)}
    //                       // onChange={(date) => field.onChange(date)}
    //                       value={field.value || dayjs()}
    //                       // minDate={dayjs()}
    //                     />
    //                   )}
    //                 />
    //                 {errors && errors.endDate && (
    //                   <ErrorSpanBox error={errors.endDate.message} />
    //                 )}
    //                 {/* </DemoItem> */}
    //               </LocalizationProvider>
    //             </ThemeProvider>
    //           </div>
    //         </div>
    //         <div className="FormFields">
    //           <FormControl className="FormControl" variant="standard">
    //             <CustomDropDown
    //               validateRequired
    //               id="clientName"
    //               control={control}
    //               error={errors}
    //               register={register}
    //               options={{ roles: users }}
    //               customClassInputTitle="font-bold"
    //               inputTitle="Client Name"
    //               defaultValue="Select Client"
    //             />
    //           </FormControl>
    //           <FormControl className="FormControl" variant="standard">
    //             <CustomDropDown
    //               validateRequired
    //               id="constructionType"
    //               control={control}
    //               error={errors}
    //               register={register}
    //               options={{ roles: CONSTRUCTION_TYPE }}
    //               customClassInputTitle="font-bold"
    //               inputTitle="Construction Type"
    //               defaultValue="Select type"
    //             />
    //           </FormControl>
    //         </div>
    //         <div className="FormFields">
    //           <FormControl className="FormControl" variant="standard">
    //             <label className="FormLabel">Supervisor Name</label>
    //             <Input
    //               className="FormInput"
    //               {...register('supervisorName', {
    //                 required: true,
    //                 pattern: PATTERN.CHAR_SPACE_DASH,
    //                 validate: (value) => value.length <= 150,
    //               })}
    //               placeholder="Enter Supervisor Name"
    //               type="text"
    //               id="supervisorName"
    //               disableUnderline
    //             />
    //             {errors.supervisorName?.type === 'required' && (
    //               <ErrorSpanBox error="Supervisor Name is required" />
    //             )}
    //             {errors.supervisorName?.type === 'pattern' && (
    //               <ErrorSpanBox error={INVALID_CHAR} />
    //             )}
    //             {errors.supervisorName?.type === 'validate' && (
    //               <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
    //             )}
    //           </FormControl>
    //           <FormControl className="FormControl" variant="standard">
    //             <label className="FormLabel">Budget</label>
    //             <Input
    //               className="FormInput"
    //               id="name"
    //               type="number"
    //               placeholder="Enter Amount"
    //               {...register('budget', {
    //                 required: 'Amount is required in numbers',
    //                 validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
    //                 maxLength: {
    //                   value: 10,
    //                   message: 'Length should not be excceed from 10 numbers.',
    //                 },
    //               })}
    //               disableUnderline
    //             />
    //             {errors.budget && (
    //               <ErrorSpanBox error={errors.budget?.message} />
    //             )}
    //           </FormControl>
    //         </div>
    //         <div className="FormFields">
    //           <FormControl className="FormControl" variant="standard">
    //             <label className="FormLabel">Total Paid</label>
    //             <Input
    //               className="FormInput"
    //               id="totalPaid"
    //               type="number"
    //               placeholder="Enter Amount"
    //               {...register('totalPaid', {
    //                 // required: 'Amount is required in numbers',
    //                 validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
    //                 maxLength: {
    //                   value: 10,
    //                   message: 'Length should not be excceed from 10 numbers.',
    //                 },
    //               })}
    //               disableUnderline
    //             />
    //             {errors.totalPaid && (
    //               <ErrorSpanBox error={errors.totalPaid?.message} />
    //             )}
    //           </FormControl>
    //           <FormControl className="FormControl" variant="standard">
    //             <label className="FormLabel">Due Amount</label>
    //             <Input
    //               className="FormInput"
    //               id="dueAmount"
    //               type="number"
    //               placeholder="Enter Amount"
    //               {...register('dueAmount', {
    //                 // required: 'Amount is required in numbers',
    //                 validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
    //                 maxLength: {
    //                   value: 10,
    //                   message: 'Length should not be excceed from 10 numbers.',
    //                 },
    //               })}
    //               disableUnderline
    //             />
    //             {errors.dueAmount && (
    //               <ErrorSpanBox error={errors.dueAmount?.message} />
    //             )}
    //           </FormControl>
    //         </div>
    //       </div>
    //       <div className="FormFooter">
    //         <Button
    //           className="btn-black-outline"
    //           type="submit"
    //           onClick={handleFormClose}
    //           sx={{
    //             marginRight: '0.5rem',
    //             padding: '0.375rem 1.5rem !important',
    //           }}
    //         >
    //           Cancel
    //         </Button>
    //         <Input
    //           type="submit"
    //           value="Add"
    //           className="btn-black-fill"
    //           disableUnderline
    //           sx={{
    //             padding: '0.175rem 2rem !important',
    //           }}
    //         />
    //       </div>
    //     </form>
    //   </div>
    // </Dialog>
    <>
      <TopBar />
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <div className="Content cs-dialog container mx-auto mt-1 w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full rounded-lg bg-white shadow-lg">
            <div className="FormHeader mx-4 w-full px-2 py-2">
              <span className="Title">Add Product</span>
            </div>
            <hr className="mx-4" />
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 mt-3 p-3">
                <div
                  // onClick={() => handleAddMore()}
                  className="flex h-[266px] cursor-pointer items-center justify-center rounded-3xl bg-slate-200 xl:col-span-2 2xl:col-span-1"
                >
                  <div className="ImageBox">
                    <Controller
                      name="file"
                      control={control}
                      rules={{ required: 'Image is required' }}
                      render={({ field: { onChange } }) => (
                        <>
                          <input
                            accept="image/jpeg,image/png,image/jpg"
                            style={{ display: 'none' }}
                            id="raised-button-image"
                            type="file"
                            onChange={(event) =>
                              handleFileChange(onChange, event)
                            }
                            onClick={handleFileOnClick}
                          />
                          <label
                            htmlFor="raised-button-image"
                            className="ImageLabe flex items-center justify-center"
                          >
                            <img alt="add" src={assets.images.addImg} />
                          </label>
                        </>
                      )}
                    />
                  </div>
                </div>
                <div>
                  {errors.file && <ErrorSpanBox error={errors.file?.message} />}
                </div>
                <div className="flex flex-wrap gap-6">
                  {images?.map((img: any, i: number) => {
                    return (
                      <div className="relative mt-6" key={i}>
                        <div
                          key={i}
                          className="flex h-[90px] cursor-pointer items-center justify-center rounded-3xl xl:col-span-2 2xl:col-span-1"
                        >
                          <img
                            className=" max-w-[110px] rounded"
                            src={img}
                            alt="img"
                          />
                        </div>
                        <div
                          onClick={() => handleSelectedFileImages(i)}
                          className="absolute right-[-12px] top-[-4px] cursor-pointer"
                        >
                          <img src={assets.images.removeIcon} alt="cancel" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-6 mt-3 border-r-2 border-[#808080bd] px-6">
                <div className="FormFields">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Project Group</label>
                    <Input
                      className="FormInput"
                      {...register('productGroup', {
                        required: true,
                        pattern: PATTERN.CHAR_SPACE_DASH,
                        validate: (value) => value.length <= 150,
                      })}
                      placeholder="Enter Project Name"
                      type="text"
                      id="productGroup"
                      disableUnderline
                    />
                    {errors.productGroup?.type === 'required' && (
                      <ErrorSpanBox error="Project Name is required" />
                    )}
                    {errors.productGroup?.type === 'pattern' && (
                      <ErrorSpanBox error={INVALID_CHAR} />
                    )}
                    {errors.productGroup?.type === 'validate' && (
                      <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                    )}
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Project Name</label>
                    <Input
                      className="FormInput"
                      {...register('productName', {
                        required: true,
                        pattern: PATTERN.CHAR_SPACE_DASH,
                        validate: (value) => value.length <= 150,
                      })}
                      placeholder="Enter Project Name"
                      type="text"
                      id="productName"
                      disableUnderline
                    />
                    {errors.productName?.type === 'required' && (
                      <ErrorSpanBox error="Project Name is required" />
                    )}
                    {errors.productName?.type === 'pattern' && (
                      <ErrorSpanBox error={INVALID_CHAR} />
                    )}
                    {errors.productName?.type === 'validate' && (
                      <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                    )}
                  </FormControl>
                </div>
                <div className="FormFields">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Mobile Number</label>
                    <Input
                      className="FormInput"
                      id="mobileNumber"
                      type="number"
                      placeholder="Enter Mobile Number"
                      {...register('mobileNumber', {
                        required: 'Mobile Number is required in numbers',
                        validate: (value: any) =>
                          VALIDATE_NON_NEGATIVE_NUM(value),
                        maxLength: {
                          value: 13,
                          message:
                            'Length should not be excceed from 13 numbers.',
                        },
                      })}
                      disableUnderline
                    />
                    {errors.mobileNumber && (
                      <ErrorSpanBox error={errors.mobileNumber?.message} />
                    )}
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Item Code</label>
                    <Input
                      className="FormInput"
                      {...register('itemCode', {
                        required: true,
                        pattern: PATTERN.CHAR_SPACE_DASH,
                        validate: (value) => value.length <= 150,
                      })}
                      placeholder="Enter Item Code"
                      type="text"
                      id="itemCode"
                      disableUnderline
                    />
                    {errors.itemCode?.type === 'required' && (
                      <ErrorSpanBox error="Item code is required" />
                    )}
                    {errors.itemCode?.type === 'pattern' && (
                      <ErrorSpanBox error={INVALID_CHAR} />
                    )}
                    {errors.itemCode?.type === 'validate' && (
                      <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                    )}
                  </FormControl>
                </div>
                <div className="mt-4 flex grid-cols-12 items-end justify-center gap-4">
                  <div className="col-span-6">
                    <FormControl className="FormControl" variant="standard">
                      <label className="FormLabel">Product Color</label>
                      <Input
                        className="FormInput"
                        {...register('color', {
                          required: false,
                          pattern: PATTERN.CHAR_SPACE_DASH,
                          validate: (value) => value.length <= 150,
                        })}
                        placeholder="Enter Color Name/Code"
                        type="text"
                        id="color"
                        disableUnderline
                      />
                      {errors.color?.type === 'required' && (
                        <ErrorSpanBox error="Color is required" />
                      )}
                      {errors.color?.type === 'pattern' && (
                        <ErrorSpanBox error={INVALID_CHAR} />
                      )}
                      {errors.color?.type === 'validate' && (
                        <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                      )}
                    </FormControl>
                  </div>
                  <div className="col-span-2">
                    <FormControl className="FormControl" variant="standard">
                      <label className="FormLabel">Price</label>
                      <Input
                        className="FormInput"
                        id="price"
                        type="number"
                        placeholder="Enter Mobile Number"
                        {...register('price', {
                          // required: 'Amount is required in numbers',
                          validate: (value: any) =>
                            VALIDATE_NON_NEGATIVE_NUM(value),
                          maxLength: {
                            value: 10,
                            message:
                              'Length should not be excceed from 10 numbers.',
                          },
                        })}
                        disableUnderline
                      />
                      {errors.price && (
                        <ErrorSpanBox error={errors.price?.message} />
                      )}
                    </FormControl>
                  </div>
                  <div className="col-span-2">
                    <FormControl className="FormControl" variant="standard">
                      <label className="FormLabel">Tax Price</label>
                      <Input
                        className="FormInput"
                        id="ColorTax"
                        type="number"
                        placeholder="Enter Mobile Number"
                        {...register('ColorTax', {
                          // required: 'Tax is required in numbers',
                          validate: (value: any) =>
                            VALIDATE_NON_NEGATIVE_NUM(value),
                          maxLength: {
                            value: 10,
                            message:
                              'Length should not be excceed from 10 numbers.',
                          },
                        })}
                        disableUnderline
                      />
                      {errors.ColorTax && (
                        <ErrorSpanBox error={errors.ColorTax?.message} />
                      )}
                    </FormControl>
                  </div>
                  <div
                    onClick={handleProductCustomizationServices}
                    className="col-span-2 cursor-pointer rounded-full bg-primary px-4 py-2"
                  >
                    <img
                      className="h-[20px] w-[30px]"
                      alt="add"
                      src={assets.images.addImg}
                    />
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {fields?.map((el: any, ind: number) => {
                    const totalPriceWithTax =
                      Number(parseFloat(el.price)) +
                      (Number(parseFloat(el.price)) *
                        Number(parseFloat(el.tax))) /
                        100;
                    return (
                      <div className="" key={ind}>
                        <span className="rounded-full bg-primary px-4 py-1 text-[12px] text-foreground">
                          {el.color} {formatCurrency(totalPriceWithTax)}
                          <span onClick={() => remove(ind)}>
                            <CloseIcon className="mb-[3px] cursor-pointer pl-2" />
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="FormFields">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Brand Name</label>
                    <Input
                      className="FormInput"
                      {...register('brandName', {
                        required: true,
                        pattern: PATTERN.CHAR_SPACE_DASH,
                        validate: (value) => value.length <= 150,
                      })}
                      placeholder="Enter Brand Name"
                      type="text"
                      id="brandName"
                      disableUnderline
                    />
                    {errors.brandName?.type === 'required' && (
                      <ErrorSpanBox error="Brand Name is required" />
                    )}
                    {errors.brandName?.type === 'pattern' && (
                      <ErrorSpanBox error={INVALID_CHAR} />
                    )}
                    {errors.brandName?.type === 'validate' && (
                      <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                    )}
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <CustomDropDown
                      id="vendorId"
                      control={control}
                      customClassInputTitle="font-normal"
                      error={errors}
                      register={register}
                      options={{ roles: vendors }}
                      inputTitle="Vendors"
                      defaultValue="Select Vendors"
                      validateRequired
                    />
                  </FormControl>
                </div>
                <div className="FormFields">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Cost Price w/o Tax</label>
                    <Input
                      className="FormInput"
                      id="costPrice"
                      type="number"
                      placeholder="Enter Cost Price"
                      {...register('costPrice', {
                        required: 'Amount is required in numbers',
                        validate: (value: any) =>
                          VALIDATE_NON_NEGATIVE_NUM(value),
                        maxLength: {
                          value: 10,
                          message:
                            'Length should not be excceed from 10 numbers.',
                        },
                      })}
                      disableUnderline
                    />
                    {errors.costPrice && (
                      <ErrorSpanBox error={errors.costPrice?.message} />
                    )}
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Tax</label>
                    <Input
                      className="FormInput"
                      id="tax"
                      type="number"
                      placeholder="Enter Tax %"
                      {...register('tax', {
                        required: 'Tax is required in numbers',
                        validate: (value: any) =>
                          VALIDATE_NON_NEGATIVE_NUM(value),
                        maxLength: {
                          value: 3,
                          message:
                            'Length should not be excceed from 3 numbers.',
                        },
                      })}
                      disableUnderline
                    />
                    {errors.tax && <ErrorSpanBox error={errors.tax?.message} />}
                  </FormControl>
                </div>
                <div className="FormFields">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Item Weight</label>
                    <Input
                      className="FormInput"
                      id="itemWeight"
                      type="number"
                      placeholder="Enter Item Weight"
                      {...register('itemWeight', {
                        required: 'Weight is required in numbers',
                        validate: (value: any) =>
                          VALIDATE_NON_NEGATIVE_NUM(value),
                        maxLength: {
                          value: 10,
                          message:
                            'Length should not be excceed from 10 numbers.',
                        },
                      })}
                      disableUnderline
                    />
                    {errors.itemWeight && (
                      <ErrorSpanBox error={errors.itemWeight?.message} />
                    )}
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Item Dimension</label>
                    <Input
                      className="FormInput"
                      id="itemDimension"
                      type="number"
                      placeholder="Enter Item Dimensions"
                      {...register('itemDimension', {
                        required: 'Dimensions is required in numbers',
                        validate: (value: any) =>
                          VALIDATE_NON_NEGATIVE_NUM(value),
                        maxLength: {
                          value: 10,
                          message:
                            'Length should not be excceed from 10 numbers.',
                        },
                      })}
                      disableUnderline
                    />
                    {errors.itemDimension && (
                      <ErrorSpanBox error={errors.itemDimension?.message} />
                    )}
                  </FormControl>
                </div>
                <div className="FormField">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel mt-4">Address</label>
                    <Input
                      className="FormInput"
                      {...register('address', {
                        required: true,
                        pattern: PATTERN.CHAR_SPACE_DASH,
                        validate: (value) => value.length <= 150,
                      })}
                      placeholder="Enter Address"
                      type="text"
                      id="address"
                      disableUnderline
                    />
                    {errors.address?.type === 'required' && (
                      <ErrorSpanBox error="Address is required" />
                    )}
                    {errors.address?.type === 'pattern' && (
                      <ErrorSpanBox error={INVALID_CHAR} />
                    )}
                    {errors.address?.type === 'validate' && (
                      <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                    )}
                  </FormControl>
                </div>
                <div className="FormField">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel mt-4">
                      Item Description{' '}
                      <span className="SubLabel">Write 01-250 Characters</span>
                    </label>
                    <TextField
                      className="FormTextarea"
                      id="desc"
                      multiline
                      rows={4}
                      defaultValue=""
                      placeholder="Write Description"
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
                <div>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel mt-4">Vendor Discounts</label>
                    <Input
                      className="FormInput"
                      id="vendorDiscount"
                      type="number"
                      placeholder="Enter Number"
                      {...register('vendorDiscount', {
                        required: 'Discount is required in numbers',
                        validate: (value: any) =>
                          VALIDATE_NON_NEGATIVE_NUM(value),
                        maxLength: {
                          value: 10,
                          message:
                            'Length should not be excceed from 10 numbers.',
                        },
                      })}
                      disableUnderline
                    />
                    {errors.vendorDiscount && (
                      <ErrorSpanBox error={errors.vendorDiscount?.message} />
                    )}
                  </FormControl>
                </div>
              </div>
              <div className="col-span-3 mt-2">
                <span className="Title font-semibold">
                  Product Claim / Warranty Information
                </span>
                <div>
                  <span className="text-xs font-semibold">
                    Stock Availability
                  </span>
                  <div className="mt-1 flex items-center justify-start gap-2">
                    <span
                      onClick={() => handleStockAvailability('No')}
                      className={`cursor-pointer rounded-full border-[1px] border-[gray] px-4 py-1 ${
                        watch('stockAvailability') === 'No'
                          ? 'bg-primary text-foreground'
                          : ''
                      }`}
                    >
                      No
                    </span>
                    <span
                      onClick={() => handleStockAvailability('Yes')}
                      className={`cursor-pointer rounded-full border-[1px] border-[gray] px-4 py-1 ${
                        watch('stockAvailability') === 'Yes'
                          ? 'bg-primary text-foreground'
                          : ''
                      }`}
                    >
                      Yes
                    </span>
                  </div>
                  {watch('stockAvailability') === 'Yes' && (
                    <div className="mt-2 flex items-center justify-start">
                      <FormControl className="FormControl" variant="standard">
                        <Input
                          className="FormInput w-[80px]"
                          id="stockQuantity"
                          type="number"
                          placeholder="quantity"
                          {...register('stockQuantity', {
                            required:
                              watch('stockAvailability') === 'Yes' &&
                              'Required',
                            validate: (value: any) =>
                              VALIDATE_NON_NEGATIVE_NUM(value),
                            maxLength: {
                              value: 10,
                              message:
                                'Length should not be excceed from 10 numbers.',
                            },
                          })}
                          disableUnderline
                        />
                        {errors.stockQuantity && (
                          <ErrorSpanBox error={errors.stockQuantity?.message} />
                        )}
                      </FormControl>
                      <FormControl className="FormControl" variant="standard">
                        <Input
                          className="FormInput w-[80px]"
                          id="stockDimension"
                          type="number"
                          placeholder="Dimensions"
                          {...register('stockDimension', {
                            required:
                              watch('stockAvailability') === 'Yes' &&
                              'Required',
                            validate: (value: any) =>
                              VALIDATE_NON_NEGATIVE_NUM(value),
                            maxLength: {
                              value: 10,
                              message:
                                'Length should not be excceed from 10 numbers.',
                            },
                          })}
                          disableUnderline
                        />
                        {errors.stockDimension && (
                          <ErrorSpanBox
                            error={errors.stockDimension?.message}
                          />
                        )}
                      </FormControl>
                      <FormControl className="FormControl" variant="standard">
                        <CustomDropDown
                          id="stockDimensionType"
                          control={control}
                          error={errors}
                          register={register}
                          options={{
                            roles: [
                              { id: 'cm', name: 'cm' },
                              { id: 'm', name: 'm' },
                            ],
                            role: 'cm',
                          }}
                          customDDcss="mt-1"
                          customClassInputTitle="font-bold"
                          defaultValue="Select type"
                          validateRequired
                        />
                      </FormControl>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <span className="Title font-semibold">
                    Product Claim / Warranty Information
                  </span>
                  <div>
                    <div className="mt-1 flex items-center justify-start gap-2">
                      <span
                        onClick={() => handleSpareAvailability('Available')}
                        className={`cursor-pointer rounded-full border-[1px] border-[gray] px-4 py-1 ${
                          watch('spareAvailability') === 'Available'
                            ? 'bg-primary text-foreground'
                            : ''
                        }`}
                      >
                        Available
                      </span>
                      <span
                        onClick={() => handleSpareAvailability('Not Available')}
                        className={`cursor-pointer rounded-full border-[1px] border-[gray] px-4 py-1 ${
                          watch('spareAvailability') === 'Not Available'
                            ? 'bg-primary text-foreground'
                            : ''
                        }`}
                      >
                        Not Available
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="Title font-semibold">Warranty</span>
                  <div>
                    <div className="mt-1 flex items-center justify-start gap-2">
                      <span
                        onClick={() => setValue('warranty', 'No')}
                        className={`cursor-pointer rounded-full border-[1px] border-[gray] px-4 py-1 ${
                          watch('warranty') === 'No'
                            ? 'bg-primary text-foreground'
                            : ''
                        }`}
                      >
                        No
                      </span>
                      <div className="FormField">
                        <FormControl className="FormControl" variant="standard">
                          <Input
                            className="FormInput"
                            {...register('warranty', {
                              required: true,
                              pattern: PATTERN.CHAR_SPACE_DASH,
                              validate: (value) => value.length <= 150,
                            })}
                            placeholder="Enter Warranty"
                            type="text"
                            id="warranty"
                            disableUnderline
                          />
                          {errors.warranty?.type === 'required' && (
                            <ErrorSpanBox error="Warranty is required" />
                          )}
                          {errors.warranty?.type === 'pattern' && (
                            <ErrorSpanBox error={INVALID_CHAR} />
                          )}
                          {errors.warranty?.type === 'validate' && (
                            <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                          )}
                        </FormControl>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="FormField">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel mt-4">
                      # of Service Center
                    </label>
                    <Input
                      className="FormInput"
                      id="serviceCenter"
                      type="number"
                      placeholder="Enter No. of Service Centers"
                      {...register('serviceCenter', {
                        required: 'No. of Service is required in numbers',
                        validate: (value: any) =>
                          VALIDATE_NON_NEGATIVE_NUM(value),
                        maxLength: {
                          value: 5,
                          message:
                            'Length should not be excceed from 5 numbers.',
                        },
                      })}
                      disableUnderline
                    />
                    {errors.serviceCenter && (
                      <ErrorSpanBox error={errors.serviceCenter?.message} />
                    )}
                  </FormControl>
                </div>
                <div className="mt-4">
                  <span className="text-xs font-semibold">Rust Proof</span>
                  <div className="mt-1 flex items-center justify-start gap-2">
                    <span
                      onClick={() => setValue('rustProof', 'No')}
                      className={`cursor-pointer rounded-full border-[1px] border-[gray] px-4 py-1 ${
                        watch('rustProof') === 'No'
                          ? 'bg-primary text-foreground'
                          : ''
                      }`}
                    >
                      No
                    </span>
                    <span
                      onClick={() => setValue('rustProof', 'Yes')}
                      className={`cursor-pointer rounded-full border-[1px] border-[gray] px-4 py-1 ${
                        watch('rustProof') === 'Yes'
                          ? 'bg-primary text-foreground'
                          : ''
                      }`}
                    >
                      Yes
                    </span>
                  </div>
                </div>
                <div className="FormField mt-4">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel mt-4">Average Life</label>
                    <Input
                      className="FormInput"
                      {...register('averageLife', {
                        required: true,
                        pattern: PATTERN.CHAR_SPACE_DASH,
                        validate: (value) => value.length <= 150,
                      })}
                      placeholder="Write Average Life"
                      type="text"
                      id="averageLife"
                      disableUnderline
                    />
                    {errors.averageLife?.type === 'required' && (
                      <ErrorSpanBox error="Average Life is required" />
                    )}
                    {errors.averageLife?.type === 'pattern' && (
                      <ErrorSpanBox error={INVALID_CHAR} />
                    )}
                    {errors.averageLife?.type === 'validate' && (
                      <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                    )}
                  </FormControl>
                </div>
                <div className="mt-4">
                  <div className="">
                    <FormControl className="FormControl" variant="standard">
                      <label className="FormLabel">Features</label>
                      <Input
                        className="FormInput"
                        {...register('feature', {
                          required: false,
                          pattern: PATTERN.CHAR_SPACE_DASH,
                          validate: (value) => value.length <= 150,
                        })}
                        placeholder="Enter Features"
                        type="text"
                        id="feature"
                        disableUnderline
                      />
                      {errors.feature?.type === 'required' && (
                        <ErrorSpanBox error="features is required" />
                      )}
                      {errors.feature?.type === 'pattern' && (
                        <ErrorSpanBox error={INVALID_CHAR} />
                      )}
                      {errors.feature?.type === 'validate' && (
                        <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                      )}
                    </FormControl>
                  </div>
                  <div
                    onClick={() => handleProductFeatures()}
                    className="mt-2 w-[20%] cursor-pointer rounded-full bg-primary px-4 py-2"
                  >
                    <img
                      className="h-[20px] w-[30px]"
                      alt="add"
                      src={assets.images.addImg}
                    />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1 px-1">
                    {featureFields?.map((el: any, featureIndex: number) => {
                      return (
                        <div className="" key={featureIndex}>
                          <span className="rounded-full bg-primary px-4 py-1 text-[12px] text-foreground">
                            {el.feature}
                            <span onClick={() => featureRemove(featureIndex)}>
                              <CloseIcon className="mb-[2px] cursor-pointer pl-2" />
                            </span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-[100%] items-center justify-center p-6">
              <Button
                className="btn-black-outline"
                type="submit"
                // onClick={handleFormClose}
                sx={{
                  marginRight: '0.5rem',
                  padding: '0.375rem 1.5rem !important',
                }}
              >
                Cancel
              </Button>
              <Button
                className="btn-black-fill w-[40%]"
                type="submit"
                // onClick={handleFormClose}
                sx={{
                  marginRight: '0.5rem',
                  padding: '0.375rem 1.5rem !important',
                }}
              >
                {isLoader ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProductAddPopup;
