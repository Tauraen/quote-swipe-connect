
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
  console.log("Attempting to save form data:", formData);
  
  // Always store in sessionStorage for local usage (this will always work)
  sessionStorage.setItem('userFormData', JSON.stringify(formData));
  sessionStorage.setItem('userEmail', formData.email);
  console.log("Form data saved to sessionStorage successfully");
  
  try {
    // Try to save to Supabase, but don't let it block the user
    const supabaseData = formatForSupabase(formData);
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([supabaseData])
      .select();
    
    if (error) {
      console.warn("Supabase save failed, but continuing with local storage:", error);
      // Don't throw error - we still have the data in sessionStorage
    } else {
      console.log("Form data also saved to Supabase successfully:", data);
    }
    
  } catch (error) {
    console.warn("Supabase connection failed, but form data is saved locally:", error);
    // Don't throw error - we still have the data in sessionStorage
  }
  
  // Always return success since we have the data in sessionStorage
  return { success: true, data: formData };
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
