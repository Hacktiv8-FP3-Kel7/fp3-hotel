import * as React from 'react';
import DateField, { DateFieldProps } from './date-field';
import SubmitField, { SubmitFieldProps } from './submit-field';
import TextField, { TextFieldProps } from './text-field';

export default function Input(props: SubmitFieldProps | TextFieldProps | DateFieldProps) {
  switch (props.type) {
    case 'submit':
      return <SubmitField {...props} />;
    case 'date':
      return <DateField {...props} />;
    default:
      return <TextField {...props} />;
  }
}
