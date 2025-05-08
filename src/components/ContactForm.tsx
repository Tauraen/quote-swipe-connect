
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
}

const ContactForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Voornaam is verplicht";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Achternaam is verplicht";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "E-mailadres is verplicht";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ongeldig e-mailadres";
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Telefoonnummer is verplicht";
    }
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Bedrijfsnaam is verplicht";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate email sending with a delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real application, you would send the form data to a server
      console.log("Form data to be sent:", formData);
      
      // Simulate successful submission
      toast({
        title: "Formulier Verzonden!",
        description: "U wordt doorgestuurd naar de volgende stap.",
      });
      
      // Redirect to quotes page after successful submission
      setTimeout(() => {
        navigate("/quotes");
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Verzending Mislukt",
        description: "Probeer het later opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg animate-slide-in">
      <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-gradient-start to-blue-gradient-end bg-clip-text text-transparent">
        Contactgegevens
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Voornaam</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Vul uw voornaam in"
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Achternaam</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Vul uw achternaam in"
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mailadres</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Vul uw e-mailadres in"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Telefoonnummer</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Vul uw telefoonnummer in"
            className={errors.phoneNumber ? "border-red-500" : ""}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">Bedrijfsnaam</Label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Vul uw bedrijfsnaam in"
            className={errors.companyName ? "border-red-500" : ""}
          />
          {errors.companyName && (
            <p className="text-sm text-red-500">{errors.companyName}</p>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-gradient-start to-blue-gradient-end hover:opacity-90 transition-opacity"
        >
          {isSubmitting ? "Bezig met verzenden..." : "Doorgaan"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
