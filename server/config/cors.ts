import cors from 'cors';

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

export const corsMiddleware = cors(corsOptions); 