
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckIcon, XIcon, Star, Heart, Zap } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar } from "@/components/ui/avatar";

interface QuoteCardProps {
  quote: {
    id: number;
    text: string;
  };
  onSwipe: (direction: "left" | "right") => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onSwipe }) => {
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Generate a fake name for the profile
  const names = ["Riley", "Jamie", "Alex", "Taylor", "Jordan", "Casey"];
  const randomName = names[quote.id % names.length];
  const randomAge = 23 + (quote.id % 10);
  const randomDistance = 1 + (quote.id % 5);

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
        {/* Profile Image */}
        <AspectRatio ratio={3/4} className="bg-muted">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
          <img 
            src={`https://picsum.photos/seed/${quote.id}/500/700`} 
            alt="Profile" 
            className="object-cover w-full h-full"
          />
          
          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold">{randomName}, {randomAge}</h3>
              <div className="bg-white/20 backdrop-blur-md rounded-full p-1">
                <Avatar className="h-5 w-5">
                  <img src="/lovable-uploads/f51f019d-4117-4be7-85e2-e57ec4bb6d39.png" alt="" />
                </Avatar>
              </div>
            </div>
            <div className="text-sm opacity-90 mt-1">Works at All you need is BI</div>
            <div className="text-sm opacity-90">{randomDistance} km away</div>
            
            <div className="mt-2 text-sm line-clamp-2 opacity-85">
              {quote.text}
            </div>
          </div>
        </AspectRatio>
      </Card>

      {/* Swipe buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => handleSwipeLeft()}
          className="p-3 rounded-full bg-white text-red-action shadow-lg border border-gray-200 hover:scale-110 transition-transform"
          aria-label="Dislike"
        >
          <XIcon size={28} />
        </button>
        
        <button
          className="p-3 rounded-full bg-white text-blue-500 shadow-lg border border-gray-200 hover:scale-110 transition-transform"
          aria-label="Super Like"
        >
          <Star size={28} className="text-blue-500" />
        </button>
        
        <button
          onClick={() => handleSwipeRight()}
          className="p-3 rounded-full bg-white text-green-action shadow-lg border border-gray-200 hover:scale-110 transition-transform"
          aria-label="Like"
        >
          <Heart size={28} className="text-red-action animate-heart-beat" />
        </button>
        
        <button
          className="p-3 rounded-full bg-white text-purple-500 shadow-lg border border-gray-200 hover:scale-110 transition-transform"
          aria-label="Boost"
        >
          <Zap size={28} className="text-purple-500" />
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
