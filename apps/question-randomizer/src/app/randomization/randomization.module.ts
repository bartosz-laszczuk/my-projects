import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { questionRandomizerRandomizationFeatureShellRoutes } from './lib.routes';
import {
  SharedUiCrtButtonsButtonComponent,
  SharedUiCrtControlsCheckboxesComponent,
  SharedUiCrtIndicatorsProgressBarComponent,
  SharedUiCrtLayoutSectionComponent,
} from '@my-projects/shared/ui-crt';
import { RandomizationStoreModule } from './_store/randomization-store.module';
import { RandomizationComponent } from './randomization.component';
import { QuestionsStoreModule } from '../questions/_store/questions-store.module';

@NgModule({
  declarations: [RandomizationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(questionRandomizerRandomizationFeatureShellRoutes),
    SharedUiCrtButtonsButtonComponent,
    SharedUiCrtControlsCheckboxesComponent,
    RandomizationStoreModule,
    QuestionsStoreModule,
    SharedUiCrtLayoutSectionComponent,
    SharedUiCrtIndicatorsProgressBarComponent,
  ],
})
export class RandomizationModule {}
