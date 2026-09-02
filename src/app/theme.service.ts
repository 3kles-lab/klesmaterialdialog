import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

enum ThemeMode {
    DARK = 'dark',
    LIGHT = 'light',
}

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly document = inject(DOCUMENT);
    private readonly platformId = inject(PLATFORM_ID);

    private get rootElement(): HTMLElement {
        return this.document.documentElement;
    }

    public isWindowDarkMode(): boolean {
        if (!isPlatformBrowser(this.platformId)) {
            return false;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    public isDarkMode(): boolean {
        return this.rootElement.classList.contains('dark');
    }

    public apply(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const storedTheme = localStorage.getItem('theme') as ThemeMode | null;

        const darkEnabled = storedTheme === ThemeMode.DARK || (storedTheme === null && this.isWindowDarkMode());

        this.rootElement.classList.toggle('dark', darkEnabled);
    }

    public setDarkMode(): void {
        this.setTheme(ThemeMode.DARK);
    }

    public setLightMode(): void {
        this.setTheme(ThemeMode.LIGHT);
    }

    public toggle(): void {
        this.setTheme(this.isDarkMode() ? ThemeMode.LIGHT : ThemeMode.DARK);
    }

    private setTheme(theme: ThemeMode): void {
        const darkEnabled = theme === ThemeMode.DARK;

        this.rootElement.classList.toggle('dark', darkEnabled);

        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('theme', theme);
        }
    }
}
