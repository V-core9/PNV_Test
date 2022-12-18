import type { NextPage } from 'next';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReCAPTCHA from "react-google-recaptcha";

import PageLayout from '../components/PageLayout';


const theme = createTheme();

export async function getStaticProps(context:any) {
  return {
    props: {
      recaptchaKey: process.env.RECAPTCHA_KEY || null
    }, // will be passed to the page component as props
  }
}

const ForgotPassword: NextPage = (props:any) => {
  const recaptchaKey = props.recaptchaKey || null;
  const [reCaptcha, setReCaptcha] = React.useState(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      recaptcha: reCaptcha
    });
  };

  return (

    <PageLayout title="V-core9 - Forgot Password" description="Forgot Password Page Spaceholder" >

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h4">
            Enter the email address of the associated account and we will send you a link to reset your password.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {recaptchaKey && <ReCAPTCHA
              sitekey={recaptchaKey}
              onChange={setReCaptcha}
            />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Continue
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Register new account"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

    </PageLayout>
  );
}

export default ForgotPassword;
