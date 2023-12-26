import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import '../../assets/css/PopupStyle.css';

type Props = {
  faqsAddForm: boolean;
  setFaqsAddForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function FAQSCreatePopup({ faqsAddForm, setFaqsAddForm }: Props) {
  // const [quantity, setQuantity] = useState('status');
  const handleFormClose = () => setFaqsAddForm(false);

  const handleQuantityChange = () =>
    // event: SelectChangeEvent
    {
      // setQuantity(event.target.value as string);
    };

  return (
    <Dialog
      open={faqsAddForm}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog Width-30',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <div className="FormHeader">
          <span className="Title">Add FAQ</span>
        </div>
        <div className="FormBody">
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Services</label>
              <Select
                className="FormSelect"
                labelId="demo-simple-select-label"
                value="Select Services"
                disableUnderline
                onChange={() =>
                  // event
                  {
                    handleQuantityChange();
                    // event
                  }
                }
              >
                <MenuItem value="Select Services">Select Services</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Question</label>
              <Input
                className="FormInput"
                id="address"
                value=""
                name="address"
                placeholder="Question"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Description</label>
              <TextField
                className="FormTextarea"
                id="outlined-multiline-static"
                multiline
                rows={2}
                defaultValue=""
                placeholder="Description"
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
            Add
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default FAQSCreatePopup;
