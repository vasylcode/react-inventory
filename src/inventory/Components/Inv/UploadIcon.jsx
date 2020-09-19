import React from 'react';

function UploadIcon({ name, desc, object }) {
   return (
      <img
         className="inv-icon"
         src={require(`../assets/img/${name}.png`)}
         alt={name}
         data-name={name}
         data-desc={desc}
         data-object={object}
      />
   );
}

export default UploadIcon;
