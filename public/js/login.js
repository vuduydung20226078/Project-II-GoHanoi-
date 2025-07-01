// Select elements
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btn-book');
const iconClose = document.querySelector('.icon-close');

// Handle Registration
async function handleRegistration(event) {
  event.preventDefault();
  const registrationData = {
    email: document.querySelector('.register input[type="email"]').value,
    username: document.querySelector('.register input[type="text"]').value,
    password: document.querySelector('.register input[type="password"]').value
  };
  try {
    // Send registration data to server
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData)
    });

    if (response.ok) {
      wrapper.classList.remove('active');
      alert('Registration successful! Please log in.');
    } else {
      alert('Registration failed. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
  };
};

async function handleLogin(event) {
  event.preventDefault();
  const loginData = {
    email: document.querySelector('.login input[type="email"]').value,
    password: document.querySelector('.login input[type="password"]').value
  };
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const infoUser = {
        username: data.username,
        userID: data.userID,
        imageLink: data.imageLink,
        name: data.name,
        address: data.address,
        phone: data.phone,
        userRole: data.userRole
      }
      sessionStorage.setItem("isLogin", true);
      sessionStorage.setItem("infoUser", JSON.stringify(infoUser));
      window.location.href = "/html/showproduct.html";
    }
  } catch (error) {
    console.error('Error:', error);
  };
};

registerLink.addEventListener('click', () => {
  wrapper.classList.add('active');
});
loginLink.addEventListener('click', () => {
  wrapper.classList.remove('active');
});
btnPopup.addEventListener('click', () => {
  wrapper.classList.add('active-popup');
});
iconClose.addEventListener('click', () => {
  wrapper.classList.remove('active-popup');
});

document.querySelector('.register form').addEventListener('submit', handleRegistration);
document.querySelector('.login form').addEventListener('submit', handleLogin);
