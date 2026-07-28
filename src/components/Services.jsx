import React, { useState } from 'react';

const Services = () => {
  const [activeTab, setActiveTab] = useState('logos');

  const categories = [
    { id: 'logos', label: 'Logos' },
    { id: 'websites', label: 'Websites' },
    { id: 'animations', label: 'Animations' },
    { id: 'mobileapps', label: 'Mobile Apps' },
    { id: 'printing', label: 'Printing' },
    { id: 'nftdesign', label: 'NFT Design' },
    { id: 'smm', label: 'SMM' },
  ];

  // Dummy content based on activeTab
  const renderContent = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="group relative rounded-2xl overflow-hidden glass aspect-video cursor-pointer hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-brand-primary/30 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/60 font-semibold group-hover:text-white transition-colors capitalize">
                {activeTab} item {item}
              </span>
            </div>
            {/* Glow effect on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500"></div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h6 className="text-brand-accent tracking-widest uppercase text-sm font-bold mb-2">What We Do</h6>
          <h2 className="text-4xl md:text-5xl font-bold">
            OUR <span className="text-gradient">Services</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`text-left px-6 py-4 rounded-xl transition-all whitespace-nowrap font-medium ${
                    activeTab === category.id
                      ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Content */}
          <div className="lg:w-3/4">
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
