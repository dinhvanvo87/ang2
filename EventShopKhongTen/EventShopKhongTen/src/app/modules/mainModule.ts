import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { mainRouting } from "../routings/mainRouting";

import { MainComponent } from "../components/mainComponent";
import { HomeComponent } from "../components/homeComponent";
import { SpinnerComponent } from "../components/spinnerComponent";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        mainRouting
    ],
    declarations: [
        MainComponent,
        HomeComponent,
//        SpinnerComponent
    ],
    providers: [
    ]
})
export class MainModule {
}