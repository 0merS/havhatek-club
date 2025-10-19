import { useEffect, useRef } from 'react';
import '../styles/homepage.css';

export default function HomePage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 150;
    const connectionDistance = 150;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      connectParticles();
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Mesajınız başarıyla gönderildi!');
    e.target.reset();
  };

  return (
    <>
      <section id="ana-sayfa" className="hero">
        <canvas ref={canvasRef} id="particles"></canvas>
        <div className="hero-content">
          <h1>HAVHATEK</h1>
          <p>Havacılık, Haberleşme ve Teknoloji Klübü</p>
          <a href="#kayit" className="cta-button">Bize Katıl</a>
        </div>
      </section>

      <section id="hakkimizda">
        <h2>Hakkımızda</h2>
        <div className="about-content animate-on-scroll">
          <p>HAVHATEK (Havacılık, Haberleşme ve Teknoloji Klübü), İstanbul Üniversitesi Cerrahpaşa Meslek Yüksekokulu bünyesinde faaliyet gösteren, teknoloji ve inovasyona tutkuyla bağlı öğrencilerin bir araya geldiği dinamik bir topluluktur.</p>
          <p>Klübümüz, havacılık teknolojileri, haberleşme sistemleri ve modern teknoloji alanlarında öğrencilere pratik deneyim kazandırmayı, sektör profesyonelleriyle networking fırsatları sunmayı ve yenilikçi projelere imza atmayı hedeflemektedir.</p>
          <p>Teknik çalıştaylar, seminerler, saha gezileri ve proje yarışmaları düzenleyerek üyelerimizin hem teorik bilgilerini hem de pratik becerilerini geliştirmeyi amaçlıyoruz. Birlikte öğrenip, birlikte büyüyoruz!</p>
        </div>
      </section>

      <section id="etkinlikler">
        <h2>Yaklaşan Etkinlikler</h2>
        <div className="events-grid">
          <div className="event-card animate-on-scroll">
            <span className="event-date">14-16 Ekim 2026</span>
            <h3>Klüp Tanıtım Günleri</h3>
            <p>İstanbul Üniversitesi Cerrahpaşa Meslek Yüksekokulu kampüsünde klüp üyelerimizle birlikte sizlerle buluşuyoruz. Havacılık, haberleşme ve teknoloji alanındaki projelerimizi keşfedin, etkinliklerimiz hakkında bilgi alın ve aramıza katılın!</p>
          </div>
        </div>
      </section>

      <section id="iletisim">
        <h2>İletişim</h2>
        <form className="contact-form animate-on-scroll" onSubmit={handleContactSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Adınız Soyadınız" required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="E-posta Adresiniz" required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Telefon Numaranız" required />
          </div>
          <div className="form-group">
            <textarea placeholder="Mesajınız" required></textarea>
          </div>
          <button type="submit">Gönder</button>
        </form>
      </section>

      <footer>
        <p>&copy; 2025 Havhatek - Havacılık Haberleşme ve Teknoloji Klübü</p>
        <p>İstanbul Üniversitesi - Cerrahpaşa</p>
        <div className="social-links">
          <a href="mailto:iuchavhatek@gmail.com" title="E-posta">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/iuchavhatek" target="_blank" rel="noopener noreferrer" title="Instagram">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/havacılık-haberleşme-teknoloji-kulübü-7490a437b" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>
      </footer>
    </>
  );
}