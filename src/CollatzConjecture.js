import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Alert, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { InfoOutlined } from '@mui/icons-material';


const CollatzConjecture = () => {
  
  const [numberVal, setNumberVal] = useState("");
  const [error, setError] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
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
    
    //clear any errors
    setErrorStatus(false);
    setError("");
    
    //Error if value is empty
    if (numberVal === "") {
      setError("Value cannot be empty");
      setErrorStatus(true);
      return;
    }
    
    if (numberVal <= 0) {
      setError("Value must be greater than 1");
      setErrorStatus(true);
      return;
    }
    
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
    setError("");
    setErrorStatus(false);
  }
  
  const handleInfoClick = () => {
    window.open("https://en.wikipedia.org/wiki/Collatz_conjecture", "_blank");
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
        <Stack direction="row" spacing={2}>
          <Typography variant='h2'>
            Collatz Conjecture
          </Typography>
          
          <IconButton onClick={handleInfoClick}>
            <InfoOutlined />
          </IconButton>          
        </Stack>
        
        <p>
          The Collatz Conjecture is a mathematical puzzle that involves starting with any positive whole number and following a specific set of rules until you reach the number 1.
        </p>
        <p>Here's how it works:</p>
        <ol>
          <li>Start with any positive whole number.</li>
          <li>If the number is even, divide it by 2.</li>
          <li>If the number is odd, multiply it by 3 and add 1.</li>
          <li>Take the resulting number and repeat the process, applying the same rules.</li>
        </ol>
        <p>The goal is to keep applying these rules to the resulting numbers until you eventually reach 1. The conjecture states that, no matter which positive whole number you start with, you will always eventually reach 1.</p>
        
        {errorStatus && <Alert severity='error'>{error}</Alert>}
        
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
          <>
            <Typography variant='subtitle1'>{"Operations: " + plotData.length}</Typography>

            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                width={500}
                height={300}
                data={plotData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                >
                <Line type="monotone" dataKey={"value"} stroke="#2196F3" strokeWidth={3}></Line>
                <CartesianGrid stroke="#ccc"></CartesianGrid>
                <XAxis dataKey="value"></XAxis>
                <YAxis></YAxis>
                <Tooltip></Tooltip>
                <Legend></Legend>
              </LineChart>
            </ResponsiveContainer>
          </>
          ) : (
            <></>
          )}
                    
        </Stack>
        
      </Box>
    </>
  );
  
}

export default CollatzConjecture;