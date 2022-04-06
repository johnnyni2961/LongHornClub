import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import styles from 'assets/jss/pages/Home/homeSectionStyle'
import globalStyles from 'assets/jss/PLUTEX'
import videoSrc from 'assets/images/Home/trainvid.mp4'

const useStyles = makeStyles(styles)
const useGlobalStyles = makeStyles(globalStyles)

const HomeSection = () => {
  const classes = useStyles()
  const globalClasses = useGlobalStyles()
  return (
    <Box className={classes.homeSectionArea}>
      <Box className={classes.videoPlayer}>
        <video width="100%" height="auto" loop muted autoPlay>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </Box>
      <Box className={classes.homeContainer}>
        <Box className={classes.container}>
          {/* <Box className={classes.homeImage}> */}
          <Box className={classes.content}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography className={classes.title}>What are Long Horns?</Typography>
              <Typography className={globalClasses.text21}>
                Long Horns are a collection of 10,000 unique NFTs living in the Wild Metaverse Frontier (on the Ethereum
                blockchain). Everyone asks... how is this project different than any other NFT project? We're not just talking cool Long Horn NFT's, we're talking free luxury Texas Mansion vacations, a supporting community, strong network, and [add more here :)] The Long Horns
                is arguably the LARGEST utility backed project execution but we wanted to make something truly different than anything anyone has
                seen before. Along with the collection of some of the most awesome NFTs (in the Wild West) we have lots of plans in store
                 regarding our roadmap and planned luxury mansions spaning across Texas. On a final note, the Wild West is waiting for you, hop on now to become a Long Horn!
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default HomeSection
