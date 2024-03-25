import {
  Chip,
  FormControl,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState, useRef } from 'react';
import _ from 'lodash';

interface ExperienceChipsInputProps {
  name?: string;
  maxChips?: number;
  defaultChips?: string[];
}

const ChipsInput: React.FC<ExperienceChipsInputProps> = ({
  name,
  maxChips = 3,
  defaultChips = [],
}) => {
  const [chips, setChips] = useState<string[]>(defaultChips);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChip = () => {
    if (inputRef.current && chips.length < maxChips) {
      const newChip = inputRef.current.value;
      if (!_.isEmpty(newChip)) {
        setChips([...chips, newChip]);
        inputRef.current.value = '';
      }
    }
  };

  const handleDelete = (index: number) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const newChips = chips.filter((_, i) => i !== index);
    setChips(newChips);
  };

  return (
    <>
      <div className="">
        <FormGroup>
          <FormControl variant="outlined" fullWidth>
            <Input type="hidden" disableUnderline name={name} value={chips} />
            <Input
              disableUnderline
              inputRef={inputRef}
              type="text"
              className="form-control alder-form-control"
              placeholder={`${_.capitalize(name)} (Only ${maxChips})`}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleChip}>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </FormGroup>
      </div>
      <div className="mt-2">
        <ul>
          {chips.map((chip, index) => (
            <Chip
              key={index}
              label={chip}
              className="mx-2 rounded-xl"
              onDelete={() => handleDelete(index)}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChipsInput;
