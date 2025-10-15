
// document.querySelectorAll('form').forEach(form => {
//     form.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const formType = form.classList.contains('sign-in-form') ? 'signin' : 'signup';

//         const email = form.querySelector('input[type="email"]').value;
//         const password = form.querySelector('input[type="password"]').value;
//         let username = '';

//         if (formType === 'signup') {
//             const confirmPassword = form.querySelectorAll('input[type="password"]')[1];
//             username = form.querySelector('input[name="username"]').value;

//             if (password !== confirmPassword.value) {
//                 alert("Passwords don't match!");
//                 return;
//             }
//         }

//         const endpoint = formType === 'signin' ? '/api/auth/login' : '/api/auth/signup';

//         const payload = formType === 'signin'
//             ? { email, password }
//             : { username, email, password };

//         try {
//             const res = await fetch(endpoint, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(payload)
//             });

//             const result = await res.json();

//             if (res.ok) {
//                 const message = document.createElement('p');
//                 message.textContent = `${formType === 'signin' ? 'Sign in' : 'Sign up'} successful!`;
//                 message.style.color = 'green';
//                 message.style.fontWeight = 'bold';
//                 form.appendChild(message);
//                 form.reset();
//             } else {
//                 alert(result.message || "Something went wrong");
//             }

//         } catch (error) {
//             console.error("Error:", error);
//             alert("Failed to connect to server");
//         }
//     });
// });



window.onload = function() {
    document.getElementById('id01').style.display = 'block';
  };
  
  window.onclick = function(event) {
    var modal = document.getElementById('id01');
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  

  document.getElementById('signin-form').reset();
document.getElementById('signup-form').reset();
document.getElementById('signin-email').focus();

  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");
  
  sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
  });
  
  sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
  });
  
  // Form validation
  document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => {
          e.preventDefault();
          const formType = form.classList.contains('sign-in-form') ? 'signin' : 'signup';
          
          if (formType === 'signup') {
              const password = form.querySelector('input[type="password"]');
              const confirmPassword = form.querySelectorAll('input[type="password"]')[1];
              
              if (password.value !== confirmPassword.value) {
                  alert("Passwords don't match!");
                  return;
              }
          }
          
          // Here you would typically send the form data to your backend
          console.log('Form submitted:', formType);
          // Redirect to home page after successful login/signup
          window.location.href = 'index.html';
      });
  });
  async function handleSignup(event) {
  event.preventDefault();

  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert(data.message);
  } else {
    document.getElementById('signup-error').innerText = data.message;
    document.getElementById('signup-error').style.display = 'block';
  }
}
