import * as React from "react";
import { useState } from "react";
import { InfoOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, Stack, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { CartesianGrid, ResponsiveContainer, ScatterChart, XAxis, YAxis, Scatter } from "recharts";

const TinkerbellMap = () => {
  
  const [xValue, setXValue] = useState(-0.72);
  const [yValue, setYValue] = useState(-0.64);
  const [aValue, setAValue] = useState(0.9);
  const [bValue, setBValue] = useState(-0.6013);
  const [cValue, setCValue] = useState(2.0);
  const [dValue, setDValue] = useState(0.50);
  const [iterations, setIterations] = useState(1000);
  const [plotData, setPlotData] = useState([{}]);
  
  const handleInfoClick = () => {
    window.open("https://en.wikipedia.org/wiki/Tinkerbell_map", "_blank");
  };
  
  const dynamicSystem = (x, y, data = [], iter=0) => {
    
    // Define the dynamical system
    var varX = x**2 - y**2 + aValue*x + bValue*y;
    var varY = 2*x*y + cValue*x + dValue*y;
    data.push({'x': varX, 'y': varY});
    
    iter += 1;
    
    if (iter >= iterations) {
      return data
    } else {
      return dynamicSystem(varX, varY, data, iter);
    }
    
  }
  
  const plotPlot = () => {
    
    var data = dynamicSystem(xValue, yValue);
    console.log(data);
    setPlotData(data);
    
  };
  
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
          <Typography variant="h2">
            Tinkerbell Map
          </Typography>
          
          <IconButton onClick={handleInfoClick}>
            <InfoOutlined />
          </IconButton>
        </Stack>
        
        <p>
        In mathematics, a dynamical system is a system in which a function describes the time dependence of a point in an ambient space, such as in a parametric curve.
        The Tinkerbell map is a two-dimensional discrete dynamical system that exhibits chaotic behavior. It is named after its resemblance to the shape of the Tinker Bell fairy from Disney's Peter Pan. The Tinkerbell map is defined by a set of iterative equations that determine the evolution of points in its phase space.
        </p>
                
        <Stack direction="row">
          <TextField
            InputLabelProps={{shrink: true}}
            id="X_Value"
            label="x Value"
            value={xValue}
            type="number"
            onChange={(event) => setXValue(event.target.value)}
          />
          
          <TextField
            InputLabelProps={{shrink: true}}
            id="Y_Value"
            label="y Value"
            value={yValue}
            type="number"
            onChange={(event) => setYValue(event.target.value)}
          />
          
          <TextField
            InputLabelProps={{shrink: true}}
            id="iterations"
            label="Iterations"
            value={iterations}
            type="number"
            onChange={(event) => setIterations(event.target.value)}
          />
        </Stack>
        
        <Stack direction="row">
          <TextField
              InputLabelProps={{shrink: true}}
              id="A_Value"
              label="a Value"
              value={aValue}
              type="number"
              variant="standard"
              onChange={(event) => setAValue(event.target.value)}
            />
            
            <TextField
              InputLabelProps={{shrink: true}}
              id="B_Value"
              label="b Value"
              value={bValue}
              type="number"
              variant="standard"
              onChange={(event) => setBValue(event.target.value)}
            />
        </Stack>
        
        <Stack direction="row">
          <TextField
            InputLabelProps={{shrink: true}}
            id="C_Value"
            label="c Value"
            value={cValue}
            type="number"
            variant="standard"
            onChange={(event) => setCValue(event.target.value)}
          />
          
          <TextField
            InputLabelProps={{shrink: true}}
            id="D_Value"
            label="d Value"
            value={dValue}
            type="number"
            variant="standard"
            onChange={(event) => setDValue(event.target.value)}
          />
        </Stack>
        
        <Stack  spacing={2} direction="row">
          <Button variant="outlined" onClick={() => plotPlot()}>Plot</Button>
          <Button variant="outlined">Clear</Button>
        </Stack>
        
        <Stack spacing={2} >
          
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
            <CartesianGrid />
            <XAxis type="number" dataKey="x"/>
            <YAxis type="number" dataKey="y" />
            <Scatter name="A school" data={plotData} fill="#2196F3" />
          </ScatterChart>                  
        </ResponsiveContainer>
  
        </Stack>
                
      </Box>
    </>
  );
  
  
}

export default TinkerbellMap;
