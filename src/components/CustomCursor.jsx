import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const containerRef = useRef(null);
  const dotRef = useRef(null);
  const followerRef = useRef(null);
  const labelRef = useRef(null);

  const mouse = useRef({ x: -100, y: -100 });
  const follower = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');

  useEffect(() => {
    // Check for touch devices or small screens
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    if (isTouch) return undefined;

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Event listeners for interactive elements hover state
    const handleElementMouseEnter = (e) => {
      setIsHovered(true);
      const label = e.currentTarget.getAttribute('data-cursor-label');
      if (label) {
        setCursorLabel(label);
      } else {
        setCursorLabel('');
      }
    };

    const handleElementMouseLeave = () => {
      setIsHovered(false);
      setCursorLabel('');
    };

    const attachHoverListeners = () => {
      const selectors = 'a, button, .btn, .pkg_btn, input, textarea, select, .filterport li, .pkg-tab-nav li, .slick-arrow, .items, .grid-item-inner, [data-cursor-label]';
      const elements = document.querySelectorAll(selectors);
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementMouseEnter);
        el.removeEventListener('mouseleave', handleElementMouseLeave);
        el.addEventListener('mouseenter', handleElementMouseEnter);
        el.addEventListener('mouseleave', handleElementMouseLeave);
      });
      return elements;
    };

    let attachedElements = attachHoverListeners();
    const interval = setInterval(() => {
      attachedElements = attachHoverListeners();
    }, 2000);

    // Animation Loop
    const animate = () => {
      follower.current.x += (mouse.current.x - follower.current.x) * 0.2;
      follower.current.y += (mouse.current.y - follower.current.y) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${follower.current.x}px, ${follower.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId.current);
      clearInterval(interval);
      attachedElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementMouseEnter);
        el.removeEventListener('mouseleave', handleElementMouseLeave);
      });
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={`ct-cursor-container ${isVisible ? 'is-visible' : ''} ${isHovered ? 'is-hovered' : ''} ${cursorLabel ? 'has-label' : ''}`}
      aria-hidden="true"
    >
      <div ref={dotRef} className="ct-cursor-dot" />
      <div ref={followerRef} className="ct-cursor-follower">
        {cursorLabel && <span ref={labelRef} className="ct-cursor-label">{cursorLabel}</span>}
      </div>
    </div>
  );
};

export default CustomCursor;
