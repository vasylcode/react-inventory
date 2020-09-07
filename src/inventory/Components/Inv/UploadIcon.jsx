import React from 'react';

function UploadIcon({ name, desc }) {
   return (
      <img
         className="inv-icon"
         src={require(`../assets/img/${name}.png`)}
         alt={name}
         data-name={name}
         data-desc={desc}
      />
   );
}

export default UploadIcon;
