gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#wrapper"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#wrapper" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#wrapper", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things compconstely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#wrapper").style.transform ? "transform" : "fixed"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

let mobile_btn = document.querySelector(".mobile_navbar_btn");
let nav_sec = document.querySelector(".header-section"); 

    mobile_btn.addEventListener("click", function(){
        nav_sec.classList.toggle("active")
      });
//
let tl = gsap.timeline()
tl.from(".logo-sec,.rightsec",{
    y:-100,
    duration:1,
    opacity:0,
    stagger:.2
})
tl.from(".banner-caption> h2,.banner-caption> span,.banner-caption> h3",{
    y:120,
    opacity:0,
    stagger:.1
})
tl.from(".banner-image> img",{
    rotate:360,
    scale:0,
    opacity:0,
    stagger:.1
})
tl.from(".banner-btn",{
    y:-100,
    opacity:0,
    scale:0,
    stagger:.2,
})
gsap.to(".header-section",{
  boxShadow: `0 5px 10px 0 rgba(0, 0, 0, 0.1)`,
  duration:.5,
  ScrollTrigger:{
    trigger:".header-section",
    scroller:"#wrapper",
     markers:true,

  }
})





