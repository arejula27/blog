import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC } from "react";
import { ReaderMd } from "../../../utils";
import { Post } from "../../../interfaces/";

interface Props {
    post: Post;
}

export const PostPage: FC<Props> = ({ post }) => {
    return <div>PostPage {post.metadata.title}</div>;
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const posts = ReaderMd.getPostNames();

    return {
        paths: posts.map((post) => ({
            params: { post },
        })),
        //con esto logramos que se generen en tiempo de ejecución las pantallas
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    //const { data } = await  // your fetch function here
    const postData = params as { post: string };
    const post = ReaderMd.getPostBySlug(postData.post);

    //si no existe volvemos al home
    if (!post) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            post,
        },
    };
};

export default PostPage;
