import { useEffect } from "react";

interface Props {
  target: React.RefObject<HTMLDivElement | HTMLSpanElement> | null;
  onIntersect: ([entry]: IntersectionObserverEntry[]) => void;
  rootMargin?: string;
  threshold?: number;
}

const useObserver = ({
  target,
  onIntersect,
  rootMargin = "0px",
  threshold = 1.5,
}: Props) => {
  useEffect(() => {
    let observer: IntersectionObserver;

    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root: null,
        rootMargin,
      });
      observer.observe(target.current);
    }

    return () => observer && observer.disconnect();
  }, [target, rootMargin, threshold]);
};

export default useObserver;
