import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import TextField from '@mui/material/TextField';
import '../../assets/css/PopupStyle.css';
import branchService from '../../services/adminapp/adminBranch';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { Notification } from '../../interfaces/notification.interface';
import {
  ALL_PERMISSIONS,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';
import { useAppSelector } from '../../redux/redux-hooks';
import { getItem } from '../../utils/storage';
import CustomMultipleSelectBox from '../../components/common/CustomMultipleSelect';
import Notify from '../../components/common/Notify';

type NotificationCreatePopupProps = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
};

function NotificationCreatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
}: NotificationCreatePopupProps) {
  const [notificationType, setNotificationType] = useState('Customers');
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Notification>();

  const mainShopBranch: any = getItem('TEMP_BRANCH_DATA');
  const authState: any = useAppSelector((state: any) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );

  const [branches, setBranches] = React.useState<any>([]);

  const onSubmit = (data: Notification) => {
    const checkMainBranch: boolean =
      data.branches.length === 1 &&
      branches.some((b: any) => b.name === 'All' && b.id === data.branches[0]);

    if (checkMainBranch) {
      // setOpenFormDialog(false);
      data.notificationType = notificationType;
      if (notificationType === 'Customers') {
        data.branches = [];
      } else {
        data.branches = branches.map((x: any) => x.id);
      }
      callback(data);
      return;
    }

    const checkBranch: boolean =
      Array.isArray(data.branches) &&
      !data.branches.includes(mainShopBranch.id);

    if (checkBranch || notificationType === 'Customers') {
      // setOpenFormDialog(false);
      data.notificationType = notificationType;

      if (notificationType === 'Customers') data.branches = [];
      callback(data);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'Either select All or other branches',
        type: 'error',
      });
    }
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const handleUserChange = (event: any) => {
    setNotificationType(event.target.value);
  };

  useEffect(() => {
    if (authState.user.userType !== 'ShopUser') {
      setNotificationType('StaffUsers');
    }
  }, []);

  useEffect(() => {
    branchService.getBranchesLov().then((response: any) => {
      if (response.data.success) {
        const res: any = response.data.data.map((el: any) => {
          return {
            id: el.id,
            name: el.name,
          };
        });
        const mainRes: any = [{ id: mainShopBranch.id, name: 'All' }];
        setBranches([...mainRes, ...res]);
      }
    });
  }, []);

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Sent Notification</span>
          </div>
          <div className="FormBody">
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Title</label>
                <Input
                  className="FormInput"
                  {...register('title', {
                    required: true,
                    pattern: PATTERN.CHAR_SPEC_NUM_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  type="text"
                  placeholder="Enter your notification title"
                  id="title"
                  disableUnderline
                />
                {errors.title?.type === 'required' && (
                  <ErrorSpanBox error="Title is required" />
                )}
                {errors.title?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.title?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel mt-3">
                  Message{' '}
                  <span className="SubLabel">Write 05-250 Characters</span>
                </label>
                <TextField
                  className="FormTextarea"
                  id="message"
                  multiline
                  rows={4}
                  defaultValue=""
                  placeholder="Write Description"
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 5,
                      message: 'Minimum Five Characters',
                    },
                    maxLength: {
                      value: 250,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                />
                {errors.message && (
                  <ErrorSpanBox error={errors.message?.message} />
                )}
              </FormControl>
            </div>
            {notificationType !== 'Customers' && (
              <div className="my-2">
                <FormControl className="FormControl" variant="standard">
                  <CustomMultipleSelectBox
                    validateRequired
                    id="branches"
                    control={control}
                    error={errors}
                    setValue={setValue}
                    register={register}
                    options={{ roles: branches || [] }}
                    customClassInputTitle="font-bold"
                    inputTitle="Select Branches"
                    defaultFieldValue="-- Select Branches --"
                  />
                </FormControl>
              </div>
            )}
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.storeNotification.selectType
            ) && (
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <FormControl className="">
                    <FormLabel
                      id="demo-row-radio-buttons-group-label"
                      className="font-open-sans text-sm text-secondary"
                    >
                      User Type
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={notificationType ?? ''}
                      onClick={handleUserChange}
                    >
                      {authState.user.userType === 'ShopUser' && (
                        <FormControlLabel
                          sx={{
                            color: '#6A6A6A',
                            fontFamily: 'Open Sans',
                            fonWeight: 400,
                            fonSize: '14px',
                          }}
                          // disabled={FALSE}
                          value="Customers"
                          control={
                            <Radio
                              className="text-sm text-[#1D1D1D]"
                              icon={<RadioButtonUncheckedOutlinedIcon />}
                              checkedIcon={<CheckCircleOutlinedIcon />}
                            />
                          }
                          label="Customers"
                        />
                      )}
                      <FormControlLabel
                        sx={{
                          color: '#6A6A6A',
                          fontFamily: 'Open Sans',
                          fonWeight: 400,
                          fonSize: '14px',
                        }}
                        value="StaffUsers"
                        control={
                          <Radio
                            className="text-[#1D1D1D]"
                            icon={<RadioButtonUncheckedOutlinedIcon />}
                            checkedIcon={<CheckCircleOutlinedIcon />}
                          />
                        }
                        label="Staff Users"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            )}
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
              value="Sent"
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

export default NotificationCreatePopup;
