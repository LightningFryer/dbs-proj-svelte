import type { FieldPacket, QueryResult } from 'mysql2';
import { writable } from 'svelte/store';



export const queryRows = writable<any[]>([]);
export const queryFields = writable<any[]>([]);
