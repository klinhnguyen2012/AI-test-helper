import { scoreAnswer } from './scoring';
import type { Attempt, Question } from '../types';
const ATTEMPTS='ai-thuc-chien:attempts'; const ACTIVE='ai-thuc-chien:active';
export type ActiveExam={id:string;questionIds:string[];answers:Record<string,string[]>;marked:string[];index:number;startedAt:number;deadline:number|null;config:unknown};
export function readAttempts():Attempt[]{try{return JSON.parse(localStorage.getItem(ATTEMPTS)||'[]') as Attempt[]}catch{return [];}}
export function saveAttempt(attempt:Attempt){localStorage.setItem(ATTEMPTS,JSON.stringify([attempt,...readAttempts()]));}
export function readActive():ActiveExam|null{try{return JSON.parse(localStorage.getItem(ACTIVE)||'null') as ActiveExam|null}catch{return null;}}
export function saveActive(active:ActiveExam|null){if(active)localStorage.setItem(ACTIVE,JSON.stringify(active));else localStorage.removeItem(ACTIVE);}
export function wrongQuestionIds(attempts=readAttempts(),bank:Question[]){const ids=new Set<string>();for(const a of attempts)for(const id of a.questionIds){const q=bank.find(x=>x.id===id);if(q&&!['essay','coding'].includes(q.type)&&!scoreAnswer(q,a.answers[id]??[]))ids.add(id);}return [...ids];}
