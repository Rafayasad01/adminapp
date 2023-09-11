import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { SelectChangeEvent } from '@mui/material/Select';
import Service from '../../services/adminapp/admin';
import '../../assets/css/PopupStyle.css';
import { useForm } from 'react-hook-form';
import { SocialMedia } from '../../interfaces/app.interface';
import { useAppSelector } from '../../redux/redux-hooks';
import Notify from '../../components/common/Notify';


type Props = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  detail: any;
  setDetail: React.Dispatch<React.SetStateAction<any>>;
  setIsLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

function SocialLinksPopup({
  openDialog,
  setOpenDialog,
  detail,
  setDetail,
  setIsLoader
}: Props) {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SocialMedia>();
  const authState: any = useAppSelector((state) => state.authState);

  // const [isLoader, setIsLoader] = useState(true);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});

  const handleFormClose = () => setOpenDialog(false);

  console.log("dettttt", detail);

  const onSubmit = (data: SocialMedia) => {
    console.log("data", data);
    setIsLoader(true);
    setOpenDialog(false);
    const formData = new FormData();
    formData.append('facebook', data.facebook ? data.facebook : "");
    formData.append('instagram', data.instagram ? data.instagram : "");
    formData.append('linkedin', data.linkedin ? data.linkedin : "");
    formData.append('twitter', data.twitter ? data.twitter : "");
    formData.append('youtube', data.youtube ? data.youtube : "");
    formData.append('whatsapp', data.whatsapp ? data.whatsapp : "");
    Service.updateService(
      authState.user.tenant,
      authState.user.tenantConfig,
      formData
    ).then((item: any) => {
      if (item.data.success) {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: item.data.message,
          type: 'success',
        });
        setDetail(item.data.data);
      } else {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: item.data.message,
          type: 'error',
        });
      }
    }).catch((err) => {
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: err.message,
        type: 'error',
      });
    })
  }

  return (
    <Dialog
      open={openDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog Width-30',
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
            <span className="Title">Social Links</span>
          </div>
          <div className="FormBody">
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Facebook</label>
                <Input
                  className="FormInput"
                  id="facebook"
                  placeholder="Url"
                  disableUnderline
                  {...register('facebook', { value: detail ? detail.facebook : "" })}
                // onChange={(item: any) => {
                //   setSocialLinks((newItem: any) => {
                //     return {
                //       ...newItem,
                //       facebook: item.target.value,
                //     };
                //   });
                // }}
                />
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Instagram</label>
                <Input
                  className="FormInput"
                  id="instagram"
                  value={detail.instagram ?? ''}
                  placeholder="Url"
                  disableUnderline
                  {...register('instagram', { value: detail ? detail.instagram : "" })}
                // onChange={(item: any) => {
                //   setSocialLinks((newItem: any) => {
                //     return {
                //       ...newItem,
                //       instagram: item.target.value,
                //     };
                //   });
                // }}
                />
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">LinkedIn</label>
                <Input
                  className="FormInput"
                  id="linkedin"
                  placeholder="Url"
                  disableUnderline
                  {...register('linkedin', { value: detail ? detail.linkedin : "" })}
                // onChange={(item: any) => {
                //   setSocialLinks((newItem: any) => {
                //     return {
                //       ...newItem,
                //       linkedin: item.target.value,
                //     };
                //   });
                // }}
                />
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Twitter</label>
                <Input
                  className="FormInput"
                  id="twitter"
                  placeholder="Url"
                  disableUnderline
                  {...register('twitter', { value: detail ? detail.twitter : "" })}
                // onChange={(item: any) => {
                //   setSocialLinks((newItem: any) => {
                //     return {
                //       ...newItem,
                //       twitter: item.target.value,
                //     };
                //   });
                // }}
                />
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">YouTube</label>
                <Input
                  className="FormInput"
                  id="youtube"
                  placeholder="Url"
                  disableUnderline
                  {...register('youtube', { value: detail ? detail.youtube : "" })}
                // onChange={(item: any) => {
                //   setSocialLinks((newItem: any) => {
                //     return {
                //       youtube: item.target.value,
                //     };
                //   });
                // }}
                />
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">WhatsApp</label>
                <Input
                  className="FormInput"
                  id="whatsapp"
                  placeholder="Url"
                  disableUnderline
                  {...register('whatsapp', { value: detail ? detail.whatsapp : "" })}
                // onChange={(item: any) => {
                //   setSocialLinks((newItem: any) => {
                //     return {
                //       ...newItem,
                //       whatsapp: item.target.value,
                //     };
                //   });
                // }}
                />
              </FormControl>
            </div>
          </div>
          <div className="FormFooter">
            <Button
              className="btn-black-outline"
              onClick={handleFormClose}
              sx={{
                marginRight: '0.5rem',
                padding: '0.375rem 1.5rem !important',
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn-black-fill"
              sx={{
                padding: '0.375rem 2rem !important',
              }}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default SocialLinksPopup;
