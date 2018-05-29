import 'lodash';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatCardModule } from '@angular/material';
import { BeyondComponentsModule, DialogComponent } from 'ng-beyond';

import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { CoreModule } from './modules/core/core.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoListComponent,
    TodoEditComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BeyondComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
