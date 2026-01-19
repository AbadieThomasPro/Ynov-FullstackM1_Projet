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
        pathRewrite?: { [key: string]: string };//
    };
}

// Configure via env vars. En Docker Compose on passera RECIPE_HOST=api-recipe etc.
// En dev local (tout en local) on peut omettre et laisser 'localhost'.
const RECIPE_HOST = process.env.RECIPE_HOST || 'localhost';
const USER_HOST = process.env.USER_HOST || 'localhost';


const ROUTES: Route[] = [
    {
        url: '/user',
        auth: false,
        creditCheck: false,
        proxy: {
            target: `http://${USER_HOST}:3001`,
            changeOrigin: true,
        }
    },
    {
        url: '/recipe',
        auth: false,
        creditCheck: false,
        proxy: {
            target: `http://${RECIPE_HOST}:3002`,
            changeOrigin: true,
        }
    },
];

export { ROUTES };
export type { Route };