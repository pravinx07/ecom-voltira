import { createContext, useContext, useEffect, useState } from "react";

const RecentlyViewedContext = createContext();
export const useRecentlyViewed = () => useContext(RecentlyViewedContext);

export const RecentlyViewedProvider = ({ children }) => {
  const [recent, setRecent] = useState(() => {
    const saved = localStorage.getItem("recentlyViewed");
    return saved ? JSON.parse(saved) : [];
  });

  // save to localStorage on change
  useEffect(() => {
    localStorage.setItem("recentlyViewed", JSON.stringify(recent));
  }, [recent]);

  const addViewed = (product) => {
    if (!product || !product.id) return;

    setRecent((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered];

      return updated.slice(0, 10); // limit to 10 items
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recent, addViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};
