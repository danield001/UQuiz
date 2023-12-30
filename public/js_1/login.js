console.log('script loaded');

const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/homepage');
            } else {
                alert('Failed to Log In');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log(username, "username");
    console.log(email, "email");
    console.log(password, "password");

    if (username && email && password) {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {

                document.location.replace('/homepage');
            } else {
                alert('Failed to Sign Up');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    }
};

document.querySelector('#login-form').addEventListener('click', loginFormHandler);
document.querySelector('#signup-form').addEventListener('click', signupFormHandler);
