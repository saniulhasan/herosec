// Add this to your existing script.js file

document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect
    const typewriterElement = document.querySelector('.typewriter');
    const words = ['Extraordinary NFTs', 'Digital Art', 'Rare Collectibles'];
    let wordIndex = 0;
    let charIndex = 0;
  
    function typeWriter() {
      if (charIndex < words[wordIndex].length) {
        typewriterElement.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(eraseText, 2000);
      }
    }
  
    function eraseText() {
      if (charIndex > 0) {
        typewriterElement.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 50);
      } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeWriter, 500);
      }
    }
  
    typeWriter();
  
    // Particle background
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        move: { enable: true, speed: 2, direction: 'none', random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
      }
    });
  
    // Animate NFT cards on scroll
    const nftCards = document.querySelectorAll('.nft-card');
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    nftCards.forEach(card => {
      card.style.animationPlayState = 'paused';
      observer.observe(card);
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Bubble particle effect
    particlesJS('bubble-particles', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#ffffff"
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 10,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "bubble"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          bubble: {
            distance: 100,
            size: 15,
            duration: 2,
            opacity: 0.8,
            speed: 3
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  
    // Animate NFT cards on scroll
    const nftCards = document.querySelectorAll('.nft-bubble-card');
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    nftCards.forEach(card => {
      card.style.animationPlayState = 'paused';
      observer.observe(card);
    });
  
    // Highlight text animation
    const highlightText = document.querySelector('.hero-bubble-title .highlight');
    setInterval(() => {
      highlightText.style.textShadow = '0 0 10px rgba(79, 195, 247, 0.8)';
      setTimeout(() => {
        highlightText.style.textShadow = '0 0 10px rgba(79, 195, 247, 0.3)';
      }, 500);
    }, 2000);
  });

  document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('hex-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hexagons = [];
    const hexagonCount = 6;

    class Hexagon {
        constructor(x, y, radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.angle = 0;
            this.speed = 0.001 + Math.random() * 0.002;
            this.opacity = 0.1 + Math.random() * 0.2;
        }

        draw() {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = this.angle + (Math.PI / 3) * i;
                const x = this.x + this.radius * Math.cos(angle);
                const y = this.y + this.radius * Math.sin(angle);
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.fillStyle = `rgba(27, 30, 52, ${this.opacity})`;
            ctx.fill();
        }

        update() {
            this.angle += this.speed;
            this.draw();
        }
    }

    function init() {
        for (let i = 0; i < hexagonCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = 80 + Math.random() * 80;
            hexagons.push(new Hexagon(x, y, radius));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hexagons.forEach(hexagon => hexagon.update());
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const nftCards = document.querySelectorAll('.neo-nft');
    
    nftCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.crypto-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Starfield Animation
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let width, height;

    const stars = [];
    const starCount = 1000;
    const maxDepth = 1000;

    function initCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function createStars() {
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * maxDepth
            });
        }
    }

    function drawStars() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#fff';
        ctx.save();
        ctx.translate(width / 2, height / 2);

        stars.forEach(star => {
            const x = star.x / (star.z * 0.001);
            const y = star.y / (star.z * 0.001);

            if (x > -width / 2 && x < width / 2 && y > -height / 2 && y < height / 2) {
                const size = (1 - star.z / maxDepth) * 3;
                ctx.fillRect(x, y, size, size);
            }
        });

        ctx.restore();
    }

    function updateStars() {
        stars.forEach(star => {
            star.z -= 2;
            if (star.z <= 0) {
                star.z = maxDepth;
            }
        });
    }

    function animate() {
        drawStars();
        updateStars();
        requestAnimationFrame(animate);
    }

    function init() {
        initCanvas();
        createStars();
        animate();
    }

    init();

    window.addEventListener('resize', init);

    // Text transitions
    const title = document.querySelector('.starfield-title');
    const subtitle = document.querySelector('.starfield-subtitle');
    const cta = document.querySelector('.starfield-cta');

    setTimeout(() => {
        title.classList.add('fade-in');
        subtitle.classList.add('fade-in');
        cta.classList.add('fade-in');
    }, 100);

    // Button hover effect
    const buttons = document.querySelectorAll('.starfield-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 3D Particle Grid Animation
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('particle-grid').appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const particles = 20000;
    const positions = new Float32Array(particles * 3);

    for (let i = 0; i < particles * 3; i += 3) {
        positions[i] = Math.random() * 200 - 100;
        positions[i + 1] = Math.random() * 200 - 100;
        positions[i + 2] = Math.random() * 200 - 100;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 100;

    function animate() {
        requestAnimationFrame(animate);
        points.rotation.x += 0.001;
        points.rotation.y += 0.002;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Text transitions
    const title = document.querySelector('.grid-title');
    const subtitle = document.querySelector('.grid-subtitle');
    const cta = document.querySelector('.grid-cta');

    setTimeout(() => {
        title.classList.add('fade-in');
        subtitle.classList.add('fade-in');
        cta.classList.add('fade-in');
    }, 100);

    // Button hover effect
    const buttons = document.querySelectorAll('.grid-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Galaxy Animation
    const canvas = document.getElementById('galaxy-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;

    const stars = [];
    const starCount = 10000;
    const maxDepth = 1000;

    function initCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function createStars() {
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * maxDepth,
                color: `hsl(${Math.random() * 360}, 100%, 80%)`
            });
        }
    }

    function drawStars() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);

        ctx.save();
        ctx.translate(width / 2, height / 2);

        stars.forEach(star => {
            const x = star.x / (star.z * 0.001);
            const y = star.y / (star.z * 0.001);

            if (x > -width / 2 && x < width / 2 && y > -height / 2 && y < height / 2) {
                const size = (1 - star.z / maxDepth) * 3;
                const opacity = 1 - star.z / maxDepth;

                ctx.beginPath();
                ctx.fillStyle = star.color;
                ctx.globalAlpha = opacity;
                ctx.arc(x, y, size, 0, 2 * Math.PI);
                ctx.fill();
            }
        });

        ctx.restore();
    }

    function updateStars() {
        stars.forEach(star => {
            star.z -= 2;
            if (star.z <= 0) {
                star.z = maxDepth;
                star.x = Math.random() * width - width / 2;
                star.y = Math.random() * height - height / 2;
            }
        });
    }

    function animate() {
        drawStars();
        updateStars();
        requestAnimationFrame(animate);
    }

    function init() {
        initCanvas();
        createStars();
        animate();
    }

    init();

    window.addEventListener('resize', init);

    // Text transitions
    const title = document.querySelector('.galaxy-title');
    const subtitle = document.querySelector('.galaxy-subtitle');
    const cta = document.querySelector('.galaxy-cta');

    setTimeout(() => {
        title.classList.add('fade-in');
        subtitle.classList.add('fade-in');
        cta.classList.add('fade-in');
    }, 100);

    // Button hover effect
    const buttons = document.querySelectorAll('.galaxy-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
});