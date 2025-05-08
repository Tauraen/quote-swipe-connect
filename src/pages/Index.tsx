
import React from "react";
import ContactForm from "@/components/ContactForm";
import { Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-red-50 to-pink-50">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="rounded-full bg-red-action p-3 mb-4">
            <Heart className="text-white h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-red-gradient-start to-red-gradient-end bg-clip-text text-transparent">
            All you need is BI
          </h1>
          <p className="text-center mb-2 text-gray-600">
            Vul het contactformulier in om door te gaan
          </p>
        </div>
        
        <ContactForm />
      </div>
    </div>
  );
};

export default Index;
