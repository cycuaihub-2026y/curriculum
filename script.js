// script.js - 中原青年 AI 實戰養成班 一頁式網站互動

(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');
  const toTop = document.getElementById('toTop');

  // 導覽列背景 + 回到頂端按鈕
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 20);
    toTop.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 行動選單開關
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
  });
  // 點連結後關閉行動選單
  navLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  // 導覽列高亮 (依區塊在視窗中的位置)
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const linkMap = new Map();
  navLinks.querySelectorAll('a[href^="#"]').forEach((a) => {
    linkMap.set(a.getAttribute('href').slice(1), a);
  });
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        linkMap.forEach((a) => a.classList.remove('active'));
        linkMap.get(e.target.id)?.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach((s) => spy.observe(s));

  // 捲動淡入
  const revealer = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => revealer.observe(el));

  // FAQ 手風琴：一次只展開一項
  const faqItems = Array.from(document.querySelectorAll('.faq__item'));
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => { if (other !== item) other.open = false; });
      }
    });
  });
})();
