import Layout from "../../../../components/layout";
import { getAllPostIds, getSortedPostsData } from "../../../../lib/prevPosts";
import utilStyles from "../../../../styles/utils.module.css";
import Head from "next/head";
import Link from "next/link";
import Date from "../../../../components/date";
import { GetStaticProps, GetStaticPaths } from "next";

export default function eachDatePostsList({ allDatePostsData }) {
    return (
        <Layout>
            <Head>
                <title>head title</title>
            </Head>
            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
                <h1 className={utilStyles.headingXl}>
                    {allDatePostsData[0].year}年 {allDatePostsData[0].month}月{" "}
                    {allDatePostsData[0].date}日 に投稿された記事
                </h1>
                <h2 className={utilStyles.headingLg}>
                    {allDatePostsData.length} 件見つかりました
                </h2>
                <ul className={utilStyles.list}>
                    {allDatePostsData.map(
                        ({ id, year, month, date, created_at, title }) => (
                            <li
                                className={utilStyles.listItem}
                                key={created_at}
                            >
                                <Link
                                    href={`/posts/${year}/${month}/${date}/${id}`}
                                >
                                    {title}
                                </Link>
                                <br />
                                <small className={utilStyles.lightText}>
                                    <Date dateString={created_at} />
                                </small>
                            </li>
                        )
                    )}
                </ul>
            </section>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const allDatePostsData = getSortedPostsData(
        params.year as string,
        params.month as string,
        params.date as string
    );
    return {
        props: {
            allDatePostsData,
        },
    };
};
