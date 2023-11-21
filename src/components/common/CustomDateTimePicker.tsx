// import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

// type Props = {
//     register?: any;
//     id?: any;
//     error?: any;
//     inputTitle?: string;
//     label?: string;
//     notRequired?: boolean;
//     setValue?: any;
// }

// const CustomDateTimePicker = ({ setValue, register, id, error, inputTitle, label, notRequired }: Props) => {
//     console.log("reqq", notRequired, error);

//     const handleChange = (date: any) => {
//         setValue(id, date.format('YYYY-MM-DD HH:mm:ss'), { shouldValidate: true });
//     }

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
//                 <DateTimePicker
//                     onChange={handleChange}
//                     // {...register(id, { required: notRequired ? false : 'Date and time are required' })}
//                     label="With Time Clock"
//                     viewRenderers={{
//                         hours: renderTimeViewClock,
//                         minutes: renderTimeViewClock,
//                         seconds: renderTimeViewClock,
//                     }}
//                 />
//             </DemoContainer>
//             {error && <span className='text-sm' role="alert">*{error.message}</span>}
//         </LocalizationProvider>
//     );
// }

// export default CustomDateTimePicker;