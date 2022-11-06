import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC } from "react";
import { ReaderMd } from "../../../utils";
import { Post } from "../../../interfaces/";
import ReactMarkdown from "react-markdown";
import { MainLayout } from "../../../components/layouts";

interface Props {
    post: Post;
}

const mdStyle =
    " prose  prose-2xl prose-headings:text-headline prose-p:text-base prose-pre:bg-stroke prose-p:text-paragraph prose-li:marker:text-tertiary";

export const PostPage: FC<Props> = ({ post }) => {
    return (
        <MainLayout>
            <div className="flex justify-center bg-primary  py-10 ">
                <div className=" bg-card-background p-10 ">
                    <div className="text-tertiary  flex justify-end w-100% ">
                        {post.metadata.date}
                    </div>
                    <ReactMarkdown
                        className={mdStyle}
                        rawSourcePos
                        skipHtml={true}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
                {/* tags*/}
            </div>
        </MainLayout>
    );
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
                destination: "/blog",
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
