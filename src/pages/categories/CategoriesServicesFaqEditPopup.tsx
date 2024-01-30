import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import React from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import { CategoryServiceFaq } from '../../interfaces/category.interface';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  formData: any;
  callback: (...args: any[]) => any;
};

function CategoriesServicesFaqEditPopup({
  openFormDialog,
  setOpenFormDialog,
  formData,
  callback,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
            <span className="Title">Edit FAQ</span>
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
                    value: formData.question,
                  })}
                />
                {errors.question && (
                  <span role="alert">{errors.question?.message}</span>
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Answer</label>
                <TextareaAutosize
                  className="FormTextarea"
                  id="outlined-multiline-static"
                  minRows={5}
                  maxRows={15}
                  defaultValue=""
                  placeholder="Write answer here..."
                  {...register('answer', {
                    required: 'Answer is required',
                    value: formData.answer,
                  })}
                />
                {errors.answer && (
                  <span role="alert">{errors.answer?.message}</span>
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
              value="Update"
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

export default CategoriesServicesFaqEditPopup;
