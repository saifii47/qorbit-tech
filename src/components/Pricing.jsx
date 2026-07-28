import React, { useState } from 'react';
import { pricingTabs } from '../data/packages';
import PackageCard from './shared/PackageCard';

const Pricing = ({ onOpenModal }) => {
  const [activeTab, setActiveTab] = useState('box-logo');
  const activePackages = pricingTabs.find((t) => t.id === activeTab)?.packages ?? [];

  // Take exactly 3 main featured packages for the category to fit fixed on screen
  const displayPackages = activePackages.slice(0, 3);

  return (
    <section className="mainpackage">
      <div className="container">
        <div className="text-center headingmain" data-aos="fade-up" data-aos-duration="1500">
          <h6>What We Do</h6>
          <h2>
            We are optimists who love <br />
            to work <span className="themecolor">together</span>
          </h2>
        </div>

        {/* Category Navigation Tabs */}
        <div className="pkg-tab" data-aos="fade-up" data-aos-duration="1800">
          <ul className="pkg-tab-nav">
            {pricingTabs.map((tab) => (
              <li
                key={tab.id}
                data-targetit={tab.id}
                className={activeTab === tab.id ? 'active' : ''}
              >
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab(tab.id); }}>
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Fixed 3 Price Cards Grid */}
        <div className={`${activeTab} showfirst`} data-aos="fade-up" data-aos-duration="2000">
          <div className="row justify-content-center align-items-stretch" style={{ marginTop: '20px' }}>
            {displayPackages.map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onOpenModal={onOpenModal}
                isGrid={true}
                isFeatured={index === 0} // First card highlighted yellow like original design
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
