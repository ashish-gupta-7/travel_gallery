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
