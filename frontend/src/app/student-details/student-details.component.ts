import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentsService } from '../services/students.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  constructor(
    activatedRoute: ActivatedRoute,
    private getStudentService: StudentsService,
    private router: Router
  ) {
    this.id = activatedRoute.snapshot.params.id;
  }
  id: string;
  student: Student = {
    _id: '',
    name: '',
    email: '',
  };
  notEditable: boolean = true;

  subscriber: any;
  ngOnInit(): void {
    this.getUser();
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  getUser() {
    this.subscriber = this.getStudentService.getStudentById(this.id).subscribe({
      next: (student) => {
        this.student = student as Student;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  myForm: FormGroup = new FormGroup({
    name: new FormControl({ value: this.student.name, disabled: true }, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]),
    email: new FormControl({ value: this.student.email, disabled: true }, [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  updateStudent(id: String) {
    if (this.myForm.valid) {
      this.subscriber = this.getStudentService
        .updateStudent(id, this.myForm.value)
        .subscribe({
          next: (response: any) => {
            this.navigateHome();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  removeStudent(id: string) {
    this.subscriber = this.getStudentService.deleteStudent(id).subscribe({
      next: (response: any) => {
        document.getElementById('modalToggler')?.click();
        this.navigateHome();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  navigateHome() {
    this.router.navigate(['']);
  }
}
