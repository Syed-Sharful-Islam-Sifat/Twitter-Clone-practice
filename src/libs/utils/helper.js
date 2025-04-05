export const validateName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 3) return "Name must be at least 3 characters";
    if (!/^[a-zA-Z0-9]*$/.test(name)) return "Name can only contain letters and numbers (no spaces)";
    return "";
  };

  export const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  export const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    // Add more password requirements if needed
    // if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    // if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    // if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    return "";
  };
