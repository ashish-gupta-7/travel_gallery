function shareImage(imageUrl) {
  const pageUrl = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: 'Check out this travel photo!',
      text: 'One of my travel memories.',
      url: imageUrl
    }).then(() => {
      console.log('Shared successfully');
    }).catch((err) => {
      console.error('Error sharing:', err);
    });
  } else {
    // Fallback: Copy link or open share links
    const facebook = `https://www.facebook.com/sharer/sharer.php?u=${imageUrl}`;
    const twitter = `https://twitter.com/intent/tweet?url=${imageUrl}&text=Check+out+this+travel+photo!`;
    const whatsapp = `https://wa.me/?text=Check+out+this+travel+photo:+${imageUrl}`;

    const popup = `
      <div style="padding:20px">
        <a href="${facebook}" target="_blank">Share on Facebook</a><br>
        <a href="${twitter}" target="_blank">Share on Twitter</a><br>
        <a href="${whatsapp}" target="_blank">Share on WhatsApp</a>
      </div>
    `;

    const newWindow = window.open("", "Share Photo", "width=400,height=300");
    newWindow.document.write(popup);
  }
}

// Hamburger menu toggle
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}


// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Save preference to localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Load theme from localStorage
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
});


// Fallback lazy loading for older browsers
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll('img.lazy');

  if ("IntersectionObserver" in window) {
    let observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function (img) {
      observer.observe(img);
    });
  } else {
    // Fallback if IntersectionObserver not supported
    lazyImages.forEach(function (img) {
      img.src = img.dataset.src;
    });
  }
});


function openLightbox(imgUrl) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = imgUrl;
  lightbox.style.display = "block";
}

// Close when clicking the X
document.querySelector(".close").onclick = function () {
  document.getElementById('lightbox').style.display = "none";
};

// Close when clicking outside the image
document.getElementById('lightbox').onclick = function (e) {
  if (e.target === this) {
    this.style.display = "none";
  }
};

function filterPhotos(category) {
  const cards = document.querySelectorAll('.photo-card');

  cards.forEach(card => {
    if (category === 'all') {
      card.style.display = 'block';
    } else {
      if (card.classList.contains(category)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    }
  });
}

// Contact form handler (you can integrate backend later)
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thanks for reaching out! I'll get back to you soon.");
  this.reset(); // Clear the form
});

let uploadedFile = null;

// Store selected file
document.getElementById('photoUpload').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    uploadedFile = file;
  } else {
    uploadedFile = null;
    alert("Please select a valid image file.");
  }
});

// Handle upload on button click
document.getElementById('addPhotoBtn').addEventListener('click', function () {
  if (!uploadedFile) {
    alert("Please select an image first.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageSrc = e.target.result;

    const card = document.createElement('div');
    card.className = 'photo-card';

    card.innerHTML = `
      <img src="${imageSrc}" alt="Uploaded photo" loading="lazy" />
      <div class="photo-info">
        <p>New Upload</p>
        <a href="${imageSrc}" download class="download-btn">Download</a>
      </div>
    `;

    document.querySelector('.gallery').prepend(card); // Add to top
    uploadedFile = null; // Reset
    document.getElementById('photoUpload').value = ""; // Clear input
  };

  reader.readAsDataURL(uploadedFile);
});
