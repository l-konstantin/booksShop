//images
import SlideOne from '../images/slide-text-1.jpg';
import SlideTwo from '../images/slide-text-2.jpg';
import SlideThree from '../images/slide-text-3.jpg';

let images = [
    {
        photo: SlideOne,
        name: "black friday sale"
    },
    {
        photo: SlideTwo,
        name: "for entrepreneurs"
    },
    {
        photo: SlideThree,
        name: "check out"
    }
];

function projectSlider(options) {
    if (!images || !images.length) return;

    options = options || {
        points: true,
        titles: false
    };

    let sliderImages = document.querySelector(".slider-block_item_group");
    let sliderPoints = document.querySelector(".slider-pagination_items");

    initImages();

    if (options.points) {
        initPoints();
    }

    if (options.titles) {
        initTitles();
    }

    function initImages() {
        images.forEach((image, index) => {
            let imageDiv = `<img class="slider-block_item_image n${index} ${index === 0 ? "active" : ""}"
                            src="${images[index].photo}" alt="${images[index].name}" data-index="${index}" />`;
            sliderImages.innerHTML += imageDiv;
        });
    }

    function initPoints() {
        images.forEach((image, index) => {
            let point = `<div class="slider-pagination_circle n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;
            sliderPoints.innerHTML += point;
        });
        sliderPoints.querySelectorAll(".slider-pagination_circle").forEach(point => {
            point.addEventListener("click", function() {
                moveSlider(this.dataset.index);
            })
        })
    }

    function moveSlider(num) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + num).classList.add("active");

        if (options.points) {
            sliderPoints.querySelector(".active").classList.remove("active");
            sliderPoints.querySelector(".n" + num).classList.add("active");
        }

        if (options.titles) changeTitle(num);
    }

    function initTitles() {
        let title = `<h3 class="slider-block_item_text">${images[0].name}</h3>`;
        sliderImages.innerHTML += title;
    }

    function changeTitle(num) {
        if (!images[num].name) return;
        let sliderTitle = sliderImages.querySelector(".slider-block_item_text");
        sliderTitle.innerText = images[num].name;
    }
}

let sliderOptions = {
    points: true,
    titles: true
};

document.addEventListener("DOMContentLoaded", function() {
    projectSlider(sliderOptions);
});