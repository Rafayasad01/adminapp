import { memo, ChangeEvent } from 'react';
import {
  Theme,
  ValidThemeColorKey,
} from '../../../interfaces/superadmin/theme.interface';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, FormControl, Input } from '@mui/material';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import {
  CATEGORY_COLORS_COUNT,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  THEME_COLORS,
} from '../../../utils/constants';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

interface ThemeFormProps {
  onSubmit: SubmitHandler<Partial<Theme>>; // Submit handler that takes a Theme object
  editMode: boolean;
  theme: Theme | null;
}

const SuperAdminThemeForm: React.FC<ThemeFormProps> = ({
  onSubmit,
  theme,
  editMode,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<Theme>();

  const StoreSubmit = (data: Partial<Theme>) => {
    // Check if theme.key exists in the data object
    if (data && data.key) {
      // Check if the value is already in the required format
      const isFormatted = /^[A-Z][a-z]*(?:[A-Z][a-z]*)*$/.test(data.key);

      // If not in the required format, modify the value
      if (!isFormatted) {
        // Remove spaces, capitalize first letter of every word, and join the words
        const formattedKey = data.key
          .replace(/\s+/g, ' ')
          .trim()
          .toLowerCase() // Convert the entire string to lowercase
          .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())
          .replace(/\s/g, ''); // Remove spaces

        // Create a new object with the formatted key and the rest of the data
        const formattedData = { ...data, key: formattedKey };

        // Call the onSubmit function with the modified data
        onSubmit(formattedData);
      } else {
        // Call the onSubmit function with the original data if theme.key is already in the required format
        onSubmit(data);
      }
    } else {
      // Call the onSubmit function with the original data if theme.key is not present
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(StoreSubmit)} className="px-2">
      <div className="FormBody">
        <div className="FormFields">
          <FormControl className="FormControl" variant="standard">
            <label className="font-bold">
              Key{' '}
              <span className="text-xs text-gray-400">
                ( max 50 characters )
              </span>
            </label>
            <Input
              className="FormInput m-0 h-[40px] w-[350px] rounded-lg border-2 border-[#949EAE] px-3 outline-none "
              {...register('key', {
                required: true,
                pattern: PATTERN.CHAR_SPACE_DASH,
                validate: (value) => value.length <= 50,
                value: theme?.key,
              })}
              type="text"
              id="key"
              placeholder="Enter Key"
              disableUnderline
            />
            {errors.key?.type === 'required' && (
              <ErrorSpanBox error="Key is required" />
            )}
            {errors.key?.type === 'pattern' && (
              <ErrorSpanBox error={INVALID_CHAR} />
            )}
            {errors.key?.type === 'validate' && (
              <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
            )}
          </FormControl>
        </div>

        <div className="mt-6 grid grid-cols-2  gap-5">
          <div className="rounded-lg border-2 p-5">
            <label className="font-bold">Enter Theme Colors</label>

            <div className="grid grid-cols-1 gap-5 py-5 sm:grid-cols-2 md:grid-cols-2">
              {THEME_COLORS.map((color: ValidThemeColorKey) => (
                <FormControl
                  key={color}
                  className="FormControl"
                  variant="standard"
                >
                  <label className="FormLabel">{`${color
                    .charAt(0)
                    .toUpperCase()}${color.slice(1)} Color:`}</label>
                  <Input
                    className="FormInput"
                    {...register(`value.themeColor.${color}`, {
                      required: true,
                      // pattern: PATTERN.CHAR_SPACE_DASH,
                      value: theme?.value.themeColor?.[color],
                      validate: (value) => value.length <= 50,
                    })}
                    disableUnderline
                  />
                  {errors.value?.themeColor?.[color] && (
                    <ErrorSpanBox
                      error={errors.value.themeColor[color]?.message}
                    />
                  )}
                  {errors.value?.themeColor?.[color]?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.value?.themeColor?.[color]?.type === 'validate' && (
                    <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                  )}
                  {errors.value?.themeColor?.[color]?.type === 'required' && (
                    <ErrorSpanBox
                      error={`${_.upperFirst(color)} Color is required`}
                    />
                  )}
                </FormControl>
              ))}
            </div>
          </div>

          <div className="rounded-lg border-2 p-5">
            <label className="font-bold">Enter Category Colors</label>

            <div className="grid grid-cols-1 gap-5 py-5 sm:grid-cols-2 md:grid-cols-2">
              {[...Array(CATEGORY_COLORS_COUNT)].map((_, index) => (
                <FormControl
                  key={index}
                  className="FormControl"
                  variant="standard"
                >
                  <label className="FormLabel">{`Category Color ${
                    index + 1
                  }:`}</label>
                  <Input
                    className="FormInput"
                    {...register(`value.categoryColor.${index}`, {
                      required: true,
                      value: theme?.value.categoryColor?.[index],
                      //   pattern: PATTERN.CHAR_SPACE_DASH,
                      validate: (value) => value?.length <= 50,
                    })}
                    disableUnderline
                  />
                  {errors.value?.categoryColor?.[index]?.type ===
                    'required' && (
                    <ErrorSpanBox
                      error={`Category Color ${index + 1} is required`}
                    />
                  )}
                  {errors.value?.categoryColor?.[index]?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.value?.categoryColor?.[index]?.type ===
                    'validate' && <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />}
                </FormControl>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex ">
        <Button
          className="btn-black-outline"
          type="button"
          onClick={() => navigate('../list')}
          sx={{
            marginRight: '0.5rem',
            padding: '0.375rem 1.5rem !important',
          }}
        >
          Cancel
        </Button>
        <Input
          type="submit"
          value={editMode ? 'Update' : 'Add'}
          className="btn-black-fill w-auto"
          disableUnderline
          sx={{
            padding: '0.375rem 2rem !important',
          }}
        />
      </div>
    </form>
  );
};

export default memo(SuperAdminThemeForm);
