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

document.addEventListener('DOMContentLoaded', function() {
  const boxes = document.querySelectorAll('.viewBox');

  boxes.forEach(function(box) {
    box.addEventListener('mouseenter', function() {
      console.log('mouseenter on', box);
      presentInfo(box);
    });

    box.addEventListener('mouseleave', function(event) {
      // Check if the mouse has left the entire box
      if (!box.contains(event.relatedTarget)) {
        console.log('mouseleave on', box);
        restoreInfo(box);
      }
    });
  });
});
