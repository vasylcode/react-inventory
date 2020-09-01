import React from 'react';
import UploadIcon from '../Inv/UploadIcon';

let numMap;

function Submenu({ num, array }) {
   if (num === array.length) {
      numMap = Array.from(Array(num));
   } else {
      numMap = Array.from(Array(array.length));
   }
   return (
      <div className="submenu-items">
         {numMap.map((_, index) => (
            <div className="submenu-item" key={index}>
               {/* {array[index]} */}
               {<UploadIcon name={array[index]} />}
            </div>
         ))}
      </div>
   );
}

export default Submenu;
