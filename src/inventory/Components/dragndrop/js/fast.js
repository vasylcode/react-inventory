export var fastDragEl = null;

export function fastDragStart(e) {
   fastDragEl = this;
   e.dataTransfer.effectAllowed = 'move';
   e.dataTransfer.setData('text/html', this.innerHTML);
}

export function fastDragOver(e) {
   if (e.preventDefault) {
      e.preventDefault();
   }
   e.dataTransfer.dropEffect = 'move';
   return false;
}

export function fastDrop(e) {
   if (e.stopPropagation) {
      e.stopPropagation(); // остановка от редиректа.
   }
   if (fastDragEl !== this) {
      fastDragEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
   }
   //console.log(createObject(e.target.children[0].alt, fastDragEl.dataset.pos, this.dataset.pos));
   return false;
}
