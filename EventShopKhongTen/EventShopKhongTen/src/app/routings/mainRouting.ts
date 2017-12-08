import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from "../components/mainComponent";
import { UrlResource } from "../resources/urlResource";
import { HomeComponent } from "../components/homeComponent";
import { DeactivateGuard } from "../auth/deactivateGuard";
import { CanDeactivateGuard } from "../auth/canDeactivateGuard";

const mainRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                canDeactivate: [CanDeactivateGuard],
                component: HomeComponent,
                pathMatch: 'full'
            },
            {
                path: UrlResource.home,
                canDeactivate: [CanDeactivateGuard],
                component: HomeComponent
            },
            {
                path: UrlResource.card,
                canActivate: [DeactivateGuard],
                loadChildren: 'app/modules/cardModule#CardModule'
            }
        ]
    }
];
export const mainRouting: ModuleWithProviders = RouterModule.forChild(mainRoutes);