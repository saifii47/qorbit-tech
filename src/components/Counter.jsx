import React, { useEffect, useRef, useState } from 'react';
import Slider from './shared/Slider';

const StatItem = ({ end, suffix, label, dark, icon }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const target = end;
          const startTime = performance.now();
          const duration = 2000;

          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div className={`itemscount${dark ? ' darkblack' : ''}`} ref={ref}>
      <div className="stat-icon-holder">
        <i className={icon}></i>
      </div>
      <div className="ct-counter-number">
        <span className="ct-counter-number-value">{count}</span>
        <span className="ct-counter-number-suffix">{suffix}</span>
      </div>
      <div className="ct-counter-title">{label}</div>
    </div>
  );
};

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4000,
};

const stats = [
  { end: 780, suffix: ' +', label: 'Completed Projects', dark: true, icon: 'fas fa-tasks' },
  { end: 200, suffix: ' +', label: 'Industry Experts', dark: false, icon: 'fas fa-user-friends' },
  { end: 80, suffix: ' +', label: 'Award-Winning Projects', dark: true, icon: 'fas fa-trophy' },
  { end: 96, suffix: ' %', label: 'Satisfaction Rate', dark: false, icon: 'fas fa-smile' },
];

const Counter = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="componycounter" data-aos="fade-up" data-aos-duration="1500">
      <div className="counter-tech-grid" />
      <div className="counter-glow-1" />
      <div className="counter-glow-2" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {isMobile ? (
          <div className="counter-slider-wrapper">
            <Slider {...sliderSettings}>
              {stats.map((stat, i) => (
                <div key={i} className="stat-slide-item">
                  <StatItem {...stat} />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="counterlist row no-gutters">
            {stats.map((stat, i) => (
              <div key={i} className="col-lg-3 col-md-6 col-12">
                <StatItem {...stat} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Counter;
