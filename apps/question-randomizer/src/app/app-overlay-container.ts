import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable()
export class AppOverlayContainer extends OverlayContainer {
  protected override _createContainer(): void {
    const container: HTMLDivElement = document.createElement('div');
    container.classList.add('app-overlay-container');

    const element: Element | null = document.querySelector('.app-page');
    if (element !== null) {
      element.appendChild(container);
      this._containerElement = container;
    }
  }
}
