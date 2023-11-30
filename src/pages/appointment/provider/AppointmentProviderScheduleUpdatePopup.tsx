import React, { useState, useEffect } from 'react';
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
import '../../../assets/css/PopupStyle.css';
import CustomDropDown from '../../../components/common/CustomDropDown';
import { Tenant } from '../../../interfaces/superadmin/tenant.interface';
import { DOMAIN_PREFIX, DOMAIN_PROTOCOL } from '../../../utils/constants';
import TimePicker from '../../../components/common/TimePicker';
import dayjs from 'dayjs';
import { AppointmentProviderScheduleTime } from '../../../interfaces/app.appointment';

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

function AppointmentProviderScheduleUpdatePopup({
    roles,
    openFormDialog,
    setOpenFormDialog,
    callback,
    setIsNotify,
    setNotifyMessage,
    type,
    formData
}: Props) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        control,
    } = useForm<AppointmentProviderScheduleTime>();
    const [startTime, setStartTime] = useState<dayjs.Dayjs | any>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | any>(null);

    const onSubmit = (data: AppointmentProviderScheduleTime) => {
        let time = {
            startTime: dayjs(startTime).isValid() && dayjs(startTime).format('YYYY-MM-DD HH:mm:ss'),
            endTime: dayjs(endTime).isValid() && dayjs(endTime).format('YYYY-MM-DD HH:mm:ss'),
            id: formData?.id,
            workDay: formData?.workDay
        }
        if (startTime && endTime) {
            setOpenFormDialog(false);
            callback(time);
        } else {
            setIsNotify(true);
            setNotifyMessage({
                text: 'All fields are required!',
                type: 'error',
            });
        }
    };

    useEffect(() => {
        if (formData) {
            setStartTime(formData.startTime)
            setEndTime(formData.endTime)
        }
    }, [])

    const handleFormClose = () => {
        setOpenFormDialog(false);
    };
    console.log("sssssssssssss", formData);

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
                        <span className="Title">{`Edit ${formData?.workDay} Schedule`}</span>
                    </div>
                    <div className="FormBody">
                        <div className="FormFields">
                            <FormControl className="FormControl" variant="standard">
                                <TimePicker
                                    timePickerLabel={"Start Time"}
                                    timePickerSubLabel={"(Office in time)"}
                                    timePickerValue={startTime}
                                    setTimePickerValue={setStartTime}
                                    id={"startTime"}
                                // setError={setError}
                                />
                            </FormControl>
                            <FormControl className="FormControl" variant="standard">
                                <TimePicker
                                    timePickerLabel={"End Time"}
                                    timePickerSubLabel={"(Office out time)"}
                                    timePickerValue={endTime}
                                    setTimePickerValue={setEndTime}
                                    id={"endTime"}
                                // setError={setError}
                                />
                            </FormControl>
                        </div>
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
                        <Input
                            type="submit"
                            value="Add"
                            className="btn-black-fill"
                            disableUnderline
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

export default AppointmentProviderScheduleUpdatePopup;
