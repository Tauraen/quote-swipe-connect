
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
  };
};

export const saveContactFormData = async (formData: ContactFormData) => {
  console.log("Attempting to save form data:", formData);
  
  // Always store in sessionStorage for local usage (this will always work)
  sessionStorage.setItem('userFormData', JSON.stringify(formData));
  sessionStorage.setItem('userEmail', formData.email);
  console.log("Form data saved to sessionStorage successfully");
  
  try {
    // Try to save to Supabase
    const supabaseData = formatForSupabase(formData);
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([supabaseData])
      .select();
    
    if (error) {
      console.warn("Supabase save failed, but continuing with local storage:", error);
    } else {
      console.log("Form data also saved to Supabase successfully:", data);
      // Store the submission ID for later use when updating results
      if (data && data[0]) {
        sessionStorage.setItem('submissionId', data[0].id);
      }
    }
    
  } catch (error) {
    console.warn("Supabase connection failed, but form data is saved locally:", error);
  }
  
  return { success: true, data: formData };
};

export const updateFormDataWithResult = async (email: string, profileResult: string) => {
  try {
    // Update sessionStorage
    const storedData = sessionStorage.getItem('userFormData');
    if (storedData) {
      const formData = JSON.parse(storedData);
      formData.profileResult = profileResult;
      sessionStorage.setItem('userFormData', JSON.stringify(formData));
    }
    
    // Try to update in Supabase database using the results column
    const submissionId = sessionStorage.getItem('submissionId');
    if (submissionId) {
      const { data, error } = await supabase
        .from('contact_submissions')
        .update({ Results: profileResult })
        .eq('id', submissionId)
        .select();
      
      if (error) {
        console.warn("Failed to update results in Supabase:", error);
      } else {
        console.log("Results updated in Supabase successfully:", data);
      }
    } else {
      // Fallback: try to find the submission by email and update
      const { data, error } = await supabase
        .from('contact_submissions')
        .update({ Results: profileResult })
        .eq('email', email)
        .select();
      
      if (error) {
        console.warn("Failed to update results in Supabase using email:", error);
      } else {
        console.log("Results updated in Supabase using email:", data);
      }
    }
    
    return { success: true, data: { profileResult } };
    
  } catch (error) {
    console.error("Error updating form data with result:", error);
    return { success: false, error };
  }
};
