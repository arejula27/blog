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
    " prose  prose-2xl prose-headings:text-headline prose-p:text-base" +
    " prose-pre:bg-card-background prose-pre:text-stroke prose-p:text-paragraph prose-li:marker:text-tertiary" +
    " prose-h1:w-full prose-h1:border-b prose-h1:p-5 prose-h1:border-stroke" +
    " prose-a:text-stroke prose-a:font-bold  hover:prose-a:text-tertiary";

export const PostPage: FC<Props> = ({ post }) => {
    return (
        <MainLayout title={post.metadata.title}>
            <div className="flex justify-center bg-primary  py-10 w-full">
                <div className="bg- py-10  xs:px-6 sm:px-20  w-auto ">
                    <div className="text-tertiary  flex justify-end w-100% ">
                        {post.metadata.date}
                    </div>
                    <div className={mdStyle}>
                        <h1>{post.metadata.title}</h1>
                        <div className=""></div>

                        <ReactMarkdown rawSourcePos skipHtml={true}>
                            {post.content}
                        </ReactMarkdown>
                    </div>
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
