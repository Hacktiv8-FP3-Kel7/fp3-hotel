import * as React from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const useYupValidationResolver = (validationSchema: any) =>
  yupResolver(validationSchema);

export default useYupValidationResolver;
