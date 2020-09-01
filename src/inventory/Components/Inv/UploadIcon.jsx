import React from 'react';

function UploadIcon({ name }) {
   return <img className="inv-icon" src={require(`../assets/img/${name}.png`)} alt={name} />;
}

export default UploadIcon;
