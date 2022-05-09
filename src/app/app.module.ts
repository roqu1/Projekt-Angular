import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { Test2Component } from './test2/test2.component';
import { MitteComponent } from './mitte/mitte.component';
import { DataService } from './dataservice/data.service';


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent,Test2Component, MitteComponent ],
  bootstrap:    [ AppComponent ],
  providers: [DataService]
})
export class AppModule { }
