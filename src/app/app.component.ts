import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ThemeService } from './services/theme.service';
import { ItemModalComponent } from './components/item-modal/item-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private themeService: ThemeService, // Inject the ThemeService
    private dialog: MatDialog // Inject MatDialog
  ) {}

  ngOnInit(): void {
    this.themeService.applyTheme();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Method to handle item click (can show modal)
  openItemDetails(item: any): void {
    console.log('Item selected:', item);
    this.dialog.open(ItemModalComponent, {
      width: '400px',
      data: item,
    });
  }
}
