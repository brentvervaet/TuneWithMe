import { useFormContext } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

export default function SelectList({
  label, name, placeholder , validationRules, defaultValue,items,...rest
}) {
  const {
    register,
    formState: {
      errors,
      isSubmitting,
    },
  } = useFormContext();

  const hasError = name in errors;
  const message = hasError ? errors[name].message : '';

  return (
    <FormControl fullWidth margin="normal" error={hasError} disabled={isSubmitting}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        {...register(name, validationRules)}
        label={label}
        defaultValue={defaultValue}
        {...rest}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {items.map(({id,type}) => (
          <MenuItem key={id} value={type}>{type}</MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText>{message}</FormHelperText>}
    </FormControl>
  );
}