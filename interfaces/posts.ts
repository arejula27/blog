export interface PostData {
    title: string;
    date: string;
    description: string;
    slug: string;
    tags: string[];
}

export interface Post {
    metadata: PostData;
    content: string;
}
