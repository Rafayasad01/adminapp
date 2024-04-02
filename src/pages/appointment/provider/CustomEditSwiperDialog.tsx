import AddIcon from '@mui/icons-material/Add';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EastIcon from '@mui/icons-material/East';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import React, { Fragment, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../assets/css/PopupStyle.css';

import CustomButton from '../../../components/common/CustomButton';
import CustomDropDown from '../../../components/common/CustomDropDown';
import CustomInputBox from '../../../components/common/CustomInputBox';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import CustomTimePicker from '../../../components/common/TimePicker';
import {
  BARBER_SERVICES_AMOUNT,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../../utils/constants';

type Props = {
  setDelIds?: any;
  editFormData?: any;
  control?: any;
  setValue?: any;
  getValues?: any;
  watch?: any;
  append?: any;
  remove?: any;
  register?: any;
  errors?: any;
  setError?: any;
  swiperRef?: any;
  handleNextSlide?: any;
  handlePrevSlide?: any;
  openFormDialog: boolean;
  setNotifyMessage?: any;
  setIsNotify?: any;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  DialogSliderOne?: string;
  DialogSliderTwo?: string;
  DialogSubHeader?: string;
  inputFieldsData?: any;
  inputScheduleData?: any;
  handleSubmit: any;
  ServicesFields?: any;
  onSubmit: (data: any) => void;
  type?: any;
  reset?: any;
  setAvater?: any;
  specailCase?: boolean;
  singleField?: boolean;
  setWeekDays?: any;
  weekDays?: any;
  startTime?: any;
  endTime?: any;
  addScheduleFormat?: boolean;
  noweekdays?: boolean;
  startServiceTime?: any;
  setStartServiceTime?: any;
  catLov?: any;
  catItemsLov?: any;
};

function CustomEditSwiperDialog({
  setDelIds,
  editFormData,
  control,
  setValue,
  register,
  errors,
  // setError,
  // getValues,
  watch,
  append,
  remove,
  swiperRef,
  handleNextSlide,
  handlePrevSlide,
  openFormDialog,
  setOpenFormDialog,
  setIsNotify,
  setNotifyMessage,
  DialogSliderOne,
  DialogSliderTwo,
  // DialogSubHeader,
  inputFieldsData,
  // inputScheduleData,
  handleSubmit,
  onSubmit,
  ServicesFields,
  type,
  specailCase,
  setAvater,
  reset,
  singleField,
  // setWeekDays,
  // weekDays,
  // startTime,
  // endTime,
  // addScheduleFormat,
  // noweekdays,
  // startServiceTime,
  // setStartServiceTime,
  catLov,
  catItemsLov,
}: Props) {
  const [imageName, setImageName] = useState<any>(null);

  const handleFormClose = () => {
    if (type === 'edit' && specailCase) {
      reset({
        role: 'none',
        userLimits: '',
      });
      setOpenFormDialog(false);
    } else if (type === 'edit' && !specailCase) {
      if (setAvater) setAvater(null);
      reset();
      setOpenFormDialog(false);
    } else {
      setOpenFormDialog(false);
    }
  };

  const handleServices = () => {
    const obj = {
      storeServiceCategoryItem: watch('servicesId'),
      minutes: watch('mints'),
      amountType: watch('servicesAmount'),
      amount: watch('price'),
    };
    if (
      watch('servicesId') &&
      watch('servicesAmount') &&
      watch('price') &&
      watch('mints')
    ) {
      append(obj);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'All Services Fields are Required',
        type: 'error',
      });
    }
  };

  /* const customRenderTimeViewClock = (props: any) => {
    return renderTimeViewClock({
      ...props,
      getClockNumber: (value: any) => (value < 10 ? `0${value}` : value),
    });
  }; */

  useEffect(() => {
    let icon = editFormData.avatar.split('/').slice(-1)[0];
    const regexExp = /[a-z,0-9,-]{36}/;
    if (regexExp.test(icon)) {
      icon = icon.split('-').splice(5)[0].at(0);
    }
    setImageName(editFormData?.avatar);
  }, [editFormData]);

  const handleRemove = (index: any, id: string | undefined) => {
    console.log('uid', id);
    remove(index);
    if (id !== undefined) {
      setDelIds((prevIds: string) => [...prevIds, id]);
    }
  };

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Swiper
          className="Content custom-swiper"
          spaceBetween={50}
          slidesPerView={1}
          // navigation={true}
          onSwiper={(swiper: any) => {
            swiperRef.current = swiper;
          }}
        >
          <SwiperSlide className="custom-swiper-slide w-full">
            <div className="FormHeader">
              <span className="Title">{DialogSliderOne}</span>
            </div>
            <div className="FormBody">
              <div className={singleField ? 'FormField' : 'FormFields'}>
                {inputFieldsData?.map((items: any, index: number) => {
                  return (
                    <Fragment key={index}>
                      {
                        // index !== inputFieldsData.length - 1 &&
                        items.type === 'select' ? (
                          <FormControl
                            key={index}
                            className="FormControl"
                            variant="standard"
                          >
                            <CustomDropDown
                              defaultValue={items.defaultValue}
                              validateRequired={items.validateRequired}
                              id={items.id}
                              control={items.control}
                              error={items.error}
                              register={items.register}
                              options={items.options}
                              inputTitle={items.fieldName}
                            />
                          </FormControl>
                        ) : items.type === 'number' ||
                          items.type === 'text' ||
                          items.type === 'password' ? (
                          <FormControl
                            key={index}
                            className="FormControl"
                            variant="standard"
                          >
                            <CustomInputBox
                              pattern={items.pattern}
                              maxLetterLimit={items.maxLetterLimit}
                              requiredType={items.notRequired}
                              disable={items.disable}
                              inputTitle={items.fieldName}
                              placeholder={items.placeholder}
                              id={items.id}
                              value={items.value ? items.value : ''}
                              register={items.register}
                              error={items.error}
                              inputType={items.type}
                              onclick={items.onclick}
                              showPassVisibility={items.showPassVisibility}
                              typeImportant={items.typeImportant}
                            />
                          </FormControl>
                        ) : items.type === 'textarea' ? (
                          <div className="">
                            <FormControl
                              className="FormControl py-2"
                              variant="standard"
                            >
                              <label className="FormLabel">
                                Message{' '}
                                <span className="SubLabel">
                                  Write 01-250 Characters
                                </span>
                              </label>
                              <TextField
                                className="FormTextarea"
                                id={items.id}
                                multiline
                                rows={4}
                                defaultValue=""
                                placeholder="Write Description"
                                {...items.register(items.id, {
                                  pattern: {
                                    value: items.pattern,
                                    message: INVALID_CHAR,
                                  },
                                  required:
                                    items.notRequired === true
                                      ? false
                                      : `${items.fieldName} is required`,
                                  minLength: {
                                    value: 1,
                                    message: 'Minimum Five Characters',
                                  },
                                  maxLength: {
                                    value: 250,
                                    message: MAX_LENGTH_EXCEEDED,
                                  },
                                })}
                              />
                              {items.error && (
                                <ErrorSpanBox error={items.error.message} />
                              )}
                            </FormControl>
                          </div>
                        ) : items.type === 'uploadImg' ? (
                          <div className="FormField">
                            <label className="FormLabel">Upload Image</label>
                            <div className="ImageBox">
                              <CustomButton
                                buttonType="upload"
                                title={items.fieldName}
                                register={items.register}
                                icon={
                                  <FileUploadOutlinedIcon
                                    sx={{ marginRight: '0.5rem' }}
                                  />
                                }
                                onchange={(
                                  event: React.InputHTMLAttributes<HTMLInputElement>
                                ) => {
                                  items.onchange(event);
                                }}
                                onclick={(
                                  event: React.InputHTMLAttributes<HTMLInputElement>
                                ) => {
                                  items.onclick(event);
                                }}
                              />
                              {items.image || imageName ? (
                                <div className="ShowImageBox bg-background">
                                  <label className="ShowImageLabel">
                                    {items?.image?.name
                                      ? items?.image?.name
                                      : imageName}
                                  </label>
                                  <IconButton
                                    className="btn-dot"
                                    onClick={() => items.setImage(null)}
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
                            {/* {image === null && <ErrorSpanBox error={errors.icon?.message} />} */}
                          </div>
                        ) : items.type === 'datepicker' ? (
                          <CustomTimePicker
                            timePickerLabel={items.fieldName}
                            timePickerSubLabel={items.placeholder}
                            timePickerValue={items.time}
                            setTimePickerValue={items.setTime}
                            id={items.id}
                            errors={items.error}
                            // setError={setError}
                          />
                        ) : null
                      }
                      {items.id === 'upload' && (
                        <>
                          <br />
                          <div
                            style={{ minWidth: '204%', marginTop: '0.75rem' }}
                          >
                            <div className="ImageBox">
                              <CustomButton
                                buttonType="upload"
                                title={items.fieldName}
                                register={items.register}
                                icon={
                                  <FileUploadOutlinedIcon
                                    sx={{ marginRight: '0.5rem' }}
                                  />
                                }
                                onchange={(
                                  event: React.InputHTMLAttributes<HTMLInputElement>
                                ) => {
                                  items.onchange(event);
                                }}
                                onclick={(
                                  event: React.InputHTMLAttributes<HTMLInputElement>
                                ) => {
                                  items.onclick(event);
                                }}
                              />
                              {items.avatar ? (
                                <div className="ShowImageBox">
                                  <label className="ShowImageLabel">
                                    {items.avatar.name}
                                  </label>
                                  <IconButton
                                    className="btn-dot"
                                    onClick={() => items.setAvatar(null)}
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
                          </div>
                        </>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <div className="FormFooter flex items-end xl:h-[152px] 2xl:h-[120px]">
              <CustomButton
                buttonType="button"
                title="Cancel"
                className="btn-black-outline"
                onclick={handleFormClose}
                sx={{
                  width: '20%',
                  marginRight: '0.5rem',
                  padding: '0.375rem 1.5rem !important',
                }}
              />
              <CustomButton
                buttonType="button"
                title="Next"
                iconRight={<EastIcon className="text-base" />}
                onclick={handleNextSlide}
                // type={'submit'}
                className="btn-black-fill"
                sx={{
                  padding: '0.375rem 2rem !important',
                  width: '90%',
                  height: '35px',
                }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="custom-swiper-slide swiper-no-swiping">
            <div className="FormHeader">
              <div className="flex items-center">
                <ArrowCircleLeftOutlinedIcon
                  onClick={handlePrevSlide}
                  className="mr-2 cursor-pointer"
                  fontSize="medium"
                />
                <span className="Title">{DialogSliderTwo}</span>
              </div>
            </div>
            <div className="FormBody">
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <CustomDropDown
                    // validateRequired
                    id="categoryId"
                    control={control}
                    error={errors}
                    register={register}
                    setValue={setValue}
                    options={{ roles: catLov }}
                    defaultValue="Select Category"
                    customClassInputTitle="font-bold"
                    inputTitle="Select Category"
                  />
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <CustomDropDown
                    // validateRequired
                    id="servicesId"
                    control={control}
                    error={errors}
                    register={register}
                    setValue={setValue}
                    options={{ roles: catItemsLov }}
                    defaultValue="Select Services"
                    customClassInputTitle="font-bold"
                    inputTitle="Select Services"
                  />
                </FormControl>
              </div>
              <div className="mt-3 grid grid-cols-12 gap-4">
                <div className="col-span-4">
                  <FormControl className="FormControl" variant="standard">
                    <CustomDropDown
                      // validateRequired
                      id="servicesAmount"
                      control={control}
                      error={errors}
                      register={register}
                      setValue={setValue}
                      // options={{ roles: providerlov }}
                      customClassInputTitle="font-bold"
                      inputTitle="Amount Type"
                      options={{ roles: BARBER_SERVICES_AMOUNT }}
                      defaultValue="Select Type"
                    />
                  </FormControl>
                </div>
                <div className="col-span-4">
                  <FormControl className="FormControl" variant="standard">
                    <CustomInputBox
                      pattern={PATTERN.ONLY_NUM}
                      maxLetterLimit={15}
                      inputTitle="Price"
                      placeholder="Enter Service Amount"
                      id="price"
                      requiredType
                      register={register}
                      // error={errors.price}
                      inputType="text"
                    />
                  </FormControl>
                </div>
                <div className="col-span-4">
                  <FormControl className="FormControl" variant="standard">
                    <FormControl className="FormControl" variant="standard">
                      <CustomInputBox
                        pattern={PATTERN.ONLY_NUM}
                        maxLetterLimit={4}
                        inputTitle="Service Time (Minutes)"
                        placeholder="Enter time (Minutes)"
                        id="mints"
                        requiredType
                        register={register}
                        // error={errors.price}
                        inputType="text"
                      />
                    </FormControl>
                  </FormControl>
                </div>
              </div>
              <div className="ImageBox">
                <label htmlFor="" className="ImageLabel mb-3 mt-4 w-full">
                  <Button
                    onClick={handleServices}
                    className="w-full"
                    component="span"
                  >
                    <AddIcon sx={{ marginRight: '0.5rem' }} />
                    {ServicesFields?.length > 0
                      ? `Add More Service`
                      : `Add Service`}
                  </Button>
                </label>
              </div>
              <div className="overflow-auto px-1 xl:h-[180px] 2xl:h-[150px]">
                {ServicesFields?.map((item: any, index: number) => {
                  return (
                    <div
                      className="my-3 flex items-center justify-between rounded-md border-[1px] border-[#949EAE] p-1 px-3 text-sm text-[#1A1A1A]"
                      key={index}
                    >
                      <div>{item.storeServiceCategoryItem}</div>
                      <div className="flex w-[25%] items-center justify-between gap-2">
                        <div className="flex items-center">
                          <span className="text-sm">{item.minutes}</span>
                          <span> mints</span>
                        </div>
                        <div>RS{item.amount}.00</div>
                        <div>
                          <ClearOutlinedIcon
                            className="cursor-pointer"
                            onClick={() => handleRemove(index, item.id)}
                            fontSize="small"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="FormFooter">
              <CustomButton
                buttonType="button"
                title="Cancel"
                className="btn-black-outline"
                onclick={handleFormClose}
                sx={{
                  width: '20%',
                  marginRight: '0.5rem',
                  padding: '0.375rem 1.5rem !important',
                }}
              />
              <CustomButton
                buttonType="button"
                title="Submit"
                // onclick={handleNextSlide}
                type="submit"
                className="btn-black-fill"
                sx={{
                  padding: '0.375rem 2rem !important',
                  width: '90%',
                  height: '35px',
                }}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </form>
    </Dialog>
  );
}

export default CustomEditSwiperDialog;
