import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Application } from 'express';
import type { Route } from './routes.js';

const setupProxies = (app: Application, routes: Route[]) => {
    routes.forEach(route => {
        const options = {
            ...route.proxy,
            target: `${route.proxy.target}${route.url}`,
            pathRewrite: { [`^${route.url}`]: route.url },
                // Remove conditional caching headers from upstream responses so
                // the browser won't receive ETag and reply with 304 Not Modified.
                onProxyRes: (proxyRes: any, req: any, res: any) => {
                    try {
                        if (proxyRes.headers) {
                            delete proxyRes.headers['etag'];
                            delete proxyRes.headers['ETag'];
                            // enforce no-cache for safety
                            proxyRes.headers['cache-control'] = 'no-store, no-cache, must-revalidate, proxy-revalidate';
                        }
                    } catch (e) {
                        // ignore
                    }
                }
        } as any;
        app.use(route.url, createProxyMiddleware(options));
    })
}

export { setupProxies };