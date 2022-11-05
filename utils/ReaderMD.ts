import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { Post, PostData } from "../interfaces";

const ReaderMd = {
    getAllPostsMetadata: () => {
        const files = readdirSync(`${process.cwd()}/content`, "utf-8");
        const posts = files.filter((fn: string) => fn.endsWith(".md"));

        const postData: PostData[] = posts.map((post: string) => {
            const path: string = `${process.cwd()}/content/${post}`;
            const rawContent = readFileSync(path, {
                encoding: "utf-8",
            });
            const { content, data } = matter(rawContent);

            return data as PostData;
        });

        return postData;
    },

    getPostNames: () => {
        return ReaderMd.getAllPostsMetadata().map((post) => {
            return post.slug;
        });
    },

    getPostBySlug: (slug: string): Post | null => {
        const files = readdirSync(`${process.cwd()}/content`, "utf-8");
        const posts = files.filter((fn: string) => fn.endsWith(".md"));
        let postWithSlug: Post | null = null;
        posts.forEach(async (post: string) => {
            const path: string = `${process.cwd()}/content/${post}`;
            const rawContent = readFileSync(path, {
                encoding: "utf-8",
            });
            const { content, data } = matter(rawContent);

            if (data.slug === slug) {
                postWithSlug = {
                    metadata: data as PostData,
                    content,
                };
            }
        });

        return postWithSlug;
    },
};

export { ReaderMd };
