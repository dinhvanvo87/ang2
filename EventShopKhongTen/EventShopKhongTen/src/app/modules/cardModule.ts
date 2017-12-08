import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PlayComponent } from "../components/play/playComponent";
import { cardRouting } from "../routings/cardRoutingts";
import { SpinnerComponent } from "../components/spinnerComponent";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        cardRouting
    ],
    declarations: [
        PlayComponent,
        SpinnerComponent
    ]
})

export class CardModule {  }