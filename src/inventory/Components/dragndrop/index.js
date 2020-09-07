document.addEventListener('DOMContentLoaded', (event) => {
   function createObject(name, enabled, oldpos, newpos) {
      let itemObject = {
         name: name,
         enabled: enabled,
         oldPos: oldpos,
         newPos: newpos,
      };
      return itemObject;
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

   function checkItem(type, oldItem, newItem) {
      // Char
      if (type === 'char') {
         oldItem.classList.remove('item-' + oldItem.dataset.class);
         newItem.classList.add('item-' + newItem.dataset.class);
         console.log(
            createObject(newItem.children[0].alt, true, newItem.dataset.pos, oldItem.dataset.pos),
         );
      } else {
         if (!!newItem.dataset.class) {
            newItem.classList.add('item-' + newItem.dataset.class);
         }
      }

      // Fast
      if (type === 'fast') {
         console.log(
            createObject(newItem.children[0].alt, true, newItem.dataset.pos, oldItem.dataset.pos),
         );
      }

      // Inv
      if (type === 'inv') {
         console.log(
            createObject(newItem.children[0].alt, false, newItem.dataset.pos, oldItem.dataset.pos),
         );
      }

      // Submenu
      if (type === 'submenu') {
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

   function drop(e) {
      if (e.stopPropagation) {
         e.stopPropagation(); // остановка от редиректа.
      }

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
               //checkItem(invDragEl.parentNode.dataset.type, invDragEl, e.target);
               let el = document.getElementById('remove');
               el.parentNode.removeChild(el);
               e.target.innerHTML = e.dataTransfer.getData('text/html'); // вставляем старый на место новое место
            } else {
               invDragEl.id = '';
            }
         } else {
            if (e.target.className === 'submenu-item') {
               invDragEl.innerHTML = '';
               e.target.innerHTML = e.dataTransfer.getData('text/html');
            } else {
               checkItem(this.dataset.type, this, invDragEl);
               invDragEl.innerHTML = this.innerHTML;
               this.innerHTML = e.dataTransfer.getData('text/html');
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
   //let subinvItems = document.querySelectorAll('.submenu'); // Submenu
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
});
