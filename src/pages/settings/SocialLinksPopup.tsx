import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { SelectChangeEvent } from '@mui/material/Select';

import '../../assets/css/PopupStyle.css';

type Props = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  socialMediaLinks: any;
  setSocialMediaLinks: React.Dispatch<React.SetStateAction<any>>;
};

function SocialLinksPopup({
  openDialog,
  setOpenDialog,
  socialMediaLinks,
  setSocialMediaLinks,
}: Props) {
  const handleFormClose = () => setOpenDialog(false);

  return (
    <Dialog
      open={openDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog Width-30',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
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
                value={socialMediaLinks.facebook ?? ''}
                name="facebook"
                placeholder="Url"
                disableUnderline
                onChange={(item: any) => {
                  setSocialMediaLinks((newItem: any) => {
                    return {
                      ...newItem,
                      facebook: item.target.value,
                    };
                  });
                }}
              />
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Instagram</label>
              <Input
                className="FormInput"
                id="instagram"
                value={socialMediaLinks.instagram ?? ''}
                name="instagram"
                placeholder="Url"
                disableUnderline
                onChange={(item: any) => {
                  setSocialMediaLinks((newItem: any) => {
                    return {
                      ...newItem,
                      instagram: item.target.value,
                    };
                  });
                }}
              />
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">LinkedIn</label>
              <Input
                className="FormInput"
                id="linkedin"
                value={socialMediaLinks.linkedin ?? ''}
                name="linkedin"
                placeholder="Url"
                disableUnderline
                onChange={(item: any) => {
                  setSocialMediaLinks((newItem: any) => {
                    return {
                      ...newItem,
                      linkedin: item.target.value,
                    };
                  });
                }}
              />
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Twitter</label>
              <Input
                className="FormInput"
                id="twitter"
                value={socialMediaLinks.twitter ?? ''}
                name="twitter"
                placeholder="Url"
                disableUnderline
                onChange={(item: any) => {
                  setSocialMediaLinks((newItem: any) => {
                    return {
                      ...newItem,
                      twitter: item.target.value,
                    };
                  });
                }}
              />
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">YouTube</label>
              <Input
                className="FormInput"
                id="youtube"
                value={socialMediaLinks.youtube ?? ''}
                name="youtube"
                placeholder="Url"
                disableUnderline
                onChange={(item: any) => {
                  setSocialMediaLinks((newItem: any) => {
                    return {
                      ...newItem,
                      youtube: item.target.value,
                    };
                  });
                }}
              />
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">WhatsApp</label>
              <Input
                className="FormInput"
                id="whatsapp"
                value={socialMediaLinks.whatsapp ?? ''}
                name="whatsapp"
                placeholder="Url"
                disableUnderline
                onChange={(item: any) => {
                  setSocialMediaLinks((newItem: any) => {
                    return {
                      ...newItem,
                      whatsapp: item.target.value,
                    };
                  });
                }}
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
            className="btn-black-fill"
            onClick={handleFormClose}
            sx={{
              padding: '0.375rem 2rem !important',
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default SocialLinksPopup;
