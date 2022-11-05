export interface PostData {
    title: string;
    date: string;
    description: string;
    slug: string;
}

export interface Post {
    metadata: PostData;
    content: string;
}
