import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import CtaBanner from '../components/CtaBanner';
import Pricing from '../components/Pricing';
import Reliability from '../components/Reliability';
import Counter from '../components/Counter';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import PopupForm from '../components/PopupForm';
import CustomCursor from '../components/CustomCursor';

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <Hero onOpenModal={() => setModalOpen(true)} />
      <Portfolio />
      <About onOpenModal={() => setModalOpen(true)} />
      <CtaBanner onOpenModal={() => setModalOpen(true)} />
      <Pricing onOpenModal={() => setModalOpen(true)} />
      <Reliability />
      <Counter />
      <Testimonials />
      <Contact />
      <Footer onOpenModal={() => setModalOpen(true)} />
      <PopupForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Home;
