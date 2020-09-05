export var charDragEl = null;

export function charDragStart(e) {
   charDragEl = this;
   e.dataTransfer.effectAllowed = 'move';
   e.dataTransfer.setData('text/html', this.innerHTML);
}

export function charDragOver(e) {
   if (e.preventDefault) {
      e.preventDefault();
   }
   e.dataTransfer.dropEffect = 'move';
   return false;
}

export function charDrop(e) {
   if (e.stopPropagation) {
      e.stopPropagation(); // остановка от редиректа.
   }
   console.log(charDragEl);
   if (charDragEl !== this) {
      charDragEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
   }
   //console.log(createObject(e.target.children[0].alt, charDragEl.dataset.pos, this.dataset.pos));
   return false;
}
