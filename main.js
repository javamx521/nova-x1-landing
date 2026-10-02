/* Nova X1 Pro landing — interactions */
(function () {
  'use strict';

  /* —— 导航滚动态 —— */
  var nav = document.getElementById('nav');
  var onScrollNav = function () {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* —— 移动端菜单 —— */
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  /* —— 入场动画 —— */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal, .reveal-scale').forEach(function (el) {
    io.observe(el);
  });

  /* —— Hero 视差 —— */
  var heroBg = document.getElementById('heroBg');
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        heroBg.style.transform = 'translateY(' + y * 0.28 + 'px)';
      }
      ticking = false;
    });
  }, { passive: true });

  /* —— 跑马灯无缝衔接：复制一份轨道内容 —— */
  var track = document.getElementById('marqueeTrack');
  track.innerHTML += track.innerHTML;

  /* —— 配色切换 —— */
  var swatches = Array.prototype.slice.call(document.querySelectorAll('.swatch'));
  var colorImgs = Array.prototype.slice.call(document.querySelectorAll('.color-img'));
  var colorName = document.getElementById('colorName');
  swatches.forEach(function (sw) {
    sw.addEventListener('click', function () {
      swatches.forEach(function (s) {
        s.classList.remove('active');
        s.setAttribute('aria-checked', 'false');
      });
      sw.classList.add('active');
      sw.setAttribute('aria-checked', 'true');
      var c = sw.getAttribute('data-color');
      colorImgs.forEach(function (img) {
        img.classList.toggle('active', img.getAttribute('data-color') === c);
      });
      colorName.textContent = sw.getAttribute('data-name');
    });
  });

  /* —— 存储容量 / 价格 —— */
  var segBtns = Array.prototype.slice.call(document.querySelectorAll('.seg-btn'));
  var buyPrice = document.getElementById('buyPrice');
  segBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      segBtns.forEach(function (x) {
        x.classList.remove('active');
        x.setAttribute('aria-checked', 'false');
      });
      b.classList.add('active');
      b.setAttribute('aria-checked', 'true');
      var p = Number(b.getAttribute('data-price'));
      buyPrice.textContent = 'RMB ' + p.toLocaleString('zh-CN');
    });
  });

  /* —— 加入购物袋（演示） —— */
  var buyBtn = document.getElementById('buyBtn');
  var buyNote = document.getElementById('buyNote');
  buyBtn.addEventListener('click', function () {
    var active = document.querySelector('.seg-btn.active');
    var color = document.querySelector('.swatch.active').getAttribute('data-name');
    buyNote.textContent = '已加入购物袋：Nova X1 Pro · ' + color + ' · ' + active.textContent + '（演示，无真实结算）';
    buyBtn.textContent = '✓ 已加入';
    setTimeout(function () { buyBtn.textContent = '加入购物袋'; }, 2200);
  });
})();
