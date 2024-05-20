// sign up handler func
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirmPassword = document
    .querySelector('#confirmPassword')
    .value.trim();

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  if (name && username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create new user');
      return;
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
