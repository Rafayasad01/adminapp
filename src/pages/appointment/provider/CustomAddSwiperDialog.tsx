// import AddIcon from '@mui/icons-material/Add';
// import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
// import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import EastIcon from '@mui/icons-material/East';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import React, { Fragment, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../assets/css/PopupStyle.css';
import CustomButton from '../../../components/common/CustomButton';
import CustomDateTimePicker from '../../../components/common/CustomDateTimePicker';
import CustomDropDown from '../../../components/common/CustomDropDown';
import CustomInputBox from '../../../components/common/CustomInputBox';
import CustomWorkDaysForm from '../../../components/common/CustomWorkDaysForm';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import CustomTimePicker from '../../../components/common/TimePicker';
import { useAppSelector } from '../../../redux/redux-hooks';
import {
  ALL_PERMISSIONS,
  // BARBER_SERVICES_AMOUNT,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
} from '../../../utils/constants';
import { listingRolePermission } from '../../../utils/helper';

type CustomSwiperDialogProps = {
  img?: any;
  addScheduleFormat?: boolean;
  append?: any;
  catItemsLov?: any;
  usedCatItemsLovlist?: any;
  catLov?: any;
  control?: any;
  DialogSliderOne?: string;
  DialogSliderTwo?: string;
  DialogSubHeader?: string;
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
  setError?: any;
  setIsNotify?: any;
  setNotifyMessage?: any;
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
  setInputFieldsData?: any;
};

function CustomSwiperDialog({
  setStartServiceTime: _setStartServiceTime,
  startServiceTime: _startServiceTime,
  addScheduleFormat,
  img,
  // append,
  // catItemsLov,
  // usedCatItemsLovlist,
  // catLov,
  // control,
  DialogSliderOne,
  // DialogSliderTwo,
  DialogSubHeader,
  endTime,
  errors,
  getValues: _getValues,
  // handleNextSlide,
  // handlePrevSlide,
  handleSubmit,
  inputFieldsData,
  inputScheduleData,
  noweekdays,
  onSubmit,
  openFormDialog,
  register,
  // remove,
  reset,
  // ServicesFields,
  setAvater,
  setError: _setError,
  // setIsNotify,
  // setNotifyMessage,
  setOpenFormDialog,
  // setValue,
  setWeekDays,
  singleField,
  specailCase,
  startTime,
  swiperRef,
  type,
  watch,
  weekDays,
  setInputFieldsData,
}: CustomSwiperDialogProps) {
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const handleFormClose = () => {
    if (type === 'edit' && specailCase) {
      reset({
        // role: 'none',
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

  const sortedTnputFieldsData = useMemo(() => {
    if (
      !listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeAppointment.viewSalayAppointmentEmployee
      )
    )
      return inputFieldsData;
    const noteInput = inputFieldsData.find((item: any) => item.id === 'note');
    return inputFieldsData
      .filter((item: any) => item.id !== 'note')
      .concat([noteInput]);
  }, [inputFieldsData]);

  // console.log('sortedTnputFieldsData', image);
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
                {sortedTnputFieldsData?.map((items: any, index: number) => {
                  const lastDayOfMonth = dayjs().endOf('month');
                  const minDate = lastDayOfMonth.subtract(12, 'year');
                  const formattedMinDate = dayjs(minDate);
                  const formattedMaxDate = dayjs(formattedMinDate);
                  // console.log('items.showPassVisibility', items);
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
                              error={errors?.[items.id]}
                              inputType={items.type}
                              onclick={items.onclick}
                              setShowPassword={items.setShowPassword}
                              showPassVisibility={items.showPassVisibility}
                              typeImportant={items.typeImportant}
                              setInputFieldsData={setInputFieldsData}
                            />
                          </FormControl>
                        ) : items.type === 'textarea' ? (
                          <div className="FormField">
                            <FormControl
                              className="FormControl py-2"
                              variant="standard"
                            >
                              <label className="FormLabel">
                                {items.fieldName}{' '}
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
                        ) : items.type === 'datepickeronly' ? (
                          <div className="">
                            <CustomDateTimePicker
                              register={register}
                              // minDate={formattedMinDate}
                              maxDate={formattedMaxDate}
                              id={items.id}
                              error={errors.dob}
                              inputTitle={items.fieldName}
                              setValue={items.setValue}
                              value={watch('dob') ? watch('dob') : ''}
                            />
                          </div>
                        ) : items.type === 'uploadImg' ? (
                          <div className="FormField">
                            <label className="FormLabel">
                              Upload Image
                              <span className="SubLabel">
                                (1080px x 1080px)
                              </span>
                            </label>
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
                              {img ? (
                                <div className="ShowImageBox bg-background">
                                  <label className="ShowImageLabel">
                                    {img?.name}
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
              {DialogSubHeader && (
                <div className="FormHeader">
                  <span className="text-md my-2 font-semibold">
                    {DialogSubHeader}
                  </span>
                </div>
              )}

              {addScheduleFormat && (
                <div>
                  {!noweekdays && (
                    <div>
                      <CustomWorkDaysForm
                        onlyweeksformat
                        setWeekDays={setWeekDays}
                      />
                    </div>
                  )}
                  <div className={singleField ? 'FormField' : 'FormFields'}>
                    {inputScheduleData?.map((items: any, index: number) => {
                      return (
                        <Fragment key={index}>
                          <CustomTimePicker
                            timePickerLabel={items.fieldName}
                            timePickerSubLabel={items.placeholder}
                            timePickerValue={items.time}
                            setTimePickerValue={items.setTime}
                            id={items.id}
                            // errors={items.error}
                            // setError={setError}
                          />
                        </Fragment>
                      );
                    })}
                  </div>
                  {(weekDays?.length < 1 ||
                    startTime === null ||
                    endTime === null) && (
                    <ErrorSpanBox error="schedule is required" />
                  )}
                </div>
              )}
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
                // iconRight={<EastIcon className="text-base" />}
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

export default CustomSwiperDialog;
