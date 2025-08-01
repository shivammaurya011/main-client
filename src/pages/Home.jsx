import { Link } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import { 
  FiZap,
  FiBarChart2,
  FiUsers,
  FiCheckCircle,
  FiGlobe,
  FiBriefcase,
  FiBook,
  FiUser,
  FiArrowUpRight,
  FiArrowRight
} from 'react-icons/fi';
import React from 'react';

const Home = () => {
  const platforms = [
    { title: "Hire", subtitle: "AI-Powered Recruitment Automation", icon: <FiBriefcase />, color: "emerald", cta: "Optimize Hiring", features: ["AI Resume Parsing", "Bias-Free Screening", "Automated Interviews", "ATS Integration"], path: "/hire" },
    { title: "Campus", subtitle: "AI-Driven Education Ecosystem", icon: <FiBook />, color: "blue", cta: "Boost Placements", features: ["Student Skill Tracking", "Adaptive Learning Paths", "Placement Analytics", "Industry Benchmarking"], path: "/campus" },
    { title: "Career", subtitle: "AI Career Accelerator", icon: <FiUser />, color: "orange", cta: "Get Job Ready", features: ["AI Resume Builder", "Mock Interviews", "Career Roadmapping", "Company-Specific Prep"], path: "/career" }
  ];

  const workflows = [
    { title: "For Recruiters", steps: ["Upload Job Requirements", "AI Candidate Matching", "Automated Screening", "Interview & Select"], color: "emerald" },
    { title: "For Institutions", steps: ["Student Skill Analysis", "Personalized Learning", "Industry Alignment", "Placement Tracking"], color: "blue" },
    { title: "For Students", steps: ["Profile Optimization", "Skill Gap Analysis", "AI Mock Interviews", "Job Matching"], color: "orange" }
  ];

  const benefits = [
    { title: "Increased Efficiency", description: "Save time and resources with AI automating repetitive tasks across hiring, education, and career prep.", icon: <FiZap />, color: "emerald" },
    { title: "Data-Driven Decisions", description: "Leverage real-time analytics to make informed choices for better outcomes.", icon: <FiBarChart2 />, color: "blue" },
    { title: "Personalized Experience", description: "Tailored solutions for recruiters, institutions, and individuals to meet unique needs.", icon: <FiUsers />, color: "orange" },
    { title: "Global Connectivity", description: "Bridge talent and opportunities worldwide with a scalable AI platform.", icon: <FiGlobe />, color: "emerald" }
  ];

  const testimonials = [
    { text: "Premac's AI hiring reduced our recruitment costs by 40% while improving candidate quality significantly.", role: "Tech Startup CEO", platform: "Hire" },
    { text: "Our placement rates increased by 65% after implementing Premac's campus solution. A game-changer!", role: "University Director", platform: "Campus" },
    { text: "The AI mock interviews helped me land offers from 3 FAANG companies. Best career investment ever!", role: "Computer Science Graduate", platform: "Career" }
  ];

  const pricing = [
    { title: "Enterprise Plan", subtitle: "For Hiring Teams", price: "Custom", features: ["Unlimited Hiring", "Dedicated Support", "Custom Workflows", "API Access"], color: "emerald", path: "/hire" },
    { title: "Institution Plan", subtitle: "For Universities", price: "2999", features: ["500 Students", "Placement Analytics", "Admin Dashboard", "LMS Integration"], color: "blue", path: "/campus" },
    { title: "Pro Plan", subtitle: "For Job Seekers", price: "99", features: ["Unlimited Interviews", "Resume Reviews", "Career Roadmap", "Priority Support"], color: "orange", path: "/career" }
  ];

  const aboutPoints = [
    { title: "Our Mission", description: "Empower organizations and individuals with AI-driven tools to streamline talent acquisition and development.", icon: <FiZap />, color: "emerald" },
    { title: "Our Vision", description: "Create a global ecosystem where talent meets opportunity seamlessly through intelligent automation.", icon: <FiGlobe />, color: "blue" },
    { title: "Our Team", description: "A diverse group of AI experts, educators, and career specialists dedicated to your success.", icon: <FiUsers />, color: "orange" }
  ];

  const getColorClasses = (color) => {
    const colors = {
      emerald: {
        border: "border-emerald-600",
        bg: "bg-emerald-600",
        bgLight: "bg-emerald-600/10",
        text: "text-emerald-400",
        hoverBg: "hover:bg-emerald-700",
        hoverBorder: "hover:border-emerald-600",
        hoverText: "group-hover:text-emerald-400"
      },
      blue: {
        border: "border-blue-600",
        bg: "bg-blue-600",
        bgLight: "bg-blue-600/10",
        text: "text-blue-400",
        hoverBg: "hover:bg-blue-700",
        hoverBorder: "hover:border-blue-600",
        hoverText: "group-hover:text-blue-400"
      },
      orange: {
        border: "border-orange-600",
        bg: "bg-orange-600",
        bgLight: "bg-orange-600/10",
        text: "text-orange-400",
        hoverBg: "hover:bg-orange-700",
        hoverBorder: "hover:border-orange-600",
        hoverText: "group-hover:text-orange-400"
      }
    };
    return colors[color] || colors.emerald;
  };

  return (
    <RootLayout>
      <div className="min-h-screen scroll-smooth">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(16,185,129,0.1)_100%)]"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Next-Gen AI
                </span>{" "}
                Talent Solutions
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Transform recruitment, education, and career development with our integrated AI ecosystem.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { value: "50K+", label: "Companies Hiring", color: "emerald" },
                  { value: "200+", label: "Universities Partnered", color: "blue" },
                  { value: "1M+", label: "Careers Launched", color: "orange" },
                ].map((stat, index) => {
                  const colorClass = getColorClasses(stat.color);
                  return (
                    <div
                      key={index}
                      className={`p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border ${colorClass.border} transition-transform duration-300 hover:scale-105`}
                    >
                      <div className={`text-3xl font-bold ${colorClass.text}`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  <span className="relative">
                    About Premac AI
                    <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full"></span>
                  </span>
                </h2>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg">
                  We’re revolutionizing the talent landscape with cutting-edge AI, connecting recruiters, institutions, and job seekers for unparalleled efficiency and innovation.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
                >
                  Learn More
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              <div className="space-y-6">
                {aboutPoints.map((point, index) => {
                  const colorClass = getColorClasses(point.color);
                  return (
                    <div
                      key={index}
                      className={`group p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border ${colorClass.border} transition-all duration-300 hover:shadow-lg`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${colorClass.bgLight} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          {React.cloneElement(point.icon, { className: `w-6 h-6 ${colorClass.text}` })}
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-xl font-semibold text-white ${colorClass.hoverText}`}>
                            {point.title}
                          </h3>
                          <p className="text-gray-400 text-sm">{point.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="py-24 bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Integrated AI Platforms</h2>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                Three specialized solutions powered by unified AI technology.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {platforms.map((platform, index) => {
                const colorClass = getColorClasses(platform.color);
                return (
                  <div
                    key={index}
                    className={`group p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border ${colorClass.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 ${colorClass.bgLight} rounded-lg flex-shrink-0`}>
                        {React.cloneElement(platform.icon, { className: `w-6 h-6 ${colorClass.text}` })}
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-white truncate">{platform.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-6 text-sm md:text-base">{platform.subtitle}</p>
                    <ul className="space-y-3 mb-6">
                      {platform.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-300 text-sm">
                          <FiCheckCircle className={`w-4 h-4 ${colorClass.text} mr-2 flex-shrink-0`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={platform.path}
                      className={`inline-flex items-center px-6 py-2 ${colorClass.bg} text-white rounded-lg font-medium ${colorClass.hoverBg} transition-all`}
                    >
                      {platform.cta}
                      <FiArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Strategic Advantages</h2>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                Why industry leaders choose Premac AI.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => {
                const colorClass = getColorClasses(benefit.color);
                return (
                  <div
                    key={index}
                    className={`p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border ${colorClass.border} transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className={`w-12 h-12 ${colorClass.bgLight} rounded-lg flex items-center justify-center mb-4 flex-shrink-0`}>
                      {React.cloneElement(benefit.icon, { className: `w-6 h-6 ${colorClass.text}` })}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-24 bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Optimized Workflows</h2>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                Streamlined processes for every stakeholder.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {workflows.map((workflow, index) => {
                const colorClass = getColorClasses(workflow.color);
                return (
                  <div
                    key={index}
                    className={`p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border ${colorClass.border} transition-all duration-300 hover:shadow-lg`}
                  >
                    <h3 className={`text-lg md:text-xl font-semibold ${colorClass.text} mb-4`}>{workflow.title}</h3>
                    <ul className="space-y-3">
                      {workflow.steps.map((step, i) => (
                        <li key={i} className="flex items-start">
                          <div className={`w-6 h-6 ${colorClass.bgLight} rounded-full flex items-center justify-center ${colorClass.text} mr-3 flex-shrink-0`}>
                            {i + 1}
                          </div>
                          <span className="text-gray-300 text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Trusted by Innovators</h2>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                Real results from our global community.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => {
                const platformColor = { Hire: "emerald", Campus: "blue", Career: "orange" }[testimonial.platform];
                const colorClass = getColorClasses(platformColor);
                return (
                  <div
                    key={index}
                    className={`p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border ${colorClass.border} transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className={`text-lg ${colorClass.text} mb-4 font-medium`}>{testimonial.platform}</div>
                    <p className="text-gray-300 text-sm italic mb-4">"{testimonial.text}"</p>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-sm text-white font-medium">{testimonial.role}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Flexible Pricing</h2>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                Tailored plans for every need.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricing.map((plan, index) => {
                const colorClass = getColorClasses(plan.color);
                return (
                  <div
                    key={index}
                    className={`p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border ${colorClass.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                  >
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{plan.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{plan.subtitle}</p>
                    <div className={`text-2xl md:text-3xl font-bold ${colorClass.text} mb-6`}>
                      {plan.price === "Custom" ? "Custom" : `$${plan.price}`}
                      {plan.price !== "Custom" && <span className="text-lg text-gray-400">/mo</span>}
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-300 text-sm">
                          <FiCheckCircle className={`w-4 h-4 ${colorClass.text} mr-2 flex-shrink-0`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={plan.path}
                      className={`w-full flex justify-center items-center py-3 ${colorClass.bg} text-white rounded-lg font-medium ${colorClass.hoverBg} transition-all`}
                    >
                      {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                      <FiArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 bg-gray-900 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-cyan-600/10"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-lg mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Stay Ahead with AI Insights
              </h2>
              <p className="text-gray-300 text-base md:text-lg">
                Subscribe for updates on HR tech, platform news, and exclusive tips.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                <button className="w-full flex justify-center items-center py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-cyan-700 transition-all">
                  Subscribe
                  <FiArrowUpRight className="ml-2 w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </div>
    </RootLayout>
  );
};

export default Home;