import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"


const CollatzConjecture = () => {
  
  const [numberVal, setNumberVal] = useState("");
  
  const [plotData, setPlotData] = useState([{}]);
  const [showPlot, setShowPlot] = useState(false);
  
  
  //Collatz Conjecture recursive function
  const collatz_func = (value, operations = []) => {
    
    var valueNum = Number(value);
    
    //break the function if the value is 1
    if (valueNum == 1) {
      operations.push(value);
      return operations;
    }
    
    if (valueNum % 2 == 0) {
      //Even result
      operations.push(valueNum);
      return collatz_func(valueNum / 2, operations);
      
    } else {
      // Odd result
      operations.push(valueNum);
      return collatz_func( (3 * valueNum) + 1, operations );
    }
    
  }
  
  const calculateValue = () => {
    
    var CollatzOps = collatz_func(numberVal);
    setShowPlot(true);
    
    //set the plotting data
    var iterations = [];
    for (var i=0; i<=CollatzOps.length; i++) {
      iterations.push(
        {"value": CollatzOps[i]}
      )
    }
    setPlotData(iterations);
  };
  
  
  const clearOperations = () => {
    setNumberVal("");
    setPlotData({});
    setShowPlot(false);
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
          Collatz Conjecture
        </Typography>
        <p>
          The Collatz conjecture is one of the most famous unsolved problems in mathematics. The conjecture asks whether repeating two simple arithmetic operations will eventually transform every positive integer into 1. It concerns sequences of integers in which each term is obtained from the previous term as follows: if the previous term is even, the next term is one half of the previous term. If the previous term is odd, the next term is 3 times the previous term plus 1. The conjecture is that these sequences always reach 1, no matter which positive integer is chosen to start the sequence.
        </p>
        
        <Stack
          spacing={2} direction="row">
          <TextField
            InputLabelProps={{ shrink: true }}
            id='inputNumber'
            label="Enter a Value"
            value={numberVal}
            type='number'
            onChange={(event) => setNumberVal(event.target.value)}
          />
          <Button variant='outlined' onClick={() => calculateValue()}>Plot</Button>
          <Button variant='outlined' onClick={() => clearOperations()}>Clear</Button>
        </Stack>
        
        <Stack spacing={2}>
          {showPlot ? (
            
            <LineChart width={1000} height={350} data={plotData}>
            <Line type="monotone" dataKey={"value"} stroke="#2196F3" strokeWidth={3}></Line>
            <CartesianGrid stroke="#ccc"></CartesianGrid>
            <XAxis dataKey="value"></XAxis>
            <YAxis></YAxis>
            <Tooltip></Tooltip>
            <Legend></Legend>
          </LineChart>
          ) : (
            <></>
          )}
                    
        </Stack>
        
      </Box>
    </>
  );
  
}

export default CollatzConjecture;