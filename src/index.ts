import { createDB } from "./core/db";
import { createRPCServer } from "./network/rpc";
import { createSwarm } from "./network/swarm";
import { NotesService } from "./services/Notes.service";
import crypto from "crypto";

async function main() {
    const db = await createDB();
    const swarm = await createSwarm(db);
    const rcpServer = createRPCServer(db);
    const notesService = new NotesService(db);

    const topic = crypto.createHash('sha256').update('p2p-notes').digest();
    swarm.join(topic);

    await notesService.addNote('Note 1', 'Content 1');
    await notesService.addNote('Note 2', 'Content 2');
    console.log(await notesService.listNotes());
}

main().catch(console.error);