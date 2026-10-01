import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import Navbar from './components/Navbar';
import MainSection from './components/MainSection';
import './styles/style.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let isAnimating = false;
    let currentFlavour = 0; // 0 = Orange, 1 = Strawberry

    const ctx = gsap.context(() => {
      // 1. Initial Page Entrance Animation (Bottle from UP, Orange decor elements from DOWN)
      const entryTl = gsap.timeline();

      entryTl.from("#fanta", {
        y: "-100vh",
        opacity: 0,
        rotate: 14,
        duration: 1.4,
        ease: "power3.out"
      })
      .from("#orange-text", {
        x: "-100vw",
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=1.0")
      .from(".decor-orange", {
        y: "100vh",
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out"
      }, "-=1.0")
      .from("#info-orange", {
        y: "100vh",
        opacity: 0,
        duration: 1.0,
        ease: "power3.out"
      }, "-=0.8");

      // 2. Master Timeline for Flavour Change (Orange -> Strawberry)
      const tl = gsap.timeline({ paused: true });

      // Step 1: Exit Orange elements cleanly (0s -> 0.5s)
      tl.fromTo("#fanta",
        { y: "0vh", opacity: 1, rotate: 14 },
        { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" },
        0
      )
      .fromTo("#orange-text",
        { x: "0vw", opacity: 1 },
        { x: "-100vw", opacity: 0, duration: 0.5, ease: "power2.in" },
        0
      )
      .fromTo("#info-orange",
        { y: "0vh", opacity: 1 },
        { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" },
        0
      )
      .fromTo(".decor-orange",
        { y: "0vh", opacity: 1 },
        { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" },
        0
      )

      // Background Transition (0s -> 1.0s)
      .fromTo(".one",
        { background: "linear-gradient(135deg, #ea7b00, #d56600)" },
        { background: "linear-gradient(135deg, #eb2d55, #b41432)", duration: 1.0, ease: "power2.inOut" },
        0
      )

      // Step 2: Enter Strawberry elements cleanly (0.5s -> 1.0s)
      .fromTo("#fanta2",
        { y: "-100vh", opacity: 0, rotate: 14 },
        { y: "0vh", opacity: 1, rotate: 14, duration: 0.5, ease: "power2.out" },
        0.5
      )
      .fromTo("#strawberry-text",
        { x: "100vw", opacity: 0 },
        { x: "0vw", opacity: 1, duration: 0.5, ease: "power2.out" },
        0.5
      )
      .fromTo("#info-strawberry",
        { y: "100vh", opacity: 0 },
        { y: "0vh", opacity: 1, duration: 0.5, ease: "power2.out" },
        0.5
      );

      const gotoStrawberry = () => {
        if (currentFlavour === 1 || isAnimating) return;
        isAnimating = true;
        tl.play().then(() => {
          currentFlavour = 1;
          isAnimating = false;
        });
      };

      const gotoOrange = () => {
        if (currentFlavour === 0 || isAnimating) return;
        isAnimating = true;
        tl.reverse().then(() => {
          currentFlavour = 0;
          isAnimating = false;
        });
      };

      // 1. Mouse Wheel Trigger
      const handleWheel = (e) => {
        if (isAnimating) return;
        if (e.deltaY > 0) {
          gotoStrawberry();
        } else if (e.deltaY < 0) {
          gotoOrange();
        }
      };

      // 2. Touch Swipe Trigger for Mobile
      let touchStartY = 0;
      const handleTouchStart = (e) => {
        touchStartY = e.touches[0].clientY;
      };

      const handleTouchEnd = (e) => {
        if (isAnimating) return;
        let touchEndY = e.changedTouches[0].clientY;
        let deltaY = touchStartY - touchEndY;
        if (deltaY > 30) {
          gotoStrawberry();
        } else if (deltaY < -30) {
          gotoOrange();
        }
      };

      // 3. Arrow Keys Trigger
      const handleKeyDown = (e) => {
        if (isAnimating) return;
        if (e.key === "ArrowDown" || e.key === "PageDown") {
          gotoStrawberry();
        } else if (e.key === "ArrowUp" || e.key === "PageUp") {
          gotoOrange();
        }
      };

      window.addEventListener("wheel", handleWheel, { passive: true });
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchend", handleTouchEnd, { passive: true });
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
        window.removeEventListener("keydown", handleKeyDown);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="main">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <MainSection />
    </div>
  );
}

export default App;
