const card = document.querySelector(".card");
const container = document.querySelector("#opening");

container.addEventListener("mousemove", (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 20;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 20;

    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

container.addEventListener("mouseenter", e => {
    card.style.transition = "none";
});

container.addEventListener("mouseleave", e => {
    card.style.transition = "all 1.5s ease";
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});


// function parallax(element, distance, speed) {
//     const item = document.querySelector(element);

//     item.style.transform = `translateY(${-distance * speed}px)`;
// }

// window.addEventListener('scroll', function(){
//     parallax(".myimg", window.scrollY, .5);
//     parallax(".land1para", window.scrollY, .6);
// })