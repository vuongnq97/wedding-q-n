/* ============================================
   WEDDING SLIDESHOW ENGINE v2
   Quang Vương & Như Quỳnh
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

    const GROOM = 'Quang Vương';
    const BRIDE = 'Như Quỳnh';
    const COUPLE = `${GROOM} & ${BRIDE}`;

    // ─── Image list: Hiện tại (mở đầu) → Flashback quá khứ → Hiện tại (ảnh cưới) ───
    const IMAGE_BASE_PATH = 'images/';
    const IMAGE_FILES = [
        // ══ Mở đầu: Khoảnh khắc hiện tại ══
        'RIN_2670 copy 2 (1) (1).jpg',
        // ── Chương 1: Giảng đường & thời sinh viên (2017) ──
        '1784817768836_1844566805844982206_122909637720525971_3658652e6f718a27edbdbf864752313e.jpg',
        '1783954136246_8088849262297663590_8088849262297663590_d41e5f237f245e12cce8f12daa06942e.jpg',
        '1783954136007_8088849262297663590_8088849262297663590_c1ac0547f8de3468e428a309bc40e6c4.jpg',
        '81358037_1033650053650577_4257643072420052992_n.jpg',
        // ── Chương 2: Thanh xuân rực rỡ ──
        '1783954088561_8088849262297663590_8088849262297663590_5842347e728256b8c6792647d23d4623.jpg',
        '1783954088727_8088849262297663590_8088849262297663590_0d22176cc2d7e312f3dae5423936ee3e.jpg',
        '72766678_956583084690608_1486030440711061504_n.jpg',
        '1783954087096_8088849262297663590_8088849262297663590_3580d560897832a5ecf3f4bcdf55e054.jpg',
        '1783957752083_8088849262297663590_8088849262297663590_4d0b5c2f5e9b616ce20b0331709a9809.jpg',
        'IMG_1191.JPG',
        // ── Chương 3: Những chuyến đi ──
        '49028206_776187262730192_141684124917170176_n.jpg',
        '1783957744615_8088849262297663590_8088849262297663590_b41b5494221561ed2586a1aa181f7a0c.jpg',
        '1783957745123_8088849262297663590_8088849262297663590_ff9b10cfc8472db949b0c96a3e04a9b7.jpg',
        'DSCF1130.JPG',
        'DSCF1309.JPG',
        'DSCF1396.JPG',
        'DSCF1463.JPG',
        'DSCF1512.JPG',
        'DSCF1536.JPG',
        'DSCF1589.JPG',
        'DSCF1638.JPG',
        'DSCF1772.JPG',
        'DSCF1851.JPG',
        'DSCF1932.JPG',
        'DSCF1963.JPG',
        'DSCF1984.JPG',
        'DSCF1997.JPG',
        'DSCF2049.JPG',
        'DSCF2071.JPG',
        'DSCF2076.JPG',
        '1783957751326_8088849262297663590_8088849262297663590_9379779fca83cb4038bd459852cc4980.jpg',
        '166048388_1385823598433219_5417758899403869636_n.jpg',
        '1783954089742_8088849262297663590_8088849262297663590_1c2c0dd8feb4b53033b58d069b5294e1.jpg',
        '1783954135732_8088849262297663590_8088849262297663590_16d15ccf5f44449e8d7628d9ab73f7b8.jpg',
        '1783954088361_8088849262297663590_8088849262297663590_8e23eb801b80d675f38940b68ac3cc9f.jpg',
        '1783954087698_8088849262297663590_8088849262297663590_581b98f0755fe1d0e66e3b7d1b4f20e6.jpg',
        '1783954089226_8088849262297663590_8088849262297663590_15bb02825cb542c88203984004a02122.jpg',
        '1783957741694_8088849262297663590_8088849262297663590_1f1493002abebcbef159e95494512819.jpg',
        '1783957742409_8088849262297663590_8088849262297663590_416c640ea7e6f9e4dfc6427ab4eb0e47.jpg',
        '1783957743011_8088849262297663590_8088849262297663590_62f11b6d1afb831973c7d5bae69e6676.jpg',
        '1783957743581_8088849262297663590_8088849262297663590_eeb0a083a1256694ebb48540c72f4a17.jpg',
        '1783957750070_8088849262297663590_8088849262297663590_46119c59d7b95f06d3a402d558db41dd.jpg',
        '1783957751790_8088849262297663590_8088849262297663590_583945dd9eee04899b502af905783c97.jpg',
        'IMG_4535.JPG',
        'IMG_4536.JPG',
        'IMG_4537.JPG',
        'IMG_4682.JPG',
        'IMG_4683.JPG',
        'IMG_5586.JPG',
        // ── Hà Giang & Tây Bắc ──
        'DSCF3654.JPG',
        'DSCF3748.JPG',
        'DSCF3863.JPG',
        'DSCF3943.JPG',
        'DSCF3992.JPG',
        'DSCF4006.JPG',
        'DSCF4044.JPG',
        // ── Bè tre & dòng sông ──
        'DSCF4074.JPG',
        'DSCF4089.JPG',
        'DSCF4129.JPG',
        'IMG_2238.JPG',
        // ── Camping & Glamping ──
        'IMG_2855.JPG',
        'IMG_4109.JPG',
        'IMG_4183.JPG',
        'IMG_4189.JPG',
        // ── Ven biển ──
        'IMG_5555.JPG',
        // ── Chương 4: Cùng nhau chinh phục – Marathon ──
        '1783954086793_8088849262297663590_8088849262297663590_2219796d4f47ccc772bc2680b87cc94a.jpg',
        '1783954086475_8088849262297663590_8088849262297663590_03cbe6488970cfe9a09c08d948b4d908.jpg',
        '1783954088128_8088849262297663590_8088849262297663590_d33dbf7a9c8c567b960e92ec60685e3a.jpg',
        '1783954084340_8088849262297663590_8088849262297663590_a6df9560017b02cdabdb8e0e6e160804.jpg',
        '1783954085950_8088849262297663590_8088849262297663590_c718517c886cb34d47f120bcb726dc71.jpg',
        // ── Chương 5: Lễ dạm ngõ & Áo dài ──
        '1783957749525_8088849262297663590_8088849262297663590_ee85a3fe324a38fca984195afbf80b59.jpg',
        '1783954084619_8088849262297663590_8088849262297663590_238ae70d7ebea882b139ef8de6929c7f.jpg',
        '1783954084934_8088849262297663590_8088849262297663590_25c772126bf080e50caa355e5fd2ebe1.jpg',
        '1783954085361_8088849262297663590_8088849262297663590_b0833d4f8a712baf351038f54bac1d5f.jpg',
        // ── Chương 6: Ảnh cưới studio ──
        'RIN_2165-3.jpg',
        'RIN_2179.jpg',
        'RIN_2197.jpg',
        'RIN_2198.jpg',
        'RIN_2204.jpg',
        'RIN_2213.jpg',
        'RIN_2239 copy (1).jpg',
        'RIN_2250 copy (3).jpg',
        'RIN_2254.jpg',
        'RIN_2289.jpg',
        'RIN_2303.jpg',
        'RIN_2314.jpg',
        'RIN_2323.jpg',
        'RIN_2338 copy (1).jpg',
        'RIN_2349.jpg',
        'RIN_2364.jpg',
        'RIN_2704.jpg',
        'RIN_2714 copy (1).jpg',
        'RIN_2725.jpg',
        'RIN_2751.jpg',
        'RIN_2769 copy (1).jpg',
        'RIN_2775 copy 2 (1) (1).jpg',
        'RIN_2798.jpg',
        'RIN_2802.jpg',
        'RIN_2833.jpg',
    ].map(file => `${IMAGE_BASE_PATH}${file}`);

    // ─── Image orientation detection ───
    const imageOrientations = {};
    function isPortrait(src) { return imageOrientations[src] === 'portrait'; }

    // ─── Quotes for overlay / split panels ───
    const QUOTES = [
        '"Anh muốn nắm tay em, đi qua mọi mùa trong đời."',
        '"Tình yêu không cần hoàn hảo, chỉ cần chân thành."',
        '"Từ khi gặp em, mọi con đường đều dẫn về nhà."',
        '"Hạnh phúc đơn giản là được ở bên nhau mỗi ngày."',
        '"Thanh xuân đẹp nhất là khi có em bên cạnh."',
        '"Yêu em là điều tuyệt vời nhất anh từng làm."',
        '"Mỗi chuyến đi bên em đều là một kỷ niệm đẹp."',
        '"Cùng nhau chinh phục mọi cung đường cuộc đời."',
        '"Bên em, anh tìm thấy ý nghĩa của cuộc đời."',
        '"Hai trái tim, một nhịp đập, mãi mãi bên nhau."',
        '"9 năm yêu thương, một đời gắn kết."',
        '"Cảm ơn em đã chọn anh, chọn tình yêu này."',
        '"Nơi nào có em, nơi đó là nhà."',
        '"42km cũng không dài bằng hành trình yêu em."',
        '"Từ giảng đường đến lễ đường, luôn có nhau."',
    ];

    // ─── Full Quote Slides (inserted periodically, aligned with chapter flow) ───
    // Slide 0: Mở đầu (RIN_2670 – hiện tại)
    // Quote 1 (~slide 11): Chuyển từ Chương 2 → Chương 3 (thanh xuân → chuyến đi)
    // Quote 2 (~slide 21): Giữa Chương 3 (đang trong các chuyến đi)
    // Quote 3 (~slide 31): Giữa/cuối Chương 3 (núi, sông, trekking)
    // Quote 4 (~slide 41): Cuối Chương 3 / Chương 4 (camping → marathon, chinh phục)
    // Quote 5 (~slide 51): Chương 5–6 (áo dài → ảnh cưới, tri ân)
    const FULL_QUOTES = [
        { text: '"Thanh xuân đẹp nhất\nlà khi có em bên cạnh.\nTừ những ngày còn ngồi giảng đường,\nchúng mình đã bắt đầu\nviết nên câu chuyện của riêng mình."', author: 'Khởi đầu hành trình' },
        { text: '"Mỗi chuyến đi bên em\nđều là một kỷ niệm đẹp.\nMỗi cung đường là một câu chuyện,\nmỗi điểm đến là một lời hứa."', author: 'Những chuyến đi' },
        { text: '"Từ đỉnh núi cao đến dòng sông dài,\ntừ con đường mây phủ\nđến phố cổ yên bình.\nBên nhau, không có gì là không thể."', author: 'Đường xa có nhau' },
        { text: '"Cùng nhau chinh phục mọi cung đường,\nnắm tay nhau vượt qua mọi giới hạn.\nBởi vì bên nhau,\ntình yêu là sức mạnh lớn nhất."', author: 'Chinh phục' },
        { text: '"Cảm ơn Ba Mẹ đã nuôi dạy chúng con,\ncho chúng con tình yêu thương vô bờ.\nCảm ơn gia đình, bạn bè, quan khách\nđã đồng hành và chúc phúc\ncho hành trình yêu thương của chúng tôi."', author: 'Tri ân' },
    ];

    // ─── Opening Intro (before any images) ───
    const OPENING_INTRO = {
        line1: 'Có những cuộc gặp gỡ\nchỉ kéo dài trong khoảnh khắc.',
        line2: 'Nhưng cũng có những cuộc gặp gỡ\ntrở thành khởi đầu\ncủa một hành trình dài.',
        line3: 'Xin mời quý vị cùng nhìn lại\nhành trình chín năm yêu thương\ncủa cô dâu và chú rể.',
    };

    // ─── Chapter Intro Slides (inserted before each chapter's first image) ───
    // imageIndex = index in IMAGE_FILES where each chapter starts
    const CHAPTER_INTROS = [
        {
            imageIndex: 0,    // Mở đầu: ảnh hiện tại
            chapter: '',
            title: 'Khoảnh khắc hiện tại',
            quote: '"Hôm nay,\nhai trái tim chính thức\nnắm tay bước vào\nchặng đường mới của cuộc đời.\nNhưng trước đó...\nhãy cùng nhìn lại\nnhững tháng năm đã qua."',
        },
        {
            imageIndex: 1,    // Chương 1
            chapter: 'Chương 1',
            title: 'Bắt đầu từ giảng đường',
            quote: '"Chín năm trước,\nhai cô cậu sinh viên\nvô tình gặp nhau.\nTừ những ngày tình nguyện,\nđến ngày tốt nghiệp rạng ngời –\nchương đầu tiên\nđã bắt đầu như thế."',
        },
        {
            imageIndex: 5,    // Chương 2
            chapter: 'Chương 2',
            title: 'Thanh xuân rực rỡ',
            quote: '"Thanh xuân là khoảng thời gian\nđẹp nhất của mỗi người.\nVà thanh xuân ấy càng ý nghĩa hơn\nkhi có một người cùng sẻ chia."',
        },
        {
            imageIndex: 11,   // Chương 3
            chapter: 'Chương 3',
            title: 'Những chuyến đi',
            quote: '"Suốt chín năm,\nmỗi chuyến đi là một kỷ niệm.\nMỗi hành trình là một bước trưởng thành.\nVà điều quý giá nhất\nkhông phải là đã đi được bao xa,\nmà là luôn có nhau\ntrên mọi chặng đường."',
        },
        {
            imageIndex: 66,   // Chương 4
            chapter: 'Chương 4',
            title: 'Cùng nhau chinh phục',
            quote: '"Nắm tay nhau\nvượt qua mọi giới hạn.\nCùng nhau chinh phục\nmọi cung đường cuộc đời.\nBởi vì bên nhau,\nkhông có gì là không thể."',
        },
        {
            imageIndex: 71,   // Chương 5
            chapter: 'Chương 5',
            title: 'Lễ dạm ngõ & Áo dài',
            quote: '"Sau bao nhiêu chuyến đi,\nmột lời hứa đã được trao.\nÁo dài đỏ rực bên hoa baby trắng.\nMột hành trình mới\nchính thức bắt đầu."',
        },
        {
            imageIndex: 75,   // Chương 6
            chapter: 'Chương 6',
            title: 'Ngày hôm nay',
            quote: '"Hôm nay,\ntrước sự chứng kiến\ncủa gia đình và người thân,\nhai con người đã cùng nhau\nđi qua gần một thập kỷ\nchính thức bước vào\nchặng đường mới của cuộc đời."',
        },
    ];

    // ─── Section headings for collage slides ───
    const SECTION_HEADINGS = [
        { heading: 'Our Story', sub: 'Bắt đầu từ giảng đường' },
        { heading: 'Adventures', sub: 'Những chuyến đi khắp nơi' },
        { heading: 'Together', sub: 'Cùng nhau chinh phục' },
        { heading: 'Love', sub: '9 năm yêu thương' },
        { heading: 'Moments', sub: 'Những khoảnh khắc đẹp' },
        { heading: 'Forever', sub: 'Mãi mãi bên nhau' },
    ];

    const POLAROID_CAPTIONS = [
        'Yêu thương mãi mãi ♥',
        'Thanh xuân của chúng ta',
        'Cùng nhau đến cuối đời',
        '42km – Nắm tay nhau về đích',
        `${GROOM} ♥ ${BRIDE}`,
        '9 năm & mãi mãi',
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

        // --- 1b. Portrait Blur Background (portrait image + blurred bg fill) ---
        portraitBlur(images) {
            const img = images[0];
            const kb = pickKB();
            return {
                classes: ['tpl-portrait-blur', pickAnim()],
                topBarMode: 'light',
                html: `
                    <div class="slide-inner">
                        <div class="pb-blur" style="background-image: url('${img}')"></div>
                        <div class="pb-overlay"></div>
                        <div class="pb-photo">
                            <img src="${img}" alt="Wedding" class="${kb}">
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
                topBarMode: 'light',
                html: `
                    <div class="tpl-bg-fill" style="background-image: url('${img}')"></div>
                    <div class="tpl-bg-fill-overlay"></div>
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
                topBarMode: 'light',
                html: `
                    <div class="tpl-bg-fill" style="background-image: url('${img}')"></div>
                    <div class="tpl-bg-fill-overlay"></div>
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

        // --- 17. Opening Intro (narrative opening before any images) ---
        openingIntro(introData) {
            return {
                classes: ['tpl-opening-intro', 'theme-dark', 'anim-fade-in'],
                topBarMode: 'light',
                html: `
                    <div class="slide-inner">
                        <div class="oi-ornament-top stagger-1">
                            <svg viewBox="0 0 200 30" class="ornament-svg">
                                <path d="M0,15 Q50,0 100,15 Q150,30 200,15" stroke="currentColor" fill="none" stroke-width="0.8" />
                                <circle cx="100" cy="15" r="3" fill="currentColor" />
                                <circle cx="70" cy="10" r="1.5" fill="currentColor" />
                                <circle cx="130" cy="10" r="1.5" fill="currentColor" />
                            </svg>
                        </div>
                        <div class="oi-line oi-line-1 stagger-2">${introData.line1.replace(/\n/g, '<br>')}</div>
                        <div class="oi-line oi-line-2 stagger-3">${introData.line2.replace(/\n/g, '<br>')}</div>
                        <div class="oi-line oi-line-3 stagger-4">${introData.line3.replace(/\n/g, '<br>')}</div>
                        <div class="oi-ornament-bottom stagger-5">
                            <svg viewBox="0 0 200 30" class="ornament-svg">
                                <path d="M0,15 Q50,30 100,15 Q150,0 200,15" stroke="currentColor" fill="none" stroke-width="0.8" />
                                <circle cx="100" cy="15" r="3" fill="currentColor" />
                                <circle cx="70" cy="20" r="1.5" fill="currentColor" />
                                <circle cx="130" cy="20" r="1.5" fill="currentColor" />
                            </svg>
                        </div>
                    </div>
                `
            };
        },

        // --- 18. Chapter Intro (chapter title card before each chapter) ---
        chapterIntro(chapterData) {
            return {
                classes: ['tpl-chapter-intro', 'theme-dark', 'anim-fade-in'],
                topBarMode: 'light',
                html: `
                    <div class="slide-inner">
                        ${chapterData.chapter ? `<div class="ci-chapter stagger-1">${chapterData.chapter}</div>` : ''}
                        <div class="ci-title stagger-2">${chapterData.title}</div>
                        <div class="ci-ornament stagger-3"></div>
                        <div class="ci-quote stagger-4">${chapterData.quote.replace(/\n/g, '<br>')}</div>
                    </div>
                `
            };
        },

        // --- 19. Film Strip (horizontal scrolling film reel, 6 images) ---
        filmStrip(images) {
            // Duplicate images for seamless infinite scroll effect
            const allImgs = [...images, ...images];
            const frames = allImgs.map((img, i) => `
                <div class="fs-frame">
                    <div class="fs-sprocket-top"></div>
                    <div class="fs-photo"><img src="${img}" alt="Wedding"></div>
                    <div class="fs-sprocket-bottom"></div>
                </div>
            `).join('');
            return {
                classes: ['tpl-film-strip', 'anim-fade-in'],
                topBarMode: 'light',
                html: `
                    <div class="fs-bg"></div>
                    <div class="fs-track">
                        <div class="fs-reel">
                            ${frames}
                        </div>
                    </div>
                    <div class="fs-vignette"></div>
                `
            };
        },
    };

    // ─── Template schedule: defines which templates to use and in what order ───
    // Templates requiring 1 image
    const TPL_SINGLE = ['heroContain', 'splitLeftText', 'splitRightText', 'topPhotoBottomText', 'fullOverlay', 'polaroid', 'framed', 'cinematic'];
    // Portrait-friendly single-image templates (no landscape-only layouts)
    const TPL_SINGLE_PORTRAIT = ['portraitBlur', 'splitLeftText', 'splitRightText', 'polaroid', 'framed'];
    // Landscape-friendly single-image templates (all work well)
    const TPL_SINGLE_LANDSCAPE = ['heroContain', 'splitLeftText', 'splitRightText', 'topPhotoBottomText', 'fullOverlay', 'polaroid', 'framed', 'cinematic'];
    // Templates requiring 2 images
    const TPL_DUO = ['asymDuo', 'vertDuo', 'duoEqual'];
    // Templates requiring 3 images
    const TPL_TRIO = ['threeRow', 'collage1L2S'];
    // Templates requiring 4 images
    const TPL_QUAD = ['bgTrio', 'mosaic'];

    // ─── Build Slides ───
    function buildSlides() {
        slides = [];
        let slideNum = 0;
        quoteIndex = 0;
        fullQuoteIndex = 0;
        sectionIndex = 0;
        polaroidIndex = 0;

        // Build a set of image indices that start each chapter
        const chapterStartIndices = new Set(CHAPTER_INTROS.map(c => c.imageIndex));

        // Shuffle template order per category to keep it fresh
        const shuffled = {
            single: [...TPL_SINGLE].sort(() => Math.random() - 0.5),
            singlePortrait: [...TPL_SINGLE_PORTRAIT].sort(() => Math.random() - 0.5),
            singleLandscape: [...TPL_SINGLE_LANDSCAPE].sort(() => Math.random() - 0.5),
            duo: [...TPL_DUO].sort(() => Math.random() - 0.5),
            trio: [...TPL_TRIO].sort(() => Math.random() - 0.5),
            quad: [...TPL_QUAD].sort(() => Math.random() - 0.5),
        };
        let sIdx = 0, dIdx = 0, tIdx = 0, qIdx = 0;
        let spIdx = 0, slIdx = 0;

        // Planned template sequence pattern for visual variety
        const pattern = ['single', 'single', 'duo', 'single', 'trio', 'single', 'quad', 'single', 'film'];

        // ── Opening sequence: Image first → then 2 intro text slides ──
        // Slide 0: Opening image (RIN_2670 – present moment, hero shot)
        slides.push({
            type: 'portraitBlur',
            images: [IMAGE_FILES[0]],
        });
        // Slide 1: Opening intro text
        slides.push({
            type: 'openingIntro',
            introData: OPENING_INTRO,
            images: [],
        });
        // Slide 2: "Khoảnh khắc hiện tại" chapter intro
        const openingChapter = CHAPTER_INTROS.find(c => c.imageIndex === 0);
        if (openingChapter) {
            slides.push({
                type: 'chapterIntro',
                chapterData: openingChapter,
                images: [],
            });
        }

        // Start from image index 1 (RIN_2670 already used above)
        let imgIdx = 1;

        while (imgIdx < IMAGE_FILES.length) {
            slideNum++;

            // ── Insert Chapter Intro before each chapter's first image ──
            const chapterIntro = CHAPTER_INTROS.find(c => c.imageIndex === imgIdx);
            if (chapterIntro) {
                slides.push({
                    type: 'chapterIntro',
                    chapterData: chapterIntro,
                    images: [],
                });
            }

            // First image slide uses splitLeftText
            if (slideNum === 1) {
                slides.push({
                    type: 'splitLeftText',
                    images: [IMAGE_FILES[imgIdx]],
                });
                imgIdx++;
                continue;
            }

            // Insert periodic full-quote slides (between chapters, not at chapter boundaries)
            if (slideNum > 1 && (slideNum - 1) % CONFIG.quoteSlideEveryN === 0 && fullQuoteIndex < FULL_QUOTES.length && !chapterStartIndices.has(imgIdx)) {
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
            if (templateType === 'film' && remaining < 6) templateType = remaining >= 4 ? 'quad' : remaining >= 3 ? 'trio' : remaining >= 2 ? 'duo' : 'single';
            if (templateType === 'quad' && remaining < 4) templateType = remaining >= 3 ? 'trio' : remaining >= 2 ? 'duo' : 'single';
            if (templateType === 'trio' && remaining < 3) templateType = remaining >= 2 ? 'duo' : 'single';
            if (templateType === 'duo' && remaining < 2) templateType = 'single';

            let tplName;
            let imageCount;

            switch (templateType) {
                case 'single':
                    // Pick template based on image orientation
                    if (isPortrait(IMAGE_FILES[imgIdx])) {
                        tplName = shuffled.singlePortrait[spIdx % shuffled.singlePortrait.length];
                        spIdx++;
                    } else {
                        tplName = shuffled.singleLandscape[slIdx % shuffled.singleLandscape.length];
                        slIdx++;
                    }
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
                case 'film':
                    tplName = 'filmStrip';
                    imageCount = 6;
                    break;
            }

            const slideImages = IMAGE_FILES.slice(imgIdx, imgIdx + imageCount);
            imgIdx += imageCount;

            slides.push({
                type: tplName,
                images: slideImages,
                duration: tplName === 'filmStrip' ? 14000 : undefined,  // film strip gets longer duration
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

    async function detectAllOrientations() {
        let loaded = 0;
        const total = IMAGE_FILES.length;
        const promises = IMAGE_FILES.map(src => new Promise(resolve => {
            const img = new Image();
            img.onload = () => {
                imageOrientations[src] = img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape';
                imageCache[src] = true;
                loaded++;
                preloaderBar.style.width = `${(loaded / total) * 100}%`;
                resolve();
            };
            img.onerror = () => {
                imageOrientations[src] = 'landscape';
                loaded++;
                preloaderBar.style.width = `${(loaded / total) * 100}%`;
                resolve();
            };
            img.src = src;
        }));
        await Promise.all(promises);
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
        } else if (slideData.type === 'openingIntro') {
            rendered = templates.openingIntro(slideData.introData);
        } else if (slideData.type === 'chapterIntro') {
            rendered = templates.chapterIntro(slideData.chapterData);
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
        const slideData = slides[currentSlideIndex];
        const duration = (slideData && slideData.duration) || CONFIG.slideDuration;
        progressStart = Date.now();
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        cancelAnimationFrame(progressTimer);

        function tick() {
            const elapsed = Date.now() - progressStart;
            const pct = Math.min((elapsed / duration) * 100, 100);
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
        const slideData = slides[currentSlideIndex];
        const duration = (slideData && slideData.duration) || CONFIG.slideDuration;
        slideTimer = setTimeout(() => {
            if (!isPlaying) return;
            if (currentSlideIndex < slides.length - 1) {
                showSlide(currentSlideIndex + 1);
                startProgress();
                scheduleNext();
            } else {
                // Show ending screen, then auto-restart
                showEnding();
            }
        }, duration);
    }

    function goNext() {
        if (currentSlideIndex < slides.length - 1) {
            showSlide(currentSlideIndex + 1);
            if (isPlaying) { clearTimeout(slideTimer); startProgress(); scheduleNext(); }
        } else {
            showEnding();
        }
    }

    function goPrev() {
        if (currentSlideIndex > 0) {
            showSlide(currentSlideIndex - 1);
            if (isPlaying) { clearTimeout(slideTimer); startProgress(); scheduleNext(); }
        }
    }

    // ─── Ending + Auto Restart ───
    function showEnding() {
        pause();
        slideshowEl.style.display = 'none';
        endingScreen.style.display = 'flex';
        createParticles($('#endingParticles'), 30);

        // Auto-restart after 8 seconds → go back to intro screen
        setTimeout(() => {
            endingScreen.style.opacity = '0';
            endingScreen.style.transition = 'opacity 1.2s ease';
            setTimeout(() => {
                endingScreen.style.display = 'none';
                endingScreen.style.opacity = '1';
                endingScreen.style.transition = '';

                // Show intro screen again
                introScreen.style.display = 'flex';
                introScreen.style.opacity = '1';
                createParticles($('#introParticles'), 25);

                // Auto-start from intro after 3 seconds
                setTimeout(() => {
                    introScreen.style.opacity = '0';
                    introScreen.style.transition = 'opacity 1.2s ease';
                    setTimeout(() => {
                        introScreen.style.display = 'none';
                        introScreen.style.transition = '';
                        slideshowEl.style.display = 'block';
                        buildSlides();
                        slideContainer.innerHTML = '';
                        showSlide(0);
                        setTimeout(() => play(), 500);
                    }, 1200);
                }, 3000);
            }, 1200);
        }, 8000);
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
            document.documentElement.requestFullscreen().catch(() => { });
        } else {
            document.exitFullscreen().catch(() => { });
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
        await detectAllOrientations();
        preloader.classList.add('hidden');
        buildSlides();

        // Auto-start: show intro briefly then start slideshow
        setTimeout(() => {
            introScreen.style.opacity = '0';
            introScreen.style.transition = 'opacity 1.2s ease';
            setTimeout(() => {
                introScreen.style.display = 'none';
                slideshowEl.style.display = 'block';
                showSlide(0);
                setTimeout(() => play(), 500);
            }, 1200);
        }, 3000);

        prevBtn.addEventListener('click', goPrev);
        nextBtn.addEventListener('click', goNext);
        playPauseBtn.addEventListener('click', () => { isPlaying ? pause() : play(); });
        fullscreenBtn.addEventListener('click', toggleFullscreen);

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
