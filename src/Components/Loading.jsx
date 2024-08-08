import React from "react";
import loadingAnimation from "../assets/loadingAnimation.json";
import Lottie from "lottie-react";

export default function Loading() {
  return <Lottie animationData={loadingAnimation} loop={true} />;
}
