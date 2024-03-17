// import { TestBed } from '@angular/core/testing';
// import { QuestionListService } from './question-list.service';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { Question } from '../_models/backend/question.model';
// import { of } from 'rxjs';

// const questions: Question[] = [
//   {
//     id: '1',
//     question: 'question one?',
//     answer: 'answer one',
//     answerPl: 'answerPl one',
//     categoryId: '11',
//     qualificationId: '111',
//     isActive: true,
//   },
//   {
//     id: '2',
//     question: 'question two?',
//     answer: 'answer two',
//     answerPl: 'answerPl two',
//     categoryId: '22',
//     qualificationId: '222',
//     isActive: false,
//   },
// ];

// const questions$ = of(questions);
// const question$ = of(questions[0]);

// const collectionStub = {
//   valueChanges: jest.fn().mockReturnValue(questions$),
// };

// const docStub = {
//   valueChanges: jest.fn().mockReturnValue(question$),
// };

// const angularFiresotreStub = {
//   collection: jest.fn().mockReturnValue(collectionStub),
//   doc: jest.fn().mockReturnValue(docStub),
// };

// describe('CoursesService', () => {
//   let questionListService: QuestionListService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         QuestionListService,
//         { provide: AngularFirestore, useValue: angularFiresotreStub },
//       ],
//     });

//     questionListService = TestBed.inject(QuestionListService);
//   });

//   it('should retrierve a question', () => {
//     expect(true).toBeTruthy();
//     // questionListService
//     //   .loadQuestion('1')
//     //   .subscribe((question) => expect(question).toBeTruthy());
//   });
// });
