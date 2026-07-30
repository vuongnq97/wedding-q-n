/* ============================================
   WEDDING SLIDESHOW ENGINE v2
   Quang Vương & Như Quỳnh
   Multi-Template / Canva-Style
   ============================================ */

(function () {
    'use strict';

    // ─── Mobile Viewport Height Fix ───
    // On mobile browsers, 100vh includes the address bar area.
    // This sets a CSS variable --vh to the actual visible viewport height.
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', () => {
        setTimeout(setVH, 150); // delay to let browser finish layout
    });

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

    // ══════════════════════════════════════════════════════════════════
    // SLIDESHOW CONFIG — Single source of truth
    // Mỗi slide: { template, images[], quote?, caption?, heading?, sub?, quoteText?, quoteAuthor? }
    // template: tên template cụ thể hoặc 'auto' để hệ thống tự chọn
    // ══════════════════════════════════════════════════════════════════
    const SLIDESHOW_CONFIG = {
        openingIntro: {
            line1: 'Có những cuộc gặp gỡ\nchỉ kéo dài trong khoảnh khắc.',
            line2: 'Nhưng cũng có những cuộc gặp gỡ\ntrở thành khởi đầu\ncủa một hành trình dài.',
            line3: 'Xin mời quý vị cùng nhìn lại\nhành trình 9 năm yêu thương\ncủa cô dâu và chú rể.',
        },

        chapters: [
            // ═══════════════════════════════════════════
            // MỞ ĐẦU: Khoảnh khắc hiện tại
            // ═══════════════════════════════════════════
            {
                chapter: '',
                title: 'Khoảnh khắc hiện tại',
                quote: '"Hôm nay,\nhai trái tim chính thức\nnắm tay bước vào\nchặng đường mới của cuộc đời.\nNhưng trước đó...\nhãy cùng nhìn lại\nnhững tháng năm đã qua."',
                slides: [
                    { template: 'portraitBlur', images: ['RIN_2670 copy 2 (1) (1).jpg'] },
                ],
            },

            // ═══════════════════════════════════════════
            // CHƯƠNG 1: Bắt đầu từ giảng đường (2017)
            // ═══════════════════════════════════════════
            {
                chapter: 'Chương 1',
                title: 'Bắt đầu từ giảng đường',
                quote: '"9 năm trước,\nhai cô cậu sinh viên\nvô tình gặp nhau.\nTừ những ngày tình nguyện,\nđến ngày tốt nghiệp rạng ngời –\nchương đầu tiên\nđã bắt đầu như thế."',
                slides: [
                    { template: 'splitLeftText', images: ['1784817768836_1844566805844982206_122909637720525971_3658652e6f718a27edbdbf864752313e.jpg'], quote: '"Từ giảng đường đến lễ đường, luôn có nhau."' },
                    {
                        template: 'duoEqual', images: [
                            '1783954088561_8088849262297663590_8088849262297663590_5842347e728256b8c6792647d23d4623.jpg',
                            '1783954088727_8088849262297663590_8088849262297663590_0d22176cc2d7e312f3dae5423936ee3e.jpg',
                        ]
                    },
                    { template: 'portraitBlur', images: ['ChatGPT Image Jul 29, 2026, 10_48_37 PM.png'], quote: '"Thanh xuân đẹp nhất là khi có em bên cạnh."' },
                ],
            },

            // ═══════════════════════════════════════════
            // CHƯƠNG 2: Thanh xuân rực rỡ
            // ═══════════════════════════════════════════
            {
                chapter: 'Chương 2',
                title: 'Thanh xuân rực rỡ',
                quote: '"Thanh xuân là khoảng thời gian\nđẹp nhất của mỗi người.\nVà thanh xuân ấy càng ý nghĩa hơn\nkhi có một người cùng sẻ chia."',
                slides: [
                    { template: 'auto', images: ['72766678_956583084690608_1486030440711061504_n.jpg'], quote: '"Hạnh phúc đơn giản là được ở bên nhau mỗi ngày."' },
                    {
                        template: 'auto', images: [
                            '1783957752083_8088849262297663590_8088849262297663590_4d0b5c2f5e9b616ce20b0331709a9809.jpg',
                            '1783954087096_8088849262297663590_8088849262297663590_3580d560897832a5ecf3f4bcdf55e054.jpg'], quote: '"Yêu em là điều tuyệt vời nhất anh từng làm."'
                    },

                ],
            },

            // ═══════════════════════════════════════════
            // CHƯƠNG 3: Những chuyến đi
            // ═══════════════════════════════════════════
            {
                chapter: 'Chương 3',
                title: 'Những chuyến đi',
                quote: '"Suốt 9 năm,\nmỗi chuyến đi là một kỷ niệm.\nMỗi hành trình là một bước trưởng thành.\nVà điều quý giá nhất\nkhông phải là đã đi được bao xa,\nmà là luôn có nhau\ntrên mọi chặng đường."',
                slides: [
                    // ── Quy Nhơn & các chuyến đi đầu ──
                    { template: 'auto', images: ['49028206_776187262730192_141684124917170176_n.jpg'], quote: '"Mỗi chuyến đi bên em đều là một kỷ niệm đẹp."' },
                    { template: 'auto', images: ['1783957744615_8088849262297663590_8088849262297663590_b41b5494221561ed2586a1aa181f7a0c.jpg'] },
                    {
                        template: 'auto', images: [
                            'DSCF1130.JPG',
                            '1783957745123_8088849262297663590_8088849262297663590_ff9b10cfc8472db949b0c96a3e04a9b7.jpg',
                        ]
                    },
                    { template: 'auto', images: ['DSCF1309.JPG'], quote: '"Cùng nhau chinh phục mọi cung đường cuộc đời."' },
                    { template: 'auto', images: ['DSCF1396.JPG', 'DSCF1463.JPG', 'DSCF1512.JPG'] },
                    { template: 'auto', images: ['DSCF1536.JPG'] },
                    { template: 'auto', images: ['DSCF1589.JPG', 'DSCF1638.JPG', 'DSCF1772.JPG', 'DSCF1851.JPG'] },
                    { template: 'auto', images: ['DSCF1932.JPG'], quote: '"Bên em, anh tìm thấy ý nghĩa của cuộc đời."' },
                    { template: 'filmStrip', images: ['DSCF1963.JPG', 'DSCF1984.JPG', 'DSCF1997.JPG', 'DSCF2049.JPG', 'DSCF2071.JPG', 'DSCF2076.JPG'] },

                    // ── Quote chuyển tiếp ──
                    { template: 'quoteOnly', quoteText: '"Mỗi chuyến đi bên em\nđều là một kỷ niệm đẹp.\nMỗi cung đường là một câu chuyện,\nmỗi điểm đến là một lời hứa."', quoteAuthor: 'Những chuyến đi' },

                    // ── Tiếp tục hành trình ──
                    { template: 'auto', images: ['1783957751326_8088849262297663590_8088849262297663590_9379779fca83cb4038bd459852cc4980.jpg'] },
                    { template: 'auto', images: ['166048388_1385823598433219_5417758899403869636_n.jpg'], quote: '"Anh muốn nắm tay em, đi qua mọi mùa trong đời."' },
                    {
                        template: 'auto', images: [
                            '1783954088361_8088849262297663590_8088849262297663590_8e23eb801b80d675f38940b68ac3cc9f.jpg',
                            '1783954135732_8088849262297663590_8088849262297663590_16d15ccf5f44449e8d7628d9ab73f7b8.jpg',
                        ]
                    },
                    {
                        template: 'auto', images: [
                            '1783954089742_8088849262297663590_8088849262297663590_1c2c0dd8feb4b53033b58d069b5294e1.jpg',
                        ]
                    },
                    {
                        template: 'auto', images: [
                            '1783954087698_8088849262297663590_8088849262297663590_581b98f0755fe1d0e66e3b7d1b4f20e6.jpg',
                            '1783954089226_8088849262297663590_8088849262297663590_15bb02825cb542c88203984004a02122.jpg',
                            '1783957741694_8088849262297663590_8088849262297663590_1f1493002abebcbef159e95494512819.jpg',
                        ]
                    },
                    { template: 'auto', images: ['1783957742409_8088849262297663590_8088849262297663590_416c640ea7e6f9e4dfc6427ab4eb0e47.jpg'] },
                    {
                        template: 'auto', images: [
                            '1783957743581_8088849262297663590_8088849262297663590_eeb0a083a1256694ebb48540c72f4a17.jpg',
                            '1783957750070_8088849262297663590_8088849262297663590_46119c59d7b95f06d3a402d558db41dd.jpg',
                            'IMG_4535.JPG',
                        ]
                    },
                    { template: 'auto', images: ['IMG_4682.JPG'], quote: '"Tình yêu không cần hoàn hảo, chỉ cần chân thành."' },
                    { template: 'filmStrip', images: ['IMG_4537.JPG', 'IMG_4683.JPG', 'IMG_5586.JPG', 'DSCF3748.jpg', 'Edit_outfits_for_trekking_theme_202607292216.png', 'IMG_4536.JPG'] },

                    // ── Quote chuyển tiếp: núi sông ──
                    { template: 'quoteOnly', quoteText: '"Từ đỉnh núi cao đến dòng sông dài,\ntừ con đường mây phủ\nđến phố cổ yên bình.\nBên nhau, không có gì là không thể."', quoteAuthor: 'Đường xa có nhau' },

                    // ── Hà Giang, Tây Bắc & Mùa hoa ──
                    {
                        template: 'auto',
                        images: [
                            '1785424251054_8088849262297663590_8088849262297663590_8ab40985a0f5fa10de758ef71815f9f5.jpg',
                            'ahhhh.jpg'
                        ],
                        quote: '"Từ khi gặp em, mọi con đường đều dẫn về nhà."'
                    },
                    { template: 'auto', images: ['DSCF3943.JPG'] },
                    { template: 'auto', images: ['DSCF3992.JPG', 'DSCF4006.JPG'] },
                    { template: 'auto', images: ['DSCF4044.JPG'] },

                    // ── Chinh phục cung đường Trekking & Rừng sâu ──
                    {
                        template: 'auto',
                        images: [
                            '1785423869187_8088849262297663590_8088849262297663590_adbabd35abf6cf7e727dd7ab8432a4e2.jpg',
                            '1785423869290_8088849262297663590_8088849262297663590_fda35a13f823139a75953beb13ce326a.jpg',
                            '1785423869265_8088849262297663590_8088849262297663590_3cf2f0306cb6131abf69cab526d40c4a.jpg'
                        ],
                        quote: '"Cùng nhau băng rừng vượt suối, gian khó nào cũng hoá bình yên."'
                    },

                    // ── Bè tre & dòng sông ──
                    { template: 'auto', images: ['DSCF4074.JPG', 'DSCF4089.JPG', 'DSCF4129.JPG'] },
                    { template: 'auto', images: ['IMG_2238.JPG'], quote: '"Nơi nào có em, nơi đó là nhà."' },

                    // ── Camping & Glamping ──
                    { template: 'auto', images: ['IMG_2855.JPG', 'IMG_4109.JPG', 'IMG_4183.JPG', 'IMG_4189.JPG'] },

                    // ── Ven biển ──
                    { template: 'auto', images: ['IMG_5555.JPG'], quote: '"Hai trái tim, một nhịp đập, mãi mãi bên nhau."' },
                ],
            },

            // ═══════════════════════════════════════════
            // CHƯƠNG 4: Cùng nhau chinh phục – Marathon
            // ═══════════════════════════════════════════
            {
                chapter: 'Chương 4',
                title: 'Cùng nhau chinh phục',
                quote: '"Nắm tay nhau\nvượt qua mọi giới hạn.\nCùng nhau chinh phục\nmọi cung đường cuộc đời.\nBởi vì bên nhau,\nkhông có gì là không thể."',
                slides: [
                    // ── Quote mở đầu ──
                    { template: 'quoteOnly', quoteText: '"Cùng nhau chinh phục mọi cung đường,\nnắm tay nhau vượt qua mọi giới hạn.\nBởi vì bên nhau,\ntình yêu là sức mạnh lớn nhất."', quoteAuthor: 'Chinh phục' },
                    { template: 'auto', images: ['TK_01396.JPG'], quote: '"42km cũng không dài bằng hành trình yêu em."' },
                    { template: 'auto', images: ['1783954086475_8088849262297663590_8088849262297663590_03cbe6488970cfe9a09c08d948b4d908.jpg'] },
                    {
                        template: 'auto', images: [
                            '1783954088128_8088849262297663590_8088849262297663590_d33dbf7a9c8c567b960e92ec60685e3a.jpg',
                            '1783954084340_8088849262297663590_8088849262297663590_a6df9560017b02cdabdb8e0e6e160804.jpg',
                        ]
                    },
                    { template: 'auto', images: ['1783954085950_8088849262297663590_8088849262297663590_c718517c886cb34d47f120bcb726dc71.jpg'], quote: '"9 năm yêu thương, một đời gắn kết."' },
                ],
            },

            // ═══════════════════════════════════════════
            // CHƯƠNG 5: Lễ dạm ngõ
            // ═══════════════════════════════════════════
            {
                chapter: 'Chương 5',
                title: 'Lễ dạm ngõ',
                quote: '"Sau bao nhiêu chuyến đi,\nmột lời hứa đã được trao.\nÁo dài đỏ rực bên hoa baby trắng.\nMột hành trình mới\nchính thức bắt đầu."',
                slides: [
                    { template: 'auto', images: ['1783957749525_8088849262297663590_8088849262297663590_ee85a3fe324a38fca984195afbf80b59.jpg'], quote: '"Cảm ơn em đã chọn anh, chọn tình yêu này."' },
                    { template: 'auto', images: ['1783954084619_8088849262297663590_8088849262297663590_238ae70d7ebea882b139ef8de6929c7f.jpg'] },
                    {
                        template: 'auto', images: [
                            '1783954084934_8088849262297663590_8088849262297663590_25c772126bf080e50caa355e5fd2ebe1.jpg',
                            '1783954085361_8088849262297663590_8088849262297663590_b0833d4f8a712baf351038f54bac1d5f.jpg',
                        ]
                    },
                ],
            },

            // ═══════════════════════════════════════════
            // CHƯƠNG 6: Ngày hôm nay – Ảnh cưới studio
            // ═══════════════════════════════════════════
            {
                chapter: 'Chương 6',
                title: 'Ngày hôm nay',
                quote: '"Hôm nay,\ntrước sự chứng kiến\ncủa gia đình và người thân,\nhai con người đã cùng nhau\nđi qua gần một thập kỷ\nchính thức bước vào\nchặng đường mới của cuộc đời."',
                slides: [
                    // ── Quote tri ân ──
                    { template: 'quoteOnly', quoteText: '"Cảm ơn Ba Mẹ đã nuôi dạy chúng con,\ncho chúng con tình yêu thương vô bờ.\nCảm ơn gia đình, bạn bè, quan khách\nđã đồng hành và chúc phúc\ncho hành trình yêu thương của chúng tôi."', quoteAuthor: 'Tri ân' },

                    { template: 'auto', images: ['RIN_2239 copy (1).jpg'] },
                    { template: 'auto', images: ['RIN_2179.jpg', 'Jul 29, 2026, 08_37_43 PM.jpg'] },
                    { template: 'auto', images: ['RIN_2197.jpg', 'RIN_2198.jpg'] },
                    { template: 'auto', images: ['RIN_2204.jpg'], quote: '"Anh muốn nắm tay em, đi qua mọi mùa trong đời."' },
                    { template: 'auto', images: ['RIN_2165-3.jpg', 'RIN_2250 copy (3).jpg', 'RIN_2303.png'] },
                    { template: 'auto', images: ['RIN_2314.jpg'] },
                    { template: 'auto', images: ['RIN_2338 copy (1).jpg', 'RIN_2349.jpg', 'RIN_2364.jpg', 'RIN_2704.jpg'] },
                    { template: 'auto', images: ['RIN_2714 copy (1).jpg'], quote: '"Nơi nào có em, nơi đó là nhà."' },
                    { template: 'filmStrip', images: ['RIN_2725.jpg', 'RIN_2751.jpg', 'RIN_2833.jpg', 'RIN_2769 copy (1).jpg', 'RIN_2798.jpg', 'RIN_2802.jpg'] },
                    { template: 'auto', images: ['RIN_2775 copy 2 (1) (1).jpg'] },
                    { template: 'auto', images: ['RIN_2323.png', 'ChatGPT Image Jul 29, 2026, 08_58_15 PM.png'] },
                ],
            },
        ],
    };

    // ─── Flatten all images from config (for preloading & orientation detection) ───
    const ALL_IMAGES = [];
    SLIDESHOW_CONFIG.chapters.forEach(ch => {
        ch.slides.forEach(slide => {
            if (slide.images) {
                slide.images.forEach(img => ALL_IMAGES.push(`${IMAGE_BASE_PATH}${img}`));
            }
        });
    });

    // ─── Image orientation detection ───
    const imageOrientations = {};
    function isPortrait(src) { return imageOrientations[src] === 'portrait'; }

    // ─── Auto template selection ───
    const AUTO_SINGLE_PORTRAIT = ['portraitBlur', 'splitLeftText', 'splitRightText', 'polaroid', 'framed'];
    const AUTO_SINGLE_LANDSCAPE = ['heroContain', 'splitLeftText', 'splitRightText', 'topPhotoBottomText', 'fullOverlay', 'cinematic', 'polaroid', 'framed'];
    const AUTO_DUO = ['asymDuo', 'vertDuo', 'duoEqual'];
    const AUTO_TRIO = ['threeRow', 'collage1L2S'];
    const AUTO_QUAD = ['bgTrio', 'mosaic'];
    const _autoCounters = { sp: 0, sl: 0, d: 0, t: 0, q: 0 };

    function autoPickTemplate(images) {
        const count = images.length;
        if (count >= 6) return 'filmStrip';
        if (count === 4) { return AUTO_QUAD[_autoCounters.q++ % AUTO_QUAD.length]; }
        if (count === 3) { return AUTO_TRIO[_autoCounters.t++ % AUTO_TRIO.length]; }
        if (count === 2) { return AUTO_DUO[_autoCounters.d++ % AUTO_DUO.length]; }
        // Single image — pick based on orientation
        const src = `${IMAGE_BASE_PATH}${images[0]}`;
        if (isPortrait(src)) {
            return AUTO_SINGLE_PORTRAIT[_autoCounters.sp++ % AUTO_SINGLE_PORTRAIT.length];
        }
        return AUTO_SINGLE_LANDSCAPE[_autoCounters.sl++ % AUTO_SINGLE_LANDSCAPE.length];
    }

    // ─── Fallback data (used when slide config doesn't provide explicit values) ───
    const FALLBACK_QUOTES = [
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
    const FALLBACK_SECTIONS = [
        { heading: 'Our Story', sub: 'Bắt đầu từ giảng đường' },
        { heading: 'Adventures', sub: 'Những chuyến đi khắp nơi' },
        { heading: 'Together', sub: 'Cùng nhau chinh phục' },
        { heading: 'Love', sub: '9 năm yêu thương' },
        { heading: 'Moments', sub: 'Những khoảnh khắc đẹp' },
        { heading: 'Forever', sub: 'Mãi mãi bên nhau' },
    ];
    const FALLBACK_CAPTIONS = [
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
    let _fbQuoteIdx = 0;
    let _fbSectionIdx = 0;
    let _fbCaptionIdx = 0;
    let lastTransition = '';

    // ─── Helpers ───
    const $ = (sel) => document.querySelector(sel);
    // Deterministic cycling instead of random pick
    let _kbIdx = 0, _bgIdx = 0, _animIdx = 0, _transIdx = 0;
    const pickKB = () => { const v = KB_EFFECTS[_kbIdx % KB_EFFECTS.length]; _kbIdx++; return v; };
    const pickBG = () => { const v = BG_THEMES[_bgIdx % BG_THEMES.length]; _bgIdx++; return v; };
    const pickAnim = () => { const v = ENTRY_ANIMS[_animIdx % ENTRY_ANIMS.length]; _animIdx++; return v; };
    // Fallback pickers — only used when slide config doesn't specify explicit values
    const fallbackQuote = () => { const q = FALLBACK_QUOTES[_fbQuoteIdx % FALLBACK_QUOTES.length]; _fbQuoteIdx++; return q; };
    const fallbackSection = () => { const s = FALLBACK_SECTIONS[_fbSectionIdx % FALLBACK_SECTIONS.length]; _fbSectionIdx++; return s; };
    const fallbackCaption = () => { const p = FALLBACK_CAPTIONS[_fbCaptionIdx % FALLBACK_CAPTIONS.length]; _fbCaptionIdx++; return p; };

    function pickTransition() {
        const t = TRANSITIONS[_transIdx % TRANSITIONS.length];
        _transIdx++;
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
        splitLeftText(images, slideData) {
            const img = images[0];
            const bg = pickBG();
            const quote = slideData?.quote || fallbackQuote();
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
        splitRightText(images, slideData) {
            const img = images[0];
            const bg = pickBG();
            const quote = slideData?.quote || fallbackQuote();
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
        collage1L2S(images, slideData) {
            // needs 3 images
            const bg = pickBG();
            const section = slideData?.heading ? { heading: slideData.heading, sub: slideData.sub || '' } : fallbackSection();
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
                        <div class="bgt-card stagger-1"><img src="${images[0]}" alt="Wedding"></div>
                        <div class="bgt-card stagger-2"><img src="${images[1]}" alt="Wedding"></div>
                        <div class="bgt-card stagger-3"><img src="${images[2]}" alt="Wedding"></div>
                        <div class="bgt-card stagger-4"><img src="${images[3]}" alt="Wedding"></div>
                    </div>
                `
            };
        },

        // --- 8. Full Bleed + Text Overlay ---
        fullOverlay(images, slideData) {
            const img = images[0];
            const quote = slideData?.quote || fallbackQuote();
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
        polaroid(images, slideData) {
            const img = images[0];
            const bg = pickBG();
            const caption = slideData?.caption || fallbackCaption();
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
        asymDuo(images, slideData) {
            const bg = pickBG();
            const quote = slideData?.quote || fallbackQuote();
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
        cinematic(images, slideData) {
            const img = images[0];
            const quote = slideData?.quote || fallbackQuote();
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
            const theme = 'theme-dark';
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
        _fbQuoteIdx = 0;
        _fbSectionIdx = 0;
        _fbCaptionIdx = 0;
        _autoCounters.sp = 0;
        _autoCounters.sl = 0;
        _autoCounters.d = 0;
        _autoCounters.t = 0;
        _autoCounters.q = 0;

        const config = SLIDESHOW_CONFIG;
        const chapters = config.chapters;

        // ── Opening sequence ──
        // First chapter's first slide is the hero opening image
        const firstChapter = chapters[0];
        const firstSlide = firstChapter.slides[0];
        const openingImages = firstSlide.images.map(f => `${IMAGE_BASE_PATH}${f}`);
        const openingTemplate = firstSlide.template === 'auto'
            ? autoPickTemplate(firstSlide.images)
            : firstSlide.template;

        // Slide 0: Opening image
        slides.push({
            type: openingTemplate,
            images: openingImages,
            quote: firstSlide.quote,
        });

        // Slide 1: Opening intro text
        slides.push({
            type: 'openingIntro',
            introData: config.openingIntro,
            images: [],
        });

        // Slide 2: First chapter intro
        slides.push({
            type: 'chapterIntro',
            chapterData: {
                chapter: firstChapter.chapter,
                title: firstChapter.title,
                quote: firstChapter.quote,
            },
            images: [],
        });

        // Remaining slides from first chapter (skip first slide, already used)
        for (let s = 1; s < firstChapter.slides.length; s++) {
            pushSlide(firstChapter.slides[s]);
        }

        // ── Subsequent chapters ──
        for (let c = 1; c < chapters.length; c++) {
            const chapter = chapters[c];

            // Chapter intro slide
            slides.push({
                type: 'chapterIntro',
                chapterData: {
                    chapter: chapter.chapter,
                    title: chapter.title,
                    quote: chapter.quote,
                },
                images: [],
            });

            // All slides in this chapter
            for (const slide of chapter.slides) {
                pushSlide(slide);
            }
        }

        // ── Helper: push a single slide from config ──
        function pushSlide(slideCfg) {
            // Quote-only slide (no images)
            if (slideCfg.template === 'quoteOnly') {
                slides.push({
                    type: 'quoteOnly',
                    quoteData: {
                        text: slideCfg.quoteText,
                        author: slideCfg.quoteAuthor,
                    },
                    images: [],
                });
                return;
            }

            // Image slide
            const imageUrls = (slideCfg.images || []).map(f => `${IMAGE_BASE_PATH}${f}`);
            const template = slideCfg.template === 'auto'
                ? autoPickTemplate(slideCfg.images)
                : slideCfg.template;

            slides.push({
                type: template,
                images: imageUrls,
                quote: slideCfg.quote,
                caption: slideCfg.caption,
                heading: slideCfg.heading,
                sub: slideCfg.sub,
                duration: template === 'filmStrip' ? 14000 : undefined,
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
        const total = ALL_IMAGES.length;
        const promises = ALL_IMAGES.map(src => new Promise(resolve => {
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
            // Pass slideData so templates can read quote/caption/heading
            rendered = templates[slideData.type](slideData.images, slideData);
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

    // ─── Netflix Intro Animation (3 Phases) ───
    function runNetflixIntro() {
        return new Promise((resolve) => {
            const intro = document.getElementById('netflixIntro');
            const logoPhase = document.getElementById('nfLogoPhase');
            const profileScreen = document.getElementById('nfProfileScreen');
            const home = document.getElementById('nfHome');
            const cursor = document.getElementById('nfCursor');
            const targetProfile = document.getElementById('nfProfile2'); // "Ngày Chung Đôi"
            const btnPlay = document.getElementById('nfBtnPlay');

            if (!intro) { resolve(); return; }

            // ── Utility: move cursor smoothly ──
            function moveCursor(x, y, duration) {
                return new Promise(res => {
                    cursor.style.transition = `top ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94), left ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94)`;
                    cursor.style.top = y + 'px';
                    cursor.style.left = x + 'px';
                    setTimeout(res, duration);
                });
            }

            function clickCursor() {
                return new Promise(res => {
                    cursor.classList.add('nf-cursor-click');
                    setTimeout(() => {
                        cursor.classList.remove('nf-cursor-click');
                        res();
                    }, 250);
                });
            }

            function fadeOut(el, duration) {
                return new Promise(res => {
                    el.style.transition = `opacity ${duration}ms ease`;
                    el.style.opacity = '0';
                    setTimeout(() => {
                        el.style.display = 'none';
                        res();
                    }, duration);
                });
            }

            function fadeIn(el, duration) {
                return new Promise(res => {
                    el.style.opacity = '0';
                    el.style.display = '';
                    requestAnimationFrame(() => {
                        el.style.transition = `opacity ${duration}ms ease`;
                        el.style.opacity = '1';
                        setTimeout(res, duration);
                    });
                });
            }

            async function runPhases() {
                // ═══ PHASE 1: Netflix N Logo Video ═══
                const video = document.getElementById('nfLogoVideo');
                if (video) {
                    await new Promise(res => {
                        video.addEventListener('ended', res, { once: true });
                        // Fallback timeout in case video fails
                        setTimeout(res, 15000);
                    });
                }
                await fadeOut(logoPhase, 600);

                // ═══ PHASE 2: Profile Selection ═══
                await fadeIn(profileScreen, 500);
                // Show cursor
                cursor.style.display = '';
                cursor.style.top = '70%';
                cursor.style.left = '25%';
                cursor.style.opacity = '1';

                await new Promise(res => setTimeout(res, 800));

                // Move cursor to target profile
                const profRect = targetProfile.getBoundingClientRect();
                const profX = profRect.left + profRect.width / 2;
                const profY = profRect.top + profRect.height / 2;
                await moveCursor(profX, profY, 1200);

                // Hover effect
                targetProfile.classList.add('nf-hovered');
                await new Promise(res => setTimeout(res, 600));

                // Click
                await clickCursor();
                await new Promise(res => setTimeout(res, 300));

                // Fade profile screen
                cursor.style.display = 'none';
                await fadeOut(profileScreen, 500);

                // ═══ PHASE 3: Netflix Homepage ═══
                await fadeIn(home, 600);

                // Start hero image slideshow
                const heroImgs = document.querySelectorAll('.nf-hero-img');
                let heroIdx = 0;
                const heroInterval = setInterval(() => {
                    heroImgs[heroIdx].classList.remove('nf-hero-active');
                    heroIdx = (heroIdx + 1) % heroImgs.length;
                    heroImgs[heroIdx].classList.add('nf-hero-active');
                }, 3000);

                // Wait, then show cursor and move to CHIẾU
                await new Promise(res => setTimeout(res, 2000));
                cursor.style.display = '';
                cursor.style.top = '70%';
                cursor.style.left = '20%';
                cursor.style.opacity = '1';

                await new Promise(res => setTimeout(res, 500));

                // Move to CHIẾU button
                const playRect = btnPlay.getBoundingClientRect();
                const playX = playRect.left + playRect.width / 2;
                const playY = playRect.top + playRect.height / 2;
                await moveCursor(playX, playY, 1500);

                await new Promise(res => setTimeout(res, 400));

                // Hover play button
                btnPlay.style.background = '#e0e0e0';
                await new Promise(res => setTimeout(res, 300));

                // Click CHIẾU
                await clickCursor();
                clearInterval(heroInterval);

                await new Promise(res => setTimeout(res, 200));

                // Fade entire Netflix intro to black
                cursor.style.display = 'none';
                intro.style.transition = 'opacity 0.8s ease';
                intro.style.opacity = '0';
                await new Promise(res => setTimeout(res, 800));
                intro.classList.add('nf-done');

                resolve();
            }

            runPhases();
        });
    }

    // ─── Init ───
    async function init() {
        // Run Netflix intro FIRST (while preloader is behind)
        await runNetflixIntro();

        // Now show preloader and load images
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
