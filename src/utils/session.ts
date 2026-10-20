export type SessionType = 'mock' | 'exam';

export function sessionDeadline(sessionType: SessionType, startedAt: number, minutes: number): number | null {
  return sessionType === 'exam' ? startedAt + (minutes > 0 ? minutes : 90) * 60_000 : null;
}

export function resolveSessionType(sessionType: SessionType | undefined, deadline: number | null): SessionType {
  return sessionType ?? (deadline ? 'exam' : 'mock');
}
