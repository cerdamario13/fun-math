import * as React from 'react';
import { CustomBox } from './layouts/CustomBox';
import { CollatzConjecture } from './elements/CollatzConjecture';
import { KaperkarConstant } from './elements/KaperkarConstant';
import { TinkerbellMap } from './elements/TinkerbellMap';

function App() {

  const items = [
    {title: "TinkerBell Map", infoLink: "https://en.wikipedia.org/wiki/Tinkerbell_map", component: <TinkerbellMap />},
    {title: "Collatz Conjecture", infoLink: "https://en.wikipedia.org/wiki/Collatz_conjecture", component: <CollatzConjecture />},
    {title: "Kaprekar's Constant", infoLink: "https://en.wikipedia.org/wiki/6174", component: <KaperkarConstant />}
  ];
  
  return (
    <>
      {items.map((item, index) => (
        <CustomBox key={index} title={item.title} infoLink={item.infoLink}>
          {item.component}
        </CustomBox>
      ))}
    </>
  );
  
}

export default App;
