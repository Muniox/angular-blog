import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent {
  @ViewChild('menu', { static: true }) menuElement: ElementRef<HTMLDivElement>;

  scrollToElementEvent() {
    this.menuElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
