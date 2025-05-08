
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckIcon, XIcon } from "lucide-react";

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
          "p-6 shadow-lg cursor-grab active:cursor-grabbing transition-transform",
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
        <div className="min-h-[200px] flex items-center justify-center">
          <p className="text-xl text-center">{quote.text}</p>
        </div>
      </Card>

      {/* Swipe buttons */}
      <div className="flex justify-center mt-6 space-x-6">
        <button
          onClick={handleSwipeLeft}
          className="p-4 rounded-full bg-red-action text-white hover:opacity-90 transition-opacity"
          aria-label="Swipe left"
        >
          <XIcon size={24} />
        </button>
        <button
          onClick={handleSwipeRight}
          className="p-4 rounded-full bg-green-action text-white hover:opacity-90 transition-opacity"
          aria-label="Swipe right"
        >
          <CheckIcon size={24} />
        </button>
      </div>

      {/* Swipe indicators (visible when dragging) */}
      {isDragging && offsetX !== 0 && (
        <div 
          className={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-full p-3",
            offsetX > 0 ? "right-4 bg-green-action" : "left-4 bg-red-action",
            "transition-opacity"
          )}
          style={{ opacity: Math.min(Math.abs(offsetX) / 100, 1) }}
        >
          {offsetX > 0 ? <CheckIcon size={24} color="white" /> : <XIcon size={24} color="white" />}
        </div>
      )}
    </div>
  );
};

export default QuoteCard;
