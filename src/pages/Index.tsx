
import React from "react";
import ContactForm from "@/components/ContactForm";
import { Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-red-50 to-pink-50 relative">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="rounded-full bg-red-action p-3 mb-4">
            <Heart className="text-white h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-red-gradient-start to-red-gradient-end bg-clip-text text-transparent">
            All you need is LoBi
          </h1>
          <p className="text-center mb-2 text-gray-600">
            Inzicht waar je van gaat houden
          </p>
        </div>
        
        <ContactForm />
      </div>
      
      {/* Subtiel VOXTUR logo in de rechteronderhoek */}
      <div className="fixed bottom-4 right-4 opacity-50 hover:opacity-100 transition-opacity">
        <img 
          src="/lovable-uploads/dc1fc023-6eeb-48af-a73c-9808e5faf7c9.png" 
          alt="VOXTUR" 
          className="h-8 w-auto"
        />
      </div>
    </div>
  );
};

export default Index;
