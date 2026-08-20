function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.toggle('open');
  el.setAttribute('aria-expanded', String(isOpen));
  const answer = document.getElementById(el.getAttribute('aria-controls'));
  if (answer) { answer.hidden = !isOpen; }
}

const menuButton = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-nav');
function closeMenu(returnFocus) {
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
  if (returnFocus) { menuButton.focus(); }
}

document.querySelectorAll('.faq-q').forEach(function(question, index) {
  const answer = question.nextElementSibling;
  const answerId = 'faq-answer-' + (index + 1);
  question.setAttribute('role', 'button');
  question.setAttribute('tabindex', '0');
  question.setAttribute('aria-expanded', 'false');
  question.setAttribute('aria-controls', answerId);
  answer.id = answerId;
  answer.hidden = true;
  question.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleFaq(question); }
  });
});

document.querySelectorAll('[data-action="action-1"]').forEach((element) => element.addEventListener('click', function () {
  const opening = !mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open', opening);
  mobileMenu.setAttribute('aria-hidden', opening ? 'false' : 'true');
  menuButton.setAttribute('aria-expanded', opening ? 'true' : 'false');
  menuButton.setAttribute('aria-label', opening ? 'Close navigation menu' : 'Open navigation menu');
  if (opening) { mobileMenu.querySelector('a').focus(); }
}));

document.addEventListener('keydown', function(event) { if (event.key === 'Escape' && mobileMenu.classList.contains('open')) { closeMenu(true); } });
document.addEventListener('click', function(event) { if (mobileMenu.classList.contains('open') && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) { closeMenu(false); } });

document.querySelectorAll('[data-action="action-3"]').forEach((element) => element.addEventListener('click', function (event) { toggleFaq(this) }));

document.querySelectorAll('[data-action="action-5"]').forEach((element) => element.addEventListener('click', function (event) { toggleFaq(this) }));

document.querySelectorAll('[data-action="action-7"]').forEach((element) => element.addEventListener('click', function (event) { toggleFaq(this) }));

document.querySelectorAll('[data-action="action-9"]').forEach((element) => element.addEventListener('click', function (event) { toggleFaq(this) }));

document.querySelectorAll('[data-action="action-11"]').forEach((element) => element.addEventListener('click', function (event) { toggleFaq(this) }));

document.querySelectorAll('[data-action="action-13"]').forEach((element) => element.addEventListener('click', function (event) { toggleFaq(this) }));
