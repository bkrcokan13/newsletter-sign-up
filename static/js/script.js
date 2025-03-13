


// Defines
const mobileScreen = window.matchMedia("(max-width: 768px)");
const rightBannerContainer = document.querySelector(".newsletter-container-right");
const emailInput = document.getElementById("email-input");
const sendEmailBtn = document.getElementById("email-send-btn");
const mainContainer = document.querySelector(".newsletter-container");
const successMessageContainer = document.querySelector(".newsletter-success");
const subsEmailTag = document.getElementById("subs-email");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const errorInput = document.querySelector(".form-email-input");
const formField = document.querySelector(".error-label");
const dissmissMessageBtn = document.getElementById("close-msg-btn");
const sourcePicture = {
    'mobile' : "url(assets/images/illustration-sign-up-mobile.svg)",
    'desktop' : "url(assets/images/illustration-sign-up-desktop.svg)"
}
let emailValidStatus = false;
let subsEmailText = "";



document.addEventListener('DOMContentLoaded', () => {

    // Responsive banner changer
    function changeBannerPicture(e) {
        
        if(e.matches){ 
            rightBannerContainer.style.backgroundImage = sourcePicture.mobile;
        }
        else {
            rightBannerContainer.style.backgroundImage = sourcePicture.desktop;
        }
    }
    
    // Screen size change listener
    mobileScreen.addEventListener('change', changeBannerPicture);
    changeBannerPicture(mobileScreen);


    // Email input real-time change listener
    emailInput.addEventListener('input', (e) => {

        if(e.target.value === '') {
            errorHandler(true);
            emailValidStatus = false;
        }
        else {

            // Check Email Validate
            let validateEmail = checkEmail(e.target.value);

            // 
            if (validateEmail) {
                subsEmailText = e.target.value;
            }
            
            // Email status (is correct ?)
            emailValidStatus = validateEmail;
            
            // Error Handler
            errorHandler(validateEmail);
            
        }
    });


    // Send Email Btn Function
    sendEmailBtn.addEventListener('click', () => {
        try {
            if (emailValidStatus) {
                successMessageScreen(true, subsEmailText);
            } else {
                alert("Please enter your email !");
            }
        } catch (error) {
            console.error(error);
        }
    });
    dissmissMessageBtn.addEventListener('click', closeMessageScreen);

});


// Success Message Screen
function successMessageScreen(state, subsEmail) {

    try {
        if(state) {
            if(mainContainer.classList.contains("active") && successMessageContainer.classList.contains("hidden")) {
                
                mainContainer.classList.remove("active");
                mainContainer.classList.add("hidden");
    
                successMessageContainer.classList.remove("hidden");
                successMessageContainer.classList.add("active");


                subsEmailTag.setAttribute('href', `mailto:${subsEmail}`);
                subsEmailTag.innerText = subsEmail;
            }
            else if(mainContainer.classList.contains("hidden") && successMessageContainer.classList.contains("active")) {
                mainContainer.classList.remove("hidden");
                mainContainer.classList.add("active");
    
                successMessageContainer.classList.remove("active");
                successMessageContainer.classList.add("hidden");
            }
        }
    } catch(messageScreenError) {
        console.error(messageScreenError);
    }
}

// Dismiss Message Screen

function closeMessageScreen() {
    if(mainContainer.classList.contains("hidden") && successMessageContainer.classList.contains("active")) {
        mainContainer.classList.remove("hidden");
        mainContainer.classList.add("active");

        successMessageContainer.classList.remove("active");
        successMessageContainer.classList.add("hidden");
    }
}


// Email Checker
function checkEmail(email) {
    try {
        if(!emailRegex.test(email)) {
            return false;
        }
        else {
            return true;
        }
    }
    catch(emailValidateError) {
        console.error(emailValidateError);
    }
}


//Error Handler
function errorHandler(error) {
    try {
        if(!error) {
            errorInput.classList.add("input-error");
            formField.style.display = "unset";
        }
        else {
            errorInput.classList.remove("input-error");
            formField.style.display = "none";
        }
    
    } catch (errorHandler) {
        console.error(errorHandler);
    }
}