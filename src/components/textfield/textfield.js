import * as React from 'react';
import { useInput } from '@mui/base';
import { styled } from '@mui/system';


const StyledInputElement = styled('input')(
    ({ theme }) => `
  width: 320px;
  font-size: 1.000rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  line-height: 1.2;
  color:white;
  background: #1976d2;
  border: 1px solid #1976d2;
  border-radius: 8px;
  padding: 12px 12px;
  transition: all 200ms ease;


  &:focus {
    outline:none;
    outline-offset: 2px;
  }
`,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    const { getRootProps, getInputProps } = useInput(props, ref);

    return (
        <div {...getRootProps()}>
            <StyledInputElement {...props} {...getInputProps()} />
        </div>
    );
});

export default CustomInput;