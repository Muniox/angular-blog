import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent, authInterceptor } from './auth';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: AuthComponent }];

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  exports: [AuthComponent],
})
export class CoreModule {}
