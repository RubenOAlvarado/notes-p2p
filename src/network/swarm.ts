import Hyperswarm from 'hyperswarm';
import { CoreStore } from 'hypercore';

export async function createSwarm(core: CoreStore): Promise<Hyperswarm> {
    const swarm = new Hyperswarm();
    swarm.on('connection', (socket: any) => core.replicate(socket));

    return {
        join: (topic: string) => swarm.join(topic, { server: true, client: true }),
        leave: (topic: string) => swarm.leave(topic),
    };
}