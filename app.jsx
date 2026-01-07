import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, CheckCircle, ChevronRight, Briefcase, 
  Code, Server, PenTool, GraduationCap, Cloud, 
  Mail, Phone, MessageCircle, Linkedin, Globe, 
  Download, ChevronDown, ExternalLink
} from 'lucide-react';

// --- Custom Hooks ---

// Hook for the typing effect
const useTypingEffect = (words, typingSpeed = 150, deletingSpeed = 100, pauseDuration = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
      }

      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
};

// Hook for scroll reveal animation
const useScrollReveal = (threshold = 0.1) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

// --- Components ---

const NavBar = ({ toggleMenu, isMenuOpen }) => (
  <nav className="fixed w-full z-50 transition-all duration-300 bg-[#0a192f]/85 backdrop-blur-md border-b border-[#3b82f6]/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div className="flex-shrink-0 flex items-center">
          <a href="#" className="font-heading font-extrabold text-2xl text-white tracking-wider border-2 border-[#3b82f6] px-2 py-1 rounded">
            MJA<span className="text-[#3b82f6]">.</span>
          </a>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {['About', 'Experience', 'Skills', 'Contact'].map((item, index) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-white hover:text-[#3b82f6] transition-colors font-medium text-sm tracking-wide">
              <span className="text-[#3b82f6]">0{index + 1}.</span> {item}
            </a>
          ))}
          <a href="/resume.pdf" className="px-5 py-2 border border-[#3b82f6] text-[#3b82f6] font-medium text-sm rounded hover:bg-[#3b82f6] hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-300">
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white hover:text-[#3b82f6] focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>
    
    {/* Mobile Menu */}
    <div className={`md:hidden bg-[#0a192f] absolute w-full shadow-xl border-b border-[#112240] transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
      <div className="px-6 pt-4 pb-8 space-y-4">
        {['About', 'Experience', 'Skills', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={toggleMenu} className="block py-2 text-white hover:text-[#3b82f6]">
            {item}
          </a>
        ))}
        <a href="/resume.pdf" className="block w-full text-center mt-4 px-5 py-3 bg-[#3b82f6] text-white font-bold rounded hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all">
          Download Resume
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  const typedText = useTypingEffect(["Web Applications.", "Cloud Infrastructure.", "Digital Strategies.", "B2B Solutions."]);

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-[#020c1b] pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#3b82f6] rounded-full mix-blend-screen filter blur-[128px] opacity-10 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 bg-grid opacity-[0.05]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-4xl">
          <p className="reveal text-[#3b82f6] font-medium mb-4 tracking-wider">Hi, my name is</p>
          <h1 className="reveal delay-100 text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-white mb-4 leading-tight">
            Muhammad Junaid Asghar.
          </h1>
          <h2 className="reveal delay-200 text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-[#8892b0] mb-8 leading-tight">
            I build <span className="text-gradient typing-cursor">{typedText}</span>
          </h2>
          <p className="reveal delay-300 text-lg md:text-xl text-[#8892b0] max-w-2xl mb-12 leading-relaxed">
            I'm a Full-Stack Developer and AWS Certified Cloud Practitioner specializing in building exceptional digital experiences. From scalable backend infrastructure to engaging B2B marketing strategies.
          </p>
          <div className="reveal delay-400 flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-[#3b82f6] text-white font-bold rounded hover:bg-blue-600 transition-all transform hover:-translate-y-1 hover:shadow-lg shadow-blue-500/20 text-center">
              Get In Touch
            </a>
            <a href="#experience" className="w-full sm:w-auto px-8 py-4 border border-white text-white font-bold rounded hover:bg-white hover:text-[#020c1b] transition-all transform hover:-translate-y-1 text-center">
              View Experience
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-2xl animate-bounce hidden md:block">
        <a href="#about"><ChevronDown /></a>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-24 bg-[#0a192f]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="md:w-3/5">
          <div className="reveal flex items-center mb-8">
            <span className="text-2xl md:text-3xl font-heading font-bold text-white mr-4"><span className="text-[#3b82f6]">01.</span> About Me</span>
            <div className="h-[1px] bg-[#233554] flex-grow max-w-xs"></div>
          </div>
          
          <div className="reveal delay-100 space-y-4 text-[#8892b0]">
            <p>
              Hello! My name is Junaid and I enjoy creating things that live on the internet. My interest in web development started back when I decided to merge my creative design skills with technical problem solving.
            </p>
            <p>
              Fast-forward to today, and I’ve had the privilege of working at <span className="text-[#3b82f6]">consulting agencies, design firms, and tech startups</span>. My main focus these days is building accessible, inclusive products.
            </p>
            <p>
              I am also an <span className="text-white font-bold">AWS Certified Cloud Practitioner</span>, meaning I don't just write code; I understand the infrastructure it lives on.
            </p>
          </div>

          <ul className="reveal delay-200 grid grid-cols-2 gap-2 mt-8 text-sm font-medium text-white">
            {[
              "React & Angular", "AWS Cloud", "TypeScript", 
              "Node.js & Linux", "Digital Marketing", "UI/UX Design"
            ].map((skill) => (
              <li key={skill} className="flex items-center"><ChevronRight size={16} className="text-[#3b82f6] mr-2" /> {skill}</li>
            ))}
          </ul>
        </div>

        <div className="reveal delay-300 md:w-2/5 relative group">
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            <div className="absolute inset-0 border-2 border-[#3b82f6] rounded transition-transform transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 z-0"></div>
            <div className="absolute inset-0 bg-[#233554] rounded overflow-hidden z-10 filter hover:filter-none transition-all duration-300 grayscale group-hover:grayscale-0">
               {/* Placeholder for Image - Using a gradient placeholder if image not found */}
               <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-500">
                  <span className="text-center p-4">Add junaid.jpg to public folder</span>
               </div>
               <img src="/junaid.jpg" alt="Muhammad Junaid Asghar" className="w-full h-full object-cover absolute inset-0 opacity-100" onError={(e) => e.target.style.opacity = 0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" className="py-24 bg-[#020c1b]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="reveal flex items-center mb-12">
        <span className="text-2xl md:text-3xl font-heading font-bold text-white mr-4"><span className="text-[#3b82f6]">02.</span> Where I've Worked</span>
        <div className="h-[1px] bg-[#233554] flex-grow max-w-xs"></div>
      </div>

      <div className="reveal delay-100 relative border-l-2 border-[#233554] ml-3 md:ml-6 space-y-12">
        {[
          {
            role: "Web Developer",
            company: "Rational Mark",
            period: "Recent",
            points: [
              "Developed dynamic, responsive UIs using React, Angular, HTML, CSS.",
              "Architected front-end apps with AWS services for scalable backend solutions.",
              "Optimized server-side functionalities ensuring robust AWS infrastructure communication."
            ]
          },
          {
            role: "Assistant Branch Manager",
            company: "Bin Aziz Tourism & Consultants",
            points: [
              "Managed international/domestic flight queries and operations.",
              "Handled B2B & B2C management and overseas client relations."
            ]
          },
          {
            role: "General Manager",
            company: "Matab Siddiqui",
            points: [
              "Oversaw stocks management and financial operations.",
              "Managed public relations and brand reputation."
            ]
          },
          {
            role: "Customer Support Executive",
            company: "Ibex (Walmart)",
            points: [
              "Provided top-tier customer support for international Walmart customers."
            ]
          }
        ].map((job, idx) => (
          <div key={idx} className="relative pl-8 group">
            <div className={`absolute -left-[9px] top-0 w-4 h-4 bg-[#020c1b] border-2 ${idx === 0 ? 'border-[#3b82f6] bg-[#3b82f6]' : 'border-[#8892b0]'} rounded-full group-hover:bg-[#3b82f6] group-hover:border-[#3b82f6] transition-colors`}></div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#3b82f6] transition-colors">{job.role}</h3>
            <h4 className="text-lg font-medium text-[#8892b0] mb-1">{job.company}</h4>
            {job.period && <span className="text-sm font-mono text-[#8892b0] mb-4 block">{job.period}</span>}
            <ul className="list-none space-y-2 text-[#8892b0] text-sm mt-2">
              {job.points.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start">
                  <span className="text-[#3b82f6] mr-2">▹</span>
                  <span className="flex-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="reveal delay-300 mt-16">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center"><Briefcase className="text-[#3b82f6] mr-3" /> Freelance & Contract Highlights</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { role: "Social Media Manager", company: "Perfume Palace Company" },
            { role: "Client Manager", company: "Vesper Design Agency" },
            { role: "Query Management", company: "Eaxperience Company" },
            { role: "Graphic Designer", company: "Scents & Aroma Traders" }
          ].map((gig, idx) => (
            <div key={idx} className="bg-[#0a192f] p-4 rounded border border-[#112240] hover:border-[#3b82f6] transition-colors">
              <h4 className="text-white font-bold">{gig.role}</h4>
              <p className="text-sm text-[#8892b0]">{gig.company}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="py-24 bg-[#0a192f]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="reveal flex items-center mb-12">
        <span className="text-2xl md:text-3xl font-heading font-bold text-white mr-4"><span className="text-[#3b82f6]">03.</span> Technical Expertise</span>
        <div className="h-[1px] bg-[#233554] flex-grow max-w-xs"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Code size={40} />,
            title: "Web Development",
            desc: "Building fast, responsive, and dynamic web applications.",
            tags: ["HTML/CSS", "React", "Angular", "TypeScript", "Ionic", "WordPress"]
          },
          {
            icon: <Server size={40} />,
            title: "Cloud & DevOps",
            desc: "Deploying and managing scalable server infrastructure.",
            tags: ["AWS Certified", "Linux (Ubuntu)", "Apache", "Nginx", "Server Setup"]
          },
          {
            icon: <PenTool size={40} />,
            title: "Digital & Creative",
            desc: "Creating content and strategies that convert.",
            tags: ["B2B/B2C", "Sales Gen", "Adobe Suite", "Canva/CapCut", "Videography"]
          }
        ].map((skill, idx) => (
          <div key={idx} className={`reveal delay-${(idx + 1) * 100} bg-[#112240] p-8 rounded shadow-xl hover:-translate-y-2 transition-transform duration-300 border-t-4 border-[#3b82f6]`}>
            <div className="text-[#3b82f6] mb-6">{skill.icon}</div>
            <h3 className="text-xl font-bold text-white mb-4">{skill.title}</h3>
            <p className="text-[#8892b0] text-sm mb-6">{skill.desc}</p>
            <div className="flex flex-wrap gap-2">
              {skill.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-[#020c1b] text-[#3b82f6] text-xs font-mono rounded">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Education = () => (
  <section className="py-24 bg-[#020c1b]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="reveal text-2xl md:text-3xl font-heading font-bold text-white mb-12">Education & Certifications</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="reveal delay-100 bg-[#0a192f] p-6 rounded border border-[#112240] hover:border-[#3b82f6] transition-colors flex flex-col items-center">
          <GraduationCap size={40} className="text-[#3b82f6] mb-4" />
          <h3 className="text-white font-bold text-lg">BS Information Technology</h3>
          <p className="text-[#8892b0] text-sm">Virtual University of Pakistan</p>
          <span className="text-[#3b82f6] text-xs font-mono mt-2 block">Ongoing</span>
        </div>
        <div className="reveal delay-200 bg-[#0a192f] p-6 rounded border border-[#112240] hover:border-[#3b82f6] transition-colors flex flex-col items-center">
          <Cloud size={40} className="text-[#3b82f6] mb-4" />
          <h3 className="text-white font-bold text-lg">AWS Certified Cloud Practitioner</h3>
          <p className="text-[#8892b0] text-sm">Amazon Web Services</p>
          <span className="text-[#3b82f6] text-xs font-mono mt-2 block">Certification</span>
        </div>
      </div>
    </div>
  </section>
);

const Contact = ({ onCopy }) => (
  <section id="contact" className="py-24 bg-[#0a192f]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <span className="reveal text-[#3b82f6] font-mono text-sm mb-4 block">04. What’s Next?</span>
      <h2 className="reveal delay-100 text-4xl md:text-5xl font-heading font-bold text-white mb-6">Get In Touch</h2>
      <p className="reveal delay-200 text-[#8892b0] text-lg max-w-xl mx-auto mb-12">
        I am currently looking for new opportunities in Web Development and Cloud Infrastructure. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
      </p>

      <div className="reveal delay-300 flex flex-wrap justify-center gap-6 mb-12">
        <button onClick={(e) => onCopy(e, 'mjunaydw@outlook.com')} className="flex items-center gap-3 px-6 py-4 bg-[#112240] rounded text-white hover:bg-[#233554] transition-colors cursor-pointer group">
          <Mail className="text-[#3b82f6] group-hover:scale-110 transition-transform" />
          <span className="break-all">mjunaydw@outlook.com</span>
        </button>
        <button onClick={(e) => onCopy(e, '+923160451527')} className="flex items-center gap-3 px-6 py-4 bg-[#112240] rounded text-white hover:bg-[#233554] transition-colors cursor-pointer group">
          <Phone className="text-[#3b82f6] group-hover:scale-110 transition-transform" />
          <span>+92 316 0451527</span>
        </button>
        <a href="https://wa.me/923160451527" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-[#112240] rounded text-white hover:bg-[#233554] transition-colors cursor-pointer group">
          <MessageCircle className="text-[#3b82f6] group-hover:scale-110 transition-transform" />
          <span>WhatsApp</span>
        </a>
      </div>
      
      <a href="mailto:mjunaydw@outlook.com" className="reveal delay-400 inline-block px-10 py-5 border-2 border-[#3b82f6] text-[#3b82f6] font-bold rounded hover:bg-[#3b82f6] hover:text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
        Say Hello
      </a>
      
      <div className="mt-20 flex justify-center space-x-8 text-2xl text-[#8892b0]">
        <a href="https://linkedin.com/in/mjunaydw" className="hover:text-[#3b82f6] hover:-translate-y-1 transition-all"><Linkedin /></a>
        <a href="https://tahadoesthat.com/junaidasghar" className="hover:text-[#3b82f6] hover:-translate-y-1 transition-all"><Globe /></a>
      </div>
      
      <p className="mt-8 text-sm text-[#8892b0] font-mono">Designed & Built by Muhammad Junaid Asghar</p>
    </div>
  </section>
);

const Toast = ({ show }) => (
  <div className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-[#020c1b] px-6 py-3 rounded-full font-bold shadow-2xl z-50 transition-all duration-300 w-max max-w-[90%] text-center flex items-center ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
    <CheckCircle size={20} className="text-green-500 mr-2" /> Copied to clipboard!
  </div>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useScrollReveal();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const copyToClipboard = (e, text) => {
    e.preventDefault();
    navigator.clipboard.writeText(text).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  return (
    <div className="font-sans text-[#8892b0] bg-[#020c1b] selection:bg-[#3b82f6] selection:text-white overflow-x-hidden scroll-smooth">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Poppins:wght@300;400;500;600&display=swap');
        
        .font-sans { font-family: 'Poppins', sans-serif; }
        .font-heading { font-family: 'Montserrat', sans-serif; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a192f; }
        ::-webkit-scrollbar-thumb { background: #233554; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #3b82f6; }

        /* Text Gradient */
        .text-gradient {
          background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Float Animation */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }

        /* Typing Cursor */
        .typing-cursor::after {
          content: '|';
          animation: blink 1s step-start infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }

        /* Scroll Reveal Utility */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
        .delay-400 { transition-delay: 400ms; }
        
        /* Background Grid */
        .bg-grid {
            background-size: 50px 50px;
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>

      <Toast show={showToast} />
      <NavBar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Contact onCopy={copyToClipboard} />
    </div>
  );
}
