import { PostProps } from './post.types';

export interface UserProps {
    name: string;
    email: string;
    password: string;
    posts?: PostProps[] | null;
}