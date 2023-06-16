import Layout from '../../components/layout';
import Date from '../../components/date';
import Head from 'next/head';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }){
    console.log(' --------- POSTTT/////');
    console.log(postData);
    return (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingX1}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date}/>
            </div>
            <div dangerouslySetInnerHTML={{__html: postData.contentHTML}} />
        </article>
    </Layout>
    )
}

export async function getStaticPaths(){
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }){
    console.log("-------- PARAMS", params);
    const res = await fetch('https://api.github.com/repos/vercel/next.js');
    const repo = await res.json();
    
    const postData = await getPostData(params.id);
    return {
        props:{
            postData,
            repo
        },
    }
}