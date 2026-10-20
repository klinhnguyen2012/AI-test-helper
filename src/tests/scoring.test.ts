import { describe, expect, it } from 'vitest';
import { grade, scoreAnswer, validateQuestionBank } from '../utils/scoring';
import { questions } from '../data/questions';

describe('scoring', () => {
  it('requires every multiple-select choice and rejects extras', () => {
    const q = questions.find((item) => item.type === 'multiple')!;
    expect(scoreAnswer(q, q.correctAnswers)).toBe(true);
    expect(scoreAnswer(q, [q.correctAnswers[0]])).toBe(false);
    expect(scoreAnswer(q, [...q.correctAnswers, 'invalid'])).toBe(false);
  });
  it('accepts numbers only inside the configured tolerance', () => {
    const q = questions.find((item) => item.type === 'numeric')!;
    const expected = q.numericAnswer!.value;
    expect(scoreAnswer(q, [String(expected + q.numericAnswer!.tolerance)])).toBe(true);
    expect(scoreAnswer(q, [String(expected + q.numericAnswer!.tolerance + 0.01)])).toBe(false);
  });
  it('keeps essays out of automatic scoring while preserving written responses',()=>{
    const essay=questions.find(q=>q.type==='essay')!;
    const result=grade([essay.id],questions,{[essay.id]:['Bài làm của tôi']});
    expect(result.score).toBe(0);
    expect(result.essays).toHaveLength(1);
    expect(result.essays[0].answer).toEqual(['Bài làm của tôi']);
  });
  it('keeps the reference Bayes, matrix, and F1 answers in the keyed bank',()=>{
    expect(questions.find(q=>q.id==='A011')?.correctAnswers).toContain('0.308');
    expect(questions.find(q=>q.id==='A024')?.correctAnswers).toContain('[[4, 4], [10, 8]]');
    expect(questions.find(q=>q.id==='C018')?.correctAnswers).toContain('0.73');
  });
  it('ships a unique, complete bank with at least 120 valid questions', () => {
    const result = validateQuestionBank(questions);
    expect(result.errors).toEqual([]);
    expect(questions).toHaveLength(135);
    expect(questions.filter(q=>q.codeSnippet).length).toBeGreaterThanOrEqual(42);
    expect(questions.filter(q=>q.difficulty==='easy').length).toBe(36);
    expect(questions.filter(q=>q.difficulty==='medium').length).toBe(65);
    expect(questions.filter(q=>q.difficulty==='hard').length).toBe(34);
    expect(questions.filter(q=>q.type==='essay')).toHaveLength(5);
    expect(questions.filter(q=>q.type==='coding')).toHaveLength(2);
    const mathCode=questions.filter(q=>q.tags.includes('math-code'));
    expect(mathCode).toHaveLength(8);
    expect(mathCode.every(q=>q.type==='code'&&q.difficulty==='hard'&&(q.codeSnippet?.split('\n').length??0)>=5)).toBe(true);
  });
});
