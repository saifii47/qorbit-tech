import React from 'react';
import Slider from './shared/Slider';
import { ASSETS } from '../constants/assets';

const CDN = ASSETS.cdn;

const testimonials = [
  { img: `${CDN}/testimonials-04.jpg`, name: 'Adam Foster', text: "I am overjoyed with the services Qorbit Tech has offered me. They truly worked hard and professionally, giving me the greatest and most precise outcomes. Without a doubt, I'd suggest them!" },
  { img: `${CDN}/testimonials-02.jpg`, name: 'Ada Kanacki', text: "Couldn't be any happier with the services Qorbit Tech has provided me. They worked with true determination & professionalism and really gave me the best and accurate results. I would surely recommend them!" },
  { img: `${CDN}/testimonials-03.jpg`, name: 'Robert Froast', text: "I've never been happier than I am with Qorbit Tech's website development services. Both the way they worked with me and the outcome were excellent. With the team's most expert services, I was able to get the site design I wanted. I'm happy and will surely come back!" },
  { img: `${CDN}/testimonials-01.jpg`, name: 'Pamela Johnson', text: 'Over the years we have relied heavily onto Qorbit Tech for creative design and marketing services in business.' },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 4500,
  pauseOnHover: true,
  responsive: [
    { breakpoint: 992, settings: { slidesToShow: 2 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } },
  ],
};

const Testimonials = () => (
  <section className="testimonials-sec" data-aos="fade-up" data-aos-duration="1500">
    <div className="testimonials-tech-grid" />
    <div className="testimonials-glow-1" />
    <div className="testimonials-glow-2" />
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div className="text-center headingmain">
        <h6>What Clients Say?</h6>
        <h2>Feedback from our honorable <span className="themecolor" style={{ color: '#2563eb' }}>clients</span></h2>
      </div>
      <div className="ct-testimonial" data-cursor-label="DRAG">
        <Slider {...settings}>
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-slide-wrapper">
              <div className="item--inner">
                <div className="item--image">
                  <img src={t.img} alt={t.name} />
                  <i className="item--icon fa fa-quote-right"></i>
                </div>
                <div className="item--star">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <i key={s} className="fas fa-star"></i>
                  ))}
                </div>
                <div className="item--description">{t.text}</div>
                <div className="item--meta">
                  <h4 className="item--title">{t.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  </section>
);

export default Testimonials;
