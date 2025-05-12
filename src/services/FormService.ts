
import { supabase } from "@/integrations/supabase/client";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  profileResult?: string;
}

// Convert camelCase to snake_case for Supabase database compatibility
const formatForSupabase = (data: ContactFormData) => {
  return {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone_number: data.phoneNumber,
    company_name: data.companyName
    // Note: profile_result is not included as it's not in the database schema
  };
};

// Convert snake_case back to camelCase for frontend
const formatFromSupabase = (data: any): ContactFormData => {
  return {
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    phoneNumber: data.phone_number,
    companyName: data.company_name,
    // We're not mapping profile_result since it's not in the database
  };
};

export const saveContactFormData = async (formData: ContactFormData) => {
  try {
    console.log("Attempting to save form data to Supabase:", formData);
    
    // Store in sessionStorage for local usage
    sessionStorage.setItem('userFormData', JSON.stringify(formData));
    sessionStorage.setItem('userEmail', formData.email);
    
    // Convert to snake_case for Supabase
    const supabaseData = formatForSupabase(formData);
    
    // Save to Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([supabaseData])
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
    
    // Update the stored data with the profile result
    const formData = JSON.parse(storedData);
    formData.profileResult = profileResult;
    
    // Save updated data to sessionStorage only
    sessionStorage.setItem('userFormData', JSON.stringify(formData));
    console.log("Form data updated with profile result in sessionStorage:", formData);
    
    return { success: true, data: formData };
    
  } catch (error) {
    console.error("Error updating form data with result:", error);
    return { success: false, error };
  }
};
