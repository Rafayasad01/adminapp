import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Controller } from 'react-hook-form';

type Props = {
  item: any;
  control: any;
  index?: number;
};

function CustomCheckBox({ item, control }: Props) {
  return (
    <Controller
      name={`${item.id}`}
      control={control}
      defaultValue={item.value || false}
      render={({ field }) => (
        <FormControlLabel
          className="text-[#949EAE]"
          control={
            <Checkbox
              defaultChecked={item.value}
              icon={
                <CheckBoxOutlineBlankRoundedIcon style={{ color: '#000000' }} />
              }
              checkedIcon={<CheckBoxRoundedIcon style={{ color: '#000000' }} />}
              onChange={(e) => {
                field.onChange(e.target.checked);
                item.check = e.target.checked;
              }}
              checked={field.value}
            />
          }
          label={item.fieldName}
        />
      )}
    />
  );
}

export default CustomCheckBox;
