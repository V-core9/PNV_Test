import * as React from 'react';
import DocHead from './DocHead';
import ResponsiveAppBar from './ResponsiveAppBar';
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

import Copyright from './Copyright';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
  id?: any,
  slug?: any,
  title?: any,
  body?: any,
  description?: any
}

function ScrollTop(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

const PageLayout = (props: Props) => {
  let { id, slug, title, body, description } = props;
  return (
    <>

      <DocHead
        title={title}
        description={description}
      />

      <CssBaseline />

      <ResponsiveAppBar />

      <Toolbar id="back-to-top-anchor" sx={{ minHeight: '0px!important', }} />

      <Container>
        {props.children && props.children}
        {body && <div dangerouslySetInnerHTML={{ __html: body }}></div>}
      </Container>

      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

      <Copyright sx={{ mt: 5, padding: 1 }} />
    </>
  )
}

export default PageLayout;
