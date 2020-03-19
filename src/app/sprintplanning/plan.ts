export interface Plan {
    id: number;
    planning_id: number;
    subject: string;
    user_story_id: string;
    activity: string;
    assigned: string;
}

export interface Planning {
    id: number;
    results: Plan[];
    date: Date;
    sprint_id: number;
}