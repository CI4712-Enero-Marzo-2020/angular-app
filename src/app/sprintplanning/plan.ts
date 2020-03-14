export interface Plan {
    id: number;
    subject: string;
    user_story_id: number[];
    activity: string;
    assigned: User[];
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
}