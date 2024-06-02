import * as React from "react";
import { useState } from "react";
import { Stack, TextField, Alert } from "@mui/material";
import Button from "@mui/material/Button";
import {
  CartesianGrid,
  ResponsiveContainer,
  ScatterChart,
  XAxis,
  YAxis,
  Scatter,
  ZAxis,
} from "recharts";

export const TinkerbellMap = () => {
  const [xValue, setXValue] = useState(-0.72);
  const [yValue, setYValue] = useState(-0.64);
  const [aValue, setAValue] = useState(0.9);
  const [bValue, setBValue] = useState(-0.6013);
  const [cValue, setCValue] = useState(2.0);
  const [dValue, setDValue] = useState(0.5);
  const [iterations, setIterations] = useState(1000);
  const [plotData, setPlotData] = useState([{}]);
  const [showPlot, setShowPlot] = useState(false);

  const [error, setError] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);

  const handleInfoClick = () => {
    window.open("https://en.wikipedia.org/wiki/Tinkerbell_map", "_blank");
  };

  const dynamicSystem = (x, y) => {
    var data = [];
    var iter = 0;

    while (iter < iterations) {
      var varX = x ** 2 - y ** 2 + aValue * x + bValue * y;
      var varY = 2 * x * y + cValue * x + dValue * y;

      data.push({ x: varX, y: varY });

      x = varX;
      y = varY;
      iter += 1;
    }

    return data;
  };

  const plotPlot = () => {
    //clear any errors
    setErrorStatus(false);
    setError("");

    // Check that iterations are 0 < X <= 10000
    if (iterations <= 0 || iterations >= 10001) {
      setError("Values must be greater than 0 and less than 10,000");
      setErrorStatus(true);
      return;
    }

    var data = dynamicSystem(xValue, yValue);
    console.log(data);
    setPlotData(data);
    setShowPlot(true);
  };

  const clearPlot = () => {
    //clear all errors
    setError("");
    setErrorStatus(false);
    setPlotData({});
    //Setting all of the values back to starting points
    setXValue(-0.72);
    setYValue(-0.64);
    setAValue(0.9);
    setBValue(-0.6013);
    setCValue(2.0);
    setDValue(0.5);
    setIterations(1000);
    setShowPlot(false);
    window.location.reload(false);
  };

  return (
    <>
      <p>
        In mathematics, a dynamical system is a system in which a function
        describes the time dependence of a point in an ambient space, such as in
        a parametric curve. The Tinkerbell map is a two-dimensional discrete
        dynamical system that exhibits chaotic behavior. It is named after its
        resemblance to the shape of the Tinker Bell fairy from Disney's Peter
        Pan. The Tinkerbell map is defined by a set of iterative equations that
        determine the evolution of points in its phase space.
      </p>

      {errorStatus && <Alert severity="error">{error}</Alert>}

      <Stack direction="row">
        <TextField
          InputLabelProps={{ shrink: true }}
          id="X_Value"
          label="x Value"
          value={xValue}
          type="number"
          onChange={(event) => setXValue(event.target.value)}
        />

        <TextField
          InputLabelProps={{ shrink: true }}
          id="Y_Value"
          label="y Value"
          value={yValue}
          type="number"
          onChange={(event) => setYValue(event.target.value)}
        />

        <TextField
          InputLabelProps={{ shrink: true }}
          id="iterations"
          label="Iterations"
          value={iterations}
          type="number"
          onChange={(event) => setIterations(event.target.value)}
        />
      </Stack>

      <Stack direction="row">
        <TextField
          InputLabelProps={{ shrink: true }}
          id="A_Value"
          label="a Value"
          value={aValue}
          type="number"
          variant="standard"
          onChange={(event) => setAValue(event.target.value)}
        />

        <TextField
          InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
          id="C_Value"
          label="c Value"
          value={cValue}
          type="number"
          variant="standard"
          onChange={(event) => setCValue(event.target.value)}
        />

        <TextField
          InputLabelProps={{ shrink: true }}
          id="D_Value"
          label="d Value"
          value={dValue}
          type="number"
          variant="standard"
          onChange={(event) => setDValue(event.target.value)}
        />
      </Stack>

      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={() => plotPlot()}>
          Plot
        </Button>
        <Button variant="outlined" onClick={() => clearPlot()}>
          Clear
        </Button>
      </Stack>

      <Stack spacing={2}>
        {showPlot ? (
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
              <XAxis type="number" dataKey="x" />
              <YAxis type="number" dataKey="y" />
              <ZAxis type="number" range={[8]} />
              <Scatter name="A school" data={plotData} fill="#2196F3" />
            </ScatterChart>
          </ResponsiveContainer>
        ) : (
          <></>
        )}
      </Stack>
    </>
  );
};
