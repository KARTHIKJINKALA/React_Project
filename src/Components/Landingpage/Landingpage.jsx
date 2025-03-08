
import React, { useState } from 'react';
import './Landingpage.css'; // We'll define this CSS file separately
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Landingpage = () => {
    const navigator=useNavigate()
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}`);
    setEmail('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for ${searchTerm} jobs in ${location}`);
  };
const postjob=()=>{
  navigator("/Emplogin")
}
  // Featured jobs data
  const featuredJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      type: 'Full-time'
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'DesignHub',
      location: 'Remote',
      salary: '$90,000 - $110,000',
      type: 'Full-time'
    },
    {
      id: 3,
      title: 'Python Developer',
      company: 'DataSync Solutions',
      location: 'New York, NY',
      salary: '$110,000 - $130,000',
      type: 'Full-time'
    },
    {
      id: 4,
      title: 'Marketing Specialist',
      company: 'GrowthBoost',
      location: 'Chicago, IL',
      salary: '$70,000 - $85,000',
      type: 'Contract'
    },
  ];

  // Category data
  const categories = [
    { id: 1, name: 'Technology', icon: 'fa-laptop-code', count: 1240 },
    { id: 2, name: 'Design', icon: 'fa-paint-brush', count: 840 },
    { id: 3, name: 'Marketing', icon: 'fa-chart-line', count: 650 },
    { id: 4, name: 'Finance', icon: 'fa-dollar-sign', count: 350 },

    { id: 5, name: 'Education', icon: 'fa-graduation-cap', count: 470 },
  ];
  const Signin=()=>{
    navigator("/Signup")
  }

  const userlogin=()=>{
    navigator("/login")
  }
  const handleGuestLogin = () => {
    // Store guest session info
    // localStorage.setItem("guest", "true");
    // navigator("/Applicant"); // Redirect to job listings page
    console.log("Guest")
  };
  return (
    <div className="job-portal-container">
      {/* Navigation */}
      <nav className="navbarland">
        <div className="nav-container">
          <div className="nav-logo">
            <img src=".\src\Components\Landingpage\svgviewer-png-output (2).png" alt=""  height={"80vh"} width={"320vw"}/>
            {/* <a href="#about" style={{color:"green"}}>About Us</a> */}
          </div>
          <div className="nav-links desktop-only">


            {/* <Link to="/login" className="nav-link">User Login</Link> */}
            {/* <Link to="/Emplogin" className="nav-link">Employe Login</Link> */}


           
            {/* button */}
            <button className="btn btn-light" onClick={userlogin}>User</button>
            <button className="btn btn-light" onClick={Signin}>SignUp</button> 
             <button className="btn btn-light" onClick={postjob}>PostJob</button>
            <button className="btn btn-light" onClick={handleGuestLogin}>Guest</button>


          </div>
          <div className="mobile-menu">
            <button className="mobile-menu-btn">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Find Your Dream Job Today</h1>
              <p>Discover thousands of job opportunities with all the information you need.</p>
              
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="search-form" >
                <div className="search-input-group">
                  <i className="fas fa-search search-icon"></i>
                  <input 
                    type="text" 
                    placeholder="Job title or keyword" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="search-input-group">
                  <i className="fas fa-map-marker-alt search-icon"></i>
                  <input 
                    type="text" 
                    placeholder="Location" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <button type="submit" className="search-btn">
                  <i className="fas fa-search"></i> Search Jobs
                </button>
              </form>
              
              <div className="popular-searches">
                <span>Popular searches: </span>
                <a href="#">React</a>
                <a href="#">Web Developer</a>
                <a href="#">Remote</a>
                <a href="#">Entry Level</a>
              </div>
            </div>
            <div className="hero-image">
              <img src="/api/placeholder/600/400" alt="Job search illustration" />
            </div>
          </div>
        </div>
      </div>
{/* About section   */}
<div className="about-container" id='about'>
      <div className="about-header">
        <h1>About JobQuest</h1>
      </div>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At JobConnect, we bridge the gap between talent and opportunity. Our platform is designed to connect job seekers with their ideal positions and help employers find the perfect candidates to join their teams.
        </p>
      </section>

      <section className="offerings-section">
        <h2>What We Offer</h2>
        
        <div className="offerings-grid">
          <div className="offering-card jobseekers-card">
            <h3>For Job Seekers</h3>
            <ul>
              <li><strong>Personalized Job Matching:</strong> Our advanced algorithm recommends positions tailored to your skills and experience</li>
              <li><strong>Career Resources:</strong> Access resume builders, interview preparation guides, and skill development resources</li>
              <li><strong>Application Tracking:</strong> Easily monitor the status of all your applications in one convenient dashboard</li>
              <li><strong>Profile Visibility:</strong> Create a professional profile that showcases your expertise to potential employers</li>
            </ul>
          </div>

          <div className="offering-card employers-card">
            <h3>For Employers</h3>
            <ul>
              <li><strong>Talent Discovery:</strong> Access our diverse pool of qualified candidates using powerful search filters</li>
              <li><strong>Automated Screening:</strong> Save time with our AI-powered application screening tools</li>
              <li><strong>Company Showcase:</strong> Build your employer brand with a customizable company profile</li>
              <li><strong>Analytics Dashboard:</strong> Track application metrics and optimize your recruitment strategy</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="story-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2025, JobConnect was born from a simple observation: the job market needed a more efficient, transparent, and user-friendly platform. Our team of HR professionals and tech innovators came together to create a solution that reimagines the hiring process for the modern workforce.
        </p>
      </section>

      <section className="technology-section">
        <h2>Our Technology</h2>
        <p>
          Built with React JS and cutting-edge web technologies, JobConnect delivers a seamless, responsive experience across all devices. We prioritize performance, accessibility, and security to ensure that your job search or hiring process is as smooth as possible.
        </p>
      </section>

      <section className="join-section">
        <h2>Join Our Community</h2>
        <p>
          Whether you're looking for your next career move or aiming to build your dream team, JobConnect is here to help you succeed. Join thousands of professionals who have already discovered the power of intelligent job matching.
        </p>
        <div className="cta-buttons">

          <button className="cta-button employer-button" onClick={postjob}> Post Jobs</button>
        </div>
      </section>
    </div>
      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            <div className="stat-box">
              <h3>10K+</h3>
              <p>Job Listings</p>
            </div>
            <div className="stat-box">
              <h3>8.5K+</h3>
              <p>Companies</p>
            </div>
            <div className="stat-box">
              <h3>5M+</h3>
              <p>Job Seekers</p>
            </div>
            <div className="stat-box">
              <h3>250K+</h3>
              <p>Successful Hires</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="jobs-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Featured Jobs</h2>
            <p>Handpicked opportunities from top employers</p>
          </div>
          
          <div className="jobs-grid">
            {featuredJobs.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-card-header">
                  <div className="job-icon">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.company}</p>
                  </div>
                </div>
                <div className="job-details">
                  <div className="job-detail">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{job.location}</span>
                  </div>
                  <div className="job-detail">
                    <i className="fas fa-info-circle"></i>
                    <span>{job.type}</span>
                  </div>
                  <div className="job-detail">
                    <i className="fas fa-money-bill-wave"></i>
                    <span>{job.salary}</span>
                  </div>
                </div>
                <button className="job-btn">
                  View Details
                </button>
              </div>
            ))}
          </div>
          
          <div className="view-all">
            <button className="btn btn-outline">
              View All Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Job Categories */}
      <div className="categories-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Popular Categories</h2>
            <p>Explore jobs by industry</p>
          </div>
          
          <div className="categories-grid">
            {categories.map(category => (
              <div key={category.id} className="category-card">
                <div className="category-icon">
                  <i className={`fas ${category.icon}`}></i>
                </div>
                <h3>{category.name}</h3>
                <p>{category.count} jobs</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="process-section">
        <div className="section-container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Find your perfect job in just three simple steps</p>
          </div>
          
          <div className="process-grid">
            <div className="process-card">
              <div className="process-step">
                <span>1</span>
              </div>
              <h3>Create an Account</h3>
              <p>Sign up and complete your profile with your skills and experience</p>
            </div>
            <div className="process-card">
              <div className="process-step">
                <span>2</span>
              </div>
              <h3>Search Jobs</h3>
              <p>Browse thousands of jobs that match your skills and preferences</p>
            </div>
            <div className="process-card">
              <div className="process-step">
                <span>3</span>
              </div>
              <h3>Apply & Get Hired</h3>
              <p>Send applications and connect with employers directly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p>From our happy users</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar"></div>
                <div className='person'>
                  <h4>Sarah Johnson</h4>
                  <p>Software Engineer</p>
                </div>
              </div>
              <p>"I found my dream job at a tech startup within just two weeks of using JobPortal. The platform is intuitive and the job matching algorithm is spot on!"</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar"></div>
                <div className='person'>
                  <h4>Michael Chen</h4>
                  <p>UX Designer</p>
                </div>
              </div>
              <p>"As a freelancer, JobPortal has been invaluable for finding consistent contract work. The filters make it easy to find remote opportunities that match my skills."</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar"></div>
                <div className='person'>
                  <h4>Emily Rodriguez</h4>
                  <p>Marketing Director</p>
                </div>
              </div>
              <p>"After being laid off, I was able to secure multiple interviews within days thanks to JobPortal. Their premium services helped me stand out to employers."</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="newsletter-section">
        <div className="section-container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2>Stay Updated</h2>
              <p>Get the latest job postings delivered to your inbox weekly</p>
            </div>
            <div className="newsletter-form-container">
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>JobPortal</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>For Job Seekers</h3>
              <ul>
                <li><a href="#">Browse Jobs</a></li>
                <li><a href="#">Career Resources</a></li>
                <li><a href="#">Resume Builder</a></li>
                <li><a href="#">Career Advice</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>For Employers</h3>
              <ul>
                <li><a href="#">Post a Job</a></li>
                <li><a href="#">Browse Candidates</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Recruitment Solutions</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Connect With Us</h3>
              <div className="social-icons">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
              <p>Download our app</p>
              <div className="app-buttons">
                <a href="#" className="app-button">
                  <i className="fab fa-apple"></i> App Store
                </a>
                <a href="#" className="app-button">
                  <i className="fab fa-google-play"></i> Google Play
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 JobPortal. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookies Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    
  );
};

export default Landingpage;