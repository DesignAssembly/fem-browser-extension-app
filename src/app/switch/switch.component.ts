import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css'
})
export class SwitchComponent {
  value = input<boolean>();
  state = output<boolean>();

  toggle(event: Event) {
    const target = event.target as HTMLInputElement;
    this.state.emit(target.checked);
  }
}
