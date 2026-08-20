// ── PAGE ROUTER ──
var pages = ['home','newsletter','products','who','contact'];

function showPage(id, options) {
  options = options || {};
  if (pages.indexOf(id) === -1) { id = 'home'; }
  pages.forEach(function(p) {
    var el = document.getElementById('page-' + p);
    var nav = document.getElementById('nav-' + p);
    if (el) { el.classList.remove('active'); el.setAttribute('aria-hidden', 'true'); }
    if (nav) { nav.classList.remove('active'); nav.removeAttribute('aria-current'); }
  });
  var target = document.getElementById('page-' + id);
  var navTarget = document.getElementById('nav-' + id);
  if (target) {
    target.classList.add('active');
    target.setAttribute('aria-hidden', 'false');
    target.setAttribute('tabindex', '-1');
  }
  if (navTarget) { navTarget.classList.add('active'); navTarget.setAttribute('aria-current', 'page'); }
  closeMobile();
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: options.instant || reduceMotion ? 'auto' : 'smooth' });
  var nextHash = '#' + id;
  if (options.history === 'replace') {
    history.replaceState({ page: id }, '', nextHash);
  } else if (options.history !== 'none' && window.location.hash !== nextHash) {
    history.pushState({ page: id }, '', nextHash);
  }
  if (target && !options.skipFocus) {
    window.setTimeout(function() { target.focus({ preventScroll: true }); }, options.instant ? 0 : 180);
  }
}

// ── MOBILE NAV TOGGLE ──
function closeMobile() {
  var nav = document.getElementById('mobileNav');
  var btn = document.getElementById('hamburger');
  if (!nav || !btn) { return; }
  nav.classList.remove('open');
  nav.setAttribute('aria-hidden', 'true');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Open navigation menu');
}

function toggleMobile() {
  var nav = document.getElementById('mobileNav');
  var btn = document.getElementById('hamburger');
  var willOpen = !nav.classList.contains('open');
  nav.classList.toggle('open', willOpen);
  nav.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
  btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  btn.setAttribute('aria-label', willOpen ? 'Close navigation menu' : 'Open navigation menu');
  if (willOpen) {
    var firstLink = nav.querySelector('a');
    if (firstLink) { firstLink.focus(); }
  }
}

// ── SUBSCRIBE CTA ──
function goSubscribe() {
  showPage('contact');
  setTimeout(function(){var select=document.getElementById('inquiry-type-select');if(select){select.value='early-access';select.focus();}},100);
}

// ── CONTACT FORM HANDLER ──
function handleContactSubmit(e) {
  e.preventDefault();
  var form=e.target,status=document.getElementById('cf-status');
  var name=document.getElementById('cf-name').value.trim();
  var email=document.getElementById('cf-email').value.trim();
  var inquiryType=document.getElementById('inquiry-type-select').value||'general';
  var message=document.getElementById('cf-message').value.trim();
  var subject='AIAPC Inquiry: '+inquiryType;
  var body='Name: '+name+'\nEmail: '+email+'\nInquiry Type: '+inquiryType+'\n\nMessage:\n'+message;
  window.location.href='mailto:collins.ra@northeastern.edu?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  status.classList.add('contact-status-success');
  status.textContent='Email draft opened. Your message has not been sent until you review and send it in your email application.';
}

// ── HASH ROUTING ON LOAD ──
(function() {
  var hash = window.location.hash.replace('#', '');
  var initialPage = hash && pages.indexOf(hash) !== -1 ? hash : 'home';
  showPage(initialPage, { history: 'replace', instant: true, skipFocus: true });
})();

window.addEventListener('popstate', function() {
  var hash = window.location.hash.replace('#', '');
  showPage(pages.indexOf(hash) !== -1 ? hash : 'home', { history: 'none', instant: true });
});

// ── ACTIVE NAV ON SCROLL (desktop) ──
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[data-action]:not([href])').forEach(function(el){el.setAttribute('role','button');el.setAttribute('tabindex','0');el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();}});});
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var nav = document.getElementById('mobileNav');
      if (nav && nav.classList.contains('open')) { closeMobile(); document.getElementById('hamburger').focus(); }
    }
  });
  // Close mobile nav on outside click
  document.addEventListener('click', function(e) {
    var nav = document.getElementById('mobileNav');
    var btn = document.getElementById('hamburger');
    if (nav && nav.classList.contains('open') && !nav.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      closeMobile();
    }
  });
});


document.querySelectorAll('[data-action="action-1"]').forEach((element) => element.addEventListener('click', function (event) { showPage('home') }));

document.querySelectorAll('[data-action="action-3"]').forEach((element) => element.addEventListener('click', function (event) { showPage('home') }));

document.querySelectorAll('[data-action="action-5"]').forEach((element) => element.addEventListener('click', function (event) { showPage('newsletter') }));

document.querySelectorAll('[data-action="action-7"]').forEach((element) => element.addEventListener('click', function (event) { showPage('products') }));

document.querySelectorAll('[data-action="action-9"]').forEach((element) => element.addEventListener('click', function (event) { showPage('who') }));

