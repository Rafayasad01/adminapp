import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import '../../assets/css/PopupStyle.css';
import Notify from '../../components/common/Notify';
import { SocialMedia } from '../../interfaces/app.interface';
import { setItemState } from '../../redux/features/appStateSlice';
import { useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/admin';

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
  setIsLoader,
}: Props) {
  const { register, handleSubmit } = useForm<SocialMedia>();
  const dispatch = useDispatch();
  const authState: any = useAppSelector((state) => state?.authState);

  // const [isLoader, setIsLoader] = useState(true);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});

  const handleFormClose = () => setOpenDialog(false);

  const onSubmit = (data: SocialMedia) => {
    setIsLoader(true);
    // console.log('data', data);
    setOpenDialog(false);
    const formData = {
      facebook: data.facebook ? data.facebook : null,
      instagram: data.instagram ? data.instagram : null,
      linkedin: data.linkedin ? data.linkedin : null,
      twitter: data.twitter ? data.twitter : null,
      youtube: data.youtube ? data.youtube : null,
      whatsapp: data.whatsapp ? data.whatsapp : null,
      updatedBy: authState.user.id,
    };
    Service.updateMediaService(authState.user.tenant, formData)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          // console.log('item', item.data.data);
          const tenantConfig: any = {
            facebook: item.data.data.facebook,
            instagram: item.data.data.instagram,
            linkedin: item.data.data.linkedin,
            twitter: item.data.data.twitter,
            whatsapp: item.data.data.whatsapp,
            youtube: item.data.data.youtube,
          };

          dispatch(setItemState({ tenantConfig }));
          setDetail((prev: any) => {
            return {
              ...prev,
              tenantConfig: {
                ...prev.tenantConfig,
                facebook: item.data.data.facebook,
                instagram: item.data.data.instagram,
                linkedin: item.data.data.linkedin,
                twitter: item.data.data.twitter,
                whatsapp: item.data.data.whatsapp,
                youtube: item.data.data.youtube,
              },
            };
          });
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

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
                  {...register('facebook', {
                    value: detail ? detail?.tenantConfig?.facebook : '',
                  })}
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
                  placeholder="Url"
                  disableUnderline
                  {...register('instagram', {
                    value: detail ? detail?.tenantConfig?.instagram : '',
                  })}
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
                  {...register('linkedin', {
                    value: detail ? detail?.tenantConfig?.linkedin : '',
                  })}
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
                  {...register('twitter', {
                    value: detail ? detail?.tenantConfig?.twitter : '',
                  })}
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
                  {...register('youtube', {
                    value: detail ? detail?.tenantConfig?.youtube : '',
                  })}
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
                  {...register('whatsapp', {
                    value: detail ? detail?.tenantConfig?.whatsapp : '',
                  })}
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
