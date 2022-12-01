export type InputType = 'normal' | 'text' | 'password' | 'phone' | 'numeric' | 'submit' | 'date';

export interface InputProps {
  type: InputType;
  name: string;
}
