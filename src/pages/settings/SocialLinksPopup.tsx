import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { SelectChangeEvent } from '@mui/material/Select';

import '../../assets/css/PopupStyle.css';

type Props = {
  socialLinks: boolean;
  setSocialLinks: React.Dispatch<React.SetStateAction<boolean>>;
};

function SocialLinksPopup({ socialLinks, setSocialLinks }: Props) {
  const [quantity, setQuantity] = useState('status');
  const handleFormClose = () => setSocialLinks(false);

  const handleQuantityChange = (event: SelectChangeEvent) => {
    setQuantity(event.target.value as string);
  };

  return (
    <Dialog
      open={socialLinks}
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
                id="address"
                value=""
                name="address"
                placeholder="Url"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Instagram</label>
              <Input
                className="FormInput"
                id="address"
                value=""
                name="address"
                placeholder="Url"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">LinkedIn</label>
              <Input
                className="FormInput"
                id="address"
                value=""
                name="address"
                placeholder="Url"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Twitter</label>
              <Input
                className="FormInput"
                id="address"
                value=""
                name="address"
                placeholder="Url"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">YouTube</label>
              <Input
                className="FormInput"
                id="address"
                value=""
                name="address"
                placeholder="Url"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">WhatsApp</label>
              <Input
                className="FormInput"
                id="address"
                value=""
                name="address"
                placeholder="Url"
                disableUnderline
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
