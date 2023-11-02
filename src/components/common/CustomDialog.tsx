import '../../assets/css/PopupStyle.css';
import React, { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import IconButton from '@mui/material/IconButton';
import { AppUserDriverExt } from '../../interfaces/app-user.interface';
import CustomButton from './CustomButton';
import CustomInputBox from './CustomInputBox';
import CustomDropDown from './CustomDropDown';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  DialogHeader: string;
  inputFieldsData: any;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  type?: any;
  reset?: any;
  setAvater?: any;
  specailCase?: boolean;
  singleField?: boolean;
};

function CustomDialog({
  openFormDialog,
  setOpenFormDialog,
  DialogHeader,
  inputFieldsData,
  handleSubmit,
  onSubmit,
  type,
  specailCase,
  setAvater,
  reset,
  singleField,
}: Props) {
  const handleFormClose = () => {
    if (type === 'edit' && specailCase) {
      reset({
        role: 'none',
        userLimits: '',
      });
      setOpenFormDialog(false);
    } else if (type === 'edit' && !specailCase) {
      console.log('ssSSsss');
      setAvater && setAvater(null);
      reset();
      setOpenFormDialog(false);
    } else {
      setOpenFormDialog(false);
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
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">{DialogHeader}</span>
          </div>
          <div className="FormBody">
            <div className={singleField ? 'FormField' : 'FormFields'}>
              {inputFieldsData?.map((items: any, index: number, array: any) => {
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
                      ) : null
                    }
                    {items.id === 'upload' && (
                      <>
                        <br />
                        <div style={{ minWidth: '204%', marginTop: '0.75rem' }}>
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
          <div className="FormFooter">
            <CustomButton
              buttonType="button"
              title="Cancel"
              className="btn-black-outline"
              onclick={handleFormClose}
              sx={{
                marginRight: '0.5rem',
                padding: '0.375rem 1.5rem !important',
              }}
            />
            <CustomButton
              buttonType="button"
              title={type === 'edit' ? 'Edit' : 'Add'}
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
      </div>
    </Dialog>
  );
}

export default CustomDialog;
