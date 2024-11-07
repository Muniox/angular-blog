import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  @ViewChild('menu', { static: true }) menuElement: ElementRef<HTMLDivElement>;

  scrollToElementEvent() {
    this.menuElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
