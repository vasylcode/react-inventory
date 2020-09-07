import React from 'react';
import './assets/css/Inv.css';

import Submenu from './Inv/Submenu';
import UploadIcon from './Inv/UploadIcon';

// функция поиска неймов предметов в массиве array по айди в массиве values, возвращает массив с именами
function findSubmenuItems(array, values) {
   let newArray = values.map(
      (_, index) => array.find((item) => item.PosNumber === values[index]).Name,
   );
   return newArray;
}

// функция подготовки масива к рендеру, исходя из дефолтного массива, который передается из Main.jsx
function createArrayToRender(array) {
   const defaultInvSize = 40; // дефолт размер инвентаря
   let tempArray = array.filter((item) => item.PackegeID < 0); // фильтрируем дефолтный массив на PackegeID чтобы откинуть предметы-вложения
   let newArray = Array.from(Array(defaultInvSize)); // создаем новый массив с пустыми клетками который будем возвращать
   tempArray.filter(
      (item) =>
         (newArray[item.PosNumber - 1] = [
            item.Name,
            item.Info,
            item.Package,
            item.PackegeCount,
            item.PackegeList.$values.length !== 0
               ? findSubmenuItems(array, item.PackegeList.$values)
               : [],
         ]),
   ); // с помощью фильтра перебираем массив и вставляем данные из tempArray в newArray
   return newArray;
}

function Inv({ items }) {
   return (
      <div className="inv">
         <div className="inv-header">
            <div className="header-name"></div>
            <div className="header-desc"></div>
            <div className="header-info">
               <div className="info-text">Инвентарь</div>
               <div className="info-count">
                  <span>4</span>/40
               </div>
            </div>
         </div>
         <div className="inv-inventory">
            {
               // Рендер созданного массива с помощью map метода
               createArrayToRender(items).map((name, index) => (
                  <React.Fragment key={`${name}_${index}`}>
                     <div
                        className="inventory-block"
                        key={`${name}_${index}`}
                        data-pos={index + 1}
                        data-type="inv">
                        {/* {!!name ? name[0] : false} */}
                        {!!name ? <UploadIcon name={name[0]} desc={name[1]} /> : false}
                        {!!name && name[2] ? (
                           <Submenu num={name[3]} array={name[4]} desc={name[1]} />
                        ) : (
                           false
                        )}
                     </div>
                  </React.Fragment>
               ))
            }
         </div>
      </div>
   );
}

export default Inv;
