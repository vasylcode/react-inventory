export var subinvDragEl = null;

export function subinvDragStart(e) {
   subinvDragEl = this;
   e.dataTransfer.effectAllowed = 'move';
   e.dataTransfer.setData('text/html', this.innerHTML);
}

export function subinvDragOver(e) {
   if (e.preventDefault) {
      e.preventDefault();
   }
   e.dataTransfer.dropEffect = 'move';
   return false;
}

export function subinvDrop(e) {
   if (e.stopPropagation) {
      e.stopPropagation(); // остановка от редиректа.
   }
   if (subinvDragEl !== this) {
      console.log(subinvDragEl.dataset.pos);
      console.log(this.dataset.pos);
      subinvDragEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
   }
   //console.log(createObject(e.target.children[0].alt, subinvDragEl.dataset.pos, this.dataset.pos));
   return false;
}
