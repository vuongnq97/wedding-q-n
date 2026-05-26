/* ============================================
   WEDDING SLIDESHOW ENGINE v2
   Quang Quốc & Quỳnh Như
   Multi-Template / Canva-Style
   ============================================ */

(function () {
    'use strict';

    // ─── Configuration ───
    const CONFIG = {
        slideDuration: 7000,
        transitionDuration: 1200,
        preloadAhead: 3,
        autoPlay: true,
        quoteSlideEveryN: 10,  // insert a full quote-only slide every N slides
    };

    const GROOM = 'Quang Quốc';
    const BRIDE = 'Quỳnh Như';
    const COUPLE = `${GROOM} & ${BRIDE}`;

    // ─── Image list (unique only) ───
    const IMAGE_BASE_PATH = 'images/';
    const IMAGE_FILES = [
        '1D4A6942.jpg','1D4A6930.jpg','1D4A6947.jpg','1D4A6968.jpg','1D4A6997.jpg',
        '1D4A7010.jpg','1D4A7013.jpg','1D4A7031.jpg','1D4A7035.jpg','1D4A7045.jpg',
        '1D4A7060.jpg','1D4A7070.jpg','1D4A7076.jpg','1D4A7080.jpg','1D4A7089.jpg',
        '1D4A7101.jpg','1D4A7114.jpg','1D4A7123.jpg','1D4A7125.jpg','1D4A7154.jpg',
        '1D4A7172.jpg','1D4A7178.jpg','1D4A7189.jpg','1D4A7207.jpg','1D4A7222.jpg',
        '1D4A7230.jpg','1D4A7244.jpg','1D4A7251.jpg','1D4A7253.jpg','1D4A7260.jpg',
        '1D4A7287.jpg','1D4A7299.jpg','1D4A7308.jpg','1D4A7312.jpg','1D4A7328.jpg',
        '1D4A7344.jpg','1D4A7365.jpg','1D4A7375.jpg','1D4A7400.jpg','1D4A7440.jpg',
        '1D4A7500.jpg','1D4A7511.jpg','1D4A7534.jpg','1D4A7545.jpg','1D4A7580.jpg',
        '1D4A7596.jpg','1D4A7607.jpg','1D4A7609.jpg','1D4A7693.jpg','1D4A7700.jpg',
        '1D4A7721.jpg','1D4A7727.jpg','1D4A7730.jpg','1D4A7734.jpg',
        '1D4A7736.jpg','1D4A7742.jpg','1D4A7743.jpg','1D4A7745.jpg','1D4A7753.jpg',
        '1D4A7755.jpg','1D4A7766.jpg','1D4A7778.jpg','1D4A7785.jpg','1D4A7788.jpg',
        '1D4A7805.jpg','1D4A7813.jpg','1D4A7827.jpg','1D4A7836.jpg','1D4A7840.jpg',
        '1D4A7853.jpg','1D4A7861.jpg','1D4A7864.jpg','1D4A7868.jpg','1D4A7877.jpg',
        '1D4A7883.jpg','1D4A7888.jpg','1D4A7902.jpg','1D4A7913.jpg','1D4A7918.jpg',
        '1D4A7926.jpg','1D4A7930.jpg','1D4A7942.jpg','1D4A7951.jpg','1D4A7954.jpg',
        '1D4A7956.jpg','1D4A7957.jpg','1D4A7959.jpg','1D4A7960.jpg',
    ].map(file => `${IMAGE_BASE_PATH}${file}`);

    // ─── Quotes for overlay / split panels ───
    const QUOTES = [
        '"Anh muốn nắm tay em, đi qua mọi mùa trong đời."',
        '"Tình yêu không cần hoàn hảo, chỉ cần chân thành."',
        '"Từ khi gặp em, mọi con đường đều dẫn về nhà."',
        '"Hạnh phúc đơn giản là được ở bên nhau mỗi ngày."',
        '"Em là câu trả lời cho mọi lời cầu nguyện của anh."',
        '"Yêu em là điều tuyệt vời nhất anh từng làm."',
        '"Mỗi khoảnh khắc bên em đều là một món quà."',
        '"Tình yêu của chúng ta viết nên câu chuyện đẹp nhất."',
        '"Bên em, anh tìm thấy ý nghĩa của cuộc đời."',
        '"Hai trái tim, một nhịp đập, mãi mãi bên nhau."',
        '"Em là mùa xuân vĩnh cửu trong trái tim anh."',
        '"Cảm ơn em đã chọn anh, chọn tình yêu này."',
        '"Nơi nào có em, nơi đó là nhà."',
        '"Anh hứa sẽ yêu em hôm nay, ngày mai, và mãi mãi."',
        '"Tình yêu chân thật không bao giờ có kết thúc."',
    ];

    // ─── Full Quote Slides (inserted periodically) ───
    const FULL_QUOTES = [
        { text: '"Cảm ơn Ba Mẹ đã nuôi dạy chúng con,\ncho chúng con tình yêu thương vô bờ,\nvà dẫn lối chúng con đến ngày hôm nay."', author: 'Với tất cả lòng biết ơn' },
        { text: '"Cảm ơn những người bạn thân yêu\nđã luôn bên cạnh, chia sẻ niềm vui,\nvà cùng chúng tôi đi qua mọi thử thách."', author: 'Tình bạn quý giá' },
        { text: '"Hôm nay chúng tôi bắt đầu\nmột chương mới trong cuộc đời,\nvới trái tim tràn đầy yêu thương\nvà niềm tin vào tương lai."', author: COUPLE },
        { text: '"Cảm ơn tất cả quan khách\nđã dành thời gian đến chung vui\ntrong ngày trọng đại của chúng tôi.\nSự hiện diện của quý vị\nlà món quà ý nghĩa nhất."', author: 'Trân trọng' },
        { text: '"Tình yêu là hành trình dài,\nvà chúng tôi biết ơn vì được\nchia sẻ hành trình ấy bên nhau."', author: COUPLE },
    ];

    // ─── Section headings for collage slides ───
    const SECTION_HEADINGS = [
        { heading: 'Our Story', sub: 'Câu chuyện tình yêu' },
        { heading: 'Forever', sub: 'Mãi mãi bên nhau' },
        { heading: 'Love', sub: 'Tình yêu đích thực' },
        { heading: 'Together', sub: 'Hạnh phúc trọn vẹn' },
        { heading: 'Moments', sub: 'Những khoảnh khắc đẹp' },
        { heading: 'Blessed', sub: 'Phước lành từ trái tim' },
    ];

    const POLAROID_CAPTIONS = [
        'Yêu thương mãi mãi ♥',
        'Ngày hạnh phúc nhất',
        'Cùng nhau đến cuối đời',
        'Khoảnh khắc vàng',
        `${GROOM} ♥ ${BRIDE}`,
        'Forever & Always',
    ];

    // ─── Ken Burns effect classes ───
    const KB_EFFECTS = ['kb-zoom-in', 'kb-zoom-out', 'kb-pan-left', 'kb-pan-right', 'kb-pan-up', 'kb-zoom-pan'];

    // ─── Background color themes for light slides ───
    const BG_THEMES = ['bg-cream', 'bg-ivory', 'bg-beige', 'bg-champagne', 'bg-blush', 'bg-sage', 'bg-lavender', 'bg-warm-gray', 'bg-dusty-rose'];

    // ─── Entry animations (inner content) ───
    const ENTRY_ANIMS = ['anim-fade-in', 'anim-slide-left', 'anim-slide-right', 'anim-slide-up', 'anim-scale-in'];

    // ─── Slide Transitions (whole slide enter/exit) ───
    const TRANSITIONS = [
        'fade', 'slide-left', 'slide-right', 'slide-up', 'slide-down',
        'zoom-in', 'zoom-out', 'scale-fade', 'dissolve', 'push-left',
    ];

    // ─── State ───
    let currentSlideIndex = 0;
    let isPlaying = false;
    let slideTimer = null;
    let progressTimer = null;
    let progressStart = 0;
    let slides = [];
    let quoteIndex = 0;
    let fullQuoteIndex = 0;
    let sectionIndex = 0;
    let polaroidIndex = 0;
    let lastTransition = '';

    // ─── Helpers ───
    const $ = (sel) => document.querySelector(sel);
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const pickKB = () => pick(KB_EFFECTS);
    const pickBG = () => pick(BG_THEMES);
    const pickAnim = () => pick(ENTRY_ANIMS);
    const nextQuote = () => { const q = QUOTES[quoteIndex % QUOTES.length]; quoteIndex++; return q; };
    const nextSection = () => { const s = SECTION_HEADINGS[sectionIndex % SECTION_HEADINGS.length]; sectionIndex++; return s; };
    const nextPolaroid = () => { const p = POLAROID_CAPTIONS[polaroidIndex % POLAROID_CAPTIONS.length]; polaroidIndex++; return p; };

    function pickTransition() {
        let t;
        do { t = pick(TRANSITIONS); } while (t === lastTransition);
        lastTransition = t;
        return t;
    }

    // ─── DOM ───
    const preloader = $('#preloader');
    const preloaderBar = $('#preloaderBar');
    const introScreen = $('#intro-screen');
    const startBtn = $('#startBtn');
    const slideshowEl = $('#slideshow');
    const slideContainer = $('#slideContainer');
    const slideCounter = $('#slideCounter');
    const progressBar = $('#progressBar');
    const topBar = $('.top-bar');
    const prevBtn = $('#prevBtn');
    const nextBtn = $('#nextBtn');
    const playPauseBtn = $('#playPauseBtn');
    const playIcon = $('#playIcon');
    const pauseIcon = $('#pauseIcon');
    const fullscreenBtn = $('#fullscreenBtn');
    const endingScreen = $('#ending-screen');
    const replayBtn = $('#replayBtn');

    // ─────────────────────────────────
    //  TEMPLATE RENDERERS
    // ─────────────────────────────────

    // Each renderer returns an HTML string for the slide inner content
    // and a set of classes to add to the slide element.

    const templates = {

        // --- 1. Hero Contain (no crop, clean light bg) ---
        heroContain(images) {
            const img = images[0];
            const bg = pickBG();
            return {
                classes: ['tpl-hero-contain', bg, pickAnim()],
                topBarMode: 'dark',
                html: `
                    <div class="slide-inner">
                        <div class="photo-main">
                            <img src="${img}" alt="Wedding">
                        </div>
                    </div>
                `
            };
        },

        // --- 2. Split: Left Text + Right Photo ---
        splitLeftText(images) {
            const img = images[0];
            const bg = pickBG();
            const quote = nextQuote();
            return {
                classes: ['tpl-split-left-text', pickAnim()],
                topBarMode: 'dark',
                html: `
                    <div class="text-panel ${bg} stagger-1">
                        <div class="panel-quote stagger-2">${quote}</div>
                        <div class="panel-ornament stagger-3"></div>
                        <div class="panel-names stagger-4">${COUPLE}</div>
                        <div class="panel-sub stagger-5">Special Day</div>
                    </div>
                    <div class="photo-panel">
                        <img src="${img}" alt="Wedding" class="${pickKB()}">
                    </div>
                `
            };
        },

        // --- 3. Split: Left Photo + Right Text ---
        splitRightText(images) {
            const img = images[0];
            const bg = pickBG();
            const quote = nextQuote();
            return {
                classes: ['tpl-split-right-text', pickAnim()],
                topBarMode: 'dark',
                html: `
                    <div class="photo-panel">
                        <img src="${img}" alt="Wedding" class="${pickKB()}">
                    </div>
                    <div class="text-panel ${bg} stagger-1">
                        <div class="panel-quote stagger-2">${quote}</div>
                        <div class="panel-ornament stagger-3"></div>
                        <div class="panel-names stagger-4">${COUPLE}</div>
                        <div class="panel-sub stagger-5">Forever</div>
                    </div>
                `
            };
        },

        // --- 4. Top Photo + Bottom Text ---
        topPhotoBottomText(images) {
            const img = images[0];
            const bg = pickBG();
            return {
                classes: ['tpl-top-photo-bottom-text', pickAnim()],
                topBarMode: 'dark',
                html: `
                    <div class="photo-top">
                        <img src="${img}" alt="Wedding" class="${pickKB()}">
                    </div>
                    <div class="text-bottom ${bg}">
                        <div class="tb-names stagger-1">${COUPLE}</div>
                        <div class="tb-script stagger-2">Special Day</div>
                        <div class="tb-detail stagger-3">Forever Together</div>
                    </div>
                `
            };
        },

        // --- 5. Collage: 1 Large + 2 Small + Text ---
        collage1L2S(images) {
            // needs 3 images
            const bg = pickBG();
            const section = nextSection();
            return {
                classes: ['tpl-collage-1L2S', pickAnim()],
                topBarMode: 'dark',
                html: `
                    <div class="col-large stagger-1"><img src="${images[0]}" alt="Wedding" class="${pickKB()}"></div>
                    <div class="col-small-top stagger-2"><img src="${images[1]}" alt="Wedding" class="${pickKB()}"></div>
                    <div class="col-small-bottom stagger-3"><img src="${images[2]}" alt="Wedding" class="${pickKB()}"></div>
                    <div class="col-text ${bg}">
                        <div class="ct-heading stagger-4">${section.heading}</div>
                        <div class="ct-sub stagger-5">${section.sub}</div>
                    </div>
                `
            };
        },

        // --- 6. Three Photos Row ---
        threeRow(images) {
            const bg = pickBG();
            return {
                classes: ['tpl-three-row', bg, pickAnim()],
                topBarMode: 'dark',
                html: images.slice(0, 3).map((img, i) =>
                    `<div class="photo-cell stagger-${i + 1}"><img src="${img}" alt="Wedding" class="${pickKB()}"></div>`
                ).join('')
            };
        },

        // --- 7. Background Blur + 3 Portrait Cards ---
        bgTrio(images) {
            return {
                classes: ['tpl-bg-trio', pickAnim()],
                topBarMode: 'dark',
                html: `
                    <div class="bgt-blur" style="background-image:url('${images[0]}')"></div>
                    <div class="bgt-overlay"></div>
                    <div class="bgt-container">
                        <div class="bgt-card stagger-1"><img src="${images[1]}" alt="Wedding"></div>
                        <div class="bgt-card stagger-2"><img src="${images[2]}" alt="Wedding"></div>
                        <div class="bgt-card stagger-3"><img src="${images[3]}" alt="Wedding"></div>
                    </div>
                `
            };
        },

        // --- 8. Full Bleed + Text Overlay ---
        fullOverlay(images) {
            const img = images[0];
            const quote = nextQuote();
            const bg = pickBG();
            return {
                classes: ['tpl-full-overlay', bg, pickAnim()],
                topBarMode: 'dark',
                html: `
                    <div class="slide-inner">
                        <div class="photo-full"><img src="${img}" alt="Wedding"></div>
                        <div class="overlay-gradient"></div>
                        <div class="overlay-text">
                            <div class="ot-quote stagger-1">${quote}</div>
                            <div class="ot-names stagger-2">${COUPLE}</div>
                        </div>
                    </div>
                `
            };
        },

        // --- 9. Polaroid ---
        polaroid(images) {
            const img = images[0];
            const bg = pickBG();
            const caption = nextPolaroid();
            return {
                classes: ['tpl-polaroid', bg, pickAnim()],
                topBarMode: 'dark',
                html: `
                    <div class="slide-inner">
                        <div class="polaroid-frame stagger-1">
                            <img src="${img}" alt="Wedding">
                            <div class="polaroid-caption stagger-2">${caption}</div>
                        </div>
                    </div>
                `
            };
        },

        // --- 10. Asymmetric Duo ---
        asymDuo(images) {
            const bg = pickBG();
            const quote = nextQuote();
            return {
                classes: ['tpl-asym-duo', bg, pickAnim()],
                topBarMode: 'dark',
                html: `
                    <div class="ad-large stagger-1"><img src="${images[0]}" alt="Wedding" class="${pickKB()}"></div>
                    <div class="ad-small stagger-2"><img src="${images[1]}" alt="Wedding" class="${pickKB()}"></div>
                    <div class="ad-text">
                        <div class="adt-quote stagger-3">${quote}</div>
                        <div class="adt-names stagger-4">${COUPLE}</div>
                    </div>
                `
            };
        },

        // --- 11. Mosaic (4 photos + text) ---
        mosaic(images) {
            const bg = pickBG();
            return {
                classes: ['tpl-mosaic', bg, pickAnim()],
                topBarMode: 'dark',
                html: `
                    <div class="mos-cell mos-1 stagger-1"><img src="${images[0]}" alt="Wedding" class="${pickKB()}"></div>
                    <div class="mos-cell mos-2 stagger-2"><img src="${images[1]}" alt="Wedding" class="${pickKB()}"></div>
                    <div class="mos-cell mos-3 stagger-3"><img src="${images[2]}" alt="Wedding" class="${pickKB()}"></div>
                    <div class="mos-cell mos-4 stagger-4"><img src="${images[3]}" alt="Wedding" class="${pickKB()}"></div>
                    <div class="mos-text ${bg}">
                        <div class="mt-names stagger-5">${COUPLE}</div>
                        <div class="mt-sub">Forever with you</div>
                    </div>
                `
            };
        },

        // --- 12. Centered Framed ---
        framed(images) {
            const img = images[0];
            const bg = pickBG();
            return {
                classes: ['tpl-framed', bg, pickAnim()],
                topBarMode: 'dark',
                html: `
                    <div class="slide-inner">
                        <div class="frame-outer stagger-1">
                            <img src="${img}" alt="Wedding">
                            <div class="frame-caption stagger-2">${COUPLE}</div>
                        </div>
                    </div>
                `
            };
        },

        // --- 13. Vertical Duo ---
        vertDuo(images) {
            const bg = pickBG();
            return {
                classes: ['tpl-vert-duo', bg, pickAnim()],
                topBarMode: 'dark',
                html: `
                    <div class="vd-cell stagger-1"><img src="${images[0]}" alt="Wedding" class="${pickKB()}"></div>
                    <div class="vd-cell stagger-2"><img src="${images[1]}" alt="Wedding" class="${pickKB()}"></div>
                `
            };
        },

        // --- 14. Duo Equal Side by Side ---
        duoEqual(images) {
            const bg = pickBG();
            return {
                classes: ['tpl-duo-equal', bg, pickAnim()],
                topBarMode: 'dark',
                html: `
                    <div class="de-cell stagger-1"><img src="${images[0]}" alt="Wedding" class="${pickKB()}"></div>
                    <div class="de-cell stagger-2"><img src="${images[1]}" alt="Wedding" class="${pickKB()}"></div>
                `
            };
        },

        // --- 15. Cinematic Widescreen ---
        cinematic(images) {
            const img = images[0];
            const quote = nextQuote();
            const bg = pickBG();
            return {
                classes: ['tpl-cinematic', bg, pickAnim()],
                topBarMode: 'dark',
                html: `
                    <div class="cine-bar"></div>
                    <div class="cine-photo">
                        <img src="${img}" alt="Wedding">
                        <div class="cine-text">
                            <div class="cin-quote stagger-1">${quote}</div>
                        </div>
                    </div>
                    <div class="cine-bar"></div>
                `
            };
        },

        // --- 16. Quote Only ---
        quoteOnly(quoteData) {
            const theme = Math.random() > 0.5 ? 'theme-dark' : 'theme-light';
            return {
                classes: ['tpl-quote-only', theme, pickAnim()],
                topBarMode: theme === 'theme-dark' ? 'light' : 'dark',
                html: `
                    <div class="slide-inner">
                        <div class="qo-text stagger-1">${quoteData.text.replace(/\n/g, '<br>')}</div>
                        <div class="qo-ornament stagger-2"></div>
                        <div class="qo-author stagger-3">${quoteData.author}</div>
                    </div>
                `
            };
        },
    };

    // ─── Template schedule: defines which templates to use and in what order ───
    // Templates requiring 1 image
    const TPL_SINGLE = ['heroContain', 'splitLeftText', 'splitRightText', 'topPhotoBottomText', 'fullOverlay', 'polaroid', 'framed', 'cinematic'];
    // Templates requiring 2 images
    const TPL_DUO = ['asymDuo', 'vertDuo', 'duoEqual'];
    // Templates requiring 3 images
    const TPL_TRIO = ['threeRow', 'collage1L2S'];
    // Templates requiring 4 images
    const TPL_QUAD = ['bgTrio', 'mosaic'];

    // ─── Build Slides ───
    function buildSlides() {
        slides = [];
        let imgIdx = 0;
        let slideNum = 0;
        quoteIndex = 0;
        fullQuoteIndex = 0;
        sectionIndex = 0;
        polaroidIndex = 0;

        // Shuffle template order per category to keep it fresh
        const shuffled = {
            single: [...TPL_SINGLE].sort(() => Math.random() - 0.5),
            duo: [...TPL_DUO].sort(() => Math.random() - 0.5),
            trio: [...TPL_TRIO].sort(() => Math.random() - 0.5),
            quad: [...TPL_QUAD].sort(() => Math.random() - 0.5),
        };
        let sIdx = 0, dIdx = 0, tIdx = 0, qIdx = 0;

        // Planned template sequence pattern for visual variety
        // Pattern repeats: single, single, duo, single, trio, single, quad, single, single, quote
        const pattern = ['single', 'single', 'duo', 'single', 'trio', 'single', 'quad', 'single', 'single'];

        while (imgIdx < IMAGE_FILES.length) {
            slideNum++;

            // First slide is always splitLeftText
            if (slideNum === 1) {
                slides.push({
                    type: 'splitLeftText',
                    images: [IMAGE_FILES[imgIdx]],
                });
                imgIdx++;
                continue;
            }

            // Insert quote slide periodically
            if (slideNum > 1 && (slideNum - 1) % CONFIG.quoteSlideEveryN === 0 && fullQuoteIndex < FULL_QUOTES.length) {
                slides.push({
                    type: 'quoteOnly',
                    quoteData: FULL_QUOTES[fullQuoteIndex],
                    images: [],
                });
                fullQuoteIndex++;
                continue;
            }

            const patternPos = (slideNum - 1) % pattern.length;
            let templateType = pattern[patternPos];

            // Check if we have enough images for this template type
            const remaining = IMAGE_FILES.length - imgIdx;
            if (templateType === 'quad' && remaining < 4) templateType = remaining >= 3 ? 'trio' : remaining >= 2 ? 'duo' : 'single';
            if (templateType === 'trio' && remaining < 3) templateType = remaining >= 2 ? 'duo' : 'single';
            if (templateType === 'duo' && remaining < 2) templateType = 'single';

            let tplName;
            let imageCount;

            switch (templateType) {
                case 'single':
                    tplName = shuffled.single[sIdx % shuffled.single.length];
                    sIdx++;
                    imageCount = 1;
                    break;
                case 'duo':
                    tplName = shuffled.duo[dIdx % shuffled.duo.length];
                    dIdx++;
                    imageCount = 2;
                    break;
                case 'trio':
                    tplName = shuffled.trio[tIdx % shuffled.trio.length];
                    tIdx++;
                    imageCount = 3;
                    break;
                case 'quad':
                    tplName = shuffled.quad[qIdx % shuffled.quad.length];
                    qIdx++;
                    imageCount = 4;
                    break;
            }

            const slideImages = IMAGE_FILES.slice(imgIdx, imgIdx + imageCount);
            imgIdx += imageCount;

            slides.push({
                type: tplName,
                images: slideImages,
            });
        }
    }

    // ─── Preload ───
    const imageCache = {};

    function preloadImage(src) {
        return new Promise(resolve => {
            if (imageCache[src]) return resolve();
            const img = new Image();
            img.decoding = 'async';
            img.onload = () => { imageCache[src] = true; resolve(); };
            img.onerror = () => resolve();
            img.src = src;
        });
    }

    async function preloadInitialImages() {
        const total = Math.min(3, IMAGE_FILES.length);
        let loaded = 0;
        for (let i = 0; i < total; i++) {
            await preloadImage(IMAGE_FILES[i]);
            loaded++;
            preloaderBar.style.width = `${(loaded / total) * 100}%`;
        }
    }

    function preloadUpcoming() {
        for (let i = 1; i <= CONFIG.preloadAhead; i++) {
            const idx = currentSlideIndex + i;
            if (idx < slides.length && slides[idx].images) {
                slides[idx].images.forEach(src => preloadImage(src));
            }
        }
    }

    // ─── Create Slide Element ───
    function createSlideElement(slideData) {
        const el = document.createElement('div');
        el.classList.add('slide');

        let rendered;
        if (slideData.type === 'quoteOnly') {
            rendered = templates.quoteOnly(slideData.quoteData);
        } else {
            rendered = templates[slideData.type](slideData.images);
        }

        rendered.classes.forEach(cls => el.classList.add(cls));
        el.innerHTML = rendered.html;
        el._topBarMode = rendered.topBarMode;

        return el;
    }

    // ─── Show Slide ───
    function showSlide(index) {
        if (index < 0 || index >= slides.length) return;

        const prevSlideEl = slideContainer.querySelector('.slide.active');
        const slideData = slides[index];
        const newSlide = createSlideElement(slideData);

        // Handle broken images — skip slide if images fail to load
        const imgs = newSlide.querySelectorAll('img');
        imgs.forEach(img => {
            img.decoding = 'async';
            img.onerror = () => {
                img.style.display = 'none';
            };
        });

        slideContainer.appendChild(newSlide);

        // Pick a random transition
        const trans = pickTransition();
        const enterClass = `trans-${trans}-enter`;

        // Trigger reflow, then animate in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                newSlide.classList.add('active');
                newSlide.classList.add(enterClass);
            });
        });

        // Animate out the old slide and remove after transition
        if (prevSlideEl) {
            prevSlideEl.classList.remove('active');
            prevSlideEl.classList.add('trans-exit');
            setTimeout(() => {
                if (prevSlideEl.parentNode) prevSlideEl.parentNode.removeChild(prevSlideEl);
            }, 1500);
        }

        // Update top bar text color
        if (topBar) {
            topBar.classList.remove('dark-text', 'light-text');
            topBar.classList.add(newSlide._topBarMode === 'light' ? 'light-text' : 'dark-text');
        }

        // Update counter
        const displayIdx = String(index + 1).padStart(2, '0');
        const displayTotal = String(slides.length).padStart(2, '0');
        slideCounter.textContent = `${displayIdx} / ${displayTotal}`;

        currentSlideIndex = index;
        preloadUpcoming();
    }

    // ─── Progress Bar ───
    function startProgress() {
        progressStart = Date.now();
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        cancelAnimationFrame(progressTimer);

        function tick() {
            const elapsed = Date.now() - progressStart;
            const pct = Math.min((elapsed / CONFIG.slideDuration) * 100, 100);
            progressBar.style.width = `${pct}%`;
            if (pct < 100) progressTimer = requestAnimationFrame(tick);
        }
        progressTimer = requestAnimationFrame(tick);
    }

    function stopProgress() { cancelAnimationFrame(progressTimer); }

    // ─── Playback ───
    function play() {
        if (isPlaying) return;
        isPlaying = true;
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        startProgress();
        scheduleNext();
    }

    function pause() {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        clearTimeout(slideTimer);
        stopProgress();
    }

    function scheduleNext() {
        clearTimeout(slideTimer);
        slideTimer = setTimeout(() => {
            if (!isPlaying) return;
            if (currentSlideIndex < slides.length - 1) {
                showSlide(currentSlideIndex + 1);
                startProgress();
                scheduleNext();
            } else {
                pause();
                showEnding();
            }
        }, CONFIG.slideDuration);
    }

    function goNext() {
        if (currentSlideIndex < slides.length - 1) {
            showSlide(currentSlideIndex + 1);
            if (isPlaying) { clearTimeout(slideTimer); startProgress(); scheduleNext(); }
        } else {
            pause();
            showEnding();
        }
    }

    function goPrev() {
        if (currentSlideIndex > 0) {
            showSlide(currentSlideIndex - 1);
            if (isPlaying) { clearTimeout(slideTimer); startProgress(); scheduleNext(); }
        }
    }

    // ─── Ending ───
    function showEnding() {
        slideshowEl.style.display = 'none';
        endingScreen.style.display = 'flex';
        createParticles($('#endingParticles'), 30);
    }

    // ─── Particles ───
    function createParticles(container, count) {
        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.classList.add('intro-particle');
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;
            p.style.animationDelay = `${Math.random() * 8}s`;
            p.style.animationDuration = `${6 + Math.random() * 6}s`;
            p.style.width = `${2 + Math.random() * 3}px`;
            p.style.height = p.style.width;
            container.appendChild(p);
        }
    }

    // ─── Fullscreen ───
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    }

    // ─── Keyboard ───
    function handleKeydown(e) {
        switch (e.key) {
            case 'ArrowRight': case ' ':
                e.preventDefault(); goNext(); break;
            case 'ArrowLeft':
                e.preventDefault(); goPrev(); break;
            case 'p': case 'P':
                isPlaying ? pause() : play(); break;
            case 'f': case 'F':
                toggleFullscreen(); break;
        }
    }

    // ─── Init ───
    async function init() {
        createParticles($('#introParticles'), 25);
        await preloadInitialImages();
        preloader.classList.add('hidden');
        buildSlides();

        startBtn.addEventListener('click', () => {
            introScreen.style.opacity = '0';
            introScreen.style.transition = 'opacity 1.2s ease';
            setTimeout(() => {
                introScreen.style.display = 'none';
                slideshowEl.style.display = 'block';
                showSlide(0);
                setTimeout(() => play(), 500);
            }, 1200);
        });

        prevBtn.addEventListener('click', goPrev);
        nextBtn.addEventListener('click', goNext);
        playPauseBtn.addEventListener('click', () => { isPlaying ? pause() : play(); });
        fullscreenBtn.addEventListener('click', toggleFullscreen);

        replayBtn.addEventListener('click', () => {
            endingScreen.style.display = 'none';
            slideshowEl.style.display = 'block';
            currentSlideIndex = 0;
            buildSlides();
            slideContainer.innerHTML = '';
            showSlide(0);
            setTimeout(() => play(), 500);
        });

        document.addEventListener('keydown', handleKeydown);

        // Touch swipe
        let touchStartX = 0;
        slideshowEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
        slideshowEl.addEventListener('touchend', e => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(dx) > 50) { dx < 0 ? goNext() : goPrev(); }
        }, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
