import React, { useState, useEffect, Fragment } from 'react';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { debounce } from '@mui/material/utils';
import kabakCase from 'lodash/kebabCase';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import dayjs from 'dayjs';
import CustomDropDown from '../../components/common/CustomDropDown';
import Service from '../../services/adminapp/adminAppointment';
import { Tenant } from '../../interfaces/superadmin/tenant.interface';
import { DOMAIN_PREFIX, DOMAIN_PROTOCOL } from '../../utils/constants';
import TimePicker from '../../components/common/TimePicker';
import {
  AppointmentProviderScheduleTime,
  AppointmentVisit,
} from '../../interfaces/app.appointment';
import CustomMultipleSelectBox from '../../components/common/CustomMultipleSelect';
import { useAppSelector } from '../../redux/redux-hooks';
import CustomDateTimePicker from '../../components/common/CustomDateTimePicker';
import Loader from '../../components/common/Loader2';
import DragDropFile from '../settings/DragDropFile';
import CustomButton from '../../components/common/CustomButton';
import { CreateBanner } from '../../interfaces/app.banner';

type Props = {
  roles?: any;
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  type?: boolean;
  formData?: any;
};

function BannerUpdatePopup({
  roles,
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
  type,
  formData,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
    control,
  } = useForm<CreateBanner>();

  const authState: any = useAppSelector((state: any) => state?.authState);
  const [isLoader, setIsLoader] = React.useState(false);
  const [providerlov, setProviderLov] = useState<any>();
  const [servicelov, setServiceLov] = useState<any>();
  const [schedule, setSchedule] = useState<any>();
  const [startTime, setStartTime] = useState<dayjs.Dayjs | any>(null);
  const [file, setFile] = useState<any>(null);
  const [selectedImg, setSelectedImg] = useState<any>(null);

  const onSubmit = (data: any) => {
    console.log('dataSSSelected==>', selectedImg, file, data);
    const details = {
      id: formData.id,
      name: data.bannerName,
      banner: file !== null ? file : formData.banner,
    };
    if (selectedImg || file || formData.banner) {
      callback(details);
    } else {
      setIsNotify(true);
      setNotifyMessage('Banner image is required');
    }
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };
  console.log('sssssssssssssFORMDATA', formData);

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
        {/* {isLoader ? <Loader /> : */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Add Banner Image</span>
          </div>
          <div className="mt-3">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Banner Name</label>
              <Input
                className="FormInput"
                type="text"
                id="bannerName"
                placeholder="Enter banner name"
                disableUnderline
                {...register('bannerName', {
                  required: true,
                  value: formData?.name,
                })}
              />
              {errors.bannerName?.type === 'required' && (
                <span role="alert" style={{ color: 'red', fontSize: '12px' }}>
                  * Banner name is required
                </span>
              )}
            </FormControl>
          </div>
          <div className="my-3 grid grid-cols-10 gap-6">
            <div className="col-span-4 flex items-center">
              <DragDropFile
                // setError={setError}
                // error={errors}
                customWidth="w-[px]"
                setFile={setFile}
                setImg={setSelectedImg}
              />
            </div>
            {selectedImg ? (
              <div className="col-span-6 flex items-center justify-center">
                <img
                  className="max-h-[200px] max-w-[200px] rounded-md"
                  src={selectedImg}
                  alt="Shop Logo"
                />
              </div>
            ) : formData && formData.banner ? (
              <div className="col-span-6 flex items-center justify-center">
                <img
                  className="max-h-[200px] max-w-[200px] rounded-md"
                  src={formData.banner}
                  alt={formData.name}
                />
              </div>
            ) : null}
          </div>
          <div className="FormFooter">
            <Button
              className="btn-black-outline"
              type="submit"
              onClick={handleFormClose}
              sx={{
                marginRight: '0.5rem',
                padding: '0.375rem 1.5rem !important',
              }}
            >
              Cancel
            </Button>
            <CustomButton
              buttonType="button"
              title="Add"
              type="submit"
              className="btn-black-fill"
              sx={{
                padding: '0.375rem 2rem !important',
                width: '90%',
                height: '35px',
              }}
            />
          </div>
        </form>
        {/* } */}
      </div>
    </Dialog>
  );
}

export default BannerUpdatePopup;
