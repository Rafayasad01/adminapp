// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import FormControl from '@mui/material/FormControl';
// import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
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
import { useLocation, useParams } from 'react-router';
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

function ProductEditPopup() {
  const { id }: any = useParams();
  const { state: editData } = useLocation();
  const { data } = editData;
  // console.log('🚀 ~ ProductEditPopup ~ params:', data);
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
      warranty: 'No',
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

  // const dataRole = useAppSelector(
  //   (state) => state?.persistedReducer?.roleState?.role?.permissions
  // );
  const [file, setFile] = useState<any>(null);
  const [images, setImages] = useState<any>([]);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  // const authState: any = useAppSelector((state) => state?.authState);
  // const dataRole = useAppSelector(
  //   (state) => state?.persistedReducer?.roleState?.role?.permissions
  // );

  // const darkTheme = createTheme({
  //   palette: {
  //     primary: {
  //       main: '#171717',
  //     },
  //   },
  // });

  useEffect(() => {
    const featuresData = data?.features?.split(',');
    if (featuresData && Array.isArray(featuresData)) {
      featuresData.forEach((feature: any) => {
        featureAppend({ feature });
      });
    }
    setValue('productGroup', data.productGroup);
    setValue('productName', data.productName);
    setValue('mobileNumber', data.mobileNumber);
    setValue('itemCode', data.itemCode);
    setValue('brandName', data.brandName);
    setValue('costPrice', String(Number(data.costPrice)));
    setValue('tax', String(Number(data.tax)));
    setValue('itemWeight', String(Number(data.itemWeight)));
    setValue('itemDimension', String(Number(data.itemDimension)));
    setValue('address', data.address);
    setValue('desc', data.desc);
    setValue('vendorDiscount', String(Number(data.vendorDiscount)));
    setValue('stockAvailability', data.stockAvailability);
    setValue('stockQuantity', Number(data.stockQuantity));
    setValue('stockDimension', Number(data.stockDimension));
    setValue('stockDimensionType', data.stockDimensionType);
    setValue('spareAvailability', data.sparePartAvailability);
    setValue('warranty', data.warranty);
    setValue('serviceCenter', String(Number(data.serviceCenter)));
    setValue('rustProof', data.rustProof);
    setValue('averageLife', data.averageLife);
    // setValue('feature', data.features ?? []);
    setValue('productCustomization', data.productCustomization ?? []);
    setValue('file', data.file);
  }, []);

  const onSubmit = (submitFormData: any) => {
    const featureArr = submitFormData.features.map(
      (element: any) => element.feature
    );
    console.log('featureArr', featureArr);

    const formData = new FormData();
    formData.append('productGroup', submitFormData.productGroup);
    formData.append('productName', submitFormData.productName);
    formData.append('mobileNumber', submitFormData.mobileNumber);
    formData.append('itemCode', submitFormData.itemCode);
    formData.append('brandName', submitFormData.brandName);
    formData.append('costPrice', String(Number(submitFormData.costPrice)));
    formData.append('tax', String(Number(submitFormData.tax)));
    formData.append('itemWeight', String(Number(submitFormData.itemWeight)));
    formData.append(
      'itemDimension',
      String(Number(submitFormData.itemDimension))
    );
    formData.append('address', submitFormData.address);
    formData.append('desc', submitFormData.desc);
    formData.append(
      'vendorDiscount',
      String(Number(submitFormData.vendorDiscount))
    );
    formData.append('stockAvailability', submitFormData.stockAvailability);
    formData.append('stockQuantity', submitFormData.stockQuantity);
    formData.append('stockDimension', submitFormData.stockDimension);
    formData.append('stockDimensionType', submitFormData.stockDimensionType);
    formData.append('sparePartAvailability', submitFormData.spareAvailability);
    formData.append('warranty', submitFormData.warranty);
    formData.append(
      'serviceCenter',
      String(Number(submitFormData.serviceCenter))
    );
    formData.append('rustProof', submitFormData.rustProof);
    formData.append('averageLife', submitFormData.averageLife);
    formData.append('features', featureArr.join(', ') ?? '');
    // featureArr.forEach((element: any) => {
    //   formData.append('features[]', element ?? null);
    // });
    formData.append(
      'productCustomization',
      JSON.stringify(submitFormData.productCustomization) ?? []
    );
    formData.append('productImages', submitFormData.file);
    console.log('🚀 ~ onSubmit ~ formData: update', submitFormData);

    productServices
      .update(id, formData)
      .then((item: any) => {
        if (item.data.success) {
          // setOpenFormDialog(false);
          // setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          // setList([item.data.data, ...list]);
        } else {
          // setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err: Error) => {
        // setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  console.log('feeeeeeeeeeeeeeeeeeeeeeeee', featureFields);

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

  console.log('FEAAAA', data.features);

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

  const handleStockAvailability = (type: string) => {
    setValue('stockAvailability', type);
  };

  const handleSpareAvailability = (type: string) => {
    setValue('spareAvailability', type);
  };

  return (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <div className="cs-dialog container mx-auto mt-3 w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full rounded-lg bg-white shadow-lg">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 p-3">
                <div
                  // onClick={() => handleAddMore()}
                  className="flex h-[266px] cursor-pointer items-center justify-center rounded-3xl bg-slate-200 xl:col-span-2 2xl:col-span-1"
                >
                  <div className="ImageBox">
                    <Controller
                      name="file"
                      control={control}
                      // rules={{ required: 'Image is required' }}
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
                            className="ImageLabel"
                          >
                            <Button component="span" className="ImageBtn">
                              <FileUploadOutlinedIcon
                                sx={{ marginRight: '0.5rem' }}
                              />
                              Upload
                            </Button>
                          </label>

                          {file ? (
                            <div className="ShowImageBox bg-background">
                              <label className="ShowImageLabel">
                                {file.name}
                              </label>
                              <IconButton
                                className="btn-dot"
                                onClick={() => {
                                  file(null);
                                  onChange(null);
                                }}
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
                        </>
                      )}
                    />
                    {errors.file && (
                      <ErrorSpanBox error={errors.file?.message} />
                    )}
                  </div>
                  <img alt="add" src={assets.images.addImg} />
                </div>
                {images?.map((img: any, i: number) => {
                  return (
                    <div
                      key={i}
                      className="flex h-[266px] cursor-pointer items-center justify-center rounded-3xl bg-slate-200 xl:col-span-2 2xl:col-span-1"
                    >
                      <img src={img} alt="img" />
                    </div>
                  );
                })}
              </div>
              <div className="col-span-6 m-3">
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
                    {errors.mobileNumber && (
                      <ErrorSpanBox error={errors.mobileNumber?.message} />
                    )}
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Item Code</label>
                    <Input
                      className="FormInput"
                      {...register('itemCode', {
                        required: false,
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
                <div className="flex grid-cols-12 items-center justify-center gap-4">
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
                        placeholder="Orange"
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
                        placeholder="2500"
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
                        placeholder="10"
                        {...register('ColorTax', {
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
                <div className="FormField">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Brand Name</label>
                    <Input
                      className="FormInput"
                      {...register('brandName', {
                        required: false,
                        pattern: PATTERN.CHAR_SPACE_DASH,
                        validate: (value) => value.length <= 150,
                      })}
                      placeholder="Enter Model No."
                      type="text"
                      id="brandName"
                      disableUnderline
                    />
                    {errors.brandName?.type === 'required' && (
                      <ErrorSpanBox error="Brand name is required" />
                    )}
                    {errors.brandName?.type === 'pattern' && (
                      <ErrorSpanBox error={INVALID_CHAR} />
                    )}
                    {errors.brandName?.type === 'validate' && (
                      <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                    )}
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
                    {errors.itemDimension && (
                      <ErrorSpanBox error={errors.itemDimension?.message} />
                    )}
                  </FormControl>
                </div>
                <div className="FormField">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Address</label>
                    <Input
                      className="FormInput"
                      {...register('address', {
                        required: false,
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
                    <label className="FormLabel mt-2">
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
                    <label className="FormLabel">Vendor Discounts</label>
                    <Input
                      className="FormInput"
                      id="vendorDiscount"
                      type="number"
                      placeholder="Enter Number"
                      {...register('vendorDiscount', {
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
                          className="FormInput w-[100px]"
                          id="stockQuantity"
                          type="number"
                          placeholder="quantity"
                          {...register('stockQuantity', {
                            // required: 'Amount is required in numbers',
                            // value: Number(data.stockQuantity),
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
                          className="FormInput w-[100px]"
                          id="stockDimension"
                          type="number"
                          placeholder="Dimensions"
                          {...register('stockDimension', {
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
                          customClassInputTitle="font-bold"
                          // inputTitle="Deduction Type"
                          defaultValue="Select type"
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
                              required: false,
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
                <div className="FormField mt-4">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel"># of Service Center</label>
                    <Input
                      className="FormInput"
                      id="serviceCenter"
                      type="number"
                      placeholder="Enter Item Weight"
                      {...register('serviceCenter', {
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
                    {errors.serviceCenter && (
                      <ErrorSpanBox error={errors.serviceCenter?.message} />
                    )}
                  </FormControl>
                </div>
                <div>
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
                    <label className="FormLabel">Average Life</label>
                    <Input
                      className="FormInput"
                      {...register('averageLife', {
                        required: false,
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
              <div className="FormFooter">
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
                <Input
                  type="submit"
                  value="Update"
                  className="btn-black-fill"
                  disableUnderline
                  sx={{
                    padding: '0.175rem 2rem !important',
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProductEditPopup;
