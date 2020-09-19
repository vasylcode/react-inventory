import React from 'react';
import UploadIcon from '../Inv/UploadIcon';

let numMap;

function Submenu({ num, array, desc, object }) {
   numMap = Array.from(Array(num));
   return (
      <div className="submenu-items">
         {numMap.map((_, index) => (
            <div className="submenu-item" key={index} data-type="submenu">
               {/* {array[index]} */}
               {!!array[index] ? (
                  <UploadIcon name={array[index][0]} desc={desc} object={array[index][1]} />
               ) : (
                  false
               )}
            </div>
         ))}
      </div>
   );
}

export default Submenu;
