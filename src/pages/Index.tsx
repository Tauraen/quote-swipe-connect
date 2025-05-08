
import React from "react";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-gradient-start to-blue-gradient-end bg-clip-text text-transparent">
          Welkom bij Quote Swipe
        </h1>
        <p className="text-center mb-8 text-gray-600">
          Vul het contactformulier in om door te gaan
        </p>
        
        <ContactForm />
      </div>
    </div>
  );
};

export default Index;
