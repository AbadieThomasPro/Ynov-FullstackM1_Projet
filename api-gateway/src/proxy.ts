import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Application } from 'express';
import type { Route } from './routes.js';

const setupProxies = (app: Application, routes: Route[]) => {
    routes.forEach(route => {
        console.log(`[PROXY SETUP] Mounting proxy for ${route.url} -> ${route.proxy.target}`);
        const options = {
            ...route.proxy,
            target: route.proxy.target,
            pathRewrite: (path: string, req: any) => {
                // Réécrit le chemin en rajoutant le préfixe de route qu'Express a retiré
                // Exemple: /swagger -> /user/swagger, /auth/register -> /user/auth/register
                const newPath = `${route.url}${path}`;
                console.log(`[PROXY] ${route.url} : ${path} -> ${newPath} (target: ${route.proxy.target})`);
                return newPath;
            },
            onProxyRes: (proxyRes: any, req: any, res: any) => {
                try {
                    if (proxyRes.headers) {
                        delete proxyRes.headers['etag'];
                        delete proxyRes.headers['ETag'];
                        proxyRes.headers['cache-control'] = 'no-store, no-cache, must-revalidate, proxy-revalidate';
                    }
                } catch (e) { }
            }
        } as any;
        app.use(route.url, createProxyMiddleware(options));
    });
};

export { setupProxies };