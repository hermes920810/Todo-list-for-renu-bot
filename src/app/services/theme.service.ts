import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkThemeActive = false;
  
  constructor() {
    const savedTheme = localStorage.getItem('darkThemeActive') === 'true';
    this.darkThemeActive = savedTheme;
  }

  toggleTheme(): void {
    this.darkThemeActive = !this.darkThemeActive;
    localStorage.setItem('darkThemeActive', String(this.darkThemeActive));
    this.applyTheme();
  }
  
  applyTheme(): void {
    const themeClass = this.darkThemeActive ? 'dark-theme' : 'light-theme';
    document.body.className = themeClass;
  }
}
