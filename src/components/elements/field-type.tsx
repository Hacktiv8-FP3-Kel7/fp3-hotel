export type InputType = 'normal' | 'text' | 'password' | 'phone' | 'numeric' | 'submit';

export interface InputProps {
  type: InputType;
  name: string;
}
