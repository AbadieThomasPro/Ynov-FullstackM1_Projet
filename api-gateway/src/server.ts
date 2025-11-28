import express from "express";
import cors from "cors";
import { setupProxies } from "./proxy.js";
import { setupLogging} from "./loggings.js";
import { ROUTES } from "./routes.js";

const app = express();
const port = process.env.PORT || 3000;

// parse JSON bodies
app.use(express.json());

// enable CORS for the frontend dev server
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));

// logging (centralisé)
setupLogging(app);

// Disable ETag generation to avoid 304 Not Modified responses during dev
app.disable('etag');

// Prevent caching of proxied responses in development so the frontend always
// receives a fresh body (helps avoid 304 responses interfering with NGXS updates)
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  next();
});

// Strip conditional request headers so upstream cannot return 304 Not Modified.
// This prevents the browser from receiving a 304 with no body which would
// leave the frontend state unchanged.
app.use((req, res, next) => {
  try {
    delete (req.headers as any)['if-none-match'];
    delete (req.headers as any)['if-modified-since'];
  } catch (e) {
    // ignore
  }
  next();
});

// Ensure ETag header is removed from responses before being sent to client.
// We wrap writeHead so headers set by downstream (proxy or upstream) can be
// removed just before transport to the browser.
app.use((req, res, next) => {
  const originalWriteHead = (res as any).writeHead?.bind(res);
  if (originalWriteHead) {
    (res as any).writeHead = function (...args: any[]) {
      try {
        (res as any).removeHeader?.('ETag');
        (res as any).removeHeader?.('etag');
      } catch (e) {
        // ignore
      }
      return originalWriteHead(...args);
    };
  }
  next();
});


app.get("/", (req, res) => res.send("Hello from API Gateway!"));

setupProxies(app, ROUTES);

// basic error handler for readable errors during dev
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err?.message || "Internal Server Error" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));