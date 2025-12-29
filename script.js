// ============ СНЕГОПАД НА CANVAS ============
(function() {
    // Создаем canvas элемент если его нет
    let canvas = document.getElementById('snowCanvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'snowCanvas';
        canvas.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:9999;';
        document.body.appendChild(canvas);
    }
    
    const ctx = canvas.getContext('2d');
    let snowflakes = [];
    let animationId;
    
    // Размеры canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Класс снежинки
    class Snowflake {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speed = Math.random() * 1 + 0.5;
            this.wind = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random() * 0.6 + 0.2;
            this.wobble = Math.random() * 0.5;
            this.wobbleSpeed = Math.random() * 0.05 + 0.02;
            this.wobbleX = 0;
        }
        
        update() {
            this.y += this.speed;
            this.x += this.wind;
            this.wobbleX = Math.sin(Date.now() * this.wobbleSpeed) * this.wobble;
            
            // Если снежинка упала за нижнюю границу
            if (this.y > canvas.height) {
                this.y = -5;
                this.x = Math.random() * canvas.width;
            }
            
            // Если снежинка улетела за боковые границы
            if (this.x > canvas.width + 10) this.x = -10;
            if (this.x < -10) this.x = canvas.width + 10;
        }
        
        draw() {
            ctx.beginPath();
            // Добавляем легкое дрожание
            const drawX = this.x + this.wobbleX;
            ctx.arc(drawX, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
            ctx.closePath();
            
            // Добавляем свечение для некоторых снежинок
            if (this.size > 2) {
                ctx.beginPath();
                ctx.arc(drawX, this.y, this.size * 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
    
    // Инициализация снежинок
    function initSnowflakes() {
        snowflakes = [];
        // Меньше снежинок на мобильных
        const count = window.innerWidth < 768 ? 60 : 100;
        
        for (let i = 0; i < count; i++) {
            snowflakes.push(new Snowflake());
        }
    }
    
    // Анимация
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Рисуем каждую снежинку
        snowflakes.forEach(flake => {
            flake.update();
            flake.draw();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Старт снегопада
    function startSnow() {
        resizeCanvas();
        initSnowflakes();
        animate();
    }
    
    // Остановка снегопада
    function stopSnow() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    // Обработчики событий
    window.addEventListener('resize', function() {
        resizeCanvas();
        initSnowflakes();
    });
    
    // Автоматический старт при загрузке
    document.addEventListener('DOMContentLoaded', startSnow);
    
    // Для отладки: сделать функции глобальными
    window.snowfall = {
        start: startSnow,
        stop: stopSnow
    };
})();