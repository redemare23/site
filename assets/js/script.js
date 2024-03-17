document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
      let caixas = document.querySelectorAll('.caixa');
      for (let caixa of caixas) {
        if (isElementInViewport(caixa)) {
          caixa.classList.add('aparecer');
        }
      }
    });
  
    function isElementInViewport(el) {
      let rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  });
  