import { memo } from 'react';
import {
  Theme,
  ValidThemeColorKey,
} from '../../../interfaces/superadmin/theme.interface';
import { useForm, SubmitHandler  } from 'react-hook-form';
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
import { useNavigate } from 'react-router-dom';;

interface ThemeFormProps {
  onSubmit: SubmitHandler<Partial<Theme>>; // Submit handler that takes a Theme object
  editMode: boolean;
  theme: Theme | null;
}

const SuperAdminThemeForm: React.FC<ThemeFormProps> = ({ onSubmit, theme, editMode }) => {
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
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(StoreSubmit)} className="px-2">
      <div className="FormBody">
        <div className="FormFields">
          <FormControl className="FormControl" variant="standard">
            <label className="FormLabel">
              Key{' '}
              <span className="text-xs text-gray-400">
                ( max 50 characters )
              </span>
            </label>
            <Input
              className="FormInput"
              {...register('key', {
                required: true,
                pattern: PATTERN.CHAR_SPACE_DASH,
                validate: (value) => value.length <= 50,
                value: theme?.key,
              })}
              type="text"
              id="firstName"
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
        <div className="mt-6">
          <h2>Enter Theme Colors</h2>

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2  lg:grid-cols-6">
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

        <div className="mt-6">
          <h2>Enter Category color</h2>

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2  lg:grid-cols-6">
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
                {errors.value?.categoryColor?.[index]?.type === 'required' && (
                  <ErrorSpanBox
                    error={`Category Color ${index + 1} is required`}
                  />
                )}
                {errors.value?.categoryColor?.[index]?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.value?.categoryColor?.[index]?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            ))}
          </div>
        </div>
      </div>
      <div className="FormFooter">
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
          value={editMode ? "Update" : "Add" }
          className="btn-black-fill"
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
