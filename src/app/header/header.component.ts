import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Output() scrollEvent = new EventEmitter();

  emitScrollToElement() {
    this.scrollEvent.emit();
  }
}
