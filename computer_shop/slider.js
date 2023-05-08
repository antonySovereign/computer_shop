    let slides = document.querySelectorAll(".item");
    let points = document.querySelectorAll(".slider__points-item");
    
    for (let i=0; i<points.length; i++){
        points[i].addEventListener('click', (e) => {
            slideIndex = +e.target.dataset.slide;
            showSlides(Number(slideIndex));
        })
    }
    
    let slideIndex = 1;
    showSlides(slideIndex);
    
    function showSlides(n){
        if (n > slides.length) slideIndex = 1;
        else if (n < 1) slideIndex = slides.length;
        
        for(let i=0; i<slides.length; i++){
            slides[i].style.display = "none";
            points[i].className = points[i].className.replace("active", "slider__points-item")
            
            slides[slideIndex - 1].style.display = "block";
            points[slideIndex - 1].className = "active"
        }
    }
    
    let next = document.querySelector("#next").addEventListener("click", nextSlide);

    let prev = document.querySelector("#previous").addEventListener("click", prevSlide);;

    function nextSlide(){showSlides(slideIndex += 1)}

    function prevSlide(){showSlides(slideIndex -= 1)}

    let timerId = setInterval(() => {showSlides(++slideIndex)}, 6000);
    




