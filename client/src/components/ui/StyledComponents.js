import styled from '@emotion/styled';
import { TextField, Select, Button } from '@mui/material';

export const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #191c1f;
      placeholder: #8793a2;
      transition: all 0.3s ease-in-out;
      color: #8793a2;
    }
    &:hover fieldset {
      border-color: #8793a2;
      color: #8793a2;
    }
    &.Mui-focused fieldset {
      border-color: #8793a2;
      color: #8793a2;
    }
  }
  .MuiFormLabel-root {
    color: #8793a2;
  }
`;

export const StyledSelect = styled(Select)`
  &.Select--multi {
    .Select-value {
      display: inline-flex;
      align-items: center;
    }
  }

  & .Select-placeholder {
    font-size: smaller;
  }

  & .MuiSelect-icon {
    color: #8793a2;
  }
`;

export const StyledButton = styled(Button)`
  font-white: 'bold';
  transition: all 0.4s ease-in-out;
  box-shadow: 1px 1px 1px #000000 0.5;
`;
