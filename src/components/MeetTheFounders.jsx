import React from 'react';
import './MeetTheFounders.css';

const MeetTheFounders = ({ onOpenModal }) => {
  const founders = [
    {
      name: 'Muazzam',
      role: 'Co-Founder & Growth Strategist',
      image: '/images/muazzam.jpg',
      imgClass: 'muazzam-img',
      experience: '6+ Years',
      tags: ['Paid Ad Accounts', 'Meta & Google Ads', 'A/B Testing', 'ROAS Optimization', 'Performance Funnels'],
      highlight: 'Spent six years figuring out why people click, and why they don’t.',
      bio: "Not from a textbook. From live ad accounts, real budgets, campaigns that either paid for themselves or got killed by Thursday. Meta, Google, endless A/B tests: Muazzam's real education was the gap between what looks smart on a slide and what actually earns money in the feed.",
    },
    {
      name: 'Huzaifa',
      role: 'Co-Founder & Creative Director',
      image: '/images/huzaifa.jpg',
      imgClass: 'huzaifa-img',
      experience: '8+ Years',
      tags: ['Brand Identity', 'Motion & Video', 'Scroll-Stopping Design', 'UI/UX Craft', 'Creative Direction'],
      highlight: 'Spent eight years learning that attention is borrowed, never owned.',
      bio: "Every scroll is a brand asking permission to exist for one more second. Huzaifa's work in design, video, and motion is built entirely around that half-second decision: stay or swipe. Nothing he makes is there to look nice in a portfolio. It's there to survive the scroll.",
    },
  ];

  const workPillars = [
    {
      num: '01',
      title: 'We chase the number, not the mood board.',
      desc: 'Every design decision gets asked the same question: what does this earn you?',
    },
    {
      num: '02',
      title: "We don't hand off. We stay in orbit.",
      desc: "Strategy and creative aren't two departments here: they're one conversation, start to finish.",
    },
    {
      num: '03',
      title: "We fix what's quietly costing you.",
      desc: 'The friction points bleeding your conversions are usually invisible to everyone but the person actually looking for them.',
    },
    {
      num: '04',
      title: 'We move at startup speed because we are one.',
      desc: "No 6-week onboarding. No layers of account managers. Just two founders who've shipped under pressure, doing the work themselves.",
    },
  ];

  return (
    <section className="founders-section" id="founders">
      <div className="container" data-aos="fade-up">
        {/* Header inspired by ThinLine Design - Qorbit Blue Theme */}
        <div className="text-center">
          <div className="founders-header-tag">Origin &amp; Founders</div>
          <h2 className="founders-main-title">
            MEET THE <span className="founders-title-script">founders.</span>
          </h2>
          <div className="founders-subtitle">Two Founders. One Orbit.</div>
          <p className="founders-lead-text">
            Growth without craft is noise. Craft without growth is art hanging in an empty gallery. 
            Qorbit exists because Muazzam and Huzaifa got tired of watching brands pick one and lose the other.
          </p>
        </div>

        {/* Dual Founders Grid */}
        <div className="row g-4 justify-content-center">
          {founders.map((founder, idx) => (
            <div key={founder.name} className="col-lg-6 col-md-12 mb-5">
              <div className="founder-card" data-aos="fade-up" data-aos-delay={idx * 150}>
                {/* Avatar with ThinLine Orbital Ring & Floating Satellites */}
                <div className="founder-avatar-container">
                  <div className="founder-avatar-ring">
                    <div className="founder-avatar-ring-inner"></div>
                  </div>
                  <div className="founder-avatar-img-wrap">
                    <img 
                      src={founder.image} 
                      alt={`Founder ${founder.name}`} 
                      className={`founder-avatar-img ${founder.imgClass}`} 
                    />
                  </div>
                  <div className="orbit-satellite orbit-satellite-1"></div>
                  <div className="orbit-satellite orbit-satellite-2"></div>
                  <div className="orbit-satellite orbit-satellite-3"></div>
                </div>

                {/* ThinLine Glass Card Badge */}
                <div className="founder-badge-box">
                  <h3 className="founder-name">{founder.name}</h3>
                  <div className="founder-role">{founder.role}</div>
                </div>

                {/* Founder Skill Badges / Tags */}
                <div className="founder-tags-wrapper">
                  <span className="founder-tag-pill" style={{ background: 'rgba(37, 99, 235, 0.2)', borderColor: 'rgba(96, 165, 250, 0.4)', color: '#93c5fd' }}>
                    {founder.experience}
                  </span>
                  {founder.tags.map((tag) => (
                    <span key={tag} className="founder-tag-pill">{tag}</span>
                  ))}
                </div>

                {/* Bio & Highlight Quote */}
                <div className="founder-quote-box">
                  &ldquo;{founder.highlight}&rdquo;
                </div>
                <p className="founder-bio-p">{founder.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* The Idea Behind Qorbit Tech Section */}
        <div className="idea-section-card" data-aos="fade-up">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="idea-badge">Our Core Philosophy</div>
              <h3 className="idea-title">The Idea Behind Qorbit Tech</h3>
              
              {/* Visual Orbit Tension Diagram */}
              <div className="orbit-tension-wrapper">
                <div className="force-card pull">
                  <div className="force-title">Creative (Pull)</div>
                  <div className="force-desc">Design, Motion &amp; Attention Craft</div>
                </div>

                <div className="orbit-core-pill">
                  Qorbit Equilibrium
                </div>

                <div className="force-card push">
                  <div className="force-title">Strategy (Push)</div>
                  <div className="force-desc">Data, Funnels &amp; Revenue Growth</div>
                </div>
              </div>

              <p className="idea-body-text">
                A satellite doesn&apos;t stay in orbit by accident. It is two forces in constant tension: one pulling in, one pushing forward. Break the balance, and it either crashes or drifts off into nothing.
              </p>
              <p className="idea-body-text">
                That&apos;s most marketing. All pull (creative) with no push (strategy) looks great and goes nowhere. All push with no pull gets clicks nobody remembers.
              </p>
              <p className="idea-body-text" style={{ color: '#ffffff', fontWeight: 600 }}>
                <strong style={{ background: 'linear-gradient(135deg, #60a5fa, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Qorbit</strong> was built to hold that balance on purpose, for founders who are tired of choosing between an agency that&apos;s polished but slow, and a freelancer who&apos;s fast but narrow.
              </p>
            </div>
          </div>
        </div>

        {/* How We Work Section */}
        <div className="work-section" data-aos="fade-up">
          <h3 className="work-grid-title">How We Work</h3>
          <div className="row g-4">
            {workPillars.map((pillar, index) => (
              <div key={pillar.num} className="col-lg-6 col-md-6 mb-4">
                <div className="work-card" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="work-card-number">{pillar.num}</div>
                  <h4 className="work-card-heading">{pillar.title}</h4>
                  <p className="work-card-text">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner inside Founders Section */}
        <div className="text-center mt-5" data-aos="fade-up">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onOpenModal?.(); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'linear-gradient(135deg, #1d4ed8, #2563eb, #38bdf8)',
              color: '#ffffff',
              padding: '16px 36px',
              borderRadius: '50px',
              fontWeight: 800,
              fontSize: '1.05rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(37, 99, 235, 0.4)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(56, 189, 248, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.4)';
            }}
          >
            Work Directly With The Founders <i className="fa fa-arrow-right" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MeetTheFounders;
