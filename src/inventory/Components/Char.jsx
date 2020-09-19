import React from 'react';
import './assets/css/Char.css';
import char from './assets/img/char.png';
import UploadIcon from './Inv/UploadIcon';

const classes = ['hat', 'glasses', 'shirt', 'vest', 'ring', 'shorts', 'hand', 'shoes'];

// функция подготовки масива к рендеру, исходя из дефолтного массива, который передается из Main.jsx
function createArrayToRender(array) {
   const defaultChatSize = 8; // стандартный размер персонажа
   let newArray = Array.from(Array(defaultChatSize)); // создаем новый массив с пустыми клетками который будем возвращать
   array.filter(
      (item) => (newArray[item.PosNumber - 1] = [item.Name, item.Info, JSON.stringify(item)]),
   ); // с помощью фильтра перебираем массив и вставляем данные из array в
   return newArray;
}

function Char({ items }) {
   return (
      <div className="char">
         <div className="char-img">
            <img src={char} alt="logo" />
         </div>
         {createArrayToRender(items).map((item, index) => (
            <div
               className={`char-item-${index + 1} item-${classes[index]}`}
               key={`${item}_${index}`}
               data-pos={index + 1}
               data-class={classes[index]}
               data-type="char">
               {!!item ? <UploadIcon name={item[0]} desc={item[1]} object={item[2]} /> : false}
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
