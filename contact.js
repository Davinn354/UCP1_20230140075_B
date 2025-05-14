// Script untuk halaman kontak
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi validasi form
    initFormValidation();
    
    // Tambahkan fitur live map interaction
    initializeMap();
    
    // Animasi untuk kotak informasi kontak
    animateContactInfo();
});

// Validasi form yang lebih kompleks
function initFormValidation() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        // Override fungsi kirimForm untuk validasi yang lebih baik
        window.kirimForm = function() {
            const nama = document.getElementById('nama').value.trim();
            const email = document.getElementById('email').value.trim();
            const minat = document.getElementById('minat').value;
            const pesan = document.getElementById('pesan').value.trim();
            
            // Reset pesan error sebelumnya
            clearErrorMessages();
            
            // Validasi lebih lengkap
            let isValid = true;
            
            // Validasi nama
            if (!nama) {
                showError('nama', 'Nama harus diisi');
                isValid = false;
            } else if (nama.length < 3) {
                showError('nama', 'Nama minimal 3 karakter');
                isValid = false;
            }
            
            // Validasi email
            if (!email) {
                showError('email', 'Email harus diisi');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Format email tidak valid');
                isValid = false;
            }
            
            // Validasi minat
            if (!minat) {
                showError('minat', 'Pilih minat belajar Anda');
                isValid = false;
            }
            
            if (!isValid) {
                return false;
            }
            
            // Jika valid, tampilkan animasi loading dulu
            showLoadingAnimation();
            
            // Simulasi pengiriman form (bisa diganti dengan fetch API untuk pengiriman sebenarnya)
            setTimeout(function() {
                document.getElementById('form-container').innerHTML = `
                    <div style="text-align: center; padding: 40px 20px;">
                      <div style="width: 80px; height: 80px; background-color: #2ecc71; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 40px;">✓</div>
                      <h2>Terima Kasih, ${nama}!</h2>
                      <p>Pendaftaran Anda berhasil dikirim. Tim kami akan menghubungi Anda melalui email dalam 24 jam.</p>
                      <div style="margin-top: 30px;">
                        <p style="font-weight: 500; margin-bottom: 15px;">Ringkasan Pendaftaran:</p>
                        <p>Nama: ${nama}</p>
                        <p>Email: ${email}</p>
                        <p>Minat: ${document.getElementById('minat').options[document.getElementById('minat').selectedIndex].text}</p>
                        ${pesan ? `<p>Pesan: ${pesan}</p>` : ''}
                      </div>
                      <button onclick="window.location.reload()" style="background-color: #3498db; color: white; border: none; padding: 10px 25px; border-radius: 5px; margin-top: 20px; cursor: pointer;">Kirim Lagi</button>
                    </div>
                `;
            }, 1500);
            
            return false;
        };
    }
}

// Fungsi untuk validasi email
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Fungsi untuk menampilkan pesan error
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.color = '#e74c3c';
    errorMessage.style.fontSize = '14px';
    errorMessage.style.marginTop = '5px';
    errorMessage.style.marginBottom = '0';
    
    field.style.borderColor = '#e74c3c';
    field.parentNode.appendChild(errorMessage);
    
    // Hapus pesan error saat field diubah
    field.addEventListener('input', function() {
        this.style.borderColor = '#ddd';
        const errorMsg = this.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
}

// Fungsi untuk menghapus semua pesan error
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const formFields = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
    formFields.forEach(field => field.style.borderColor = '#ddd');
}

// Fungsi untuk menampilkan animasi loading
function showLoadingAnimation() {
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    
    if (submitBtn) {
        // Simpan teks asli
        const originalText = submitBtn.textContent;
        
        // Ganti dengan animasi loading
        submitBtn.innerHTML = `
            <span style="display: inline-block; width: 20px; height: 20px; border: 3px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: white; animation: spin 1s linear infinite; margin-right: 10px;"></span>
            Memproses...
        `;
        
        // Tambahkan animasi CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Nonaktifkan tombol
        submitBtn.disabled = true;
    }
}

