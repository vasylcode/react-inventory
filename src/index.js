import React from 'react';
import ReactDOM from 'react-dom';

import Main from './inventory/Main';
import { loadFromMain } from './inventory/Components/dragndrop';

/* const testString = {
   $type:
      'System.Collections.Generic.List`1[[ServerRP.GameObjects.GameObject, ServerRP]], System.Private.CoreLib',
   $values: [
      {
         $type: 'ServerRP.GameObjects.Eat, ServerRP',
         HungredRestore: 1,
         DrinkRestore: 10,
         Name: 'Список',
         Weight: 0.1,
         Code: '',
         BasicPrice: 10,
         Category: 'Eat',
         Info: 'Описание',
         Package: true,
         PackegeCount: 3,
         PosNumber: 3,
         Enabled: false,
         ID: 2,
         PackegeList: {
            $type:
               'System.Collections.Generic.List`1[[System.Int32, System.Private.CoreLib]], System.Private.CoreLib',
            $values: [5, 6],
         },
         PackegeID: -1,
         PackegeListCategory: null,
         Hash: 2167236344,
         Transferability: true,
         GameEntity: null,
      },
      {
         $type: 'ServerRP.GameObjects.Eat, ServerRP',
         HungredRestore: 1,
         DrinkRestore: 10,
         Name: 'Молоко',
         Weight: 0.1,
         Code: '',
         BasicPrice: 10,
         Category: 'Eat',
         Info: 'Молоко - продукт питания, востанавливает 1 ед. голода и 10 ед. жажды',
         Package: false,
         PackegeCount: 0,
         PosNumber: 5,
         Enabled: false,
         ID: 2,
         PackegeList: {
            $type:
               'System.Collections.Generic.List`1[[System.Int32, System.Private.CoreLib]], System.Private.CoreLib',
            $values: [],
         },
         PackegeID: 3,
         PackegeListCategory: null,
         Hash: 2167236344,
         Transferability: true,
         GameEntity: null,
      },
      {
         $type: 'ServerRP.GameObjects.Eat, ServerRP',
         HungredRestore: 1,
         DrinkRestore: 10,
         Name: 'Магазин 9мм х 12',
         Weight: 0.1,
         Code: '',
         BasicPrice: 10,
         Category: 'Eat',
         Info: 'Молоко2 - продукт питания, востанавливает 1 ед. голода и 10 ед. жажды',
         Package: false,
         PackegeCount: 0,
         PosNumber: 6,
         Enabled: false,
         ID: 2,
         PackegeList: {
            $type:
               'System.Collections.Generic.List`1[[System.Int32, System.Private.CoreLib]], System.Private.CoreLib',
            $values: [],
         },
         PackegeID: 3,
         PackegeListCategory: null,
         Hash: 2167236344,
         Transferability: true,
         GameEntity: null,
      },
      {
         $type: 'ServerRP.GameObjects.GameObject, ServerRP',
         Name: 'Магазин 9мм х 12',
         Weight: 0.3,
         Code: '12x9mm',
         BasicPrice: 10,
         Category: 'Ammo_1',
         Info: 'Магазин с 12 патронами 9мм, подходит к Пистолет',
         Package: false,
         PackegeCount: 0,
         PosNumber: 1,
         Enabled: false,
         ID: 1,
         PackegeList: {
            $type:
               'System.Collections.Generic.List`1[[System.Int32, System.Private.CoreLib]], System.Private.CoreLib',
            $values: [],
         },
         PackegeID: -1,
         PackegeListCategory: null,
         Hash: 2395771146,
         Transferability: true,
         GameEntity: null,
      },
      {
         $type: 'ServerRP.GameObjects.Gun, ServerRP',
         WeaponHash: 453432689,
         Name: 'Молоко',
         Weight: 0.3,
         Code: '12x9mm',
         BasicPrice: 10,
         Category: 'Weapon_Legal_1',
         Info:
            'Пистолет - легальное оружие которое можно приобрнести в магазине, снаряжается магазином с 12 патронами 9мм',
         Package: false,
         PackegeCount: 0,
         PosNumber: 7,
         Enabled: true,
         ID: 0,
         PackegeList: {
            $type:
               'System.Collections.Generic.List`1[[System.Int32, System.Private.CoreLib]], System.Private.CoreLib',
            $values: [],
         },
         PackegeID: -1,
         PackegeListCategory: {
            $type:
               'System.Collections.Generic.List`1[[System.String, System.Private.CoreLib]], System.Private.CoreLib',
            $values: ['Ammo_1'],
         },
         Hash: 1467525553,
         Transferability: true,
         GameEntity: null,
      },
      {
         $type: 'ServerRP.GameObjects.Gun, ServerRP',
         WeaponHash: 453432689,
         Name: 'Молоко',
         Weight: 0.3,
         Code: '12x9mm',
         BasicPrice: 10,
         Category: 'Weapon_Legal_1',
         Info:
            'Пистолет - легальное оружие которое можно приобрнести в магазине, снаряжается магазином с 12 патронами 9мм',
         Package: false,
         PackegeCount: 0,
         PosNumber: 11,
         Enabled: true,
         ID: 0,
         PackegeList: {
            $type:
               'System.Collections.Generic.List`1[[System.Int32, System.Private.CoreLib]], System.Private.CoreLib',
            $values: [],
         },
         PackegeID: -1,
         PackegeListCategory: {
            $type:
               'System.Collections.Generic.List`1[[System.String, System.Private.CoreLib]], System.Private.CoreLib',
            $values: ['Ammo_1'],
         },
         Hash: 1467525553,
         Transferability: true,
         GameEntity: null,
      },
   ],
}; */

window.openInventory = function (items, currentWeight, maxWeight) {
   ReactDOM.render(
      <React.Fragment>
         <Main items={items} currentWeight={currentWeight} maxWeight={maxWeight} />
      </React.Fragment>,
      document.getElementById('root'),
   );
   loadFromMain();
};

window.closeInventory = function () {
   ReactDOM.render(<React.Fragment></React.Fragment>, document.getElementById('root'));
};

//window.openInventory(testString, 5, 40);
