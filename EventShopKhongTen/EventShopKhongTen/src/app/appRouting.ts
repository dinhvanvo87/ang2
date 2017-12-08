import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { UrlResource } from './resources/urlResource';
import { DeactivateGuard } from "./auth/deactivateGuard";
import { CanDeactivateGuard } from "./auth/canDeactivateGuard";

const mainRoutes: Routes = [
    {
        path: '',
        redirectTo: UrlResource.url(UrlResource.home),
        pathMatch: 'full',
    },
    {
        path: UrlResource.home,
        loadChildren: 'app/modules/mainModule#MainModule'
    },
];

const appRoutes: Routes = [
    ...mainRoutes
];

export const appRoutingProviders: any[] = [
    DeactivateGuard,
    CanDeactivateGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);