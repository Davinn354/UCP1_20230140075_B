// Script untuk halaman fitur
document.addEventListener('DOMContentLoaded', function() {
    // Animasi untuk kartu fitur
    const featureCards = document.querySelectorAll('div[style*="box-shadow: 0 10px 20px"]');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animasi untuk gambar galeri
    const galleryImages = document.querySelectorAll('.gallery img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
    
    // Tambahkan filter untuk kategori fitur jika ada lebih dari satu kategori
    addFeatureFilter();
});

// Fungsi untuk membuka lightbox saat gambar diklik
function openLightbox(imgSrc, imgAlt) {
    // Buat elemen lightbox
    const lightbox = document.createElement('div');
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    lightbox.style.display = 'flex';
    lightbox.style.alignItems = 'center';
    lightbox.style.justifyContent = 'center';
    lightbox.style.zIndex = '1000';
    lightbox.style.opacity = '0';
    lightbox.style.transition = 'opacity 0.3s ease';
    
    // Tambahkan gambar ke lightbox
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = imgAlt;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.5)';
    img.style.transform = 'scale(0.9)';
    img.style.transition = 'transform 0.3s ease';
    
    // Tambahkan caption
    const caption = document.createElement('p');
    caption.textContent = imgAlt;
    caption.style.color = 'white';
    caption.style.position = 'absolute';
    caption.style.bottom = '20px';
    caption.style.textAlign = 'center';
    caption.style.width = '100%';
    caption.style.fontSize = '16px';
    
    // Tambahkan tombol tutup
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '20px';
    closeBtn.style.right = '30px';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '40px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.zIndex = '1001';
    
    closeBtn.addEventListener('click', function() {
        img.style.transform = 'scale(0.9)';
        lightbox.style.opacity = '0';
        setTimeout(function() {
            document.body.removeChild(lightbox);
        }, 300);
    });
    
    // Tambahkan semua elemen ke lightbox dan lightbox ke body
    lightbox.appendChild(img);
    lightbox.appendChild(caption);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Animasi tampil
    setTimeout(function() {
        lightbox.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 10);
}

// Fungsi untuk menambahkan filter pada galeri fitur
function addFeatureFilter() {
    const gallerySection = document.querySelector('.gallery');
    
    if (gallerySection) {
        const h2 = gallerySection.querySelector('h2');
        
        if (h2) {
            // Buat div untuk filter
            const filterContainer = document.createElement('div');
            filterContainer.style.display = 'flex';
            filterContainer.style.justifyContent = 'center';
            filterContainer.style.flexWrap = 'wrap';
            filterContainer.style.gap = '10px';
            filterContainer.style.margin = '20px 0';
            
            // Tambahkan tombol filter
            const filters = ['Semua', 'Kuis', 'Materi', 'Video'];
            
            filters.forEach(filter => {
                const button = document.createElement('button');
                button.textContent = filter;
                button.style.padding = '8px 16px';
                button.style.borderRadius = '20px';
                button.style.border = 'none';
                button.style.backgroundColor = filter === 'Semua' ? '#3498db' : '#e9f5fe';
                button.style.color = filter === 'Semua' ? 'white' : '#333';
                button.style.cursor = 'pointer';
                button.style.fontFamily = 'inherit';
                button.style.transition = 'all 0.3s ease';
                
                button.addEventListener('mouseenter', function() {
                    if (this.style.backgroundColor !== 'rgb(52, 152, 219)') {
                        this.style.backgroundColor = '#d6eaf8';
                    }
                });
                
                button.addEventListener('mouseleave', function() {
                    if (this.style.backgroundColor !== 'rgb(52, 152, 219)') {
                        this.style.backgroundColor = '#e9f5fe';
                    }
                });
                
                button.addEventListener('click', function() {
                    // Reset semua tombol
                    filterContainer.querySelectorAll('button').forEach(btn => {
                        btn.style.backgroundColor = '#e9f5fe';
                        btn.style.color = '#333';
                    });
                    
                    // Aktifkan tombol yang diklik
                    this.style.backgroundColor = '#3498db';
                    this.style.color = 'white';
                    
                    // Filter gambar
                    filterGalleryImages(filter.toLowerCase());
                });
                
                filterContainer.appendChild(button);
            });
            
            // Tambahkan filter ke halaman
            h2.parentNode.insertBefore(filterContainer, h2.nextSibling);
        }
    }
}

// Fungsi untuk memfilter gambar di galeri
function filterGalleryImages(filter) {
    const galleryImages = document.querySelectorAll('.gallery img');
    
    galleryImages.forEach(img => {
        const imgAlt = img.alt.toLowerCase();
        
        if (filter === 'semua' || imgAlt.includes(filter)) {
            img.style.display = 'block';
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.opacity = '1';
                img.style.transition = 'opacity 0.5s ease';
            }, 50);
        } else {
            img.style.display = 'none';
        }
    });
}