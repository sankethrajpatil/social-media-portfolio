function embedPost(url) {
    const platform = detectPlatform(url);
    let embedCode = '';

    switch (platform) {
        case 'instagram':
            embedCode = `<iframe src="https://www.instagram.com/p/${extractInstagramId(url)}/embed" width="100%" height="380" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`;
            break;
        case 'facebook':
            embedCode = `<iframe src="https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}" width="100%" height="380" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>`;
            break;
        case 'linkedin':
            embedCode = `<script type="IN/EmbedPost" data-url="${url}"></script>`;
            break;
        default:
            embedCode = '<p>Unsupported platform. Please provide a valid Instagram, Facebook, or LinkedIn post URL.</p>';
    }

    return embedCode;
}

function detectPlatform(url) {
    if (url.includes('instagram.com')) {
        return 'instagram';
    } else if (url.includes('facebook.com')) {
        return 'facebook';
    } else if (url.includes('linkedin.com')) {
        return 'linkedin';
    }
    return 'unknown';
}

function extractInstagramId(url) {
    const regex = /\/p\/([^\/]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function getInstagramThumbnail(url, callback) {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
        .then(response => response.json())
        .then(data => {
            const doc = new DOMParser().parseFromString(data.contents, "text/html");
            const meta = doc.querySelector('meta[property="og:image"]');
            callback(meta ? meta.content : null);
        });
}

const postLinks = [
    "https://www.instagram.com/p/Ca1F2z2JE_c/?igsh=dmliZ2sydHZoY3Bq",
    "https://www.instagram.com/p/Ca08KxBIPra/?igsh=cjl1ZXkxbnpudnlu",
    "https://www.instagram.com/p/CUHM7E-pNli/?igsh=MXVnaTJxdXBla2dldA==",
    "https://www.instagram.com/p/CUIRqekjYbS/?igsh=MWpmaTlnNHlsd2ltdA==",
    "https://www.instagram.com/p/CUorgC3Bzxo/?igsh=MXZ4MW53cXphamMybA==",
    "https://www.instagram.com/p/CVmZpb3phKL/?igsh=ZDAwa3kzenVsejB0",
    "https://www.instagram.com/p/CcLDQgipVpr/?igsh=aDNkY3JpcnJiNGg2",
    "https://www.instagram.com/p/Cea-plDDppv/?igsh=MWx6eGduYmhvdTN5Yw==",
    "https://www.instagram.com/p/Ce36lDKp0Xw/?igsh=bHhhd2VpYjAzN2h1"
];

const localImages = [
    "images/1.png",
    "images/2.png",
    "images/3.png",
    "images/4.png",
    "images/5.png",
    "images/6.png",
    "images/7.png",
    "images/8.png"
];

window.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('embed-gallery');
    postLinks.forEach((url, idx) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide' + (idx === 0 ? ' active' : '');
        slide.innerHTML = `
            <div class="embed-block">
                <div class="platform">Instagram</div>
                <div class="embed-preview" style="width:100%;height:500px;display:flex;align-items:center;justify-content:center;background:#fff;">
                    <span>Loading image...</span>
                </div>
            </div>
        `;
        gallery.appendChild(slide);

        // Fetch and show the full image
        getInstagramThumbnail(url, imgUrl => {
            if (imgUrl) {
                slide.querySelector('.embed-preview').innerHTML = `<img src="${imgUrl}" alt="Instagram post" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:10px;">`;
            } else {
                slide.querySelector('.embed-preview').innerHTML = `<span>Image not available</span>`;
            }
        });
    });

    let current = 0;
    const slides = document.querySelectorAll('.gallery-slide');
    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
    }

    document.getElementById('gallery-prev').onclick = () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    };
    document.getElementById('gallery-next').onclick = () => {
        current = (current + 1) % slides.length;
        showSlide(current);
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            current = (current + 1) % slides.length;
            showSlide(current);
        } else if (e.key === 'ArrowLeft') {
            current = (current - 1 + slides.length) % slides.length;
            showSlide(current);
        }
    });

    // Local PNG gallery
    const localGallery = document.getElementById('local-embed-gallery');
    localImages.forEach((imgPath, idx) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide' + (idx === 0 ? ' active' : '');
        slide.innerHTML = `
            <div class="embed-block">
                <div class="platform">Design</div>
                <div class="embed-preview" style="width:100%;height:500px;display:flex;align-items:center;justify-content:center;background:#fff;">
                    <img src="${imgPath}" alt="Design ${idx + 1}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:10px;">
                </div>
            </div>
        `;
        localGallery.appendChild(slide);
    });

    let localCurrent = 0;
    const localSlides = localGallery.querySelectorAll('.gallery-slide');
    function showLocalSlide(idx) {
        localSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
    }

    document.getElementById('local-gallery-prev').onclick = () => {
        localCurrent = (localCurrent - 1 + localSlides.length) % localSlides.length;
        showLocalSlide(localCurrent);
    };
    document.getElementById('local-gallery-next').onclick = () => {
        localCurrent = (localCurrent + 1) % localSlides.length;
        showLocalSlide(localCurrent);
    };

    document.addEventListener('keydown', (e) => {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
        if (e.key === 'ArrowRight') {
            localCurrent = (localCurrent + 1) % localSlides.length;
            showLocalSlide(localCurrent);
        } else if (e.key === 'ArrowLeft') {
            localCurrent = (localCurrent - 1 + localSlides.length) % localSlides.length;
            showLocalSlide(localCurrent);
        }
    });
});