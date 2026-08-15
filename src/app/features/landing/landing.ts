import { Component } from '@angular/core';
import {HeaderComponent} from '../../shared/header/header';

@Component({
  selector: 'app-landing',
  imports: [
    HeaderComponent
  ],
  templateUrl: './landing.html',
})
export class Landing {}
