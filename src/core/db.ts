import Hypercore from "hypercore";
import Hyperbee from "hyperbee";
import { HyperbeeDB } from "../types/HyperbeeDB.type";
import { Note } from "../interfaces/Note.interface";

export async function createDB(): Promise<HyperbeeDB> {
    const core = new Hypercore('./storage', { valueEncoding: 'json' });
    await core.ready();

    const db = new Hyperbee(core, {
        keyEncoding: 'utf-8',
        valueEncoding: 'json',
    });
    await db.ready();

    return {
        put: async (key: string, value: Note) => {
            await db.put(key, value);
        },
        get: async (key: string) => {
            const result = await db.get(key);
            return result?.value as Note || null;
        },
        createReadStream: () => db.createReadStream(),
    };
}