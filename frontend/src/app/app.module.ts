import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { StudentsComponent } from './students/students.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { StudentsService } from './services/students.service';
import { StudentComponent } from './student/student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentDetailsComponent,
    NotFoundComponent,
    StudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [StudentsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
