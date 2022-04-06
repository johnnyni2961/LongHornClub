import React from 'react'

// material ui core components
import { Box, Typography, Grid } from '@material-ui/core'

// styles
import { makeStyles } from '@material-ui/core/styles'
import styles from 'assets/jss/components/Footer/footerStyle'
import discord from 'assets/images/Home/discord.svg'
import instagram from 'assets/images/Home/instagram.svg'
import twitter from 'assets/images/Home/twitter.svg'

const useStyles = makeStyles(styles)

const Footer = () => {
  const classes = useStyles()

  return (
    <Box className={classes.body}>
      <Box className={classes.container}>
        <Box className={classes.supportContainer}>
          <Grid container display="flex" justify="space-around" spacing={5}>
            <Grid item xs={12} sm={4} md={4} lg={4} className={classes.imageLine}>
              <Box className={classes.supportImage}>
                <Typography className={classes.text}>For Question: </Typography>
                <a href="https://discord.com">
                  <img src={discord} className={classes.socialAvatar} />
                </a>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} className={classes.imageLine}>
              <Box className={classes.supportImage}>
                <Typography className={classes.text}>For Updates: </Typography>
                <a href="https://twitter.com">
                  <img src={twitter} className={classes.socialAvatar} />
                </a>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} className={classes.imageLine}>
              <Box className={classes.supportImage}>
                <Typography className={classes.text}>For Evidence </Typography>
                <a href="https://instagram.com">
                  <img src={instagram} className={classes.socialAvatar} />
                </a>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box style={{ marginTop: 10 }}>
          <Typography className={classes.text}>
            Long Horns, All Right Reserved (including our awesomeness).
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
