function renderSection(data, containerId, dotsId) {
  const container = document.getElementById(containerId);
  const dots = document.getElementById(dotsId);

  // Add items to container
  data.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'scroll-item';
    div.onclick = () => window.location.href = `../html/details.html#${item.slug}`;
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;
    container.appendChild(div);
  });

  const setActiveDot = (index) => {
    const dotElements = dots.querySelectorAll('.dot');
    dotElements.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  };

  const updateDots = () => {
    const containerWidth = container.offsetWidth;
    const scrollWidth = container.scrollWidth;
    const pageCount = Math.ceil(scrollWidth / containerWidth);

    if (pageCount <= 1) {
      dots.innerHTML = '';
      return;
    }

    dots.innerHTML = '';
    for (let i = 0; i < pageCount; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot';
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        container.scrollTo({ left: i * containerWidth, behavior: 'smooth' });
        // set active after scroll completes
        setTimeout(() => setActiveDot(i), 300);
      });
      dots.appendChild(dot);
    }
  };

  const handleScroll = () => {
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const scrollWidth = container.scrollWidth;

    // Fix for last page: prevent overflow rounding issue
    const index = Math.min(
      Math.round(scrollLeft / containerWidth),
      Math.ceil(scrollWidth / containerWidth) - 1
    );

    setActiveDot(index);
  };

  container.addEventListener('scroll', () => {
    // Delay to wait for scroll finish (for smoother dot update)
    clearTimeout(container._scrollTimer);
    container._scrollTimer = setTimeout(handleScroll, 100);
  });

  // Initialize after short delay
  setTimeout(() => {
    updateDots();
    handleScroll();
  }, 100);

  window.addEventListener('resize', () => {
    updateDots();
    handleScroll();
  });
}


// Data
const exploreData = [
  { title: "Yagya Shala", slug: "yagya-shala", description: "The heart of Shantikunj spiritual activities.", image: "images/yagya.avif" },
  { title: "Gayatri Mandir", slug: "gayatri-mandir", description: "Sacred place of devotion and meditation.", image: "images/mandir.webp" },
  { title: "Swadhyay Hall", slug: "swadhyay-hall", description: "Dedicated learning and study sessions.", image: "images/hall.jpg" },
  { title: "Annapurna Bhawan", slug: "annapurna", description: "The community dining facility.", image: "images/annapurna.jpg" },
  { title: "Vishwakarma Vatika", slug: "vatika", description: "Art & craft center of DSVV.", image: "images/vatika.avif" }
];

const timelineData = [
  { title: "Founding Year", slug: "founding-year", description: "Established in 1971 by Pt. Shri Ram Sharma Acharya.", image: "images/1971.jpg" },
  { title: "Mission Expansion", slug: "mission-expansion", description: "Nationwide mission work expanded during 1980s.", image: "images/1980.jpg" },
  { title: "Digital Era", slug: "digital-era", description: "Online presence and global reach began.", image: "images/digital.png" },
  { title: "UN Recognition", slug: "un-recognition", description: "UN-affiliated NGO status achieved.", image: "images/un.jpg" }
];

// Run
renderSection(exploreData, 'locationContainer', 'locationDots');
renderSection(timelineData, 'timelineContainer', 'timelineDots');
