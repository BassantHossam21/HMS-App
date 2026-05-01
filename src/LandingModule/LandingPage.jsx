import React, { useEffect } from "react";
import Header from "./Header/Header";
import MostPopularAds from "./MostPopularAds/MostPopularAds";
import Houses from "./Houses/Houses";
import Hotels from "./Hotels/Hotels";
import Footer from "../Shared/Footer/Footer";
import { useAdsApi } from "../Hooks/useLandingAds";
import Ads from "./Ads/Ads";
import Review from "./Review/Review";

export default function LandingPage() {
  return (
    <>
      <Header />
      <MostPopularAds />
      <Houses />
      <Hotels />
      <Ads />
      <Review />
      <Footer />
    </>
  );
}
