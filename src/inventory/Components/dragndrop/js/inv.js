export var invDragEl = null;

export function invDragStart(e) {
   invDragEl = this;
   e.dataTransfer.effectAllowed = 'move';
   e.dataTransfer.setData('text/html', this.innerHTML);
}

export function invDragOver(e) {
   if (e.preventDefault) {
      e.preventDefault();
   }
   e.dataTransfer.dropEffect = 'move';
   return false;
}

export function invDrop(e) {
   if (e.stopPropagation) {
      e.stopPropagation(); // остановка от редиректа.
   }
   if (invDragEl !== this) {
      console.log(invDragEl.dataset.pos);
      console.log(this.dataset.pos);
      invDragEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
   }
   //console.log(createObject(e.target.children[0].alt, invDragEl.dataset.pos, this.dataset.pos));
   return false;
}
