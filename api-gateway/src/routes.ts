interface Route {
    url: string;
    auth: boolean;
    creditCheck: boolean;
    rateLimit?: {
        windowMs: number;
        max: number;
    };
    proxy: {
        target: string;
        router?: { [key: string]: string };
        changeOrigin: boolean;
        pathFilter?: string;
        pathRewrite?: { [key: string]: string };
    };
}

const ROUTES: Route[] = [
    {
        url: '/public',
        auth: false,
        creditCheck: false,
        proxy: {
            target: "http://localhost:3030",
            changeOrigin: true,
        }
    },
    {
        url: '/private',
        auth: false,
        creditCheck: false,
        proxy: {
            target: "http://localhost:3333",
            changeOrigin: true,
        }
    }
];

export { ROUTES };
export type { Route };