const stars = document.querySelectorAll(".rating input");
const container=document.querySelector(".container");
const emoji=document.querySelector(".emoji");
const textarea=document.querySelector("textarea");
const sendBtn=document.querySelector(".btn");

stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    // Get the rating value
    const ratingValue = star.value;

    // Add the "active" class to the clicked star and any stars with a lower index
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add("active");
    }

    // Remove the "active" class from any stars 
    for (let i = index + 1; i < stars.length; i++) {
      stars[i].classList.remove("active");
    }
  });
});

// show textarea 
emoji.addEventListener('click' , (e)=>{
    if(e.target.className.includes('emoji')) return;
    textarea.classList.add('textarea--active');
    sendBtn.classList.add('btn--active');

})

container.addEventListener('mouseleave',()=>{
    textarea.classList.remove('textarea--active');
    sendBtn.classList.remove('btn--active');
})

sendBtn.addEventListener('click' ,(e)=>{
  e.preventDefault();
  
})

