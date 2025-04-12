import { RPCServer } from 'dht-rpc';
import { HyperbeeDB } from '../types/HyperbeeDB.type';

export function createRPCServer(db: HyperbeeDB): RPCServer {
    const server = new RPCServer({
        protocol: 'p2p-notes-rpc'
    });

    server.respond('getNotes', async () => {
        const notes: { key: string; value: any }[] = [];
        for await (const {key, value} of db.createReadStream()) {
            notes.push({ key, value});
        }
        return notes;
    });

    return server;
}