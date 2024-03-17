import { Course, CoursesService } from './courses.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

const courses: Course[] = [
  {
    courseId: '1',
    title: 'Course 1',
  },
  {
    courseId: '2',
    title: 'Course 2',
  },
];

describe('CoursesService', () => {
  let coursesService: CoursesService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all courses', () => {
    coursesService.findAllCourses().subscribe((courses) => {
      expect(courses).toBeTruthy();
      expect(courses.length).toBe(2);
      const course = courses.find((course) => course.courseId === '1');
      expect(course?.title).toBe('Course 1');
    });

    const req = httpTestingController.expectOne('/api/courses');

    expect(req.request.method).toEqual('GET');

    req.flush({ payload: courses });
  });

  it('should find a course by id', () => {
    coursesService.findCourseById('2').subscribe((course) => {
      expect(course).toBeTruthy();
      expect(course.courseId).toBe('2');
    });

    const req = httpTestingController.expectOne('/api/courses/2');

    expect(req.request.method).toEqual('GET');

    req.flush(courses[1]);
  });

  it('should save the course data', () => {
    const changes: Partial<Course> = { title: 'Course 2 new title' };
    coursesService.saveCourse('2', changes).subscribe((course) => {
      expect(course.courseId).toBe(12);
    });

    const req = httpTestingController.expectOne('/api/courses/2');

    expect(req.request.method).toEqual('PUT');

    expect(req.request.body.title).toEqual(changes.title);

    req.flush({ ...courses[1], ...changes });
  });

  it('should give an error if save course fails', () => {
    const changes: Partial<Course> = { title: 'Course 2 new title' };
    coursesService.saveCourse('2', changes).subscribe({
      next: () => fail('the save course operation should have failed'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpTestingController.expectOne('/api/courses/2');

    expect(req.request.method).toEqual('PUT');

    req.flush('Save course failed', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  it('should find a list of lessons', () => {
    coursesService.findLessons('2').subscribe((lessons) => {
      expect(lessons).toBeTruthy();
      expect(lessons.length).toBe(3);
    });

    const req = httpTestingController.expectOne(
      (req) => req.url == '/api/lessons'
    );

    expect(req.request.method).toEqual('GET');

    expect(req.request.params.get('courseId')).toEqual('2');
    expect(req.request.params.get('filter')).toEqual('');
    expect(req.request.params.get('sortOrder')).toEqual('asc');
    expect(req.request.params.get('pageNumber')).toEqual('0');
    expect(req.request.params.get('pageSize')).toEqual('3');

    req.flush({ payload: [{}, {}, {}] });
  });

  afterEach(() => {
    // assert that no other http request than the one specified in test has been made
    httpTestingController.verify();
  });
});
