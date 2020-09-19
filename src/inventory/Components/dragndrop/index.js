export function loadFromMain() {
   function returnObject(item, newPos, from, where) {
      let object;

      if (!!item) {
         if (item.children.length > 0) {
            object = JSON.parse(item.children[0].dataset.object);
            if (newPos === 'drop') {
               object.Name = 'dropItem';
            } else {
               object.Enabled = changeEnabledState(object.Enabled, from, where);
               object.PosNumber = Number(newPos);
            }
         } else {
            object = JSON.parse(item.dataset.object);
            object.Name = 'dropItem';
         }
      } else {
         if (newPos === 'submenu-inside') {
            object = JSON.parse(from);
            let tempObject = JSON.parse(where);
            object.PackegeList.$values.splice(
               object.PackegeList.$values.indexOf(tempObject.PosNumber),
               1,
            );
            object.PackegeList.$values.push(tempObject.PosNumber);
         }
      }

      return object;
   }

   function returnObjects(type, newItem, oldItem, newPos) {
      let objectOfNewItem = JSON.parse(newItem);
      let objectofOldItem = JSON.parse(oldItem);
      if (type === 'submenu-in') {
         objectofOldItem.PackegeID = objectOfNewItem.PosNumber;
         objectOfNewItem.PackegeList.$values.push(objectofOldItem.PosNumber);
      }

      if (type === 'submenu-outside') {
         objectOfNewItem.PackegeID = -1;
         objectOfNewItem.PosNumber = Number(newPos);
         objectofOldItem.PackegeList.$values.splice(
            objectofOldItem.PackegeList.$values.indexOf(objectOfNewItem.PosNumber),
            1,
         );
      }
      return [objectOfNewItem, objectofOldItem];
   }

   function changeEnabledState(bool, from, where) {
      if (from !== where) {
         return !bool;
      } else {
         return bool;
      }
   }

   function itemInfoRender(click, item) {
      if (click === true) {
         if (!!item) {
            itemName.innerHTML = item.dataset.name;
            itemDesc.innerHTML = item.dataset.desc;
         }
      } else {
         if (!!this.children[0]) {
            itemName.innerHTML = this.children[0].dataset.name;
            itemDesc.innerHTML = this.children[0].dataset.desc;
         }
      }
   }

   function checkItem(type, newItem, oldItem) {
      // Char
      if (type === 'char') {
         newItem.classList.remove('item-' + newItem.dataset.class);
         oldItem.classList.add('item-' + oldItem.dataset.class);
         console.log(
            returnObject(oldItem, newItem.dataset.pos, newItem.dataset.type, oldItem.dataset.type),
         );

         mp.trigger(
            'cef_cl_moveObjectInInventory',
            returnObject(oldItem, newItem.dataset.pos, newItem.dataset.type, oldItem.dataset.type),
         );
      } else {
         if (!!oldItem && !!oldItem.dataset.class) {
            oldItem.classList.add('item-' + oldItem.dataset.class);
         }
      }

      // Fast
      if (type === 'fast') {
         console.log(
            returnObject(oldItem, newItem.dataset.pos, newItem.dataset.type, oldItem.dataset.type),
         );

         mp.trigger(
            'cef_cl_moveObjectInInventory',
            returnObject(oldItem, newItem.dataset.pos, newItem.dataset.type, oldItem.dataset.type),
         );
      }

      // Inv
      if (type === 'inv') {
         console.log(
            returnObject(oldItem, newItem.dataset.pos, newItem.dataset.type, oldItem.dataset.type),
         );

         mp.trigger(
            'cef_cl_moveObjectInInventory',
            returnObject(oldItem, newItem.dataset.pos, newItem.dataset.type, oldItem.dataset.type),
         );
      }

      // Submenu
      if (type === 'submenu-in') {
         console.log(
            returnObjects(
               type,
               newItem.children[0].dataset.object,
               oldItem.children[0].dataset.object,
            ),
         );

         mp.trigger(
            'cef_cl_stackObjectFromInventory',
            returnObjects(
               type,
               newItem.children[0].dataset.object,
               oldItem.children[0].dataset.object,
            ),
         );
      }

      if (type === 'submenu-inside') {
         console.log(
            returnObject('', type, newItem.children[0].dataset.object, oldItem.dataset.object),
         );
         mp.trigger(
            'cef_cl_moveObjectInInventory',
            returnObject('', type, newItem.children[0].dataset.object, oldItem.dataset.object),
         );
      }

      if (type === 'submenu-outside') {
         setTimeout(
            () =>
               console.log(
                  returnObjects(
                     type,
                     newItem.children[0].dataset.object,
                     oldItem.children[0].dataset.object,
                     newItem.dataset.pos,
                  ),
               ),
            0,
         );

         setTimeout(
            () =>
               mp.trigger(
                  'cef_cl_removeObjectFromInventory',
                  returnObjects(
                     type,
                     newItem.children[0].dataset.object,
                     oldItem.children[0].dataset.object,
                     newItem.dataset.pos,
                  ),
               ),
            0,
         );
      }

      // Drop
      if (type === 'drop') {
         console.log(returnObject(oldItem, type, newItem.dataset.type, oldItem.dataset.type));

         mp.trigger(
            'cef_cl_dropObjectFromInventory',
            returnObject(oldItem, type, newItem.dataset.type, oldItem.dataset.type),
         );
      }

      if (type === 'dropSub') {
         console.log(returnObject(oldItem, type));

         mp.trigger('cef_cl_dropObjectFromInventory', returnObject(oldItem, type));
      }
   }

   var invDragEl = null;

   function dragStart(e) {
      itemInfoRender(true, e.target);
      e.dataTransfer.effectAllowed = 'move';
      if (e.target.parentNode.dataset.type === 'submenu') {
         invDragEl = e.target;
         e.target.id = 'remove';
         e.dataTransfer.setData('text', e.target);
      } else {
         invDragEl = this;
         e.dataTransfer.setData('text/html', this.innerHTML);
      }
   }

   function dragOver(e) {
      if (e.preventDefault) {
         e.preventDefault();
      }

      if (e.target.className === 'inv-icon' && e.target.nextElementSibling !== null) {
         e.target.nextElementSibling.classList.add('submenu-block');
      }

      e.dataTransfer.dropEffect = 'move';
      return false;
   }

   // this - new item position
   // invDragEl - old item position
   function drop(e) {
      if (e.stopPropagation) {
         e.stopPropagation(); // остановка от редиректа.
      }

      if (document.querySelector('.submenu-block'))
         document.querySelector('.submenu-block').classList.remove('submenu-block');

      e.target.parentNode.classList.remove('submenu-block');
      e.target.parentNode.parentNode.classList.remove('submenu-block');
      if (invDragEl !== this) {
         if (invDragEl.parentNode.dataset.type === 'submenu') {
            if (
               invDragEl !== e.target &&
               e.target.className !== 'submenu-items' &&
               e.target.className !== 'inv-icon' &&
               e.target.children.length === 0
            ) {
               if (e.target.className === 'drop-up' || e.target.className === 'drop-down') {
                  checkItem('dropSub', this, invDragEl);
                  let el = document.getElementById('remove');
                  el.parentNode.removeChild(el);
               } else {
                  if (e.target.className === 'submenu-item') {
                     checkItem('submenu-inside', this, invDragEl);
                  } else {
                     checkItem('submenu-outside', this, invDragEl.parentNode.parentNode.parentNode);
                  }
                  let el = document.getElementById('remove');
                  el.parentNode.removeChild(el);
                  e.target.innerHTML = e.dataTransfer.getData('text/html'); // вставляем старый на место новое место
               }
            } else {
               invDragEl.id = '';
            }
         } else {
            if (e.target.className === 'submenu-item') {
               checkItem('submenu-in', this, invDragEl);
               invDragEl.innerHTML = '';
               e.target.innerHTML = e.dataTransfer.getData('text/html');
            } else {
               if (e.target.className === 'drop-up' || e.target.className === 'drop-down') {
                  checkItem('drop', this, invDragEl);
                  invDragEl.innerHTML = '';
               } else {
                  checkItem(this.dataset.type, this, invDragEl);
                  invDragEl.innerHTML = this.innerHTML;
                  this.innerHTML = e.dataTransfer.getData('text/html');
               }
            }
         }
      }
      return false;
   }

   let itemName = document.querySelector('.header-name');
   let itemDesc = document.querySelector('.header-desc');

   let invItems = document.querySelectorAll('.inventory-block'); // Inv
   let charItems = document.getElementsByClassName('char')[0].children; // Char
   let fastItems = document.querySelectorAll('.fast-item'); // FastAccess
   document.querySelector('.drop-up').addEventListener('dragover', dragOver, false);
   document.querySelector('.drop-up').addEventListener('drop', drop, false);
   document.querySelector('.drop-down').addEventListener('dragover', dragOver, false);
   document.querySelector('.drop-down').addEventListener('drop', drop, false);

   invItems.forEach(function (item) {
      item.addEventListener('dragstart', dragStart, false);
      item.addEventListener('dragover', dragOver, false);
      item.addEventListener('drop', drop, false);

      item.addEventListener('click', itemInfoRender, false);
   });

   Object.keys(charItems).forEach(function (key) {
      if (!!charItems[key].children[0] && charItems[key].children[0].alt === 'logo') return; // скипаем лого
      charItems[key].addEventListener('dragstart', dragStart, false);
      charItems[key].addEventListener('dragover', dragOver, false);
      charItems[key].addEventListener('drop', drop, false);

      if (charItems[key].children.length > 0) {
         charItems[key].classList.remove('item-' + charItems[key].dataset.class); // проверяем есть ли предмет в слоту и убираем бэкграунд
      }
   });

   fastItems.forEach(function (item) {
      item.addEventListener('dragstart', dragStart, false);
      item.addEventListener('dragover', dragOver, false);
      item.addEventListener('drop', drop, false);
   });
}
