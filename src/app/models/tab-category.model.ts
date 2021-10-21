import { IQuestion } from "./question.model";

export interface ITabCategory {
    id: number,
    title: string,
    questions?: IQuestion[];
}