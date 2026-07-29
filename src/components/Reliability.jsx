import React from 'react';
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
    title: 'Our holistic approach takes your entire business ethos - your brand, your mission and vision, your goals - and transforms it into a cohesive digital journey.'
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

const settings = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    { breakpoint: 992, settings: { slidesToShow: 2 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } },
  ],
};

const Reliability = () => (
  <section className="newsec happywork" style={{ background: 'linear-gradient(180deg, #050510 0%, #080820 100%)', padding: '70px 0 0', color: '#fff' }}>
    <div className="container">
      <div className="text-center headingmain" data-aos="fade-up" data-aos-duration="1500">
        <h6 style={{ fontSize: '15px', color: '#2563eb', fontFamily: 'Poppins, sans-serif', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Clients are happy for our work
        </h6>
        <h2 style={{ fontSize: '42px', color: '#ffffff', fontWeight: 900, textTransform: 'uppercase', lineHeight: '1.2' }}>
          WE DO ACCORDING TO OUR <br className="d-md-none" />
          <span className="themecolor" style={{ color: '#2563eb', display: 'inline-block' }}>BEST</span>
        </h2>
      </div>
    </div>
    <div className="ct-carousel-inner" data-aos="fade-up" data-aos-duration="1500" data-cursor-label="DRAG">
      <Slider {...settings}>
        {items.map((item, i) => (
          <div key={i} className="grid-item-inner">
            <div className="item--featured">
              <img src={item.image} alt={item.tag} loading="lazy" />
            </div>
            <div className="item--shape item--shape3"><Shape3 /></div>
            <div className="item--shape item--shape4"><Shape4 /></div>
            <div className="item--meta">
              <div className="item--category">
                <img src={ASSETS.logo} alt="Qorbit Tech Logo" style={{ maxHeight: '50px', width: 'auto', margin: '0 auto 10px', display: 'block', mixBlendMode: 'screen', filter: 'brightness(1.2)' }} />
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

export default Reliability;
