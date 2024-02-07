import React, { useState, useEffect } from 'react';

function App() {
  const [userDetails, setUserDetails] = useState({
    name: '',
    nickname: '',
    email: '',
    bio: '',
    profilePicture: null,
  });

  // State to store form errors
  const [formErrors, setFormErrors] = useState({});

  // State to store image preview
  const [imagePreview, setImagePreview] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle profile picture upload
  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      profilePicture: file,
    }));

    // Display image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    const errors = validateForm(userDetails);
    setFormErrors(errors);

    // If no errors, update local storage
    if (Object.keys(errors).length === 0) {
      updateLocalStorage(userDetails);
    }
  };

  // Function to perform basic form validation
  const validateForm = (data) => {
    let errors = {};
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Invalid email format';
    }
    // Add more validation rules as needed

    return errors;
  };

  // Function to update local storage with user details
  const updateLocalStorage = (data) => {
    // Assuming 'user' is the key for storing user details in local storage

    // Retrieve existing user profile from localStorage
    const existingUserProfile = JSON.parse(localStorage.getItem('user'));

    // Combine existing profile with the new data
    const updatedUserProfile = {
      ...existingUserProfile,
      ...data,
      profilePicture: data.profilePicture ? data.profilePicture.name : null,
    };

    // Update localStorage with the combined profile
    localStorage.setItem('user', JSON.stringify(updatedUserProfile));
    alert('Profile updated successfully!');
  };

  // Function to load user details from localStorage
  const loadUserProfileFromLocalStorage = () => {
    // Assuming 'user' is the key for storing user details in local storage
    const userProfile = JSON.parse(localStorage.getItem('user')) || {};
    setUserDetails(userProfile);
  };

  // Load user details from localStorage when the component mounts
  useEffect(() => {
    loadUserProfileFromLocalStorage();
  }, []);

  return (
    <div class="page-wrapper null compact-wrapper" id="pageWrapper" style={{ marginTop: '20px' }}>
      <div class="page-main-header">
        <div class="main-header-right">
          <div class="main-header-left">
            <div class="logo-wrapper">
              <a href="index.html">
                <img src="https://admin.pixelstrap.com/xolo/assets/images/logo/logo.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="page-body-wrapper null sidebar-icon">
        <div class="page-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-header">
                    <h5>Edit Profile</h5>
                  </div>
                  <form class="form theme-form" onSubmit={handleSubmit}>
                    <div class="card-body">
                      <div class="row">
                        <div class="col form-group">
                          <div class="mb-3 row">
                            <label class="col-sm-3 col-form-label">Name</label>
                            <div class="col-sm-9">
                              <input class="form-control" type="text" name="name" value={userDetails.name} onChange={handleInputChange} />
                              {formErrors.name && <span className="error">{formErrors.name}</span>}
                            </div>
                          </div>
                          <div class="mb-3 row">
                            <label class="col-sm-3 col-form-label">Nick Name</label>
                            <div class="col-sm-9">
                              <input class="form-control" type="text" name="nickname" value={userDetails.nickname} onChange={handleInputChange} />
                              {formErrors.nickname && <span className="error">{formErrors.nickname}</span>}
                            </div>
                          </div>
                          <div class="mb-3 row">
                            <label class="col-sm-3 col-form-label">Email</label>
                            <div class="col-sm-9">
                              <input class="form-control" type="email" name="email" value={userDetails.email} onChange={handleInputChange} />
                              {formErrors.email && <span className="error">{formErrors.email}</span>}
                            </div>
                          </div>
                          <div class="mb-3 row mb-0">
                            <label class="col-sm-3 col-form-label">Bio</label>
                            <div class="col-sm-9">
                              <textarea class="form-control" name="bio" value={userDetails.bio} onChange={handleInputChange} rows="5" cols="5"
                                placeholder="Default textarea"></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer">
                      <div class="col-sm-9 offset-sm-3">
                        <button class="btn btn-primary" type="submit" style={{width:'100%'}}>Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
