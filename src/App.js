import * as React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function App() {
  
  const [numberVal, setNumberVal] = useState("");
  const [error, setError] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [operations, setOperations] = useState([]);

  
  // Kaprekar Constant function
  const kaprekar_function = (value, operations = []) => {
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
    
    operations.push(`${numberHigh} - ${numberLower} = ${output}`);
  
    // Check if the output is the constant
    if (output === '6174') {
      return operations;
    }

    // Safety in case infinite loop occurs
    if (operations.length >= 200) {
      console.log('Operations limit reached. Kaperkar Constant does not exist.');
      return ['Operation Limit Reached'];

    }

     // Else return to the function
      return kaprekar_function(output, operations);
  };
  
  
  // Calculate the Kaprekar value show how to arrive there
  const calculateValue = () => {
    
    //Clearing any errors
    setErrorStatus(false);
    setError("");
    
    if (numberVal.length !== 4) {
      setErrorStatus(true);
      setError("Number must be four digits");
      return;
    }
    
    var kaprekarOps = kaprekar_function(numberVal);
    
    if (kaprekarOps[0] === 'Operation Limit Reached') {
      setErrorStatus(true);
      setError("Kaperkar value does not exist for that number.");
    }
    
    setOperations(kaprekarOps);    
  };
  
  const KapOperationsList = () => {
    
    return (
      <List>
        {operations.map((item, idx) => 
          <ListItem key={idx}>
            <ListItemText
              primary={item}
            />
          </ListItem>
        )}
      </List>
    )
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
          Kaprekar Constant
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
          <Button variant="outlined" onClick={() => calculateValue()}>Outlined</Button>
          
        </Stack>
        
        {operations.length ? (
          <>
            <Typography variant="subtitle1" >Operations:</Typography>
            <KapOperationsList />
          </>

        ) : (<></>)}
        
      </Box>      
    </>
  );
}

export default App;
