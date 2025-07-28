import React from 'react'
import HeroSection from '../components/HeroSection'
import LatestCollectionSections from '../components/LatestCollectionSections'
import BestSellerSection from '../components/BestSellerSection'
import PolicySection from '../components/PolicySection'
import SubscriptionSection from '../components/SubscriptionSection'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <LatestCollectionSections />
      <BestSellerSection />
      <PolicySection />
      <SubscriptionSection />
    </>
  )
}

export default HomePage