export interface OAuthTokenBase {
    access_token: string;
    token_type: string;
    expires_in?: number;
    refresh_token?: string;
    scope?: string;
}

export interface YandexToken extends OAuthTokenBase {
    token_type: "bearer";
}

export interface GoogleToken extends OAuthTokenBase {
    token_type: "Bearer";
    id_token: string;
}

export interface GitHubToken {
    access_token: string;
    token_type: "bearer";
    scope: string;
}
