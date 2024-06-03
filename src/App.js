import * as React from 'react';
import { CustomBox } from './layouts/CustomBox';
import { CollatzConjecture } from './elements/CollatzConjecture';
import { KaperkarConstant } from './elements/KaperkarConstant';
import { TinkerbellMap } from './elements/TinkerbellMap';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Stack } from '@mui/material';
import { SettingsDrawer } from './elements/DrawerSettings';

function App() {

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const items = [
    {title: "TinkerBell Map", infoLink: "https://en.wikipedia.org/wiki/Tinkerbell_map", component: <TinkerbellMap />},
    {title: "Collatz Conjecture", infoLink: "https://en.wikipedia.org/wiki/Collatz_conjecture", component: <CollatzConjecture />},
    {title: "Kaprekar's Constant", infoLink: "https://en.wikipedia.org/wiki/6174", component: <KaperkarConstant />}
  ];

    
  return (
    <>
      <Stack>
        <Stack direction="row-reverse">
          <IconButton onClick={toggleDrawer(true)}>
            <SettingsIcon/>
          </IconButton>
        </Stack>

        <SettingsDrawer open={open} toggleDrawer={toggleDrawer} />
        

        {items.map((item, index) => (
          <CustomBox key={index} title={item.title} infoLink={item.infoLink}>
            {item.component}
          </CustomBox>
        ))}
      </Stack>
    </>
  );
  
}

export default App;
