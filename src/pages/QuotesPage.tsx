
import React, { useState } from "react";
import QuoteCard from "@/components/QuoteCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";

// Sample quotes data - in a real app you might fetch this from an API
const quotesData = [
  { id: 1, text: "Ik ben op zoek naar een BI-tool die onze data echt begrijpelijk maakt." },
  { id: 2, text: "Data visualisatie is belangrijk voor mijn team, we willen graag duidelijke dashboards." },
  { id: 3, text: "Ik zoek een systeem dat makkelijk kan integreren met onze huidige software." },
  { id: 4, text: "Realtime rapportages zijn essentieel voor onze business beslissingen." },
  { id: 5, text: "We zoeken een BI-oplossing die schaalbaar is en met ons mee kan groeien." },
  { id: 6, text: "Security van onze data is een topprioriteit bij het kiezen van een BI-tool." },
  { id: 7, text: "We willen voorspellende analyses kunnen maken op basis van onze historische data." },
  { id: 8, text: "Een gebruiksvriendelijke interface is belangrijk, niet iedereen in ons team is technisch." },
  { id: 9, text: "We willen onze KPI's beter kunnen monitoren met een BI-dashboard." },
  { id: 10, text: "Een mobiele app voor onderweg toegang tot onze data zou ideaal zijn." },
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
        title: "Alle profielen bekeken!",
        description: "Je hebt alle mogelijke matches bekeken.",
      });
    }
  };

  const handleFinish = () => {
    // In a real application, you'd send the responses to a server
    console.log("User responses:", responses);
    
    toast({
      title: "Voorkeuren opgeslagen!",
      description: "We nemen binnenkort contact met je op.",
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
              Profiel {currentQuoteIndex + 1} / {quotes.length}
            </div>
            
            <QuoteCard 
              quote={currentQuote} 
              onSwipe={handleSwipe} 
            />
            
            <div className="text-center mt-4 text-sm text-gray-500">
              <span className="font-medium">Hint:</span> Swipe rechts als je geïnteresseerd bent, links als je niet geïnteresseerd bent
            </div>
          </div>
        ) : (
          <div className="space-y-6 p-6 bg-white rounded-lg shadow-md animate-slide-in">
            <h2 className="text-xl font-semibold text-center">Geen profielen meer!</h2>
            <p className="text-center text-gray-600">Je hebt alle beschikbare profielen bekeken.</p>
            <div className="flex flex-col space-y-3">
              <Button 
                onClick={handleFinish}
                className="w-full bg-gradient-to-r from-red-gradient-start to-red-gradient-end hover:opacity-90 transition-opacity"
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
          <div className="fixed inset-0 bg-gradient-to-r from-red-gradient-start to-red-gradient-end bg-opacity-90 flex items-center justify-center z-50 animate-fade-in">
            <div className="text-center">
              <Heart className="h-20 w-20 text-white mx-auto mb-4 animate-heart-beat" />
              <div className="text-4xl font-bold text-white mb-2">It's a Match!</div>
              <div className="text-xl text-white">Dit profiel past perfect bij jou!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesPage;
