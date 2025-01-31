import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  constructor(
    private themeService: ThemeService, // Inject the ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.applyTheme();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
