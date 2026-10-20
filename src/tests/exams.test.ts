import { describe, expect, it } from 'vitest';
import { createExam, seededShuffle } from '../utils/exams';
import { questions } from '../data/questions';
describe('exam generation',()=>{
 it('reproduces a seeded shuffle without duplicate questions',()=>{expect(seededShuffle([1,2,3,4],42)).toEqual(seededShuffle([1,2,3,4],42)); const exam=createExam(questions,{mode:'mixed',count:20,difficulty:'mixed',minutes:45},42);expect(new Set(exam.map(q=>q.id)).size).toBe(20);});
 it('selects code questions for focused practice',()=>{const exam=createExam(questions,{mode:'code',count:10,difficulty:'mixed',minutes:0},7);expect(exam).toHaveLength(10);expect(exam.every(q=>q.codeSnippet)).toBe(true);});
 it('builds the full Vietnamese 60-question mock with five essays and two Python responses',()=>{const exam=createExam(questions,{mode:'mixed',count:60,difficulty:'mixed',minutes:90},91);expect(exam).toHaveLength(60);expect(exam.filter(q=>q.type==='essay')).toHaveLength(5);expect(exam.filter(q=>q.type==='coding')).toHaveLength(2);expect(new Set(exam.map(q=>q.id)).size).toBe(60);expect(questions.find(q=>q.id==='A001')?.question).toContain('súc sắc');});
 it('reserves four long math-code reading questions in every full mock',()=>{const exam=createExam(questions,{mode:'mixed',count:60,difficulty:'mixed',minutes:90},17);const mathCode=exam.filter(q=>q.tags.includes('math-code'));expect(mathCode).toHaveLength(4);expect(mathCode.every(q=>q.type==='code'&&q.difficulty==='hard'&&(q.codeSnippet?.split('\n').length??0)>=5)).toBe(true);});
});
