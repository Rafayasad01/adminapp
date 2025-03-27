import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import { useForm } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import CustomButton from '../../components/common/CustomButton';
// import CustomInputBox from '../../components/common/CustomInputBox';
import { AppointmentSwitchStaff } from '../../interfaces/app.appointment';
import '../../assets/css/PopupStyle.css';
import CustomDropDown from '../../components/common/CustomDropDown';
// import { PATTERN } from '../../utils/constants';
import storeEmpService from '../../services/adminapp/adminStoreEmployee';

type Props = {
  id?: any;
  open?: any;
  anchorEl?: any;
  onclose?: any;
  callback?: any;
  isLoader?: any;
  staffData?: any;
};

const ViewSwitchStaffPopup = ({
  id,
  open,
  anchorEl,
  onclose,
  callback,
  isLoader,
  staffData,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    // setError,
    // clearErrors,
    formState: { errors },
  } = useForm<AppointmentSwitchStaff>();

  const [barberStaffs, setBarberStaffs] = useState<
    { id: string; name: string }[]
  >([]);

  const onSubmit = (data: AppointmentSwitchStaff) => {
    callback(data);
    // console.log('data', data);
  };

  React.useEffect(() => {
    if (staffData?.id) {
      storeEmpService
        .StoreEmployeeAppointmentLov(staffData?.id)
        .then((res) => {
          // console.log('res', res);
          // const AnyProfessional = [
          //   { id: 'anyProfessional', name: 'Any Professional' },
          // ];
          setBarberStaffs(res?.data?.data || []);
        })
        .catch((err) => {
          console.error('error', err);
        });
    }
  }, [staffData]);

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onclose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <div className="w-full">
        <form
          className="w-full overflow-auto p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="FormBody">
            <div className="w-full">
              <div className="flex items-center justify-between gap-2">
                <FormControl className="FormControl w-full" variant="standard">
                  <CustomDropDown
                    validateRequired
                    id="storeEmployee"
                    control={control}
                    error={errors}
                    setValue={setValue}
                    register={register}
                    options={{
                      roles: barberStaffs || [],
                    }}
                    customHeight="h-[40px]"
                    customClassInputTitle="mb-[px] text-[14px]"
                    defaultValue="Select Staff Employee"
                    inputTitle="Available Staffs"
                  />
                </FormControl>
              </div>
            </div>
            <div className="mt-1 w-full">
              <CustomButton
                disabled={isLoader}
                buttonType="button"
                title={isLoader ? <CircularProgress size={14} /> : 'Assign'}
                className="btn-black-outline"
                type="submit"
                sx={{
                  width: '100%',
                  height: '35px',
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </Popover>
  );
};

export default ViewSwitchStaffPopup;
