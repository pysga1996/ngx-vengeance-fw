import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestInfinitiveScrollComponent } from './test-infinitive-scroll/test-infinitive-scroll.component';
import { TestComponent } from './test/test.component';
import { TestInputComponent } from './test-input/test-input.component';
import { TestSwapItemComponent } from './test-swap-item/test-swap-item.component';

const routes: Routes = [
  {
    path: 'test-toast',
    pathMatch: 'prefix',
    component: TestComponent,
  },
  {
    path: 'test-infinitive-scroll',
    pathMatch: 'prefix',
    component: TestInfinitiveScrollComponent,
  },
  {
    path: 'test-input',
    pathMatch: 'prefix',
    component: TestInputComponent,
  },
  {
    path: 'test-swap',
    pathMatch: 'prefix',
    component: TestSwapItemComponent,
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
