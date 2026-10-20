import {describe,expect,it} from 'vitest';
import {wrongQuestionIds} from '../utils/storage';
import {questions} from '../data/questions';
import type {Attempt} from '../types';

describe('missed question selection',()=>{
 it('uses the real scoring rules for numeric tolerance and exact multiple-select answers',()=>{
  const numeric=questions.find(q=>q.type==='numeric')!;const multiple=questions.find(q=>q.type==='multiple')!;
  const attempt:Attempt={id:'practice',createdAt:new Date().toISOString(),durationSeconds:10,score:0,questionIds:[numeric.id,multiple.id],answers:{[numeric.id]:[String(numeric.numericAnswer!.value+.005)],[multiple.id]:[...multiple.correctAnswers,'C']},marked:[]};
  expect(wrongQuestionIds([attempt],questions)).toEqual([multiple.id]);
 });
});
