/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { TextField } from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';

interface IFromInputProps {
  name: string;
  defaultValue: string;
  label: string;
  type: string;
}

const FormInput: FC<IFromInputProps> = ({ name, defaultValue, label, type = 'text' }: IFromInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <TextField
            {...field}
            label={label}
            variant="outlined"
            type={type}
            error={!!errors.email}
            helperText={errors.email ? errors.email?.message : ''}
          />
        );
      }}
    />
  );
};

export default FormInput;
