import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
const input = document.querySelector('.form-input');
const gallery = document.querySelector('.gallery');
let inputValue = '';
const loader = document.querySelector('.loader');
input.addEventListener('input', (event) => {
    inputValue = event.target.value.trim();
});
let newGallery = new SimpleLightbox('.gallery a', {
                        overlayOpacity: 0.8,
                        captionSelector: 'img',
                        captionDelay: 250,
                        captionPosition: 'bottom',
                        captionsData: "alt",
                        className: 'simple-lightbox',
                    }); 
const searchForm = document.querySelector('.form');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (inputValue === "") {
        searchForm.reset();
        return
    } else {
        gallery.innerHTML = "";
        const searchParams = new URLSearchParams({
        key: '43830110-6528f7a21182a7b65b70041af',
        q: `${inputValue}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        });
        const url = `https://pixabay.com/api/?${searchParams}`;   
        loader.classList.remove('is-hidden');
        fetchImage(url)
            .then(value => {
                if (value.total === 0) {
                    iziToast.show({
                        id: null,
                        class: '.izi-toast',
                        message: 'Sorry, there are no images matching your search query. Please try again!',
                        messageColor: '#fff',
                        messageSize: '14px',
                        messageLineHeight: '',
                        backgroundColor: '#EF4040',
                        theme: 'light', // dark
                        color: '', // blue, red, green, yellow
                        icon: '',
                        iconText: '',
                        iconColor: '#fff',
                        iconUrl: './img/Group.svg',
                        maxWidth: 450,
                        zindex: null,
                        layout: 1,
                        balloon: false,
                        close: true,
                        closeOnEscape: false,
                        closeOnClick: false,
                        displayMode: 0, // once, replace
                        position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                        target: '',
                        targetFirst: true,
                        timeout: 5000,
                        rtl: false,
                        animateInside: true,
                        drag: true,
                        pauseOnHover: true,
                        resetOnHover: false,
                        progressBar: true,
                        progressBarColor: '',
                        progressBarEasing: 'linear',
                        overlay: false,
                        overlayClose: false,
                        overlayColor: 'rgba(0, 0, 0, 0.6)',
                        transitionIn: 'fadeInUp',
                        transitionOut: 'fadeOut',
                        transitionInMobile: 'fadeInUp',
                        transitionOutMobile: 'fadeOutDown',
                        buttons: {},
                        inputs: {},
                        onOpening: function () { },
                        onOpened: function () { },
                        onClosing: function () { },
                        onClosed: function () { }
                    });
                } else {
                    gallery.insertAdjacentHTML('afterbegin', madeMarkup(value));
                    const galleryRefresh = newGallery.refresh();
                    newGallery.on('open.simplelightbox', galleryRefresh);
                     
                }
            })
            .catch(console.error())
            .finally(() => loader.classList.add('is-hidden'));
    }
    inputValue = '';
    searchForm.reset();
}); 

function fetchImage(value) {
        return fetch(value)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
    };

function madeMarkup(images) {
    const imagesArray = images.hits;
    const galleryItems = [];
    imagesArray.forEach(image => {
        galleryItems.push(`<li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
            <div class="wrapper">
            <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
            <div class="title-wrapper">
            <p class="title">Likes<span>${image.likes}</span></p>
            <p class="title">Views<span>${image.views}</span></p>
            <p class="title">Comments<span>${image.comments}</span></p>
            <p class="title">Downloads<span>${image.downloads}</span></p>
            </div>
            </div>
            </a>
            </li>`);
        });
    // gallery.insertAdjacentHTML("afterbegin", galleryItems.join(""));
    return galleryItems.join("");
};
