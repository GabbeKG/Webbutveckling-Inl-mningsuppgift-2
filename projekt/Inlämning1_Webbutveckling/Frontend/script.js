var tri = document.getElementsByClassName("trivia-btn");
var i;

for (i = 0; i < tri.length; i++) {
  tri[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var trivia = this.nextElementSibling;
    if (trivia.style.display === "block") {
      trivia.style.display = "none";
    } else {
      trivia.style.display = "block";
    }
  });
}