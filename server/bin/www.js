#!/usr/bin/env node
import http from 'http';
import debug from 'debug';
import process from 'process';
import chalk from 'chalk';

import app from '../app.js';
import config from '../src/config/config.js';

// Normalize port
const port = normalizePort(config.app.port);
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a number, string, or false
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

// Event listener for HTTP server "error" event
function onError(error) {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    
    console.log('\n' + chalk.green('================================='));
    console.log(chalk.blue('🚀 Server Status'));
    console.log(chalk.green('================================='));
    console.log(chalk.yellow('Environment:    '), chalk.white(config.app.env));
    console.log(chalk.yellow('Server:         '), chalk.white(`http://localhost:${port}`));
    console.log(chalk.yellow('API Docs:       '), chalk.white(`http://localhost:${port}/api/docs`));
    console.log(chalk.yellow('Database:       '), chalk.white(`${config.db.host}:${config.db.port}/${config.db.name}`));
    console.log(chalk.green('=================================\n'));

    debug('Listening on ' + bind);
}