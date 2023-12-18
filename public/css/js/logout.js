const logout = async () => {
    const response = await fetch('api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert('Failed to Log Out');
    }

}



document.querySelector('#logout').addEventListener('click', logout);