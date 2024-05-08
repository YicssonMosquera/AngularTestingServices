import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'path';
import { PorductsComponent } from './components/porducts/porducts.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';

export const routes: Routes = [
    {
        path: 'products',component:PorductsComponent
    },
    {
        path: 'picoPrevew',component:PicoPreviewComponent
    }
];
