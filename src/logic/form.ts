export interface IForm {
  values: any;
  errors?: any;
  touched?: any;
  handleChange?: (e: any) => void;
  handleBlur?: (e: any) => void;
  setFieldValue?: any;
  isSubmitting?: boolean;
  getFieldProps?: any;
}
