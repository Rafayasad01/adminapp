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
import dayjs from 'dayjs';
import React, { Fragment, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../assets/css/PopupStyle.css';
import CustomButton from '../../../components/common/CustomButton';
import CustomDateTimePicker from '../../../components/common/CustomDateTimePicker';
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

type CustomEditSwiperDialogProps = {
  addScheduleFormat?: boolean;
  append?: any;
  catItemsLov?: any;
  usedCatItemsLovlist?: any;
  catLov?: any;
  control?: any;
  DialogSliderOne?: string;
  DialogSliderTwo?: string;
  DialogSubHeader?: string;
  editFormData?: any;
  endTime?: any;
  errors?: any;
  getValues?: any;
  handleNextSlide?: any;
  handlePrevSlide?: any;
  handleSubmit: any;
  inputFieldsData?: any;
  inputScheduleData?: any;
  noweekdays?: boolean;
  onSubmit: (data: any) => void;
  openFormDialog: boolean;
  register?: any;
  remove?: any;
  reset?: any;
  ServicesFields?: any;
  setAvater?: any;
  setDelIds?: any;
  setError?: any;
  setIsNotify?: any;
  setNotifyMessage?: any;
  setUsedCatItemsLovlist?: any;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setStartServiceTime?: any;
  setValue?: any;
  setWeekDays?: any;
  singleField?: boolean;
  specailCase?: boolean;
  startServiceTime?: any;
  startTime?: any;
  swiperRef?: any;
  type?: any;
  watch?: any;
  weekDays?: any;
};

function CustomEditSwiperDialog({
  addScheduleFormat: _addScheduleFormat,
  append,
  catItemsLov,
  usedCatItemsLovlist,
  catLov,
  control,
  DialogSliderOne,
  DialogSliderTwo,
  DialogSubHeader: _DialogSubHeader,
  editFormData,
  endTime: _endTime,
  errors,
  getValues: _getValues,
  handleNextSlide,
  handlePrevSlide,
  handleSubmit,
  inputFieldsData,
  setUsedCatItemsLovlist,
  inputScheduleData: _inputScheduleData,
  noweekdays: _noweekdays,
  onSubmit,
  openFormDialog,
  register,
  remove,
  reset,
  ServicesFields,
  setAvater,
  setDelIds,
  setError: _setError,
  setIsNotify,
  setNotifyMessage,
  setOpenFormDialog,
  setStartServiceTime: _setStartServiceTime,
  setValue,
  setWeekDays: _setWeekDays,
  singleField,
  specailCase,
  startServiceTime: _startServiceTime,
  startTime: _startTime,
  swiperRef,
  type,
  watch,
  weekDays: _weekDays,
}: CustomEditSwiperDialogProps) {
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
      if (ServicesFields?.length > 0) {
        setUsedCatItemsLovlist([]);
        remove();
      }
      setOpenFormDialog(false);
    }
  };

  const handleServices = () => {
    const obj = {
      storeServiceCategoryItem: watch('servicesId'),
      serviceTime: watch('mints'),
      amountType: watch('servicesAmount'),
      amount: watch('price'),
    };
    if (
      !PATTERN.ONLY_NUM.test(watch('price')) &&
      !PATTERN.ONLY_NUM.test(watch('mints'))
    ) {
      setIsNotify(true);
      setNotifyMessage({
        text: 'Price and Service time should be in digits(number)',
        type: 'error',
      });
      return;
    }
    if (!PATTERN.ONLY_NUM.test(watch('price'))) {
      setIsNotify(true);
      setNotifyMessage({
        text: 'Price should be in digits(number)',
        type: 'error',
      });
      return;
    }
    if (!PATTERN.ONLY_NUM.test(watch('mints'))) {
      setIsNotify(true);
      setNotifyMessage({
        text: 'Service Time should be in digits(number)',
        type: 'error',
      });
      return;
    }
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
    let icon = editFormData?.avatar?.split('/')?.slice(-1)[0];
    const regexExp = /[a-z,0-9,-]{36}/;
    if (regexExp.test(icon)) {
      icon = icon?.split('-')?.splice(5)[0]?.at(0);
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

  const getCatItemName = (id: any) => {
    let tempAr: any[] = [];
    tempAr = usedCatItemsLovlist;
    return tempAr?.find((el: any) => el.id === id)?.name;
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
      <form onSubmit={handleSubmit(onSubmit)} className="overflow-auto">
        <Swiper
          simulateTouch={false} // Allow touch simulation for non-touch devices
          allowTouchMove={false}
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
                              setValue={items.setValue}
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
                                Note{' '}
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
                                  value: items.value ? items.value : '',
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
                        ) : items.type === 'datepickeronly' ? (
                          <div className="">
                            <CustomDateTimePicker
                              register={register}
                              defaultValue={dayjs()}
                              id={items.id}
                              error={errors.dob}
                              inputTitle={items.fieldName}
                              setValue={items.setValue}
                              value={watch('dob') ? watch('dob') : dayjs()}
                            />
                          </div>
                        ) : items.type === 'uploadImg' ? (
                          <div className="">
                            <label className="FormLabel">
                              Upload Image
                              <span className="SubLabel">
                                Image should be 1080px x 1080px
                              </span>
                            </label>
                            <div className="ImageBox">
                              <CustomButton
                                buttonType="upload"
                                title={items.fieldName}
                                register={items.register}
                                className=""
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
                                <div className="ShowImageBox customImgBox bg-background">
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
                            // errors={items.error}
                            // setError={setError}
                          />
                        ) : null
                      }
                      {items.id === 'upload' && (
                        <>
                          <br />
                          <div
                            style={{ minWidth: '150%', marginTop: '0.75rem' }}
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
                  width: '80%',
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
              <div className="mx-[10px] overflow-x-hidden overflow-y-scroll px-[8px] xl:max-h-[180px] xl:min-h-[0px] 2xl:h-[150px]">
                {ServicesFields?.map((item: any, index: number) => {
                  return (
                    <div
                      className="my-1 flex items-center justify-between rounded-md border-[1px] border-[#949EAE] p-1 text-sm text-[#1A1A1A]"
                      key={index}
                    >
                      <div>{getCatItemName(item.storeServiceCategoryItem)}</div>
                      <div className="flex  items-center justify-between gap-2">
                        <div className="flex items-center">
                          <span className="text-sm">{item.serviceTime}</span>
                          <span> mints</span>
                        </div>
                        <div>
                          {`${item.amount === 'Percentage' ? '%' : 'RS'}`}
                          {item.amount}.00
                        </div>
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
                  width: '80%',
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
