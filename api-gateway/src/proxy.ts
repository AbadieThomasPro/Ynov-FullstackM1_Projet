import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Application } from 'express';
import type { Route } from './routes.js';

const setupProxies = (app: Application, routes: Route[]) => {
    routes.forEach(route => {
        const options = {
            ...route.proxy,
            target: `${route.proxy.target}${route.url}`,
            // target: route.proxy.target,
            // pathRewrite: (path: any, req: any) => {
            //     // Ne réécrit pas /user/swagger (ni /user/swagger/), laisse tel quel
            //     if (path.startsWith('/user/swagger')) return path;
            //     // Sinon, retire /user du début
            //     return path.replace(/^\/user/, '');
            // },
            //pathRewrite: { [`^${route.url}`]: route.url },
                
            //target: route.proxy.target,
            // pathRewrite: (path: string, req: any) => {
            //     // Si c'est la racine (ex: /user), ne réécrit rien
            //     if (path === route.url || path === route.url + '/') {
            //         return path;
            //     }
            //     // Sinon, retire le préfixe (ex: /user/swagger -> /swagger)
            //     return path.replace(new RegExp(`^${route.url}`), '');
            // },
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