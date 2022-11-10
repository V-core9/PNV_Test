import React from "react"
import { GetServerSideProps } from "next"
import pagesService from '../services/pages';
const { findPageBySlug } = pagesService;
import DocHead from '../components/DocHead';

export const getServerSideProps: GetServerSideProps = async ({ params, res }: any) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const page = await findPageBySlug(params.slug);
  return ((!page) ? { notFound: true, } : { props: JSON.parse(JSON.stringify(page)), });
}

const SingleUserPage: React.FC<any> = (props = {}) => {
  let { id, slug, title, body, description } = props;
  return (
    <div>

      <DocHead
        title={title}
        description={description}
      />

      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
    </div>
  )
}

export default SingleUserPage;
