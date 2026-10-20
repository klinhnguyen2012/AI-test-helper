import type { Question } from '../types';
export function scoreAnswer(q:Question, answer:string[]):boolean {
 if(q.type==='essay'||q.type==='coding') return false;
 if(q.type==='numeric') { const value=Number(answer[0]); return Number.isFinite(value) && Math.abs(value-q.numericAnswer!.value)<=q.numericAnswer!.tolerance+Number.EPSILON; }
 return answer.length===q.correctAnswers.length && [...answer].sort().every((v,i)=>v=== [...q.correctAnswers].sort()[i]);
}
export function validateQuestionBank(bank:Question[]) {
 const errors:string[]=[]; const ids=new Set<string>();
 if(bank.length<120) errors.push(`Expected at least 120 questions, found ${bank.length}`);
 const counts={A:0,B:0,C:0,D:0};
 for(const q of bank){ if(ids.has(q.id)) errors.push(`Duplicate id: ${q.id}`); ids.add(q.id); counts[q.module]++;
  if(!q.question.trim()||!q.explanation.trim()||!q.tags.length) errors.push(`Incomplete question: ${q.id}`);
  if(['single','multiple','code'].includes(q.type)&&(!q.options||!q.correctAnswers.length)) errors.push(`Missing options or key: ${q.id}`);
  if(q.type==='single'&&q.correctAnswers.length!==1) errors.push(`Single choice key count: ${q.id}`);
  if(q.options&&new Set(q.options.map(option=>option.id)).size!==q.options.length) errors.push(`Duplicate option id: ${q.id}`);
  if(q.options&&new Set(q.options.map(option=>option.text)).size!==q.options.length) errors.push(`Duplicate option text: ${q.id}`);
  if(q.options&&q.correctAnswers.some(answer=>!q.options!.some(option=>q.type==='multiple'?option.id===answer:option.text===answer))) errors.push(`Answer key not present in options: ${q.id}`);
  if(q.type==='numeric'&&!q.numericAnswer) errors.push(`Missing numeric answer: ${q.id}`);
 }
 if(counts.A<30||counts.B<40||counts.C<30||counts.D<20) errors.push(`Module distribution invalid: ${JSON.stringify(counts)}`);
 const codeCount=bank.filter(q=>!!q.codeSnippet).length;
 if(codeCount<42) errors.push(`Expected at least 40 code questions, found ${codeCount}`);
 return {errors,counts};
}
export function grade(ids:string[], bank:Question[], answers:Record<string,string[]>) { const allRows=ids.map(id=>{const q=bank.find(x=>x.id===id)!;return {q,answer:answers[id]??[],correct:!['essay','coding'].includes(q.type)&&scoreAnswer(q,answers[id]??[])};});const essays=allRows.filter(r=>r.q.type==='essay'||r.q.type==='coding');const rows=allRows.filter(r=>r.q.type!=='essay'&&r.q.type!=='coding');const correct=rows.filter(r=>r.correct).length; return {rows,essays,correct,incorrect:rows.length-correct,score:rows.length?Math.round(correct/rows.length*10000)/100:0}; }
