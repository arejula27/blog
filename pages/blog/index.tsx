import { GetStaticProps } from "next";
import React, { FC } from "react";
import { MainLayout } from "../../components/layouts";
import Link from "next/link";
import Head from "next/head";
import { PostData } from "../../interfaces";
import { ReaderMd } from "../../utils/ReaderMD";

interface Props {
    posts: PostData[];
}

const BlogPage: FC<Props> = ({ posts }) => {
    return (
        <MainLayout title="Blog - Íñigo Aréjula ">
            <Head>
                <meta charSet="utf-8" />
            </Head>
            <div>
                <ul>
                    {posts.map((post, i) => (
                        <li key={i}>
                            <Link href={`/blog/${post.slug}`}>
                                {post.title}
                            </Link>
                            <p>{post.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
    const data = ReaderMd.getAllPostsMetadata();
    return {
        props: {
            posts: data,
        },
    };
};

export default BlogPage;