document.querySelectorAll('[data-action="action-11"]').forEach((element) => element.addEventListener('click', function (event) { showPage('contact') }));

document.querySelectorAll('[data-action="action-13"]').forEach((element) => element.addEventListener('click', function (event) { goSubscribe() }));

document.querySelectorAll('[data-action="action-15"]').forEach((element) => element.addEventListener('click', function (event) { toggleMobile() }));

document.querySelectorAll('[data-action="action-17"]').forEach((element) => element.addEventListener('click', function (event) { showPage('home') }));

document.querySelectorAll('[data-action="action-19"]').forEach((element) => element.addEventListener('click', function (event) { showPage('newsletter') }));

document.querySelectorAll('[data-action="action-21"]').forEach((element) => element.addEventListener('click', function (event) { showPage('products') }));

document.querySelectorAll('[data-action="action-23"]').forEach((element) => element.addEventListener('click', function (event) { showPage('who') }));

document.querySelectorAll('[data-action="action-25"]').forEach((element) => element.addEventListener('click', function (event) { showPage('contact') }));

document.querySelectorAll('[data-action="action-27"]').forEach((element) => element.addEventListener('click', function (event) { goSubscribe() }));

document.querySelectorAll('[data-action="action-29"]').forEach((element) => element.addEventListener('click', function (event) { showPage('contact') }));

document.querySelectorAll('[data-action="action-31"]').forEach((element) => element.addEventListener('click', function (event) { showPage('who') }));

document.querySelectorAll('[data-action="action-33"]').forEach((element) => element.addEventListener('click', function (event) { showPage('contact') }));

document.querySelectorAll('[data-action="action-35"]').forEach((element) => element.addEventListener('click', function (event) { document.getElementById('nl-subscribe').scrollIntoView({behavior:'smooth'}) }));

document.querySelectorAll('[data-action="action-37"]').forEach((element) => element.addEventListener('click', function (event) { showPage('contact') }));

document.querySelectorAll('[data-action="action-39"]').forEach((element) => element.addEventListener('click', function (event) { showPage('newsletter') }));

document.querySelectorAll('[data-action="action-41"]').forEach((element) => element.addEventListener('click', function (event) { showPage('newsletter') }));

document.querySelectorAll('[data-action="action-43"]').forEach((element) => element.addEventListener('click', function (event) { goSubscribe() }));

document.querySelectorAll('[data-action="action-45"]').forEach((element) => element.addEventListener('click', function (event) { goSubscribe() }));

document.querySelectorAll('[data-action="action-47"]').forEach((element) => element.addEventListener('click', function (event) { goSubscribe() }));

document.querySelectorAll('[data-action="action-49"]').forEach((element) => element.addEventListener('click', function (event) { goSubscribe() }));

document.querySelectorAll('[data-action="action-51"]').forEach((element) => element.addEventListener('click', function (event) { goSubscribe() }));

document.querySelectorAll('[data-action="action-53"]').forEach((element) => element.addEventListener('click', function (event) { goSubscribe() }));

document.querySelectorAll('[data-action="action-55"]').forEach((element) => element.addEventListener('click', function (event) { goSubscribe() }));

document.querySelectorAll('[data-action="action-57"]').forEach((element) => element.addEventListener('click', function (event) { showPage('contact');setTimeout(function(){var s=document.getElementById('inquiry-type-select');if(s){s.value='institutional';s.scrollIntoView({behavior:'smooth',block:'center'});}},200) }));

document.querySelectorAll('[data-action="action-59"]').forEach((element) => element.addEventListener('click', function (event) { showPage('contact') }));

document.querySelectorAll('[data-action="action-61"]').forEach((element) => element.addEventListener('click', function (event) { showPage('contact') }));

document.querySelectorAll('[data-action="action-63"]').forEach((element) => element.addEventListener('click', function (event) { showPage('newsletter') }));

document.querySelectorAll('[data-action="action-65"]').forEach((element) => element.addEventListener('click', function (event) { showPage('contact') }));

document.querySelectorAll('[data-action="action-67"]').forEach((element) => element.addEventListener('click', function (event) { showPage('home') }));

document.querySelectorAll('[data-action="action-69"]').forEach((element) => element.addEventListener('click', function (event) { showPage('newsletter') }));

document.querySelectorAll('[data-action="action-71"]').forEach((element) => element.addEventListener('click', function (event) { showPage('products') }));

document.querySelectorAll('[data-action="action-73"]').forEach((element) => element.addEventListener('click', function (event) { showPage('who') }));

document.querySelectorAll('[data-action="action-75"]').forEach((element) => element.addEventListener('click', function (event) { showPage('contact') }));

document.querySelectorAll('[data-action="action-77"]').forEach((element) => element.addEventListener('click', function (event) { showPage('contact') }));

document.querySelectorAll('[data-action="action-79"]').forEach((element) => element.addEventListener('click', function (event) { showPage('contact') }));

document.querySelectorAll('[data-event-1]').forEach((element) => element.addEventListener('submit', function (event) { handleContactSubmit(event) }));
