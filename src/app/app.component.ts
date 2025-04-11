import { Component, computed, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ExtensionCardComponent } from './extension-card/extension-card.component';
import { Extension } from './extension.model';
import { ExtensionService } from './extension.service';
import { ButtonComponent } from "./button/button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ExtensionCardComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  filterSignal = signal<string>('all');
  extensions = signal<Extension[]>([]);

  constructor(private extensionService: ExtensionService) {
    this.extensionService.getExtensions().subscribe(data => {
      this.extensions.set(data);
    });
  }

  filteredExtensions = computed(() => {
    const filter = this.filterSignal();
    const all = this.extensions(); 
    if (filter === 'active') {
      return all.filter(ext => ext.isActive);
    } else if (filter === 'inactive') {
      return all.filter(ext => !ext.isActive);
    }
    return all;
  });

  setFilter(filter: string): void {
    this.filterSignal.set(filter);
  }

  removeExtension(ext: Extension): void {
    console.log('🔥 Parent received remove', ext);
    const updated = this.extensions().filter(e => e.name !== ext.name);
    this.extensions.set(updated); 
  }

  toggleExtension(change: { name: string; isActive: boolean }) {
    const updated = this.extensions().map(ext =>
      ext.name === change.name ? { ...ext, isActive: change.isActive } : ext
    );
    this.extensions.set(updated);
  }

  // Reset
resetExtensions() {
  this.extensionService.getExtensions().subscribe((original) => {
    const reset = original.map(ext => ({ ...ext, isActive: false }));
    this.extensions.set(reset);
  });
}
}

