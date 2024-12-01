'use client'
// context/GenreContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type GenreContextType = {
  selectedGenres: number[];
  toggleGenre: (genreId: number) => void;
  resetGenres: () => void;
};

const GenreContext = createContext<GenreContextType | undefined>(undefined);

export const GenreProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId) // Remove genre if already selected
        : [...prev, genreId] // Add genre if not selected
    );   
  };

  
  const resetGenres = () => {
    setSelectedGenres([])
  }

  

  return (
    <GenreContext.Provider value={{ selectedGenres, toggleGenre, resetGenres }}>
      {children}
    </GenreContext.Provider>
  );
};

export const useGenreContext = () => {
  const context = useContext(GenreContext);
  if (!context) {
    throw new Error("useGenreContext must be used within a GenreProvider");
  }
  return context;
};
