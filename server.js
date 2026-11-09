import { createServer } from 'node:http';
import { PORT } from './src/config.js';
import { handleRequest } from './src/router.js';
import { seedData } from './src/services/seed.js';

const server = createServer((req, res) => handleRequest(req, res));
await seedData();
server.listen(PORT, () => console.log(`Nuestro Universo en http://localhost:${PORT}`));
