import * as React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {
  return (
    <>
      <Box
        m={2}
        pt={3}
        paddingX={5}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          'border': '1px solid'
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant='h2'>
          Kaprekar constant
        </Typography>
        <p>
        Kaprekar constant, or 6174, is a constant that arises when we take a 4-digit integer, form the largest and smallest numbers from its digits, and then subtract these two numbers. Continuing with this process of forming and subtracting, we will always arrive at the number 6174.
        </p>
        
        <p>Try it yourself</p>
        <TextField
          required
          id="outlined-required"
          label="Enter a Value"
          defaultValue="6147"
          type='number'
        />
        <Button variant="outlined">Outlined</Button>
        
      </Box>      
    </>
  );
}

export default App;
