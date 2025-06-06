
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  profileResult?: string;
}

export const saveContactFormData = async (formData: ContactFormData) => {
  console.log("Saving form data locally:", formData);
  
  // Store in sessionStorage for local usage
  sessionStorage.setItem('userFormData', JSON.stringify(formData));
  sessionStorage.setItem('userEmail', formData.email);
  console.log("Form data saved to sessionStorage successfully");
  
  return { success: true, data: formData };
};

export const updateFormDataWithResult = async (email: string, profileResult: string) => {
  try {
    // Update sessionStorage only
    const storedData = sessionStorage.getItem('userFormData');
    if (storedData) {
      const formData = JSON.parse(storedData);
      formData.profileResult = profileResult;
      sessionStorage.setItem('userFormData', JSON.stringify(formData));
      console.log("Profile result updated in sessionStorage");
    }
    
    return { success: true, data: { profileResult } };
    
  } catch (error) {
    console.error("Error updating form data with result:", error);
    return { success: false, error };
  }
};
