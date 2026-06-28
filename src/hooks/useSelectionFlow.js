import { useState } from "react";

export function useSelectionFlow() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [characterConfirmed, setCharacterConfirmed] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const reset = () => {
    setSelectedCharacter(null);
    setSelectedPet(null);
    setCharacterConfirmed(false);
    setShowSummary(false);
    setShowHistory(false);
  };

  return {
    selectedCharacter,
    setSelectedCharacter,
    selectedPet,
    setSelectedPet,
    characterConfirmed,
    setCharacterConfirmed,
    showSummary,
    setShowSummary,
    showHistory,
    setShowHistory,
    reset,
  };
}
