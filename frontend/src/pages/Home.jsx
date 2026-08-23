import React, { useContext, useEffect } from "react";
import FeaturedJob from "../components/FeaturedJob";
import Hero from "../components/Hero";
import JobCategoryt from "../components/JobCategory";
import Services from "../components/Services";
import Navbar from "../components/Navbar";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import EquestrianHeritage from "../components/EquestrianHeritage";
import WhyChooseKOP from "../components/WhyChooseKOP";
import CareerCTA from "../components/CareerCTA";

const Home = () => {
  const { fetchJobsData } = useContext(AppContext);

  useEffect(() => {
    fetchJobsData();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <EquestrianHeritage />
      <JobCategoryt />
      <FeaturedJob />
      <WhyChooseKOP />
      <HowItWorks />
      <CareerCTA />
      <Footer />
    </>
  );
};

export default Home;
