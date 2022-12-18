import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
//import Link from 'next/link';
import styles from '../styles/Home.module.css';

import Copyright from '../../components/Copyright';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { FormEvent, useState, ReactElement, useEffect } from 'react';
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
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReCAPTCHA from "react-google-recaptcha";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';

import PageLayout from '../../components/PageLayout';

import { createGithubInsides } from '../../services/github_insides';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: ReactElement;
  recaptchaKey?: string;
  GITHUB_AUTH?: string;
}

interface UserInfoInterface {
  data: null | any,
  error?: string,
}
interface UserReporsInterface {
  list: null | any,
  error?: string,
}

export async function getStaticProps(context: any) {
  return {
    props: {
      recaptchaKey: process.env.RECAPTCHA_KEY || null,
      GITHUB_AUTH: process.env.GITHUB_AUTH || null,
    }, // will be passed to the page component as props
  }
}

const GithubInsidesPage: NextPage = (props: Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const userInfoInit: UserInfoInterface = { data: null };
  const [userInfo, setUserInfo] = useState(userInfoInit);
  const userReposInit: UserReporsInterface = { list: [] };
  const [userRepos, setUserRepos] = useState(userReposInit);
  const [rateLimit, setRateLimit] = useState({ rate: {}} as any);
  const [reCaptcha, setReCaptcha] = useState(null);
  const [rcErr, setRcErr] = useState(false);

  const githubInsides = createGithubInsides(props.GITHUB_AUTH);

  const handleSetReCaptcha = (data: any) => {
    setReCaptcha(data);
    if (reCaptcha !== null) return setRcErr(true);
    return setRcErr(false);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    if (reCaptcha !== null || !props.recaptchaKey) {
      setUserInfo({ data: null })
      const data = new FormData(event.currentTarget);

      const payload = {
        username: data.get('username'),
        recaptcha: reCaptcha
      };
      console.log(payload);
      let user = null;
      try {
        user = await githubInsides.getUserInfo({ username: data.get('username') })
      } catch (error) {

      }

      setIsLoading(false)
      if (user === null) return setUserInfo({ data: null, error: "Not Found" });

      setUserInfo({ data: user });
    } else {
      // recaptha error
      setRcErr(true);
    }

    setIsLoading(false);
  };

  const getRateLimits = async () => setRateLimit(await githubInsides.getRateLimit());

  const updateRateLimit = async (ev:any) => {
    ev.preventDefault();
    getRateLimits();
  };

  const getUserRepos = async (user: any, page = 1, per_page = 10) => {
    try {
      const data = await githubInsides.getUserRepos({ user, page, per_page });
      return setUserRepos({ list: data || [] });
    } catch (error) {
      return setUserRepos({ list: [], error: "Not Found" })
    }
  }

  useEffect(() => {
    getRateLimits();
    userInfo.data && getUserRepos(userInfo.data);
  }, [userInfo]);

  console.info('USER_INFO', userInfo)
  console.info('USER_REPOS', userRepos)

  const searchForm = () => {
    return (
      <Box component="form" onSubmit={handleSubmit} noValidate >

        <Grid container>
          <Grid item xs={12} sm={10} style={{ display: 'flex', gap: '1em', padding: '.5em', border: '1px solid black' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Github Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            {props.recaptchaKey && <>
              <ReCAPTCHA
                sitekey={props.recaptchaKey}
                onChange={handleSetReCaptcha}
              />
              {rcErr && <Typography component="p" style={{ color: 'red', }}>Recaptha is Required!</Typography>}
            </>}
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, padding: 1 }}
              disabled={isLoading}
            >
              Search
            </Button>
          </Grid>

          {rateLimit.rate && <Grid item xs={12} sm={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography component="p" title="Rate Limits">🏁</Typography>
            <Typography component="p" title="Remaining" style={{ color: 'green' }}>{rateLimit.rate.remaining}</Typography>
            <Typography component="h4">/</Typography>
            <Typography component="p" title="Total Limit" style={{ color: 'red' }}>{rateLimit.rate.limit}</Typography>
            <button onClick={updateRateLimit} title="Refresh Rate Limit">🔄</button>
          </Grid>}
        </Grid>
      </Box>
    )
  };

  const printUserCard = (user:any) => {
    return (
      <Grid item xs={12} sm={8}>
        <div style={{ display: 'flex' }}>
          <CardMedia
            component="img"
            height="140"
            sx={{ width: 151 }}
            image={user.avatar_url}
            alt="user avatar image"
          />
          <CardContent>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="h5" component="h5">
                {user.type}:
              </Typography>
              <Typography variant="h5" component="h2">
                {user.login}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {user.bio}
            </Typography>
          </CardContent>
        </div>
        <CardActions>

          <Link href={user.html_url} variant="body2" target="_blank">
            GitHub
          </Link>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Grid>
    )
  }

  const printUserStats = (user:any) => {
    return (
      <>
        <Grid item xs={12} sm={4}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.public_repos} secondary="Public Repositories" />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.public_gists} secondary="Public Gists" />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.followers} secondary="Number of Followers" />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.following} secondary="Following People" />
            </ListItem>
          </List>
        </Grid>
      </>
    )
  };

  return (
    <PageLayout title="V-core9 - GitHub User Insides Page" description="Generated by create next app" >
      <>
        <AppBar position="static" style={{ background: 'white', }}>
          {searchForm()}
        </AppBar>
        <Box sx={{ pt: 1, pb: 1 }}>
          {isLoading && <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h2">Loading...</Typography>
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          </Box>}
          {(!isLoading && userInfo.data) && <>
            <Grid container sx={{ padding: 1, border: '1px solid #10203040' }}>
              {printUserCard(userInfo.data)}
              {printUserStats(userInfo.data)}
            </Grid>

            <Box sx={{ mt: 1, p: 1, border: '1px dashed #20304040' }}>
              <Typography component="h2">Repositories:</Typography>

              {userRepos.list?.length > 0 && userRepos.list?.map(repo =>
                // eslint-disable-next-line react/jsx-key
                <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px dashed #20304040' }}>
                  <Box sx={{ pt: 1, pb: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                    <ListItemText primary={repo.name} secondary={repo.description || '⚠ Missing Repository Description'} />
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography component="p">Language: {repo.language}</Typography>
                    <Typography component="p">Size: {repo.size}</Typography>
                  </Box>
                </Box>)}
            </Box>

          </>}

          {userInfo?.error && <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '2em', color: 'red' }}>
            <Typography component="h1" sx={{ fontSize: '2em' }}>⚠ {userInfo.error}</Typography>
          </Box>}
        </Box>
      </>
    </PageLayout>
  )
};

export default GithubInsidesPage;
