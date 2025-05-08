
import React, { useState, useEffect } from "react";
import QuoteCard from "@/components/QuoteCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Sample quotes data - in a real app you might fetch this from an API
const quotesData = [
  { id: 1, text: "I enjoy spending time by myself more than with others." },
  { id: 2, text: "I often find myself thinking about the future rather than the present." },
  { id: 3, text: "I prefer to plan activities in detail rather than being spontaneous." },
  { id: 4, text: "I feel energized after spending time with a large group of people." },
  { id: 5, text: "I tend to follow my heart more than my head when making decisions." },
  { id: 6, text: "I enjoy theoretical discussions more than practical applications." },
  { id: 7, text: "I find it easy to empathize with people's emotions." },
  { id: 8, text: "I prefer having a stable routine rather than frequent changes." },
  { id: 9, text: "I tend to think out loud rather than reflecting internally first." },
  { id: 10, text: "I consider myself more of a realist than an idealist." },
];

const QuotesPage = () => {
  const [quotes, setQuotes] = useState(quotesData);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [responses, setResponses] = useState<{[key: number]: boolean}>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSwipe = (direction: "left" | "right") => {
    // Record response (right = relates, left = doesn't relate)
    const relatesTo = direction === "right";
    setResponses(prev => ({
      ...prev,
      [quotes[currentQuoteIndex].id]: relatesTo
    }));

    // If swiped right, show match animation
    if (direction === "right") {
      setShowMatch(true);
      
      // Hide match animation after 2 seconds and proceed to next quote
      setTimeout(() => {
        setShowMatch(false);
        moveToNextQuote();
      }, 2000);
    } else {
      // If swiped left, immediately move to next quote
      moveToNextQuote();
    }
  };

  const moveToNextQuote = () => {
    if (currentQuoteIndex < quotes.length - 1) {
      setCurrentQuoteIndex(currentQuoteIndex + 1);
    } else {
      // Finished all quotes
      setIsCompleted(true);
      toast({
        title: "Alle quotes voltooid!",
        description: "Bedankt voor je reacties.",
      });
    }
  };

  const handleFinish = () => {
    // In a real application, you'd send the responses to a server
    console.log("User responses:", responses);
    
    toast({
      title: "Reacties verzonden!",
      description: "Bedankt voor je deelname.",
    });
    
    // Redirect to home or thank you page
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const handleStartOver = () => {
    setCurrentQuoteIndex(0);
    setResponses({});
    setIsCompleted(false);
  };

  const handleBackToForm = () => {
    navigate("/");
  };

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container max-w-md mx-auto">
        {/* Back button */}
        <Button 
          variant="outline" 
          className="mb-4" 
          onClick={handleBackToForm}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Terug naar formulier
        </Button>

        <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-gradient-start to-blue-gradient-end bg-clip-text text-transparent">
          Herken jij je in deze situaties?
        </h1>
        <p className="text-center mb-8 text-gray-600">
          Swipe rechts als je je herkent, links als je je niet herkent
        </p>

        {!isCompleted ? (
          <div className="animate-slide-in">
            <div className="mb-4 text-center text-sm font-medium text-gray-500">
              {currentQuoteIndex + 1} / {quotes.length}
            </div>
            
            <QuoteCard 
              quote={currentQuote} 
              onSwipe={handleSwipe} 
            />
            
            <div className="text-center mt-4 text-sm text-gray-500">
              <span className="font-medium">Hint:</span> Je kunt ook op de knoppen hieronder klikken of de kaart slepen
            </div>
          </div>
        ) : (
          <div className="space-y-6 p-6 bg-white rounded-lg shadow-md animate-slide-in">
            <h2 className="text-xl font-semibold text-center">Bedankt voor je reacties!</h2>
            <div className="flex flex-col space-y-3">
              <Button 
                onClick={handleFinish}
                className="w-full bg-gradient-to-r from-blue-gradient-start to-blue-gradient-end hover:opacity-90 transition-opacity"
              >
                Voltooien
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
          <div className="fixed inset-0 bg-green-500 bg-opacity-80 flex items-center justify-center z-50 animate-fade-in">
            <div className="text-center">
              <div className="text-6xl font-bold text-white mb-4">Match!</div>
              <div className="text-2xl text-white">Geweldig!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesPage;
