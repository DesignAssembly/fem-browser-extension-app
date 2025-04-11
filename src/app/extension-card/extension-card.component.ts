import { Component, input, output, signal } from '@angular/core';
import { Extension } from '../extension.model';
import { ButtonComponent } from "../button/button.component";
import { SwitchComponent } from "../switch/switch.component";



@Component({
  selector: 'app-extension-card',
  standalone: true,
  imports: [ButtonComponent, SwitchComponent],
  templateUrl: './extension-card.component.html',
  styleUrl: './extension-card.component.css',
})
export class ExtensionCardComponent {

  extension = input<Extension>();
  remove = output<Extension>();
  toggle = output<{ name: string; isActive: boolean }>();

  removeExtension() {
    this.remove.emit(this.extension()!);
    console.log('EXT TO REMOVE:', this.extension());
  };

  onToggleState(newState: boolean) {
    this.toggle.emit({
      name: this.extension()!.name,
      isActive: newState
    });
  }
}
