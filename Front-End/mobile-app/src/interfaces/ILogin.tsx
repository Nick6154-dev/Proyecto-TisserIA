
export interface LoginResponse {
    user: User;
    token: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    image: Image;
    designs_user: [designs_user];
}
export interface designs_user {
    title: string;
    description: string;
    image_design: Image;
    message: string;
}

export interface Image {
    public_id: string;
    image_url: string;
}

export interface LoginData {
    email: string;
    password: string;
}
export interface RegisterData {
    email: string;
    password: string;
    username: string;
}


