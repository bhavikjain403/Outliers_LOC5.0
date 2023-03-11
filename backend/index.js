const app = require('./app');
const express = require('express');
const http = require('http');
const connectToDB = require('./db');
const PORT = process.env.PORT || 7000
connectToDB();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});