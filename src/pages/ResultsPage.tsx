
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { profiles } from "@/data/dilemmaData";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateFormDataWithResult } from "@/services/FormService";

const ResultsPage = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState(profiles.find(p => p.id === profileId));
  
  useEffect(() => {
    // If invalid profile ID, redirect to quotes
    if (!profile) {
      navigate('/quotes');
      toast({
        title: "Profiel niet gevonden",
        description: "We konden het opgegeven profiel niet vinden.",
        variant: "destructive"
      });
      return;
    }

    // Try to get the email from sessionStorage (which would be set in QuotesPage when clicking on Bekijk Resultaat)
    const email = sessionStorage.getItem('userEmail');
    if (email && profile) {
      // Store the profile result with the form submission
      updateFormDataWithResult(email, profile.title)
        .catch(err => console.error("Failed to update profile result:", err));
    }
  }, [profile, navigate, toast]);

  const handleBack = () => {
    navigate('/quotes');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Mijn BI Profiel: ${profile?.title}`,
          text: `Volgens de BI-match test ben ik ${profile?.title}! ${profile?.description}`,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Share failed", error));
    } else {
      // Fallback for browsers that don't support navigator.share
      toast({
        title: "Delen niet ondersteund",
        description: "Je browser ondersteunt delen niet. Kopieer de URL om handmatig te delen.",
      });
    }
  };

  if (!profile) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen py-4 px-4 bg-gradient-to-br from-red-50 to-pink-50">
      <div className="container max-w-md mx-auto">
        {/* Back button */}
        <Button 
          variant="outline" 
          className="mb-4" 
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Terug
        </Button>

        {/* Page header with app logo */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <Heart className="h-6 w-6 text-red-action animate-heart-beat" />
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-red-gradient-start to-red-gradient-end bg-clip-text text-transparent">
            Jouw BI Profiel
          </h1>
        </div>

        <Card className="p-6 shadow-lg animate-slide-in mb-6">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-gradient-to-r from-red-gradient-start to-red-gradient-end p-6">
              <Heart className="h-10 w-10 text-white animate-heart-beat" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-red-gradient-start to-red-gradient-end bg-clip-text text-transparent">
            {profile.title}
          </h2>

          <p className="text-gray-700 mb-6 text-center">
            {profile.description}
          </p>

          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <h3 className="font-semibold mb-2">👉 Tip van ons:</h3>
            <p className="italic text-gray-700">{profile.tip}</p>
          </div>

          <Button
            onClick={handleShare}
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
          >
            <Share2 size={16} />
            Deel Mijn Profiel
          </Button>
        </Card>

        <div className="text-center">
          <Button 
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-red-gradient-start to-red-gradient-end hover:opacity-90 transition-opacity"
          >
            Terug naar Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
