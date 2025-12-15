export interface YandexProfile {
    id: string;
    login: string;
    client_id: string;
    display_name: string;
    real_name?: string;
    first_name?: string;
    last_name?: string;
    sex?: "male" | "female";
    default_email?: string;
    emails?: string[];
    default_avatar_id?: string;
    is_avatar_empty?: boolean;
}

export interface GoogleProfile {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale?: string;
}

export interface GitHubProfile {
    id: number;
    login: string;
    name?: string;
    email?: string;
    avatar_url: string;
    html_url: string;
    bio?: string;
}
