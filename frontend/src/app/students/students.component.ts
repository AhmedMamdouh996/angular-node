import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../models/student';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  constructor(private allStudentsService: StudentsService) {}
  subscriber: any;
  students: Student[] = [];

  ngOnInit(): void {
    this.subscriber = this.allStudentsService.getStudents().subscribe({
      next: (response) => {
        this.students = response.body as Student[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  myForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  addStudent() {
    if (this.myForm.valid) {
      this.subscriber = this.allStudentsService
        .createStudent(this.myForm.value)
        .subscribe({
          next: (response: any) => {
            this.myForm.setValue({ name: '', email: '' });
            this.searchStudents();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  searchInput: String = '';

  searchStudents() {
    if (this.searchInput === '') {
      this.subscriber = this.allStudentsService.getStudents().subscribe({
        next: (response) => {
          this.students = response.body as Student[];
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.subscriber = this.allStudentsService
        .searchStudents({ search: this.searchInput })
        .subscribe({
          next: (response: any) => {
            this.students = response as Student[];
          },
          error: (err: any) => {
            console.log(err);
          },
        });
    }
  }
}
