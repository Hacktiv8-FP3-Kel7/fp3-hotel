import * as React from 'react';
import SubmitField, { SubmitFieldProps } from './submit-field';
import TextField, { TextFieldProps } from './text-field';

export default function Input(props: SubmitFieldProps | TextFieldProps) {
  switch (props.type) {
    case 'submit':
      return <SubmitField {...props} />;

    default:
      return <TextField {...props} />;
  }
}
