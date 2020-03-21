export interface Retrospective {
    id: number;
    date: Date;
    method: string;
    positive: string;
    negative: string;
    decision: string;
    sprint_id: number;
}