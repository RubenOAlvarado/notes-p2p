import { HyperbeeDB } from '../types/HyperbeeDB.type';

export class NotesService {
    constructor(private db: HyperbeeDB) { }

    async addNote(title: string, content: string): Promise<void> {
        const note = { title, content, timestamp: Date.now() };
        await this.db.put(note.title, note);
    }

    async listNotes(): Promise<{ title: string; timestamp: number }[]> {
        const notes: { title: string; timestamp: number }[] = [];
        for await (const { key, value } of this.db.createReadStream()) {
            notes.push({ title: key, timestamp: value.timestamp });
        }
        return notes;
    }
}