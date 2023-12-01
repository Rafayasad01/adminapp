import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Controller } from 'react-hook-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

type Props = {
    customClassInputTitle?: string;
    inputTitle: string;
    customWidth?: string;
    options?: any;
    register?: any;
    control?: any;
    id?: any;
    value?: string;
    error?: any;
    validateRequired?: any;
    setValue?: any
    callback: (...args: any[]) => any;
}

const CustomMultipleSelectBox = ({ callback, setValue, customClassInputTitle, control, id, value, error, validateRequired, inputTitle, customWidth, options, register, }: Props) => {
    console.log("optionsss", options);
    return (
        <div>
            <div className="" style={{ paddingBottom: '3px' }}>
                <span className={`FormLabel ${customClassInputTitle}`}>{inputTitle}</span>
            </div>
            <Controller
                name={id}
                control={control}
                defaultValue={options?.role ? options.role?.map((role: any) => role) : []}
                rules={
                    validateRequired
                        ? {
                            validate: (value) => {

                                return value.length > 0 || 'Select an option';
                            },
                        }
                        : {}
                }
                render={({ field, fieldState }) => (
                    <>
                        <Select
                            variant="outlined"
                            style={{ border: '1px solid rgb(201, 201, 201)' }}
                            className={`fixed-height ${customWidth ? customWidth : "w-[100%]"} `}
                            labelId="demo-simple-select-label"
                            multiple
                            displayEmpty
                            id={id}
                            {...field}
                            onChange={(event) => {
                                field.onChange(event);
                                callback && callback(event);
                            }}
                            input={<OutlinedInput label="Name" />}
                            renderValue={(selected) => {
                                if (selected?.length === 0) {
                                    return <span>{'-- Select Services --'}</span>;
                                }
                                return selected?.map((selectedId: any) =>
                                    options?.roles?.find((item: any) => item.id === selectedId)?.name
                                ).join(', ');
                            }}
                            MenuProps={MenuProps}
                        >
                            <MenuItem disabled value="">
                                <em>-- Select Services --</em>
                            </MenuItem>
                            {/* <MenuItem value={[]}>-- Select Services --</MenuItem> */}
                            {options?.roles?.map((item: any, index: number) => (
                                <MenuItem key={index} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {fieldState.error && (
                            <p style={{ color: 'red', fontSize: '12px' }}>
                                *{fieldState.error.message}
                            </p>
                        )}
                    </>
                )}
            />
        </div>
    );
}

export default CustomMultipleSelectBox;