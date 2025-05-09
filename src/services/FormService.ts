
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
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          company_name: formData.companyName,
          profile_result: formData.profileResult || null
        }
      ]);
      
    if (error) {
      throw error;
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Error saving form data:", error);
    return { success: false, error };
  }
};

export const updateFormDataWithResult = async (email: string, profileResult: string) => {
  try {
    // Find the latest submission for this email
    const { data: submissions } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (!submissions || submissions.length === 0) {
      return { success: false, error: "No submission found for this email" };
    }

    // Update the submission with the profile result
    const { data, error } = await supabase
      .from('contact_submissions')
      .update({ profile_result: profileResult })
      .eq('id', submissions[0].id);
      
    if (error) {
      throw error;
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Error updating form data with result:", error);
    return { success: false, error };
  }
};
