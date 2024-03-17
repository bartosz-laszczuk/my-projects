import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface Course {
  courseId: string;
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private http: HttpClient) {}

  findCourseById(courseId: string): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${courseId}`);
  }

  findAllCourses(): Observable<Course[]> {
    return this.http.get('/api/courses').pipe(map((res: any) => res.payload));
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`/api/courses/${courseId}`, changes);
  }

  findLessons(
    courseId: string,
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3
  ): Observable<any> {
    return this.http
      .get('/api/lessons', {
        params: new HttpParams()
          .set('courseId', courseId)
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe(map((res: any) => res.payload));
  }
}
