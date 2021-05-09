import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  readonly baseURL: string = 'http://localhost:3000/students/';
  constructor(private studentClient: HttpClient) {}

  getStudents() {
    let response = this.studentClient.get(this.baseURL, {
      observe: 'response',
    });
    return response;
  }

  getStudentById(id: String) {
    let response = this.studentClient.get(`${this.baseURL}/${id}`);
    return response;
  }

  createStudent(data: {}) {
    let response = this.studentClient.post(this.baseURL, data);
    return response;
  }

  deleteStudent(id: String) {
    return this.studentClient.delete(`${this.baseURL}/${id}`);
  }
  updateStudent(id: String, data: {}) {
    let response = this.studentClient.patch(`${this.baseURL}/${id}`, data);
    return response;
  }
  searchStudents(data: {}): any {
    let response = this.studentClient.post(`${this.baseURL}/search`, data);
    return response;
  }
}
