import React from 'react';
import './assets/css/Char.css';
import char from './assets/img/char.png';

const classes = ['hat', 'glasses', 'shirt', 'vest', 'ring', 'shorts', 'hand', 'shoes'];

// функция подготовки масива к рендеру, исходя из дефолтного массива, который передается из Main.jsx
function createArrayToRender(array) {
   const defaultChatSize = 8; // стандартный размер персонажа
   let newArray = Array.from(Array(defaultChatSize)); // создаем новый массив с пустыми клетками который будем возвращать
   array.filter((item) => (newArray[item.PosNumber - 1] = item.Name)); // с помощью фильтра перебираем массив и вставляем данные из array в newArray
   return newArray;
}

function Char({ items }) {
   return (
      <div className="char">
         <div className="char-img">
            <img src={char} alt="" />
         </div>
         {createArrayToRender(items).map((item, index) => (
            <div className={`item-${classes[index]}`} key={`${item}_${index}`}>
               {item}
            </div>
         ))}
         {/* <div className="char-items">
            <div className="item-hat"></div>
            <div className="item-glasses"></div>
            <div className="item-shirt"></div>
            <div className="item-vest"></div>
            <div className="item-ring"></div>
            <div className="item-hand"></div>
            <div className="item-shorts"></div>
            <div className="item-shoes"></div>
         </div> */}
      </div>
   );
}

export default Char;
