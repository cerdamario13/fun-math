import * as React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

function App() {
  
  const [numberVal, setNumberVal] = useState("");
  const [error, setError] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [kapIterations, setKapIterations] = useState(0);

  // Kaprekar Constant function
  function kaprekar_function(value) {
    // sorting numbers
    let numberValArrayAsc = []
    for (var i=0; i<numberVal.length; i++) {
      numberValArrayAsc = numberValArrayAsc.concat(value[i]);
    }

    numberValArrayAsc.sort();
    var numberValArrayDesc = numberValArrayAsc.map(x=> x).reverse();

    var numberLower = Number(numberValArrayAsc.join(''));
    var numberHigh = Number(numberValArrayDesc.join(''));

    var output = (numberHigh - numberLower).toString();
    
    console.log("Operation: ", `${numberHigh} - ${numberLower} = ${output}`)
    
    setKapIterations(kapIterations + 1);

    // Check if the output is the constant
    if (output === '6174') {
      console.log(output);
      return output
    } else { // Else return to the function
      console.log(output);
      kaprekar_function(output);
    }
  }
  
  // Calculate the Kaprekar value show how to arrive there
  function calculateValue(){
    
    //Clearing any errors
    setErrorStatus(false);
    setError("");
    setKapIterations(0);
    
    if (numberVal.length !== 4) {
      setErrorStatus(true);
      setError("Number must be four digits");
      return;
    }
    
    var kaprekarValue = kaprekar_function(numberVal);
    console.log(kapIterations);
    
    return kaprekarValue
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
        
        {errorStatus && <Alert severity="error">{error}</Alert>}
        
        <p>Try it yourself</p>
        <Stack spacing={2} direction="row">
          <TextField
            error={errorStatus}
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
