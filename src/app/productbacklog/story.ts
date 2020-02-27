export interface Story {
    id: number;
    description: string;
    project_id: number;
    priority: number;
    epic: boolean;
    done: boolean;
    date_created: Date;
}