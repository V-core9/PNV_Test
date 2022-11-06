//import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" display="flex" gap=".5em" align="center" justifyContent="center" borderTop="1px solid #20304014" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        V-core9
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
