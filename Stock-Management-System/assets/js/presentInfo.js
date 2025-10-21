// Script to swap text in .viewBox elements on hover

function presentInfo(el) {
  if (!el) return;
  // Save original HTML if not already saved
  if (!el.infoText.originalHtml) {
    el.dataset.originalHtml = el.innerHTML;
  }
  // Replace with informational text
  el.innerHTML = '<p class="text">sample info text</p>';
}

function restoreInfo(el) {
  if (!el) return;
  const orig = el.dataset.originalHtml;
  if (orig) {
    el.innerHTML = orig;
    delete el.dataset.originalHtml;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const boxes = document.querySelectorAll('.viewBox');

  boxes.forEach(function (box) {
    const titleEl = box.querySelector('.title');
    if (!titleEl) return;

    // Store original text once
    if (!titleEl.hasAttribute('data-original-text')) {
      titleEl.setAttribute('data-original-text', titleEl.textContent);
    }

    box.addEventListener('mouseenter', function () {
      titleEl.textContent = 'Sample info text';
    });

    box.addEventListener('mouseleave', function (event) {
      if (!box.contains(event.relatedTarget)) {
        titleEl.textContent = titleEl.getAttribute('data-original-text');
      }
    });
  });
});
