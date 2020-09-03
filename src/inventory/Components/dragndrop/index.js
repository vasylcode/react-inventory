document.addEventListener('DOMContentLoaded', (event) => {
   var dragSrcEl = null;

   function handleDragStart(e) {
      dragSrcEl = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
   }
   function handleDragOver(e) {
      if (e.preventDefault) {
         e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
      return false;
   }
   function handleDragEnter(e) {
      //this.classList.add('over');
   }
   function handleDragLeave(e) {
      //this.classList.remove('over');
   }
   function handleDrop(e) {
      if (e.stopPropagation) {
         e.stopPropagation(); // остановка от редиректа.
      }
      if (dragSrcEl !== this) {
         dragSrcEl.innerHTML = this.innerHTML;
         this.innerHTML = e.dataTransfer.getData('text/html');
      }
      return false;
   }
   function handleDragEnd(e) {
      /* items.forEach(function (item) {
         item.classList.remove('over');
      }); */
   }

   function handleDragStart1(e) {
      dragSrcEl = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
   }
   function handleDragOver1(e) {
      if (e.preventDefault) {
         e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
      return false;
   }
   function handleDragEnter1(e) {
      //this.classList.add('over');
   }
   function handleDragLeave1(e) {
      //this.classList.remove('over');
   }
   function handleDrop1(e) {
      if (e.stopPropagation) {
         e.stopPropagation(); // остановка от редиректа.
      }
      if (dragSrcEl !== this) {
         dragSrcEl.innerHTML = this.innerHTML;
         this.innerHTML = e.dataTransfer.getData('text/html');
      }
      return false;
   }
   function handleDragEnd1(e) {
      /* items.forEach(function (item) {
         item.classList.remove('over');
      }); */
   }

   let invItems = document.querySelectorAll('.inventory-block');
   let subinvItems = document.querySelectorAll('.submenu-item');
   invItems.forEach(function (item) {
      item.addEventListener('dragstart', handleDragStart, false);
      item.addEventListener('dragenter', handleDragEnter, false);
      item.addEventListener('dragover', handleDragOver, false);
      item.addEventListener('dragleave', handleDragLeave, false);
      item.addEventListener('drop', handleDrop, false);
      item.addEventListener('dragend', handleDragEnd, false);
   });

   subinvItems.forEach(function (item) {
      item.addEventListener('dragstart', handleDragStart1, false);
      item.addEventListener('dragenter', handleDragEnter1, false);
      item.addEventListener('dragover', handleDragOver1, false);
      item.addEventListener('dragleave', handleDragLeave1, false);
      item.addEventListener('drop', handleDrop1, false);
      item.addEventListener('dragend', handleDragEnd1, false);
   });
});
