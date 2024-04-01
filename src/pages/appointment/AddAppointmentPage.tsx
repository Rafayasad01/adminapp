import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import TopBar from '../../components/common/TopBar';
import Notify from '../../components/common/Notify';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../assets/css/PopupStyle.css';
import ReactDOM from 'react-dom';
import CustomDateTimePicker from '../../components/common/CustomDateTimePicker';
import CustomDropDown from '../../components/common/CustomDropDown';
import CustomMultipleSelectBox from '../../components/common/CustomMultipleSelect';
import CustomInputBox from '../../components/common/CustomInputBox';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import Loader from '../../components/common/Loader2';
import { AddAppointmentForm } from '../../interfaces/app.appointment';
import {
  GENDER,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  PH_MINI_LENGTH,
} from '../../utils/constants';
import assets from '../../assets';
import { SwiperSlide, Swiper } from 'swiper/react';

// import required modules
import { Pagination } from 'swiper/modules';

export default function AddAppointmentPage() {
  const [isLoader, setIsLoader] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [activeBarber, setActiveBarber] = useState<any>();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<AddAppointmentForm>();

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: any) {
      return '<span class="' + className + '">' + '</span>';
    },
  };

  const BarberCard = (index: number) => {
    return (
      <div
        onClick={() =>
          index === activeBarber
            ? setActiveBarber(null)
            : setActiveBarber(index)
        }
        className={`${
          index === activeBarber && 'bg-slate-500'
        } w-[100%] cursor-pointer rounded-2xl border-[1px] border-[#949EAE] px-3 py-4`}
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[#003E80]">Beautician</span>
          <div className="flex items-center">
            <img
              className="h-[14px] w-[14px]"
              src={assets.images.Star}
              alt="avatar-img"
            />
            <span className="ml-1 text-sm font-semibold">4.9</span>
          </div>
        </div>
        <div className="my-6 text-center">
          <div className="flex items-center justify-center">
            <img
              className="my-2 h-[55px] w-[55px]"
              src={assets.images.avatarUser}
              alt="avatar-img"
            />
          </div>
          <span className="text-xl font-semibold">Selena Swift</span>
        </div>
      </div>
    );
  };

  return isLoader ? (
    <Loader />
  ) : (
    <div>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar isNestedRoute title="Fill Appointment Form" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="p-3">
            <span className="text-base font-bold text-[#1A1A1A]">Add Info</span>
            <hr className="my-4 border-[#949EAE]" />
            <form
            // className="overflow-auto px-2"
            // onSubmit={handleSubmit(onSubmit)}
            >
              <div className="FormBody">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8">
                    <div className="FormFields grid grid-cols-12 gap-6">
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomInputBox
                            pattern={PATTERN.ONLY_NUM}
                            maxLetterLimit={15}
                            inputTitle={'First Name'}
                            placeholder={'Enter first name'}
                            id={'first_name'}
                            customFontClass="font-semibold mb-1"
                            customClass="border-[2px] border-[#949EAE] rounded-xl px-2 py-1 text-sm"
                            register={register}
                            error={errors.first_name}
                            inputType={'text'}
                          />
                        </FormControl>
                      </div>
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomInputBox
                            pattern={PATTERN.ONLY_NUM}
                            maxLetterLimit={15}
                            inputTitle={'Last Name'}
                            placeholder={'Enter last name'}
                            id={'last_name'}
                            customFontClass="font-semibold mb-1"
                            customClass="border-[2px] border-[#949EAE] rounded-xl px-2 py-1 text-sm"
                            register={register}
                            error={errors.last_name}
                            inputType={'text'}
                          />
                        </FormControl>
                      </div>
                    </div>
                    <div className="FormFields mt-2 grid grid-cols-12 gap-6">
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomInputBox
                            pattern={PATTERN.ONLY_NUM}
                            maxLetterLimit={15}
                            inputTitle={'Phone'}
                            placeholder={'Enter phone number'}
                            id={'phone'}
                            customFontClass="font-semibold mb-1"
                            customClass="border-[2px] border-[#949EAE] rounded-xl px-2 py-1 text-sm"
                            register={register}
                            error={errors.phone}
                            inputType={'text'}
                          />
                        </FormControl>
                      </div>
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomInputBox
                            pattern={PATTERN.ONLY_NUM}
                            maxLetterLimit={15}
                            inputTitle={'Email'}
                            placeholder={'Enter email address'}
                            id={'email'}
                            customFontClass="font-semibold mb-1"
                            customClass="border-[2px] border-[#949EAE] rounded-xl px-2 py-1 text-sm"
                            register={register}
                            error={errors.email}
                            inputType={'text'}
                          />
                        </FormControl>
                      </div>
                    </div>
                    <div className="FormFields mt-2 grid grid-cols-12 gap-6">
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomDropDown
                            validateRequired
                            id="amountType"
                            control={control}
                            error={errors}
                            register={register}
                            setValue={setValue}
                            customHeight="h-[40px] rounded-xl"
                            customClassInputTitle="font-semibold"
                            inputTitle="Amount Type"
                            options={{ roles: GENDER }}
                            defaultValue="Select Type"
                          />
                        </FormControl>
                      </div>
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomMultipleSelectBox
                            validateRequired
                            id="appointmentService"
                            control={control}
                            error={errors}
                            setValue={setValue}
                            register={register}
                            options={{ roles: GENDER }}
                            customHeight="h-[40px] rounded-xl"
                            customClassInputTitle="font-semibold"
                            inputTitle="Appointment Services"
                          />
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="w-full">
                      <FormControl
                        className="FormControl w-full"
                        variant="standard"
                      >
                        <label className="FormLabel font-semibold">
                          Any Message{' '}
                        </label>
                        <TextField
                          className="FormTextarea"
                          id="note"
                          multiline
                          rows={7}
                          defaultValue=""
                          placeholder="Write Note..."
                          {...register('note', {
                            required: 'Note is required',
                            minLength: {
                              value: 1,
                              message: 'Minimum One Characters',
                            },
                            maxLength: {
                              value: 250,
                              message: MAX_LENGTH_EXCEEDED,
                            },
                          })}
                        />
                        {errors.note && (
                          <ErrorSpanBox error={errors.note?.message} />
                        )}
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="mt-5">
              <span className="text-base font-bold text-[#1A1A1A]">
                Select Barber
              </span>
              <hr className="my-4 border-[#949EAE]" />
              <div className="h-[300px]">
                <Swiper
                  slidesPerView={6}
                  spaceBetween={30}
                  pagination={pagination}
                  modules={[Pagination]}
                  className="mySwiper custom-swiper custom-swiper-slider"
                >
                  <SwiperSlide>{BarberCard(0)}</SwiperSlide>
                  <SwiperSlide>{BarberCard(1)}</SwiperSlide>
                  <SwiperSlide>{BarberCard(2)}</SwiperSlide>
                  <SwiperSlide>{BarberCard(3)}</SwiperSlide>
                  <SwiperSlide>{BarberCard(4)}</SwiperSlide>
                  <SwiperSlide>{BarberCard(5)}</SwiperSlide>
                  <SwiperSlide>{BarberCard(6)}</SwiperSlide>
                  <SwiperSlide>{BarberCard(7)}</SwiperSlide>
                  <SwiperSlide>{BarberCard(8)}</SwiperSlide>
                </Swiper>
                {/* {BarberCard()} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
