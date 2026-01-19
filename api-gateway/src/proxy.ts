import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Application } from 'express';
import type { Route } from './routes.js';

const setupProxies = (app: Application, routes: Route[]) => {
    routes.forEach(route => {
        console.log(`[PROXY SETUP] Mounting proxy for ${route.url} -> ${route.proxy.target}`);
        const options = {
            ...route.proxy,
            // target: `${route.proxy.target}${route.url}`,
            target: route.proxy.target,
            timeout: 30000, // 30 secondes
            proxyTimeout: 30000,
            changeOrigin: true,
            logLevel: 'debug',
            onError: (err: any, req: any, res: any) => {
                console.error(`[PROXY ERROR] ${err.message}`, err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Proxy error: ' + err.message);
            },
            pathRewrite: (path: string, req: any) => {
                // Express retire déjà le préfixe (ex: /user), on doit le rajouter
                // path reçu = /swagger (Express a enlevé /user)
                // path reçu = /auth/register (Express a enlevé /user)
                // on retourne /user/auth/register pour le backend
                const newPath = `${route.url}${path}`;
                console.log(`[PROXY] ${route.url} : ${path} -> ${newPath} (target: ${route.proxy.target})`);
                return newPath;
            },
            onProxyReq: (proxyReq: any, req: any, res: any) => {
                console.log(`[PROXY REQ] ${req.method} ${req.url} -> ${route.proxy.target}${proxyReq.path}`);
            },
            //     // on retourne /user/swagger pour le backend
            //     return `${route.url}${path}`;
            // },
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