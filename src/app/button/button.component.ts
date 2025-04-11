import { Component, Host, HostBinding, HostListener, input, output } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  buttonlabel = input<string>();
  buttonIcon = input<SafeHtml>();
  buttonSize = input<string>('small');
  clicked = output<void>();

  @HostBinding('attr.role') role = 'button';
  @HostBinding('attr.tabindex') tabindex = '0';
  @HostBinding('attr.aria-label') get ariaLabel() {
    return this.buttonlabel() || 'button';
  }

  @HostBinding('class.icon-only') get iconOnly() {
    return !!this.buttonIcon() && !this.buttonlabel();
  }

  @HostBinding('class.btn-medium') get medium() {
    return this.buttonSize() === 'medium';
  }

  @HostListener('click', ['$event'])
  
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    event.preventDefault();
    this.handleClick();
  }

  handleClick() {
    this.clicked.emit();
  }
}