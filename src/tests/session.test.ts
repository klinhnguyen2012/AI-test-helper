import { describe, expect, it } from 'vitest';
import { resolveSessionType, sessionDeadline } from '../utils/session';
describe('session timing', () => {
 it('leaves Mock untimed even when a duration is selected', () => {
  expect(sessionDeadline('mock', 1000, 90)).toBeNull();
 });
 it('sets an Exam deadline from its start time and duration', () => {
  expect(sessionDeadline('exam', 1000, 90)).toBe(5401000);
 });
 it('keeps Exam timed with the 90-minute default if the duration is invalid', () => {
  expect(sessionDeadline('exam', 1000, 0)).toBe(5401000);
 });
 it('keeps saved sessions identifiable and infers legacy attempts from their deadline', () => {
  expect(resolveSessionType('mock', 91000)).toBe('mock');
  expect(resolveSessionType(undefined, 91000)).toBe('exam');
  expect(resolveSessionType(undefined, null)).toBe('mock');
 });
});
