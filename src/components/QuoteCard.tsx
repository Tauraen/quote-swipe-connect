
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckIcon, XIcon, Heart } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar } from "@/components/ui/avatar";
import { Dilemma } from "@/data/dilemmaData";

interface QuoteCardProps {
  quote: Dilemma;
  onSwipe: (direction: "left" | "right") => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onSwipe }) => {
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Touch and mouse event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setOffsetX(currentX - startX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    setOffsetX(currentX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    completeSwipe();
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    completeSwipe();
  };

  const completeSwipe = () => {
    setIsDragging(false);
    
    // Determine swipe direction based on offset distance
    if (Math.abs(offsetX) > 100) {
      const direction = offsetX > 0 ? "right" : "left";
      setSwipeDirection(direction);
      
      // Trigger parent callback after animation completes
      setTimeout(() => {
        onSwipe(direction);
        setSwipeDirection(null);
        setOffsetX(0);
      }, 300);
    } else {
      // Reset if not swiped far enough
      setOffsetX(0);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setOffsetX(0);
    }
  };

  const handleSwipeRight = () => {
    setSwipeDirection("right");
    setTimeout(() => {
      onSwipe("right");
      setSwipeDirection(null);
    }, 300);
  };

  const handleSwipeLeft = () => {
    setSwipeDirection("left");
    setTimeout(() => {
      onSwipe("left");
      setSwipeDirection(null);
    }, 300);
  };

  // Funny BI profile names based on ID
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
    <div className="relative w-full max-w-md mx-auto">
      <Card
        className={cn(
          "overflow-hidden shadow-xl cursor-grab active:cursor-grabbing transition-transform",
          swipeDirection === "right" && "animate-card-swipe-right",
          swipeDirection === "left" && "animate-card-swipe-left"
        )}
        style={{
          transform: isDragging ? `translateX(${offsetX}px) rotate(${offsetX * 0.05}deg)` : undefined,
          opacity: isDragging ? 1 - Math.min(Math.abs(offsetX) / 500, 0.5) : 1,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dilemma Content */}
        <AspectRatio ratio={3/4} className="bg-muted">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
          <img 
            src={`https://picsum.photos/seed/${quote.id + 100}/500/700`} 
            alt="Dilemma Background" 
            className="object-cover w-full h-full"
          />
          
          {/* Dilemma Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white/20 backdrop-blur-md rounded-full p-1">
                <Avatar className="h-8 w-8">
                  <img src="/lovable-uploads/f51f019d-4117-4be7-85e2-e57ec4bb6d39.png" alt="" />
                </Avatar>
              </div>
              <h3 className="text-xl font-bold">{getProfileName(quote.id)}</h3>
            </div>
            
            <div className="mt-3 text-lg font-medium">
              "{quote.text}"
            </div>
          </div>
        </AspectRatio>
      </Card>

      {/* Swipe buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => handleSwipeLeft()}
          className="p-3 rounded-full bg-white text-red-action shadow-lg border border-gray-200 hover:scale-110 transition-transform"
          aria-label="Nee"
        >
          <XIcon size={28} />
        </button>
        
        <button
          onClick={() => handleSwipeRight()}
          className="p-3 rounded-full bg-white text-green-action shadow-lg border border-gray-200 hover:scale-110 transition-transform"
          aria-label="Ja"
        >
          <Heart size={28} className="text-red-action animate-heart-beat" />
        </button>
      </div>

      {/* Swipe indicators (visible when dragging) */}
      {isDragging && offsetX !== 0 && (
        <div 
          className={cn(
            "absolute top-1/3 -translate-y-1/2 rounded-full p-3 z-20",
            offsetX > 0 ? "right-4 bg-green-action" : "left-4 bg-red-action",
            "transition-opacity"
          )}
          style={{ opacity: Math.min(Math.abs(offsetX) / 100, 1) }}
        >
          {offsetX > 0 ? <Heart size={24} color="white" /> : <XIcon size={24} color="white" />}
        </div>
      )}
    </div>
  );
};

export default QuoteCard;
