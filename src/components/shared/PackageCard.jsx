import React from 'react';

const CDN = 'https://www.pinnacledesignagency.com/assets/images';

const PackageCard = ({ pkg, onOpenModal, isGrid = true, isFeatured = false }) => {
  const content = (
    <div
      className={`bxpack ${isFeatured ? 'active' : ''}`}
      data-package-box
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <div className="info-title">
        <div className="productSku">{pkg.id}</div>
        <h5>
          <img src={`${CDN}/pack-ico1.png`} alt="" />
          {pkg.name}
        </h5>
      </div>
      <div className="pricing_dv">
        <h3><sup>$</sup>{pkg.price}</h3>
      </div>
      <div className="btnpack">
        <a
          href="#"
          className="pkg_btn order-package"
          onClick={(e) => { e.preventDefault(); onOpenModal?.(); }}
        >
          GET STARTED
        </a>
      </div>
      <div className="listpack" style={{ flexGrow: 1 }}>
        <h6>Package Details:</h6>
        <div className="pkg_list" data-package-scroll>
          <ul className="listpacks">
            {pkg.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="viewall-feat">
        <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal?.(); }}>Order Now &amp; Save 50%</a>
      </div>
    </div>
  );

  if (isGrid) {
    return (
      <div className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch" data-aos="fade-up" data-aos-duration="1500">
        {content}
      </div>
    );
  }

  return content;
};

export default PackageCard;
