import express from 'express';
import ordersRouter from './routes/orders';
import printRouter from './routes/print';

const app = express();
const PORT = parseInt(process.env.PORT ?? '3001', 10);
const DELAY_MS = parseInt(process.env.MOCK_DELAY_MS ?? '0', 10);

// Middleware
app.use(express.json());

// Auth validation middleware - accept any Bearer token
app.use('/v3', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: Bearer token required' });
    return;
  }
  next();
});

// Optional delay to simulate network latency
if (DELAY_MS > 0) {
  app.use('/v3', (_req, _res, next) => {
    setTimeout(next, DELAY_MS);
  });
}

// Request logging
app.use('/v3', (req, _res, next) => {
  console.log(`[Mock Clover] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use(ordersRouter);
app.use(printRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'mock-clover' });
});

app.listen(PORT, () => {
  console.log(`Mock Clover API running on port ${PORT}`);
  if (DELAY_MS > 0) {
    console.log(`Simulated latency: ${DELAY_MS}ms`);
  }
});

export default app;
