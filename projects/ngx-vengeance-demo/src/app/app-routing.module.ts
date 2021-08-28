import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestInfinitiveScrollComponent } from './test-infinitive-scroll/test-infinitive-scroll.component';
import { TestComponent } from './test/test.component';
import { AppComponent } from './app.component';
import { TestInputComponent } from './test-input/test-input.component';

const routes: Routes = [
  {
    path: 'test-toast',
    pathMatch: 'full',
    component: TestComponent,
  },
  {
    path: 'test-infinitive-scroll',
    pathMatch: 'full',
    component: TestInfinitiveScrollComponent,
  },
  {
    path: 'test-input',
    pathMatch: 'full',
    component: TestInputComponent,
  },
  {
    path: '**',
    redirectTo: 'test-input',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
