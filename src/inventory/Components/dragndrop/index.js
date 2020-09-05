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

   function checkItem(type, oldItem, newItem) {
      // Char
      if (type === 'char') {
         oldItem.classList.remove('item-' + oldItem.dataset.name);
         newItem.classList.add('item-' + newItem.dataset.name);
         console.log(
            createObject(newItem.children[0].alt, true, newItem.dataset.pos, oldItem.dataset.pos),
         );
      } else {
         if (!!newItem.dataset.name) {
            newItem.classList.add('item-' + newItem.dataset.name);
         }
      }

      // Fast
      if (type === 'fast') {
         console.log(
            createObject(newItem.children[0].alt, true, newItem.dataset.pos, oldItem.dataset.pos),
         );
      }

      if (type === 'inv') {
         console.log(
            createObject(newItem.children[0].alt, false, newItem.dataset.pos, oldItem.dataset.pos),
         );
      }
   }

   var invDragEl = null;

   function dragStart(e) {
      invDragEl = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
   }

   function dragOver(e) {
      if (e.preventDefault) {
         e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
      return false;
   }

   function drop(e) {
      if (e.stopPropagation) {
         e.stopPropagation(); // остановка от редиректа.
      }
      if (invDragEl !== this) {
         checkItem(this.dataset.type, this, invDragEl);

         /* // Char
         if (this.dataset.type === 'char' && invDragEl.dataset.type === 'char') {
            this.classList.remove('item-' + this.dataset.name);
            invDragEl.classList.add('item-' + invDragEl.dataset.name);
            console.log(
               createObject(
                  invDragEl.children[0].alt,
                  true,
                  invDragEl.dataset.pos,
                  this.dataset.pos,
               ),
            );
         } else {
            if (!!invDragEl.dataset.name) {
               invDragEl.classList.add('item-' + invDragEl.dataset.name);
            }
         } */

         //console.log(invDragEl);
         //console.log(this);
         invDragEl.innerHTML = this.innerHTML;
         this.innerHTML = e.dataTransfer.getData('text/html');
      }
      return false;
   }

   function itemClick() {
      if (!!this.children[0]) console.log('da');
   }

   let invItems = document.querySelectorAll('.inventory-block'); // Inv
   let charItems = document.getElementsByClassName('char')[0].children; // Char
   let fastItems = document.querySelectorAll('.fast-item'); // FastAccess
   let subinvItems = document.querySelectorAll('.submenu-item'); // Submenu
   invItems.forEach(function (item) {
      item.addEventListener('dragstart', dragStart, false);
      item.addEventListener('dragover', dragOver, false);
      item.addEventListener('drop', drop, false);

      item.addEventListener('click', itemClick, false);
   });

   Object.keys(charItems).forEach(function (key) {
      if (!!charItems[key].children[0] && charItems[key].children[0].alt === 'logo') return; // скипаем лого
      charItems[key].addEventListener('dragstart', dragStart, false);
      charItems[key].addEventListener('dragover', dragOver, false);
      charItems[key].addEventListener('drop', drop, false);

      if (charItems[key].children.length > 0) {
         charItems[key].classList.remove('item-' + charItems[key].dataset.name); // проверяем есть ли предмет в слоту и убираем бэкграунд
      }
   });

   fastItems.forEach(function (item) {
      item.addEventListener('dragstart', dragStart, false);
      item.addEventListener('dragover', dragOver, false);
      item.addEventListener('drop', drop, false);
   });

   subinvItems.forEach(function (item) {
      item.addEventListener('dragstart', dragStart, false);
      item.addEventListener('dragover', dragOver, false);
      item.addEventListener('drop', drop, false);
   });
});
