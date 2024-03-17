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
      // Verifica se o elemento está visível na viewport, considerando uma margem
      return (
          rect.top >= -50 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 50 &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }
});
