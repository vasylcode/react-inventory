import React from 'react';
import './assets/css/FastAccess.css';

window.test = function () {
   return 1;
};

// функция подготовки масива к рендеру, исходя из дефолтного массива, который передается из Main.jsx
function createArrayToRender(array) {
   const defaultFastSize = 4; // стандартный размер быстрого меню
   const defaultChatSize = 8; // стандартный размер персонажа
   let newArray = Array.from(Array(defaultFastSize)); // создаем новый массив с пустыми клетками который будем возвращать
   array.filter((item) => (newArray[item.PosNumber - (defaultChatSize + 1)] = item.Name)); // с помощью фильтра перебираем массив и вставляем данные из array в newArray
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
                  <div className="fast-item" key={`${name}_${index}`}>
                     {name}
                  </div>
               ))
            }
         </div>
      </div>
   );
}

export default FastAccess;
