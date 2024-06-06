import * as React from 'react';
import Box from '@mui/material/Box';
import { ToggleButton, Stack } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';

export const SettingsDrawer = (props) => {

  const toggleTheme = () => {
    props.setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <>
      <Drawer open={props.open} onClose={props.toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <Stack spacing={2} padding={2}>
            <ToggleButton
              value="Theme"
              onClick={toggleTheme}
            >
              {props.theme === "light" ? <ModeNightIcon /> : <LightModeIcon/>}
              {props.theme === "light" ? "Dark" : "Light"}
            </ToggleButton>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};