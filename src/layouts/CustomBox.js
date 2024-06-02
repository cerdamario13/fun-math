import * as React from 'react';
import Box from '@mui/material/Box';
import { IconButton, Stack, Typography } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

export const CustomBox = (props) => {

  const handleInfoClick = () => {
    window.open(props.infoLink, "_blank");
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
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        border: "1px solid",
      }}
      noValidate
      autoComplete="off"
    >
        <Stack direction="row" spacing={2}>
          <Typography variant='h2'>
            {props.title}
          </Typography>

          <IconButton onClick={handleInfoClick}>
            <InfoOutlined />
          </IconButton>          
        </Stack>

        {props.children}

    </Box>
  </>
);

};
