import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Sử dụng requestAnimationFrame để đảm bảo DOM đã render xong
    const scrollToTop = () => {
      window.requestAnimationFrame(() => {
        // Multiple methods to ensure scroll works
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Force scroll if still not at top
        if (window.pageYOffset > 0 || document.documentElement.scrollTop > 0) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
          });
        }
      });
    };

    // Delay để đảm bảo route đã thay đổi hoàn toàn
    const timer = setTimeout(scrollToTop, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
