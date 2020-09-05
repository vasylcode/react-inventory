import React from 'react';
import UploadIcon from '../Inv/UploadIcon';

let numMap;

function Submenu({ num, array }) {
   numMap = Array.from(Array(num));
   return (
      <div className="submenu">
         <div className="submenu-items">
            {numMap.map((_, index) => (
               <div className="submenu-item" key={index}>
                  {/* {array[index]} */}
                  {!!array[index] ? <UploadIcon name={array[index]} /> : false}
               </div>
            ))}
         </div>
      </div>
   );
}

export default Submenu;
