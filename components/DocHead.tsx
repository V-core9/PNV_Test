import Head from 'next/head';

interface DocHeadProps {
  title: string,
  description: string,
  favicon?: string,
}

const DocHead = (props: DocHeadProps) => {
  const title = props.title || 'Document missing title';
  const description = props.description || 'Document missing description';
  const favicon = props.favicon || '/favicon.ico';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={favicon} />
    </Head>
  )
}

export default DocHead;
