export interface Story {
    id: number;
    description: string;
    project_id: number;
    priority: string;
    epic: boolean;
    done: boolean;
    date_created: Date;
    parent_id: number | null;
    estimation: number;
}
