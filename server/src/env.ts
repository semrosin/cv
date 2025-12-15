import "dotenv/config";

function must(name: string): string {
    const v = process.env[name];
    if (!v) throw new Error(`Missing env: ${name}`);
    return v;
}
export const ENV = {
    PORT: !process.env.PORT || 3001,
    JWT_SECRET: must("JWT_SECRET"),

    FRONTEND_URL: must("FRONTEND_URL"),

    YANDEX: {
        ID: must("YANDEX_CLIENT_ID"),
        SECRET: must("YANDEX_CLIENT_SECRET"),
        REDIRECT: must("YANDEX_REDIRECT_URI"),
    },

    GOOGLE: {
        ID: must("GOOGLE_CLIENT_ID"),
        SECRET: must("GOOGLE_CLIENT_SECRET"),
        REDIRECT: must("GOOGLE_REDIRECT_URI"),
    },

    GITHUB: {
        ID: must("GITHUB_CLIENT_ID"),
        SECRET: must("GITHUB_CLIENT_SECRET"),
        REDIRECT: must("GITHUB_REDIRECT_URI"),
    },
};
