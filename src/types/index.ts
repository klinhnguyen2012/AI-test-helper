export type ModuleId = 'A'|'B'|'C'|'D';
export type Difficulty = 'easy'|'medium'|'hard';
export type QuestionType = 'single'|'multiple'|'code'|'numeric'|'essay'|'coding';
export interface Question { id:string; module:ModuleId; topic:string; difficulty:Difficulty; type:QuestionType; question:string; codeSnippet?:string; options?:{id:string;text:string}[]; correctAnswers:string[]; numericAnswer?:{value:number;tolerance:number}; essayRubric?:string[]; explanation:string; solutionSteps?:string[]; commonMistake?:string; tags:string[] }
export interface Attempt { id:string; createdAt:string; durationSeconds:number; score:number; questionIds:string[]; answers:Record<string,string[]>; marked:string[]; sessionType?:'mock'|'exam'; }
