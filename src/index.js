import http from 'http';
import app from './app/app.js';
import { connectDB, disconnectDB } from './config/database.js';

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

connectDB();

// Graceful Shutdown
const shutdown = async () => {
	await disconnectDB();
	console.log('Shutting down server...');
	server.close(() => {
		console.log('Server closed.');
		process.exit(0);
	});
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

server.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
