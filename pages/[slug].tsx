import * as React from 'react';
import { GetServerSideProps } from "next"
import type { NextPage } from 'next';
import pagesService from '../services/pages';
const { findPageBySlug } = pagesService;
import DocHead from '../components/DocHead';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import PageLayout from '../components/PageLayout';

export const getServerSideProps: GetServerSideProps = async ({ params, res }: any) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const page = await findPageBySlug(params.slug);
  return ((!page) ? { notFound: true, } : { props: JSON.parse(JSON.stringify(page)), });
}

const PageBySlug: NextPage<any> = (props = {}) => {
  return (
    <>
      <PageLayout {...props} />
    </>
  )
}

export default PageBySlug;
