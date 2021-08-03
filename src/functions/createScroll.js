import BScroll from '@better-scroll/core';
import MouseWheel from '@better-scroll/mouse-wheel';
import ScrollBar from '@better-scroll/scroll-bar';
BScroll.use(ScrollBar);
BScroll.use(MouseWheel);

// transparent element for scroll-to-top
const scrollable = document.createElement('div');
scrollable.style = `
position: absolute;
top: 0px;
left: 0px;
width: 1px;
height: 101vh;
background-image: transparent;
`;
document.body.appendChild(scrollable);

function createScroll(contentIndex, wrapper, onScroll) {
  // reset position of window
  window.scroll(0, 0);
  // create BScroll
  const scroll = new BScroll(wrapper, {
    scrollY: true,
    mouseWheel: {
      easeTime: 100
    },
    scrollbar: true,
    probeType: 3,
    click: true,
    bounceTime: 400,
    swipeBounceTime: 400,
    specifiedIndexAsContent: contentIndex
  });
  // style the scroll bar
  const indicator = scroll.plugins.scrollbar.indicators[0];
  indicator.indicatorEl.style.border = 'none';
  indicator.wrapper.style.width = '5px';

  // add scroll event handler if there is any
  onScroll && scroll.on('scroll', onScroll);

  /*
   *  Implement scroll-to-top while tap the status bar in Safari
   *
   *  Scroll down the transparent element when BScroll is scrolling.
   *  When the user taps the status bar, the transparent element
   *  scrolls to top, and fires a native scroll event. Listen to
   *  the scroll event and call BScroll.scrollTo() to scroll to top
   */
  scroll.on('scrollStart', () => {
    window.scroll(0, 2);
  });
  window.addEventListener('scroll', scrollToTop, {passive: true});
  scroll.on('destroy', () => {
    window.removeEventListener('scroll', scrollToTop);
  });
  function scrollToTop(event) {
    !window.scrollY && scroll.y && scroll.enabled && scroll.scrollTo(0, 0, 500);
  }
  return scroll;
}

export default createScroll;
