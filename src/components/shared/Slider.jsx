import ReactSlick from 'react-slick';

// Vite/ESM interop: react-slick CJS default is nested as default.default
const Slider = ReactSlick?.default?.default ?? ReactSlick?.default ?? ReactSlick;

export default Slider;
