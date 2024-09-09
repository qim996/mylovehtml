document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playButton = document.getElementById('playButton');
    const daysTogether = document.getElementById('daysTogether');
    const backgroundImage = document.getElementById('backgroundImage');

    // 图片数组
    const images = [
        'https://tc.fffo.top/i/2024/09/06/vh17ze.jpg',
        'https://tc.fffo.top/i/2024/09/08/118hnrj.jpg',
        'https://tc.fffo.top/i/2024/09/08/119ouux.png'
    ];

    let currentImageIndex = 0;

    // 设置初始背景图片
    function setBackgroundImage() {
        backgroundImage.style.backgroundImage = `url(${images[currentImageIndex]})`;
        backgroundImage.style.opacity = '0'; // 开始时设置为透明
        setTimeout(() => {
            backgroundImage.style.opacity = '1'; // 然后渐变为不透明
        }, 10);
    }

    setBackgroundImage();

    // 设置“在一起”的起始日期为2023年5月27日
    const startDate = new Date('2023-05-27T00:00:00Z'); // 使用UTC时间

    // 更新“在一起”天数的函数
    function updateDaysTogether() {
        const now = new Date();
        const difference = now - startDate;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        daysTogether.textContent = days;
    }

    // 每天午夜更新日期
    function scheduleMidnightUpdate() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0, 0);
        const delay = midnight - now;

        setTimeout(function() {
            updateDaysTogether();
            scheduleMidnightUpdate(); // 递归设置下一个午夜更新
        }, delay);
    }

    // 首次加载页面时更新天数
    updateDaysTogether();

    // 计划每天午夜更新日期
    scheduleMidnightUpdate();

    // 播放按钮的点击事件
    playButton.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playButton.textContent = '音乐播放中';
        } else {
            backgroundMusic.pause();
            playButton.textContent = '播放音乐';
        }
    });

    // 背景图片点击事件
    backgroundImage.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        setBackgroundImage();
    });

    // 初始化粒子特效（雪花）
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height; // 初始位置在屏幕上方
            this.radius = Math.random() * 3 + 1; // 雪花大小
            this.color = 'white'; // 雪花颜色
            this.velocity = {
                x: (Math.random() - 0.5) * 0.5, // 水平运动速度
                y: Math.random() * 0.5 + 1 // 垂直下落速度
            };
        }

        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            // 当雪花落到底部以下时，重新设置到顶部
            if (this.y > canvas.height) {
                this.y = -this.radius;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function setup() {
        for (let i = 0; i < 70; i++) { // 可以调整雪花的数量
            particles.push(new Particle());
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
    }

    setup();
    animate();
});