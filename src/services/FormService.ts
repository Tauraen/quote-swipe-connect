
import { supabase } from "@/integrations/supabase/client";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  profileResult?: string;
}

export const saveContactFormData = async (formData: ContactFormData) => {
  try {
    console.log("Attempting to save form data to Supabase:", formData);
    
    // Store in sessionStorage for local usage
    sessionStorage.setItem('userFormData', JSON.stringify(formData));
    sessionStorage.setItem('userEmail', formData.email);
    
    // Save to Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([formData])
      .select();
    
    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }
    
    console.log("Form data saved to Supabase successfully:", data);
    return { success: true, data: formData };
    
  } catch (error) {
    console.error("Error saving form data:", error);
    return { success: false, error };
  }
};

export const updateFormDataWithResult = async (email: string, profileResult: string) => {
  try {
    // Get stored form data from sessionStorage
    const storedData = sessionStorage.getItem('userFormData');
    if (!storedData) {
      return { success: false, error: "No submission found for this email" };
    }
    
    // Update the stored data
    const formData = JSON.parse(storedData);
    formData.profileResult = profileResult;
    sessionStorage.setItem('userFormData', JSON.stringify(formData));
    
    // Update in Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .update({ profileResult })
      .eq('email', email)
      .select();
    
    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }
    
    console.log("Form data updated with result in Supabase:", data);
    return { success: true, data: formData };
    
  } catch (error) {
    console.error("Error updating form data with result:", error);
    return { success: false, error };
  }
};
