import * as React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';


function App() {
  
  const [numberVal, setNumberVal] = useState("");
  
  // Calculate the Kaprekar value show how to arrive there
  function calculateValue(){
    console.log("Button clicked!");
    console.log(numberVal);
  }
  
  return (
    <>
      <Box
        m={2}
        pt={3}
        paddingX={5}
        paddingY={3}
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
        <Stack spacing={2} direction="row">
          <TextField
            required
            InputLabelProps={{ shrink: true }}
            id="outlined-required"
            label="Enter a Value"
            value={numberVal}
            type='number'
            onChange={(event) => setNumberVal(event.target.value)}
          />
          <Button variant="outlined" onClick={calculateValue}>Outlined</Button>
        </Stack>
                
      </Box>      
    </>
  );
}

export default App;
