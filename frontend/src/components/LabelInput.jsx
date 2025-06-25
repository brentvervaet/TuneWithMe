import { FormControl, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
export default function LabelInput ({
  label,
  name,
  type,
  validationRules,
  multiLine = false,
  rows =1,
  ...rest
}){
  const {
    register,
    formState: { errors,isSubmitting },
  } = useFormContext();

  const hasError = name in errors;

  return (
    <FormControl fullWidth margin="normal">
      <TextField
        {...rest}
        {...register(name,validationRules)}
        id={name}
        type={type}
        label={label}
        variant="outlined"
        disabled={isSubmitting}
        error={!!errors[name]}
        helperText={hasError ? errors[name].message : ''}
        multiline={multiLine}
        rows={rows}
        {...(hasError && { 'data-cy': `label_error_${name}` })}

      />
    </FormControl>
  );
}