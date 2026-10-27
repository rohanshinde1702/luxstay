import { createContext, useState, useEffect, useCallback } from "react";
import { useToast } from "../hooks/useToast";

export const FavoritesContext = createContext(null);

const STORAGE_KEY = "luxstay_favorites";

export function FavoritesProvider({ children }) {
  const { addToast } = useToast();
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites", e);
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id) => {
      return favorites.some((item) => item.id === id);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (item, type = "room") => {
      if (!item || !item.id) return;

      const itemName = item.name || item.title || "Sanctuary";
      const alreadySaved = favorites.some((f) => f.id === item.id);

      setFavorites((prev) => {
        const exists = prev.some((f) => f.id === item.id);
        if (exists) {
          return prev.filter((f) => f.id !== item.id);
        } else {
          return [
            ...prev,
            {
              id: item.id,
              slug: item.slug || item.id,
              name: itemName,
              type: item.type || type,
              image: item.image,
              price: item.price || item.startingPrice,
              rating: item.rating,
              location: item.location || item.country || item.destination,
              savedAt: new Date().toISOString(),
            },
          ];
        }
      });

      if (alreadySaved) {
        addToast({
          title: "Removed from Wishlist",
          message: `"${itemName}" removed from your saved collection.`,
          type: "info",
        });
      } else {
        addToast({
          title: "Saved to Wishlist",
          message: `"${itemName}" added to your saved sanctuaries.`,
          type: "success",
        });
      }
    },
    [favorites, addToast]
  );

  const removeFavorite = useCallback(
    (id) => {
      const itemToRemove = favorites.find((f) => f.id === id);
      const itemName = itemToRemove ? (itemToRemove.name || itemToRemove.title) : "Sanctuary";
      setFavorites((prev) => prev.filter((f) => f.id !== id));
      addToast({
        title: "Removed from Wishlist",
        message: `"${itemName}" removed from saved collection.`,
        type: "info",
      });
    },
    [favorites, addToast]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    addToast({
      title: "Wishlist Cleared",
      message: "All saved sanctuaries have been removed.",
      type: "info",
    });
  }, [addToast]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
        favoritesCount: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
