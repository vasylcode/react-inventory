import React from 'react';
import './assets/css/FastAccess.css';
import UploadIcon from './Inv/UploadIcon';

// функция подготовки масива к рендеру, исходя из дефолтного массива, который передается из Main.jsx
function createArrayToRender(array) {
   const defaultFastSize = 4; // стандартный размер быстрого меню
   const defaultChatSize = 8; // стандартный размер персонажа
   let newArray = Array.from(Array(defaultFastSize)); // создаем новый массив с пустыми клетками который будем возвращать
   array.filter(
      (item) => (newArray[item.PosNumber - (defaultChatSize + 1)] = [item.Name, item.Info]),
   ); // с помощью фильтра перебираем массив и вставляем данные из array в newArray
   return newArray;
}

function FastAccess({ items }) {
   return (
      <div className="fastAccess">
         <div className="fast-text">Быстрый доступ</div>
         <div className="fast-block">
            {
               // рендер созданного массива с помощью map метода
               createArrayToRender(items).map((name, index) => (
                  <div
                     className="fast-item"
                     data-pos={index + 9}
                     data-type="fast"
                     key={`${name}_${index}`}>
                     {!!name ? <UploadIcon name={name[0]} desc={name[1]} /> : false}
                  </div>
               ))
            }
         </div>
      </div>
   );
}

export default FastAccess;
