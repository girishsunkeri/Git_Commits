export interface Commit {
    sha: string;
    authorName: string;
    authorEmail: string;
    date: Date;
    message: string;
    url: string;
}