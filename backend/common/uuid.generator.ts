import { randomUUID } from 'crypto';

/** Single place every module calls to generate a record id, so it's easy to swap later. */
export function generateId(): string {
  return randomUUID();
}
