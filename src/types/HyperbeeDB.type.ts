import { Note } from "../interfaces/Note.interface";

export type HyperbeeDB = {
    put(key: string, value: Note): Promise<void>;
    get(key: string): Promise<Note | null>;
    createReadStream(): AsyncIterable<{ key: string; value: Note }>;
};