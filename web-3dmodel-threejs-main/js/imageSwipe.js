  export const toHomeUrls = [
    './src/images/3drpg/to home 1.png',
    './src/images/3drpg/to home 2.png',
    './src/images/3drpg/to home 3.png',
    './src/images/3drpg/to home 4.png',
    './src/images/3drpg/to home 5.png',
    './src/images/3drpg/to home 6.png',
    './src/images/3drpg/to home 7.png',
    './src/images/3drpg/to home 8.png',
    './src/images/3drpg/to home 9.png',
    './src/images/3drpg/to home 10.png',
    './src/images/3drpg/to home 11.png',
    './src/images/3drpg/to home 12.png',
  ];
  
  export const shader = [
    './src/images/shader/shader1.png',
    './src/images/shader/shader2.png',
    './src/images/shader/shader3.png',
    './src/images/shader/shader4.png',
    './src/images/shader/shader5.png',
    './src/images/shader/shader6.png',
    './src/images/shader/shader7.png',
    './src/images/shader/shader8.png',
    './src/images/shader/shader9.png',
    './src/images/shader/shader10.png',
    './src/images/shader/shader11.png',
    './src/images/shader/shader12.png',
    './src/images/shader/shader13.png',
    './src/images/shader/shader14.png',
    './src/images/shader/shader15.png',
    './src/images/shader/shader16.png',
    './src/images/shader/shader17.png',
  ];
  
  export const shadow = [
    './src/images/shadow/rpg 1.png',
    './src/images/shadow/rpg 2.png',
    './src/images/shadow/rpg 3.png',
    './src/images/shadow/rpg 4.png',
    './src/images/shadow/rpg 5.png',
    './src/images/shadow/rpg 6.png',
    './src/images/shadow/rpg 7.png',
    './src/images/shadow/rpg 8.png',
    './src/images/shadow/rpg 9.png',
  ];

  export const bug = [
    './src/images/bug/bug1.png',
    './src/images/bug/bug2.png',
    './src/images/bug/bug3.png',
    './src/images/bug/bug4.png',
    './src/images/bug/bug5.png',
    './src/images/bug/bug6.png',
    './src/images/bug/bug7.png',
    './src/images/bug/bug8.png',
  ];


  export let imgFileNum = 0;

  const carouselContainer = document.querySelector('.carousel-container');
  const prev = document.querySelector('.carousel-arrow--prev');
  const next = document.querySelector('.carousel-arrow--next');
  let currentIndex = 0;
  
  function createSlide(imageUrl) {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
  
    const img = document.createElement('img');
    img.src = imageUrl;
  
    slide.appendChild(img);
  
    return slide;
  }
  export function imageGallery(imgFile) 
  {
    const carouselContainer = document.querySelector('.carousel-container');
    const prev = document.querySelector('.carousel-arrow--prev');
    const next = document.querySelector('.carousel-arrow--next');
    let currentIndex = 0;
  
    function createSlide(imageUrl) {
      const slide = document.createElement('div');
      slide.classList.add('carousel-slide');
  
      const img = document.createElement('img');
      img.src = imageUrl;
  
      slide.appendChild(img);
  
      return slide;
    }
  
    function updateCarousel() {
      carouselContainer.innerHTML = ''; // Clear the existing slides
  
      imgFile.forEach((imageUrl, index) => {
        const slide = createSlide(imageUrl);
        carouselContainer.appendChild(slide);
      });
  
      showSlide(currentIndex);
    }
  
    function showSlide(index) {
      const slides = document.querySelectorAll('.carousel-slide');
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    }
  
    function handleCarouselMove(positive = true) {
      currentIndex = positive
        ? (currentIndex + 1) % imgFile.length
        : (currentIndex - 1 + imgFile.length) % imgFile.length;
      showSlide(currentIndex);
    }
  
    prev.addEventListener('click', () => {
      handleCarouselMove(false);
    });
  
    next.addEventListener('click', () => {
      handleCarouselMove();
    });
  
    updateCarousel();
  }
  
  

