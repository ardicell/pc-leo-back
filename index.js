export default {
  async fetch(request) {
    const html = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Gallery Slider Keren</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #1a2a6c, #b21f1f, #1a2a6c);
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }
        
        .header {
          text-align: center;
          margin: 20px 0 30px;
          width: 100%;
        }
        
        h1 {
          font-size: 2.5rem;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          margin-bottom: 10px;
          background: linear-gradient(to right, #ff7e5f, #feb47b);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .container {
          max-width: 1200px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }
        
        .gallery-container {
          position: relative;
          width: 100%;
          max-width: 900px;
          height: 70vh;
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .gallery-slider {
          display: flex;
          height: 100%;
          transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
          will-change: transform;
        }
        
        .slide {
          min-width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .slide img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
          transition: transform 0.3s;
        }
        
        .slide img:hover {
          transform: scale(1.02);
        }
        
        .btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          z-index: 10;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .btn:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: translateY(-50%) scale(1.1);
        }
        
        .btn.prev {
          left: 20px;
        }
        
        .btn.next {
          right: 20px;
        }
        
        .caption-container {
          width: 100%;
          max-width: 900px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .caption-title {
          text-align: center;
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: #ff7e5f;
        }
        
        .caption-image {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        
        .caption-image img {
          max-width: 100%;
          max-height: 300px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }
        
        .caption-content {
          text-align: center;
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.9;
        }
        
        .slide-indicators {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
        }
        
        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .indicator.active {
          background: #ff7e5f;
          transform: scale(1.3);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .gallery-container {
            height: 50vh;
          }
          
          h1 {
            font-size: 2rem;
          }
          
          .btn {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
          
          .caption-container {
            padding: 20px;
          }
          
          .caption-title {
            font-size: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .gallery-container {
            height: 40vh;
          }
          
          h1 {
            font-size: 1.7rem;
          }
          
          .btn {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }
          
          .caption-title {
            font-size: 1.3rem;
          }
          
          .caption-content {
            font-size: 1rem;
          }
        }
        
        .footer {
          margin-top: 40px;
          text-align: center;
          padding: 20px;
          font-size: 0.9rem;
          opacity: 0.7;
          width: 100%;
        }
      </style>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body>
      <div class="header">
        <h1>Gallery Foto Keren</h1>
        <p class="subtitle">Geser dengan tombol atau swipe untuk melihat foto lainnya</p>
      </div>
      
      <div class="container">
        <div class="gallery-container" id="gallery">
          <div class="gallery-slider" id="slider">
            <div class="slide">
              <img src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=80" alt="Pemandangan Pantai">
            </div>
            <div class="slide">
              <img src="https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3?auto=format&fit=crop&q=80" alt="Pegunungan Bersalju">
            </div>
            <div class="slide">
              <img src="https://images.unsplash.com/photo-1682687220208-22d7a2543e88?auto=format&fit=crop&q=80" alt="Hutan Tropis">
            </div>
            <div class="slide">
              <img src="https://images.unsplash.com/photo-1707345512638-1d6b7a424ee9?auto=format&fit=crop&q=80" alt="Kota Malam Hari">
            </div>
            <div class="slide">
              <img src="https://images.unsplash.com/photo-1707345512638-1d6b7a424ee9?auto=format&fit=crop&q=80" alt="Danau dengan Pegunungan">
            </div>
          </div>
          
          <button class="btn prev" id="prevBtn">❮</button>
          <button class="btn next" id="nextBtn">❯</button>
          
          <div class="slide-indicators" id="indicators"></div>
        </div>
        
        <div class="caption-container">
          <h2 class="caption-title">Keterangan Foto</h2>
          <div class="caption-image">
            <img src="https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3?auto=format&fit=crop&q=80" alt="Keterangan Foto">
          </div>
          <p class="caption-content">Foto-foto dalam gallery ini diambil dari berbagai lokasi indah di seluruh dunia. Setiap foto menampilkan keindahan alam yang menakjubkan dan momen yang langka.</p>
        </div>
      </div>
      
      <div class="footer">
        <p>© 2023 Gallery Foto Premium | Dibuat dengan Cloudflare Workers</p>
      </div>
      
      <script>
        document.addEventListener('DOMContentLoaded', () => {
          const slider = document.getElementById('slider');
          const slides = document.querySelectorAll('.slide');
          const prevBtn = document.getElementById('prevBtn');
          const nextBtn = document.getElementById('nextBtn');
          const indicatorsContainer = document.getElementById('indicators');
          let currentIndex = 0;
          
          // Create indicators
          slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
          });
          
          const indicators = document.querySelectorAll('.indicator');
          
          // Update slider position
          function updateSlider() {
            slider.style.transform = \`translateX(\${-currentIndex * 100}%)\`;
            updateIndicators();
          }
          
          // Update active indicator
          function updateIndicators() {
            indicators.forEach((indicator, index) => {
              if (index === currentIndex) {
                indicator.classList.add('active');
              } else {
                indicator.classList.remove('active');
              }
            });
          }
          
          // Go to specific slide
          function goToSlide(index) {
            currentIndex = index;
            updateSlider();
          }
          
          // Next slide
          function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
          }
          
          // Previous slide
          function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
          }
          
          // Add button event listeners
          prevBtn.addEventListener('click', prevSlide);
          nextBtn.addEventListener('click', nextSlide);
          
          // Add keyboard navigation
          document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
          });
          
          // Add touch swipe support
          let touchStartX = 0;
          let touchEndX = 0;
          
          slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
          });
          
          slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
          });
          
          function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchStartX - touchEndX > swipeThreshold) {
              nextSlide();
            } else if (touchEndX - touchStartX > swipeThreshold) {
              prevSlide();
            }
          }
          
          // Auto slide every 5 seconds
          setInterval(() => {
            nextSlide();
          }, 5000);
        });
      </script>
    </body>
    </html>
    `;
    
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
      },
    });
  },
};