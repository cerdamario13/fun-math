import * as React from 'react';
import {
  Alert,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Box from '@mui/material/Box';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { collatz_func } from '../maths/functions';
import { useTheme } from '@mui/material/styles';

export const CollatzConjecture = () => {

  const [numberVal, setNumberVal] = React.useState("");
  const [error, setError] = React.useState("");
  const [errorStatus, setErrorStatus] = React.useState(false);
  const [plotData, setPlotData] = React.useState([{}]);
  const [showPlot, setShowPlot] = React.useState(false);
  const theme = useTheme();
  
    
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

  return (
    <>
        <Typography paragraph sx={{ color: theme.palette.text.primary }}>
          The Collatz Conjecture is a mathematical puzzle that involves starting with any positive whole number and following a specific set of rules until you reach the number 1.
        </Typography>
        <Typography sx={{ color: theme.palette.text.primary }}>Here's how it works:</Typography>
        <Box component="ol" sx={{ color: theme.palette.text.primary }}>
          <li>Start with any positive whole number.</li>
          <li>If the number is even, divide it by 2.</li>
          <li>If the number is odd, multiply it by 3 and add 1.</li>
          <li>Take the resulting number and repeat the process, applying the same rules.</li>
        </Box>
        <Typography sx={{ color: theme.palette.text.primary }}>The goal is to keep applying these rules to the resulting numbers until you eventually reach 1. The conjecture states that, no matter which positive whole number you start with, you will always eventually reach 1.</Typography>
        
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
    </>
  );

}