const text1 = "On a clear sunny day, head outdoors! Go for a walk, hike, or bike ride. " +
  "Have a picnic or play frisbee, football, or volleyball with friends. " +
  "Visit a park, beach, or garden to enjoy the sunshine. " +
  "If you’re near water, try swimming or paddleboarding. " +
  "Relax by reading or journaling outside, or grab coffee at an outdoor café. " +
  "Get creative — paint, sketch, or take photos in natural light. " +
  "As the day ends, watch the sunset or stargaze under the clear sky. " +
  "Whatever you do, don’t forget sunscreen and plenty of water — make the most of the sunshine! ☀️";

const text2 = "On a cloudy day, enjoy softer light perfect for indoor creativity. " +
  "Visit a museum, art gallery, or cozy café to relax. " +
  "Go for a gentle walk with a light jacket — the cooler air feels refreshing. " +
  "Read a book or catch up on movies or podcasts. " +
  "Try cooking or baking something new in the kitchen. " +
  "If outdoors, photography in diffused light works great for portraits and landscapes. " +
  "Cloudy weather is ideal for planning your week or working on hobbies. " +
  "Remember to layer clothes and enjoy the calm atmosphere without harsh sunlight.";

const text3 = "Foggy weather creates a mysterious and calm atmosphere outdoors. " +
  "Take a slow walk to appreciate how the fog softens sounds and sights. " +
  "Bring a warm coat and wear sturdy shoes, as surfaces might be damp. " +
  "Capture moody photos — fog adds depth and drama to landscapes and architecture. " +
  "Visit indoor spots like libraries or cafés to enjoy a cozy vibe. " +
  "Avoid long drives if visibility is low and always use fog lights. " +
  "Use the quiet time to meditate, journal, or listen to calming music. " +
  "Foggy days invite reflection and a slower pace, perfect for self-care.";

const text4 = "Rainy days are perfect for indoor relaxation and productivity. " +
  "Curl up with a good book or watch your favorite movies and shows. " +
  "Try cooking a comforting meal or baking treats to enjoy. " +
  "Listen to the soothing sound of rain while journaling or doing crafts. " +
  "If you venture outside, wear waterproof clothes and sturdy shoes. " +
  "Visit museums, indoor markets, or cafés for a cozy atmosphere. " +
  "Rain encourages slow, mindful days — great for self-care and rest. " +
  "Don’t forget an umbrella and enjoy the fresh, clean air after the rain!";

function presentInfo(el) {
  if (!el) return;

  // Save original HTML if not already saved
  if (!el.hasAttribute('data-original-html')) {
    el.setAttribute('data-original-html', el.innerHTML);
  }

  switch (el.id) {
    case 'info1':
      el.innerHTML = '<p class="text">' + text1 + '</p>';
      break;
    case 'info2':
      el.innerHTML = '<p class="text">' + text2 + '</p>';
      break;
    case 'info3':
      el.innerHTML = '<p class="text">' + text3 + '</p>';
      break;
    case 'info4':
      el.innerHTML = '<p class="text">' + text4 + '</p>';
      break;
    default:
      el.innerHTML = '<p class="text">Sample info text</p>';
  }
}

function restoreInfo(el) {
  if (!el) return;

  const origHTML = el.getAttribute('data-original-html');
  if (origHTML) {
    el.innerHTML = origHTML;
    el.removeAttribute('data-original-html');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const boxes = document.querySelectorAll('.viewBox');

  boxes.forEach(function (box) {
    box.addEventListener('mouseenter', function () {
      presentInfo(box);
    });

    box.addEventListener('mouseleave', function (event) {
      if (!box.contains(event.relatedTarget)) {
        restoreInfo(box);
      }
    });
  });
});
