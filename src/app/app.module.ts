import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MitteComponent } from './mitte/mitte.component';
import { DataService } from './dataservice/data.service';
import { ErdeComponent } from './erde/erde.component';
import { UpgradeComponent } from './upgrade/upgrade.component';



@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent,UpgradeComponent, MitteComponent,ErdeComponent ],
  bootstrap:    [ AppComponent ],
  providers: [DataService]
})
export class AppModule { }
