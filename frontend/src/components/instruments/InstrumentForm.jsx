// src/components/instruments/InstrumentForm.jsx
import { useNavigate,Link } from 'react-router-dom';
import {IconButton ,Box , Typography } from '@mui/material';
import LabelInput from '../LabelInput';
import SelectList from '../SelectList';
import { FormProvider,useForm } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';
import BlockIcon from '@mui/icons-material/Block';
import AddIcon from '@mui/icons-material/Add';
import { INSTRUMENT_TYPES } from '../../api/mock_data';

const EMPTY_INSTRUMENT = {
  id: undefined,
  name: '',
  type: 'string',
  description: '',
  
};

const instrumentTypes = INSTRUMENT_TYPES;

const validationRules = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 4,
      message: 'Name must be at least 4 characters long',
    },
  },
  type: {
    required: 'Type is required',
    validate: (value) => {
      const allowedTypes = ['string', 'wind', 'percussion','other'];
      if (!allowedTypes.includes(value)) {
        return 'Type must be one of: string, wind, percussion, other';
      }
      return null;
    },
  },
  description: {
    maxLength: {
      value: 200,
      message: 'Description must be less than 200 characters',
    },
  },
  nrOfNotes: {
    required: 'Number of notes is required',
    valueAsNumber: true,
    validate: (value) => {
      if (value <= 0) return 'Number of notes must be greater than 0';
    },
  },
};

export default function InstrumentForm({instrument=EMPTY_INSTRUMENT,saveInstrument}) {

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if (!isValid) return;

    await saveInstrument({
      id: instrument?.id,
      ...values,
      name: values.name.charAt(0).toUpperCase() + values.name.slice(1),
      description: values.description.charAt(0).toUpperCase() + values.description.slice(1),
    }, {
      throwOnError: false,
      onSuccess: () => navigate('/instruments'), 
    });
  };

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      id: instrument?.id,
      name: instrument?.name,
      type: instrument?.type,
      nrOfNotes: instrument?.nrOfNotes,
      description: instrument?.description,
    },
  });
  
  const{
    handleSubmit,
    formState: {isSubmitting,isValid},

  } = methods;

  return (
    <FormProvider {...methods}>
      <Box  component="form" onSubmit={handleSubmit(onSubmit)} 
        sx={{ width: '40%', mb: 3}}>

        {/* name */}
        <LabelInput 
          label="Name"
          name="name"
          type="string"
          validationRules={validationRules.name}
          required
          data-cy="name_input"
        />

        {/* type */}
        <SelectList
          label="Type"
          name="type"
          items = {instrumentTypes}
          placeholder="-- Select a type --"
          validationRules={validationRules.type}
          defaultValue={instrument?.type}
          required
          data-cy="type_input"
        />

        <LabelInput 
          label="Description"
          name="description"
          type="string"
          validationRules={validationRules.description}
          multiLine
          rows={4}
          data-cy="description_input"
        />
      
        {/* nrOfNotes */}
        <LabelInput 
          label="# of Notes"
          name="nrOfNotes"
          type="number"
          validationRules={validationRules.nrOfNotes}
          required
          data-cy="nrOfNotes_input"
        />

        <Typography 
          variant="caption" 
          color="textSecondary" 
          display={'flex'} 
          justifyContent={'center'} 
        >
          Fields marked with * are required
        </Typography>

        {/* buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <IconButton 
            data-cy="submit_instrument"
            type="submit" 
            color="success"
            disabled={isSubmitting}>
            {instrument?.id ? <CheckIcon />:<AddIcon/>} 
          </IconButton>
          <IconButton 
            color="error"
            component={Link} to="/instruments" 
            disabled={isSubmitting}>
            <BlockIcon/>
          </IconButton>
        </Box>
      </Box>
    </FormProvider>
    
  );
}