import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import { InfoOutlined } from '@mui/icons-material';

import CollatzConjecture from './CollatzConjecture';


function App() {
  
  const [numberVal, setNumberVal] = useState("");
  const [error, setError] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [operations, setOperations] = useState([]);
  
  const [startValue, setStartValue] = useState(1234);
  const [numberCount, setNumberCount] = useState(100);
  const [plotData, setPlotData] = useState([{}]);
  const [showPlot, setShowPlot] = useState(false);

  
  // Kaprekar Constant function
  const kaprekar_function = (value, operations = []) => {
    // sorting numbers
    let numberValArrayAsc = []
    for (var i=0; i<value.length; i++) {
      numberValArrayAsc = numberValArrayAsc.concat(value[i]);
    }
    numberValArrayAsc.sort();
    var numberValArrayDesc = numberValArrayAsc.map(x=> x).reverse();
           
    var numberLower = Number(numberValArrayAsc.join(''));
    var numberHigh = Number(numberValArrayDesc.join(''));

    if (numberHigh.toString().length === 3) { numberHigh = numberHigh * 10 };

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
  
  //clear the errors and operations
  const clearOperations = () => {
    setErrorStatus(false);
    setError("")
    setOperations([]);
    setNumberVal("");
    return;
  }
  
  // Calculate the Kaprekar value show how to arrive there
  const calculateValue = () => {
    
    //Clearing any errors
    setErrorStatus(false);
    setError("");

    //Check that at least two digits are different
    var diffCheck = [];
    for (var i=0; i<numberVal.toString().length; i++) {
      if (!diffCheck.includes(numberVal.toString()[i])){
        diffCheck.push(numberVal.toString()[i]);
      }
    }
    
    if (diffCheck.length < 2) {
      setErrorStatus(true);
      setError("At least two digits must be different. Leading zeros are okay");
      return;
    }

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
  };

  const plotRange = () => {
    
    var numbersToAdd = startValue;
    var numberIterations = [];
    // var numberValues = [];
    for (var i=0; i<=numberCount; i++) {
      var values = numbersToAdd++;
      
      //Try and calculate kaprekar value or return 0
      try{
        numberIterations.push(
          {"value": values, "iterations": kaprekar_function(values.toString()).length}
          );
        // numberValues.push(values);
        // numberIterations.push(kaprekar_function(values.toString()).length);       
      } catch {
        numberIterations.push([values, 0]);
        // numberValues.push(values);
        // numberIterations.push(0);
      }
    };
    setPlotData(numberIterations);   
    setShowPlot(true); 
  }

  const clearRangePlot = () => {
    setPlotData([{}]);
    setShowPlot(false);
  }
  
  const handleInfoClick = () => {
    window.open("https://en.wikipedia.org/wiki/6174", "_blank");
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
            Kaprekar Constant
          </Typography>
          
          <IconButton onClick={handleInfoClick}>
            <InfoOutlined />
          </IconButton> 
        </Stack>
        
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
            id="inputNumber"
            label="Enter a Value"
            value={numberVal}
            type='number'
            onChange={(event) => setNumberVal(event.target.value)}
          />
          <Button variant="outlined" onClick={() => calculateValue()}>Calculate</Button>
          <Button variant="outlined" onClick={() => clearOperations()}>Clear</Button>
          
        </Stack>
        
        {operations.length ? (
          <>
            <Typography variant="subtitle1" >Operations:</Typography>
            <KapOperationsList />
          </>

        ) : (<></>)}
        
        <Stack spacing={2} paddingTop='20px'>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              >
                <Typography variant="h6">
                  Plot a range
                </Typography>

            </AccordionSummary>
            <AccordionDetails>

            <p>Enter a range of numbers to see the Kaprekar number of iterations</p>

              <Stack spacing={2} direction="row">
                <TextField
                  required
                  InputLabelProps={{ shrink: true }}
                  id="startNumber"
                  label="Start Value"
                  value={startValue}
                  type='number'
                  onChange={(event) => setStartValue(event.target.value)}
                  style={{width: '100px'}}
                />
                <TextField 
                  required
                  InputLabelProps={{ shrink: true }}
                  id="numbersToAdd"
                  label="Number Count"
                  type="number"
                  value={numberCount}
                  onChange={(event) => setNumberCount(event.target.value)}
                  style={{width: '150px'}}
                />
                <Button variant='outlined' onClick={() => plotRange()} >Plot Range</Button>
                <Button variant='outlined' onClick={() => clearRangePlot()} >Clear Plot</Button>
              </Stack>

              <Stack spacing={2}>

                {showPlot ? (
                    <LineChart width={1000} height={350} data={plotData}>
                      <Line type="monotone" dataKey={"iterations"} stroke="#2196F3" strokeWidth={3}></Line>
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

            </AccordionDetails>
          </Accordion>

        </Stack>



      </Box>
      
      <CollatzConjecture />
      
    </>
  );
}

export default App;
