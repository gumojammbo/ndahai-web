function createStarfield(){
    var canvas = document.getElementById('starfield');
    var ctx = canvas.getContext('2d');
    let DPR = Math.max(1, window.devicePixelRatio || 1);

    const colors = ['#ffffff']
    let density = 100;

    const stars = []
    let w = 0;
    let h = 0;
    let starCount = 0;

    function createStars(){
        stars.length = 0;
        starCount = Math.floor((w*h) / density);

        const speckles = Math.floor(starCount * 0.15);
        for(let i = 0; i<speckles; i++){
            stars.push(makeStar());
        }
    }

    function makeStar(type){
        const x = Math.random() * w;
        const y = Math.random() * h;
        const color = colors[0];
        const size = Math.random() < 0.9 ? 1 : 2;

        return{
            x, y,
            color,
            baseSize: size,
            size,
            //define twinkle attributes
            twinkleAmplitude: 0.35,
            twinkleSpeed: (0.0008 + Math.random()*0.0025),
            phase: Math.random()*Math.PI*2,
        };
    }


    function resize(){
        DPR = Math.max(1, window.devicePixelRatio || 1);
        w = Math.max(1, innerWidth);
        h = Math.max(1, innerHeight);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.width = Math.round(w * DPR);
        canvas.height = Math.round(h * DPR);
        //scale
        ctx.setTransform(DPR,0,0,DPR,0,0);
        ctx.imageSmoothingEnabled = false; // disable smoothing so it looks sharp
        createStars();
    }

    let last = performance.now();
    
    function frame(now){
        const dt = now - last;
        last = now;

        //fill black background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0,0,w,h);

        // draw stars
        for(let i  = 0, L = stars.length; i<L; i++){
            const s = stars[i]; //star
            const t = now * s.twinkleSpeed + s.phase; // prevents from all the stars twinkle at the same time
            const a = 0.6 + Math.sin(t) * s.twinkleAmplitude; // add brightness so stars are never invisible, use sin function to oscilate brightness level

            // size pulse
            const  sz = s.baseSize + (Math.sin(t * 1.3) * 0.45); // prevent size pulse at the same time than twinkle
            ctx.globalAlpha = Math.max(0.06, Math.min(1, a)); // prevent invisible stars or brightness overflow

            // draw single pixel or 2x2 block
            const drawSize = Math.max(1, Math.round(sz));
            ctx.fillStyle = s.color;

            //round positions to ints
            ctx.fillRect(Math.round(s.x), Math.round(s.y), drawSize, drawSize);
        }


        ctx.globalAlpha = 1;
        requestAnimationFrame(frame);
    }

    window.addEventListener('resize', () => {
        clearTimeout(window._starResizeTimer);
        window._starResizeTimer = setTimeout(resize, 60);
    })

    document.addEventListener('visibilitychange', ()=>{
        if(document.hidden){ cancelAnimationFrame(window._starRaf); }
        else { last = performance.now(); window._starRaf = requestAnimationFrame(frame); }
    });

    resize();
    window._starRaf = requestAnimationFrame(frame);
}

createStarfield();