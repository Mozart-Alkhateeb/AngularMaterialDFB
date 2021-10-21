import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IQuestion, IQuestionOption } from './models/question.model';
import { ITabCategory } from './models/tab-category.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularMaterialDFB';

  forms: FormGroup[];

  categories: ITabCategory[] = [
    {
      id: 1, title: 'Cat Questions', questions: [
        {
          id: 1,
          title: 'How old is this cat ?',
          categoryId: 1,
          type: 'input',
          value: '25',
          options: []
        },
        {
          id: 2,
          title: 'What is its gender ?',
          categoryId: 1,
          type: 'radio button',
          value: '',
          options: [
            { option: 'boy' },
            { option: 'girl' }
          ]
        }
      ]
    },
    { id: 2, title: 'Dog Questions' }
  ];

  constructor(private fb: FormBuilder) {
    // We add a new form group for each category
    this.forms = this.categories.map(c => {
      const categoryFormGroup = this.fb.group({
        questions: this.fb.array([])
      });
      c.questions?.map(q => (categoryFormGroup.controls['questions'] as FormArray).push(this.createQuestion(q)));
      return categoryFormGroup;
    });
  }

  getCategoryFormGroup(categoryIndex: number) {
    console.log('forms', this.forms);
    return this.forms[categoryIndex];
  }

  getQuestionsFormGroups(categoryIndex: number) {
    return this.getCategoryFormGroup(categoryIndex).controls.questions as FormArray;
  }

  getOptionsFormGroups(categoryIndex: number, questionsIndex: number) {
    return this.getQuestionsFormGroups(categoryIndex).controls[questionsIndex]['controls']['options'] as FormArray;
  }

  createQuestion(question: IQuestion) {
    const questionFormGroup = this.fb.group({
      id: [question.id],
      categoryId: [question.categoryId],
      title: [question.title],
      type: [question.type],
      value: [question.value],
      options: this.fb.array([])
    });

    question.options.map(opt => (questionFormGroup.controls['options'] as FormArray).push(this.createOption(opt)));
    return questionFormGroup;
  }

  private createOption(option: IQuestionOption): any {
    const optionFormGroup = this.fb.group({
      option: [option.option]
    });

    return optionFormGroup;
  }
}
