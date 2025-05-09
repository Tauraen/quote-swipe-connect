
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  profileResult?: string;
}

// Mock implementation without Supabase
export const saveContactFormData = async (formData: ContactFormData) => {
  try {
    // Simulate a network request
    console.log("Form data would be saved:", formData);
    
    // Store the data in sessionStorage for local usage
    sessionStorage.setItem('userFormData', JSON.stringify(formData));
    sessionStorage.setItem('userEmail', formData.email);
    
    return { success: true, data: formData };
  } catch (error) {
    console.error("Error saving form data:", error);
    return { success: false, error };
  }
};

// Mock implementation without Supabase
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
    
    console.log("Updated form data with result:", profileResult);
    return { success: true, data: formData };
  } catch (error) {
    console.error("Error updating form data with result:", error);
    return { success: false, error };
  }
};
