import React, { useContext, useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
// images
import walletImage from 'assets/images/Home/TEST_LONGHORN_RENDER_4.jpg'
import gameAvatar1 from 'assets/images/Home/longhornshowcase1.jpg'
import gameAvatar2 from 'assets/images/Home/longhornshowcase2.jpg'
import gameAvatar3 from 'assets/images/Home/longhornshowcase3.jpg'
import gameAvatar4 from 'assets/images/Home/longhornshowcase4.jpg'
import featureAvatar from 'assets/images/Home/talkingnft.png'
import clsx from 'clsx'
import { makeStyles, withStyles, TextField, Button } from '@material-ui/core'
import styles from 'assets/jss/pages/Home/buyNowSectionStyle'
import globalStyles from 'assets/jss/PLUTEX'
import toast from 'react-hot-toast'
import { Web3Context } from 'utils/Web3Provider'

const useStyles = makeStyles(styles)
const useGlobalStyles = makeStyles(globalStyles)

const MAX_VALUE = 'You can enter up to 30'
const INPUT_VALUE = 'You must input quantity'
const WRONG_NETWORK = 'You should connect to the Ethereum Mainnet'
const SUCCSESS_CONNECTED = 'Successfully connected to the Ethereum Mainnet'
const WAIT_METAMASK = 'Please wait a moment.'
const SUCCESS_BUY = 'Successfully buy'
const ASTRO_PRICE = 0.07 //0.07 ETH

const WalletButton = withStyles(() => ({
  root: {
    color: '#000000',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#CCCCCC',
    },
    fontWeight: '800',
    borderRadius: '25px',
    padding: '10px 15px',
    textTransform: 'none',
    fontFamily: 'sans-serif',
    width: '130px',
    margin: '20px',
  },
}))(Button)

const BuyButton = withStyles(() => ({
  root: {
    color: '#FFFFFF',
    backgroundColor: '#000000',
    '&:hover': {
      backgroundColor: '#4c4c4c',
    },
    fontWeight: '700',
    borderRadius: '25px',
    padding: '10px 15px',
    fontFamily: 'sans-serif',
    // textTransform: 'none',
    width: '130px',
    margin: '20px',
  },
}))(Button)

