import React from 'react';
import Popover from '@mui/material/Popover';
import { useForm } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import CustomButton from '../../components/common/CustomButton';
import CustomInputBox from '../../components/common/CustomInputBox';
import { MAX_LENGTH_EXCEEDED, PATTERN } from '../../utils/constants';
import { AppointmentWalletPayment } from '../../interfaces/app.appointment';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import '../../assets/css/PopupStyle.css';

type Props = {
  id?: any;
  open?: any;
  anchorEl?: any;
  onclose?: any;
  callback?: any;
  isWalletLoader?: any;
};

const ViewWalletPopupCard = ({
  id,
  open,
  anchorEl,
  onclose,
  callback,
  isWalletLoader,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentWalletPayment>();

  const onSubmit = (data: AppointmentWalletPayment) => {
    // console.log('🚀 ~ onSubmit ~ datasssssss:', data);
    callback(data);
  };

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
                <FormControl
                  className="FormControl w-full py-1"
                  variant="standard"
                >
                  <CustomInputBox
                    customFontClass="text-sm"
                    sx={{
                      border: '1px solid',
                      padding: '5px',
                      borderRadius: '3px',
                      marginTop: '3px',
                      fontSize: '12px',
                    }}
                    pattern={PATTERN.ONLY_NUM}
                    maxLetterLimit={15}
                    min={1}
                    inputTitle="Balance"
                    placeholder="2000"
                    id="balance"
                    register={register}
                    error={errors.balance}
                    inputType="text"
                  />
                </FormControl>
                <FormControl className="FormControl w-full" variant="standard">
                  <CustomInputBox
                    customFontClass="text-sm"
                    sx={{
                      border: '1px solid',
                      padding: '5px',
                      borderRadius: '3px',
                      marginRight: '5px',
                      marginTop: '3px',
                      fontSize: '12px',
                    }}
                    pattern={PATTERN.ALLOW_ALL}
                    inputTitle="Person"
                    placeholder="John Smith"
                    id="person"
                    register={register}
                    error={errors.person}
                    inputType="text"
                  />
                </FormControl>
              </div>
              <div className="w-full">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel text-[14px]">
                    Description{' '}
                    <span className="SubLabel text-[9px]">
                      - Write 01-250 Characters
                    </span>
                  </label>
                  <TextField
                    className="FormTextarea w-[435px] p-1"
                    sx={{ '& .MuiInputBase-input': { fontSize: '12px' } }}
                    id="note"
                    multiline
                    rows={4}
                    defaultValue=""
                    placeholder="Write description..."
                    {...register('note', {
                      maxLength: {
                        value: 250,
                        message: MAX_LENGTH_EXCEEDED,
                      },
                    })}
                  />
                  {errors.note && <ErrorSpanBox error={errors.note?.message} />}
                </FormControl>
              </div>
            </div>
            <div className="mt-1 w-full">
              <CustomButton
                disabled={isWalletLoader}
                buttonType="button"
                title={isWalletLoader ? <CircularProgress size={14} /> : 'Done'}
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

export default ViewWalletPopupCard;
