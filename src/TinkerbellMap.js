import { InfoOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, Stack } from "@mui/material";
import * as React from "react";

const TinkerbellMap = () => {
  
  const handleInfoClick = () => {
    window.open("https://en.wikipedia.org/wiki/Tinkerbell_map", "_blank");
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
        
      </Box>
    </>
  );
  
  
}

export default TinkerbellMap;
