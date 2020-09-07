import React from 'react';
import UploadIcon from '../Inv/UploadIcon';

let numMap;

function Submenu({ num, array, desc }) {
   numMap = Array.from(Array(num));
   return (
      <div className="submenu-items">
         {numMap.map((_, index) => (
            <div className="submenu-item" key={index} data-type="submenu">
               {/* {array[index]} */}
               {!!array[index] ? <UploadIcon name={array[index]} desc={desc} /> : false}
            </div>
         ))}
      </div>
   );
}

export default Submenu;
