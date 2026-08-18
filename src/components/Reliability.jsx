import React, { useState, useEffect } from 'react';
import Slider from './shared/Slider';
import { Shape3, Shape4 } from './shared/CarouselShapes';
import { ASSETS } from '../constants/assets';

const CDN = ASSETS.cdn;

const items = [
  {
    image: `${CDN}/carousel-05.jpg`,
    tag: 'A Partnership',
    title: 'We look at our client projects as a partnership and not a one-off transactional event, because we firmly believe that the best success is shared success.'
  },
  {
    image: `${CDN}/carousel-02.jpg`,
    tag: 'Customized Solutions',
    title: 'No copy-paste template work here. We put together a comprehensive, customized solution that matches your EXACT needs.'
  },
  {
    image: `${CDN}/carousel-03.jpg`,
    tag: 'Brand Cohesion',
    title: 'Our holistic approach takes your entire business ethos including your brand, mission, vision, and goals, transforming it into a cohesive digital journey.'
  },
  {
    image: `${CDN}/carousel-04.jpg`,
    tag: 'Flexibility',
    title: 'Whether you\'re a small family business, a 3 person startup or a large fashion house, we have inherent flexibility to create a solution that fits your budget and time requirements.'
  },
  {
    image: `${CDN}/carousel-01.jpg`,
    tag: 'Strength in Numbers',
    title: 'We have a large pool of designers, software architects, developers and testers (of varying experience and expertise) that we can utilize for any project.'
  },
];

const desktopSettings = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 4000,
};

const mobileSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 4000,
};

const Reliability = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeSettings = isMobile ? mobileSettings : desktopSettings;

  return (
    <section className="newsec happywork" style={{ background: '#ffffff', padding: '70px 0 0', color: '#0f172a', position: 'relative', overflow: 'hidden' }}>
      {/* Tech grid pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(37,99,235,0.10) 1.2px, transparent 1.2px), radial-gradient(rgba(124,58,237,0.06) 1.2px, transparent 1.2px)',
        backgroundSize: '34px 34px',
        backgroundPosition: '0 0, 17px 17px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 35%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 35%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      {/* Aurora glow */}
      <div style={{
        position: 'absolute', top: '10%', left: '30%',
        width: '700px', height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.09) 0%, rgba(124,58,237,0.05) 50%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
        animation: 'floatOrb 14s ease-in-out infinite alternate',
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="text-center headingmain" data-aos="fade-up" data-aos-duration="1500">
          <h6 style={{ fontSize: '15px', color: '#2563eb', fontFamily: 'Poppins, sans-serif', marginBottom: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Clients are happy for our work
          </h6>
          <h2 style={{ fontSize: '42px', color: '#0f172a', fontWeight: 900, textTransform: 'uppercase', lineHeight: '1.2' }}>
            WE DO ACCORDING TO OUR <br className="d-md-none" />
            <span style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>BEST</span>
          </h2>
        </div>
      </div>
      <div className="ct-carousel-inner" data-aos="fade-up" data-aos-duration="1500" data-cursor-label="DRAG" style={{ position: 'relative', zIndex: 1 }}>
        <Slider key={isMobile ? 'mobile-reliability' : 'desktop-reliability'} {...activeSettings}>
          {items.map((item, i) => (
            <div key={i} className="grid-item-inner">
              <div className="item--featured">
                <img src={item.image} alt={item.tag} loading="lazy" />
              </div>
              <div className="item--shape item--shape3"><Shape3 /></div>
              <div className="item--shape item--shape4"><Shape4 /></div>
              <div className="item--meta">
                <div className="item--category">
                  <img src={ASSETS.logo} alt="Qorbit Tech Logo" style={{ maxHeight: '60px', width: 'auto', margin: '0 auto 10px', display: 'block', filter: 'brightness(1.15)' }} />
                </div>
                <div className="item--category">
                  <a href="#" onClick={(e) => e.preventDefault()} rel="tag" tabIndex={0}>
                    {item.tag}
                  </a>
                </div>
                <h4 className="item--title">
                  <a href="#" onClick={(e) => e.preventDefault()} tabIndex={0}>
                    {item.title}
                  </a>
                </h4>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Reliability;
