export interface IQuestion {
    id?: number,
    categoryId: number,
    title: string,
    type: 'input' | 'radio button' | 'check box';
    value?: string, // Simple Question
    options?: IQuestionOption [] // Radio and Checkbox
}

export interface IQuestionOption {
    option: string
}