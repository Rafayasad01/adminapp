import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Slider from '@mui/material/Slider';

import '../../assets/css/PopupStyle.css';
import CircleMap from '../../components/common/CircleMap';

type Props = {
  locationAddDialog: boolean;
  setLocationAddDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function LocationsAddPopup({ locationAddDialog, setLocationAddDialog }: Props) {
  const [sliderCount, setSliderCount] = useState<number>(50);
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setSliderCount(() => newValue);
      // console.log(newValue);
      // console.log(sliderCount);
    }
  };

  const valuetext = (value: number) => {
    return `${value} km`;
  };

  const handleFormClose = () => setLocationAddDialog(false);
  return (
    <Dialog
      open={locationAddDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog Width-60',
        style: { maxWidth: '100%', maxHeight: 'auto', height: '430px' },
      }}
    >
      <div className="Content NoPadding">
        <div className="Row">
          <div className="Column-5" style={{ padding: '1.25rem 1rem' }}>
            <div className="FormHeader">
              <span className="Title">Add Location</span>
            </div>
            <div className="FormBody" style={{ marginTop: '1.25rem' }}>
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Location Name</label>
                  <Input
                    className="FormInput"
                    id="name"
                    value=""
                    name="name"
                    placeholder="Texas"
                    disableUnderline
                  />
                </FormControl>
              </div>
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Postal Code</label>
                  <Input
                    className="FormInput"
                    id="name"
                    value=""
                    name="name"
                    placeholder="633"
                    disableUnderline
                  />
                </FormControl>
              </div>
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Address</label>
                  <Input
                    className="FormInput"
                    id="name"
                    value=""
                    name="name"
                    placeholder="1200 Lakeway Dr Lakeway Texas."
                    disableUnderline
                  />
                </FormControl>
              </div>
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Radius</label>
                  <Slider
                    value={sliderCount}
                    onChange={handleSliderChange}
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                    valueLabelDisplay="auto"
                    aria-label="Default"
                  />
                </FormControl>
              </div>
            </div>
            <div className="FormFooter" style={{ marginTop: '2.25rem' }}>
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
                Add
              </Button>
            </div>
          </div>
          <div className="Column-7">
            <CircleMap
              center={{ lat: 38.8936708, lng: -77.1546612 }}
              zoom={17}
              radius={sliderCount}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default LocationsAddPopup;