const BuyNowSection = () => {
  const classes = useStyles()
  const globalClasses = useGlobalStyles()

  const { connectionStatus, notifyLabel, balance, address, walletInstalledStatus, loadWeb3, nftToken } =
    useContext(Web3Context)
  const [quantity, setQuantity] = useState('')
  const [progressStatus, setProgressStatus] = useState(false)

  const handleClickWallet = async () => {
    if (connectionStatus) {
      toast.success(SUCCSESS_CONNECTED)
    }
    await loadWeb3()
  }

  useEffect(() => {
    if (connectionStatus) {
      toast.success(notifyLabel)
    } else {
      if (notifyLabel !== '') {
        toast.error(notifyLabel)
      }
    }
  }, [notifyLabel])

  useEffect(() => {
    if (!walletInstalledStatus)
      window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en', '_blank')
  }, [walletInstalledStatus])

  const handleClickBuy = () => {
    if (quantity === '') {
      toast.error(INPUT_VALUE)
      return
    } else if (quantity > 30 || quantity < 1) {
      toast.error(MAX_VALUE)
      setQuantity('')
      return
    }
    if (!connectionStatus) {
      toast.error(WRONG_NETWORK)
      return
    }
    toast.success(WAIT_METAMASK)
    setProgressStatus(true)
    nftToken.methods
      .mintAstro(quantity)
      .send({ from: address, value: window.web3.utils.toWei((quantity * ASTRO_PRICE).toString()) })
      .then(data => {
        console.log(data)
        if (data.status) {
          toast.success(SUCCESS_BUY)
          setProgressStatus(false)
          setQuantity('')
        }
      })
  }

  const handleChangeQuantity = event => {
    const reg = /^\d+$/
    if (event.target.value === '' || reg.test(event.target.value)) {
      setQuantity(event.target.value)
    }
  }

  return (
    <>
      <Box className={classes.buyNowSectionArea}>
        <Box className={classes.quantityContainer}>
          <Box className={classes.container}>
            <Grid container display="flex" alignItems="center" justify="center">
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Box display="flex" justifyContent="center" mb={5}>
                  <img src={walletImage} className={classes.walletArea} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box className={classes.titleBottom}>
                  <Typography className={clsx(classes.title, classes.quantityTitle)}>Get Your Long Horn!</Typography>
                </Box>
                <Box className={classes.textContentArea}>
                  <Typography className={classes.text31}>Limited to 30 per mint.</Typography>
                </Box>
                <Box className={classes.textContentArea}>
                  <Box className={classes.text31}>
                    <Typography className={classes.text31} gutterBottom>
                      Quantity
                    </Typography>
                  </Box>
                  <Box>
                    <TextField
                      id="text-quantity"
                      variant="outlined"
                      value={quantity}
                      className={classes.textQuantity}
                      onChange={handleChangeQuantity}
                    />
                  </Box>
                </Box>
                <Box className={classes.textContentArea}>
                  <WalletButton variant="contained" className={classes.wallet} onClick={handleClickWallet}>
                    Link Wallet
                  </WalletButton>
                  <BuyButton
                    variant="contained"
                    className={classes.roadmap}
                    onClick={handleClickBuy}
                    disabled={progressStatus}
                  >
                    Buy now!
                  </BuyButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box className={classes.detailContainer}>
          <Box className={classes.container}>
            <Box className={classes.content}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography className={classes.title}>The Spicy Stuff</Typography>
                <Typography className={globalClasses.text21}>
                  Long Horns are uniquely designed and securely generated from a variety within the Long Horn Cattle Squad with over
                  [# of variations] possible traits, including body type, clothing, eyes, mouth, headwear, background, and most importantly, the horns. Even though
                  all Long Horn holders are honored with cool (and secret) utilities, there are rarities associated with particular traits!
                  <br />
                  <br /> Long Horns are stored as ERC-721 tokens on the Ethereum blockchain and hosted on IPFS.
                  Purchasing a Long Horn cost [amount] ETH.
                  <br />
                  <br /> To access members-only areas such as party events and discord launches, Long Horn holders will need to be signed
                  into their Metamask Wallet.
                </Typography>
                <Typography variant="h5" className={classes.distribution}>
                  <br />
                  FAIR DISTRIBUTION
                </Typography>
                <Typography className={globalClasses.text21}>
                  Long Horns hate inequality. We all came from the Wild West. That&apos;s why you won&apos;t see bias. Buying a
                  Long Horn costs [cost] ETH. Because we believe that every one ( no matter what side of the Wild West you&apos;re from)
                  is equal ( except for bandits of course... every hates bandits.)
                </Typography>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box className={classes.galaxyContainer}>
          <Box className={classes.container}>
            <Box className={classes.content}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography className={clsx(classes.galaxyTitle, classes.title)}>
                  Welcome to the Wild West
                </Typography>
                <Typography className={clsx(globalClasses.text21, classes.galaxyDescription)}>
                  When you become a Long Horn, in addition to getting an awesome avatar and a provably-rare (and
                  obviously wild ) piece of pristine, digital art, you are gaining access to a wild community that
                  will participate in and create fun mansion parties as well as have early access ( and perks ) in our
                  upcoming community events. One of the best features that the Long Horn community offers is that Long Horn holders will
                  play an integral part in developing our mansion establishments. The parties are for everyone... so we think everyone should
                  have a say in where, what, and how the parties are ran!
                </Typography>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box className={classes.gameContainer}>
          <Box className={classes.container}>
            <Box className={classes.content}>
              <Typography className={classes.title}>MANSION VACATIONS</Typography>
              <Grid
                container
                display="flex"
                alignItems="center"
                justify="space-around"
                spacing={7}
                style={{ paddingTop: '8px' }}
              >
                <Grid item xs={12} sm={6} md={3} lg={3} className={classes.gameAvatar}>
                  <img src={gameAvatar1} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} className={classes.gameAvatar}>
                  <img src={gameAvatar2} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} className={classes.gameAvatar}>
                  <img src={gameAvatar3} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} className={classes.gameAvatar}>
                  <img src={gameAvatar4} />
                </Grid>
              </Grid>
              <Box className={classes.featurePosition}>
                <Box className={classes.featureContainer}>
                  <Grid container display="flex" alignItems="center" justify="center" spacing={4}>
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                      <img src={featureAvatar} className={classes.featureAvatar} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} className={classes.gameAvatar}>
                      <Box style={{ position: 'relative' }}>
                        <Box className={classes.featureText}>
                          <Typography className={classes.featureDescription}>
                            Texas Mansion events are currently in the works. <br />
                            We are preparing some pretty freakin&apos; awesome sh*t.
                          </Typography>
                        </Box>
                        <Box className={classes.arrowDirection} />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Typography className={globalClasses.text21}>
                The Long Horn Mansion Parties are going to having multiple partnering NFT projects as well as food vendors where you will be able to eat
                virtually anything and have a blast. You can have a say on what new addition you want in these parties at any time, 
                and we'll even be working with some new initiatives and NFT project in the future on collabs! {' '}
                <br />
                <br />
                It will be initially open to only Long Horn NFT Holders but holders will eventually rack up exclusive auctions, giveaways, and much more! (e.g. A Long Horn Holder gets a one week vacation at a luxury Texas Mansion!)
                <br />
                <br />
                Basically its going to be awesome... More information will be coming soon.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.gameBottomContainer}>{/* <img src={gameBottomImg} /> */}</Box>
      </Box>
    </>
  )
}

export default BuyNowSection
