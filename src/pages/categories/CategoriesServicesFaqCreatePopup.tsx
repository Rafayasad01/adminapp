import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useForm } from 'react-hook-form';

import '../../assets/css/PopupStyle.css';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { CategoryServiceFaq } from '../../interfaces/category.interface';
import { INVALID_CHAR, MAX_LENGTH_EXCEEDED, PATTERN } from '../../utils/constants';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
};

function CategoriesServicesFaqCreatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<CategoryServiceFaq>();
  const onSubmit = (data: CategoryServiceFaq) => {
    setOpenFormDialog(false);
    callback(data);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Add FAQ</span>
          </div>
          <div className="FormBody">
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Question</label>
                <Input
                  className="FormInput"
                  id="question"
                  placeholder="Question"
                  disableUnderline
                  {...register('question', {
                    required: 'Question is required',
                    pattern: PATTERN.CHAR_NUM_SPACE,
                    validate: (value) => value.length <= 250
                  })}
                />
                {errors.question?.type === 'required' && (
                  <ErrorSpanBox error={errors.question?.message} />
                )}
                {errors.question?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.question?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Answer</label>
                <TextareaAutosize
                  className="FormTextarea outline-none pt-3"
                  id="outlined-multiline-static"
                  minRows={5}
                  maxRows={15}
                  defaultValue=""
                  placeholder="Write answer here..."
                  {...register('answer', {
                    required: 'Answer is required',
                    pattern: {
                      value: PATTERN.CHAR_NUM_SPACE_DOT_AT,
                      message: INVALID_CHAR
                    },
                    minLength: {
                      value: 1,
                      message: 'Minimum One Characters',
                    },
                    maxLength: {
                      value: 250,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                />
                {errors.answer && (
                  <ErrorSpanBox error={errors.answer?.message} />
                )}
              </FormControl>
            </div>
          </div>
          <div className="FormFooter">
            <Button
              className="btn-black-outline"
              type="submit"
              onClick={handleFormClose}
              sx={{
                marginRight: '0.5rem',
                padding: '0.375rem 1.5rem !important',
              }}
            >
              Cancel
            </Button>
            <Input
              type="submit"
              value="Add"
              className="btn-black-fill"
              sx={{
                padding: '0.375rem 2rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default CategoriesServicesFaqCreatePopup;
