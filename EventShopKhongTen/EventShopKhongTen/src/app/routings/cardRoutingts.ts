import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayComponent } from "../components/play/playComponent";
import { DeactivateGuard } from "../auth/deactivateGuard";

const cardRoutes: Routes = [
    {
        path: '',
        component: PlayComponent,
        canActivateChild: [DeactivateGuard],
        children: []
    }
]

export const cardRouting: ModuleWithProviders = RouterModule.forChild(cardRoutes);