// Fungsi untuk menginisialisasi interaksi peta
function initializeMap() {
    const mapIframe = document.querySelector('section iframe');
    
    if (mapIframe) {
        // Tambahkan overlay untuk interaksi peta
        const mapContainer = mapIframe.parentNode;
        
        // Info tambahan di bawah peta
        const additionalInfo = document.createElement('div');
        additionalInfo.style.marginTop = '15px';
        additionalInfo.style.display = 'flex';
        additionalInfo.style.justifyContent = 'space-between';
        additionalInfo.style.flexWrap = 'wrap';
        additionalInfo.style.gap = '10px';
        
        // Petunjuk arah
        const directions = document.createElement('button');
        directions.innerHTML = '🚗 Petunjuk Arah';
        directions.style.backgroundColor = '#3498db';
        directions.style.color = 'white';
        directions.style.border = 'none';
        directions.style.padding = '10px 15px';
        directions.style.borderRadius = '5px';
        directions.style.cursor = 'pointer';
        directions.style.fontFamily = 'inherit';
        directions.style.display = 'flex';
        directions.style.alignItems = 'center';
        directions.style.gap = '5px';
        
        directions.addEventListener('click', function() {
            window.open('https://www.google.com/maps/dir//Jl.+Wates+No.16,+Yogyakarta', '_blank');
        });
        
        // Tombol zoom
        const zoomControls = document.createElement('div');
        zoomControls.style.display = 'flex';
        zoomControls.style.gap = '5px';
        
        const zoomIn = document.createElement('button');
        zoomIn.innerHTML = '🔍+';
        zoomIn.style.backgroundColor = '#f8f9fa';
        zoomIn.style.border = 'none';
        zoomIn.style.padding = '10px 15px';
        zoomIn.style.borderRadius = '5px';
        zoomIn.style.cursor = 'pointer';
        zoomIn.style.fontFamily = 'inherit';
        
        const zoomOut = document.createElement('button');
        zoomOut.innerHTML = '🔍-';
        zoomOut.style.backgroundColor = '#f8f9fa';
        zoomOut.style.border = 'none';
        zoomOut.style.padding = '10px 15px';
        zoomOut.style.borderRadius = '5px';
        zoomOut.style.cursor = 'pointer';
        zoomOut.style.fontFamily = 'inherit';
        
        // Tambahkan event untuk zoom controls (ini hanya simulasi karena iframe terbatas)
        zoomIn.addEventListener('click', function() {
            alert('Untuk zoom in, silakan klik langsung pada peta');
        });
        
        zoomOut.addEventListener('click', function() {
            alert('Untuk zoom out, silakan klik langsung pada peta');
        });
        
        zoomControls.appendChild(zoomIn);
        zoomControls.appendChild(zoomOut);
        
        additionalInfo.appendChild(directions);
        additionalInfo.appendChild(zoomControls);
        
        // Tambahkan ke halaman
        const locationSection = document.querySelector('section:nth-of-type(2)');
        if (locationSection) {
            locationSection.appendChild(additionalInfo);
        }
    }
}

// Fungsi untuk animasi kotak informasi kontak
function animateContactInfo() {
    const contactInfos = document.querySelectorAll('section div[style*="display: flex; align-items: center; margin-bottom: 25px;"]');
    
    if (contactInfos.length > 0) {
        // Tambahkan animasi dengan delay untuk setiap item
        contactInfos.forEach((info, index) => {
            info.style.opacity = '0';
            info.style.transform = 'translateY(20px)';
            info.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                info.style.opacity = '1';
                info.style.transform = 'translateY(0)';
            }, 300 * index);
        });
        
        // Tambahkan hover effect
        contactInfos.forEach(info => {
            info.style.cursor = 'pointer';
            
            info.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                const iconBox = this.querySelector('div[style*="width: 50px; height: 50px;"]');
                if (iconBox) {
                    iconBox.style.backgroundColor = '#3498db';
                    iconBox.style.color = 'white';
                    iconBox.style.transition = 'all 0.3s ease';
                }
            });
            
            info.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                const iconBox = this.querySelector('div[style*="width: 50px; height: 50px;"]');
                if (iconBox) {
                    iconBox.style.backgroundColor = '#e9f5fe';
                    iconBox.style.color = 'inherit';
                }
            });
        });
    }
}