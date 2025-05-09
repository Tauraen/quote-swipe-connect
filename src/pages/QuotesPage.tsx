
import React, { useState, useEffect } from "react";
import QuoteCard from "@/components/QuoteCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { dilemmas } from "@/data/dilemmaData";

type ProfileScore = {
  "Excel-ex": number;
  "Dashboard Dater": number;
  "BI-hunter": number;
};

const QuotesPage = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [responses, setResponses] = useState<{[key: number]: boolean}>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [profileScores, setProfileScores] = useState<ProfileScore>({
    "Excel-ex": 0,
    "Dashboard Dater": 0,
    "BI-hunter": 0
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if all dilemmas are completed
  useEffect(() => {
    if (currentQuoteIndex >= dilemmas.length && !isCompleted) {
      setIsCompleted(true);
      toast({
        title: "Alle profielen bekeken!",
        description: "Je hebt alle profielen beantwoord.",
      });
    }
  }, [currentQuoteIndex, isCompleted, toast]);

  const handleSwipe = (direction: "left" | "right") => {
    // Record response (right = relates, left = doesn't relate)
    const relatesTo = direction === "right";
    const currentDilemma = dilemmas[currentQuoteIndex];
    
    setResponses(prev => ({
      ...prev,
      [currentDilemma.id]: relatesTo
    }));
    
    // Update profile scores based on response
    if (direction === "right") {
      // If swiped right (like), increment score for the matching profile
      setProfileScores(prev => ({
        ...prev,
        [currentDilemma.likeProfile]: prev[currentDilemma.likeProfile as keyof ProfileScore] + 1
      }));
      
      setShowMatch(true);
      
      // Hide match animation after 2 seconds and proceed to next dilemma
      setTimeout(() => {
        setShowMatch(false);
        moveToNextQuote();
      }, 2000);
    } else {
      // If swiped left (dislike), increment scores for dislike profiles
      const updatedScores = {...profileScores};
      currentDilemma.dislikeProfiles.forEach(profile => {
        updatedScores[profile] += 0.5; // Half point for disliking options that match these profiles
      });
      setProfileScores(updatedScores);
      
      // Immediately move to next dilemma
      moveToNextQuote();
    }
  };

  const moveToNextQuote = () => {
    if (currentQuoteIndex < dilemmas.length - 1) {
      setCurrentQuoteIndex(currentQuoteIndex + 1);
    } else {
      // Finished all dilemmas
      setIsCompleted(true);
    }
  };

  const handleShowResults = () => {
    // Calculate which profile has the highest score
    const scores = Object.entries(profileScores);
    scores.sort((a, b) => b[1] - a[1]); // Sort by score in descending order
    const topProfile = scores[0][0];
    
    // Navigate to results page with the top profile
    navigate(`/results/${topProfile}`);
  };

  const handleStartOver = () => {
    setCurrentQuoteIndex(0);
    setResponses({});
    setIsCompleted(false);
    setProfileScores({
      "Excel-ex": 0,
      "Dashboard Dater": 0,
      "BI-hunter": 0
    });
  };

  const handleBackToForm = () => {
    navigate("/");
  };

  const currentDilemma = dilemmas[currentQuoteIndex];
  
  // Function to get BI profile names based on ID
  const getProfileName = (id: number): string => {
    switch (id) {
      case 1: return "Fiona Forecast";
      case 2: return "Emma Excel";
      case 3: return "Boris BI";
      case 4: return "Vera Visual";
      case 5: return "Pieter Puzzel";
      case 6: return "Json Derulo";
      case 7: return "Tamara Timeline";
      default: return `Profiel ${id}`;
    }
  };

  return (
    <div className="min-h-screen py-4 px-4 bg-gradient-to-br from-red-50 to-pink-50">
      <div className="container max-w-md mx-auto">
        {/* Back button */}
        <Button 
          variant="outline" 
          className="mb-4" 
          onClick={handleBackToForm}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Terug
        </Button>

        {/* Page header with app logo */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <Heart className="h-6 w-6 text-red-action animate-heart-beat" />
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-red-gradient-start to-red-gradient-end bg-clip-text text-transparent">
            All you need is BI
          </h1>
        </div>

        {!isCompleted ? (
          <div className="animate-slide-in">
            <div className="mb-4 text-center text-sm font-medium text-gray-500">
              {getProfileName(currentQuoteIndex + 1)} - {currentQuoteIndex + 1}/{dilemmas.length}
            </div>
            
            <QuoteCard 
              quote={currentDilemma} 
              onSwipe={handleSwipe} 
            />
            
            <div className="text-center mt-4 text-sm text-gray-500">
              <span className="font-medium">Hint:</span> Swipe rechts als de stelling bij je past, links als niet
            </div>
          </div>
        ) : (
          <div className="space-y-6 p-6 bg-white rounded-lg shadow-md animate-slide-in">
            <h2 className="text-xl font-semibold text-center">It's a Match!</h2>
            <p className="text-center text-gray-600">We hebben de perfecte match voor jou gevonden!</p>
            <div className="flex flex-col space-y-3">
              <Button 
                onClick={handleShowResults}
                className="w-full bg-gradient-to-r from-red-gradient-start to-red-gradient-end hover:opacity-90 transition-opacity"
              >
                Bekijk Resultaat
              </Button>
              <Button 
                variant="outline" 
                onClick={handleStartOver}
                className="w-full"
              >
                Begin Opnieuw
              </Button>
            </div>
          </div>
        )}

        {/* Match Animation Overlay */}
        {showMatch && (
          <div className="fixed inset-0 bg-gradient-to-r from-red-gradient-start to-red-gradient-end bg-opacity-90 flex items-center justify-center z-50 animate-fade-in">
            <div className="text-center">
              <Heart className="h-20 w-20 text-white mx-auto mb-4 animate-heart-beat" />
              <div className="text-4xl font-bold text-white mb-2">It's a Match!</div>
              <div className="text-xl text-white">{currentDilemma.text}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesPage;
