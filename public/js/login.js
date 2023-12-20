const loginFormHandler = async (event) => {
    event.preventDefault();

    //Collect values form the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

if (email && password) {
    //Send post request to the API endpoint
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {'Content type' : 'application/json'},
    });

    if (response.ok) {
        //If successful, redirect the browser to the homepage
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    } 
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'content-Type': 'application/json' },
        });

        if (response.ok) {
//This must be the endpoint for the homepage/profile/dashboard for the user
            document.location.replace('/homepage');
        } else { 
            alert(response.statusText);
        }
    }
};

