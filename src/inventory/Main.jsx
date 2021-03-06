import React from 'react';

import './Components/assets/css/Main.css';

import Char from './Components/Char';
import Inv from './Components/Inv';
import FastAccess from './Components/FastAccess';

function Main({ items, currentWeight, maxWeight }) {
   const arrays = items.$values;
   const enabled = arrays.filter((element) => element.Enabled); // предметы одетые/быстрого доступа
   const invItems = arrays.filter((element) => !element.Enabled); // предметы которые пойдут в основной инвентарь

   const charItems = enabled.filter((item) => item.PosNumber <= 8);
   const fastItems = enabled.filter((item) => item.PosNumber >= 9);

   return (
      <div className="wrapper" id="wrapper">
         <div className="drop-up"></div>
         <Char items={charItems} />
         <Inv items={invItems} currentWeight={currentWeight} maxWeight={maxWeight} />
         <div className="down">
            <FastAccess items={fastItems} />
            <div className="drop-down"></div>
         </div>
      </div>
   );
}

export default Main;
