import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Application } from 'express';
import type { Route } from './routes.js';

const setupProxies = (app: Application, routes: Route[]) => {
    routes.forEach(route => {
        app.use(route.url, createProxyMiddleware(route.proxy));
    })
}

export { setupProxies };