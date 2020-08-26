import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import React, { useState, useEffect } from "react";
import { Text } from "react-native-elements";
import {
  Root,
  Header,
  Content,
  Footer,
  Title,
  Body,
  View,
  Container,
  Button,
} from "native-base";
import * as Font from "expo-font";
import { AppLoading } from "expo";

// Test IDs from Google. Personal IDs needed to be vetted (24h+ delay)
// which resulted in white boxes for ads
const BANNER_ID = "ca-app-pub-3940256099942544/6300978111";
const INTERSTITIAL_ID = "ca-app-pub-3940256099942544/8691691433";
const REWARDED_ID = "ca-app-pub-3940256099942544/5224354917";



export default function App() {
  const [disableInterstitialBtn, setDisableInterstitialBtn] = useState(false);
  const [disableRewardedBtn, setDisableRewardedBtn] = useState(false);
  const [rewardCount, setRewardCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const _openInterstitial = async () => {
    try {
      setDisableInterstitialBtn(true);
      await AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID);
      await AdMobInterstitial.requestAdAsync();
      const loaded = await AdMobInterstitial.getIsReadyAsync();
      if (loaded) await AdMobInterstitial.showAdAsync();
    } catch (error) {
      console.error(error);
    } finally {
      setDisableInterstitialBtn(false);
    }
  };

  const _openRewarded = async () => {
    try {
      setDisableRewardedBtn(true);
      await AdMobRewarded.setAdUnitID(REWARDED_ID);
      await AdMobRewarded.requestAdAsync();
      const loaded = await AdMobRewarded.getIsReadyAsync();
      if (loaded) {
        console.log("showing rewarded ad")
        await AdMobRewarded.showAdAsync().catch((e) => {console.log ("rewarded show error: " + e)}); // THIS NEVER RESOLVES?
        console.log("completed showing rewarded ad")
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDisableRewardedBtn(false);
    }
  };

  useEffect(() => {
    async function suppressFontError() {
      await Font.loadAsync({
        Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
      });
      setLoading(false);
    }
    suppressFontError();
    async function initAds(){
      await setTestDeviceIDAsync('EMULATOR');
      console.log("set device id to 'EMULATOR'")
    }
    initAds();
    AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", (reward) => {
      setRewardCount(rewardCount + reward.amount);
    });
    return function cleanup() {
      AdMobRewarded.removeAllListeners();
      AdMobInterstitial.removeAllListeners();
    };
  });

  if (loading) {
    return (
      <Root>
        <AppLoading />
      </Root>
    );
  } else {
    return (
      <Root>
        <Container>
          <Header>
            <Body>
              <Title center>expo-ads-admob demo</Title>
            </Body>
          </Header>
          <Content>
            <View>
              <Text h1 style={{ padding: 15, textAlign: "center" }}>
                Coins: {rewardCount}
              </Text>
              <AdMobBanner
                bannerSize="mediumRectangle"
                adUnitID={BANNER_ID}
                style={{ justifyContent: "center", alignItems: "center" }}
              />
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", padding: 20 }}
            >
              <Button
                bordered
                full
                disabled={disableInterstitialBtn}
                onPress={_openInterstitial}
                style={{ margin: 15 }}
              >
                <Text>Watch Interstitial Ad</Text>
              </Button>
              <Button
                bordered
                full
                disabled={disableRewardedBtn}
                onPress={_openRewarded}
                style={{ margin: 15 }}
              >
                <Text>Watch Rewarded Ad</Text>
              </Button>
              <Button
                bordered
                full
                onPress={() => {setRewardCount(rewardCount - 5)}}
                style={{ margin: 15 }}
              >
                <Text>Spend coins</Text>
              </Button>
            </View>
          </Content>
          <Footer>
            <PublisherBanner adUnitID={BANNER_ID} />
          </Footer>
        </Container>
      </Root>
    );
  }
}
