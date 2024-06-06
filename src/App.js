import * as React from 'react';
import { CustomBox } from './layouts/CustomBox';
import { CollatzConjecture } from './elements/CollatzConjecture';
import { KaperkarConstant } from './elements/KaperkarConstant';
import { TinkerbellMap } from './elements/TinkerbellMap';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Stack } from '@mui/material';
import { SettingsDrawer } from './elements/DrawerSettings';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState("light");

  // Create a light theme
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      // define your light mode palette here
    },
  });

  // Create a dark theme
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#ce93d8',
      },
    },
  });

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const items = [
    {
      title: "TinkerBell Map",
      infoLink: "https://en.wikipedia.org/wiki/Tinkerbell_map",
      component: <TinkerbellMap />,
    },
    {
      title: "Collatz Conjecture",
      infoLink: "https://en.wikipedia.org/wiki/Collatz_conjecture",
      component: <CollatzConjecture />,
    },
    {
      title: "Kaprekar's Constant",
      infoLink: "https://en.wikipedia.org/wiki/6174",
      component: <KaperkarConstant />,
    },
  ];

  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <Stack>
          <Stack direction="row-reverse">
            <IconButton onClick={toggleDrawer(true)} sx={{ color: theme === "light" ? lightTheme.palette.main : darkTheme.palette.primary.main }}>
              <SettingsIcon />
            </IconButton>
          </Stack>

          <SettingsDrawer
            open={open}
            toggleDrawer={toggleDrawer}
            theme={theme}
            setTheme={setTheme}
          />

          {items.map((item, index) => (
            <CustomBox key={index} title={item.title} infoLink={item.infoLink}>
              {item.component}
            </CustomBox>
          ))}
        </Stack>
      </ThemeProvider>
    </>
  );
}

export default App;
