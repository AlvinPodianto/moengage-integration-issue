import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './sevices/guard/auth-guard.service';
import { TabLayoutComponent } from './layouts/tab-layout/tab-layout.component';
import { SessionGuard } from './sevices/guard/session-guard.service';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  // Tab layout
  {
    path: '',
    component: TabLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'register',
        canActivate: [SessionGuard],
        loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'login',
        canActivate: [SessionGuard],
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'consultation',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/consultation/consultation.module').then(m => m.ConsultationPageModule)
      },
      {
        path: 'recipes',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/recipes/recipes.module').then(m => m.RecipesPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module').then(m => m.AccountPageModule)
      }      
    ]
  },
  // endof tab layout
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
