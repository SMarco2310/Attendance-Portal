







//  Password validation function

function validatePassword(){
    let password = document.forms["signup-form"]["pass-field"].value;
    let cue = document.getElementById("password-cue");
    let capitalChar = false;
    let specialChar = false;
    let numInPass = false;
    let specials = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
    let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let numOfLetters = 0;

    if (password.length < 8){
        cue.innerHTML = "Password must be at least 8 characters";
        return false;
    } else if(password.length >= 8){

        //* Check if a letter exists in the password
        for(let i=0; i<password.length; i++){
            for(let j=0; j<letters.length; j++){
                if(password.charAt(i) == letters.at(j) || password.charAt(i) == letters.at(j).toUpperCase()){
                    numOfLetters++;
                }
            }
        }

        //* Checks for capital letter in password
        for(let i = 0; i < password.length; i++){
            for(let j = 0; j < letters.length; j++){
                if((password.charAt(i) == letters.at(j) || password.charAt(i) == letters.at(j).toUpperCase()) && password.charAt(i) == password.charAt(i).toUpperCase()){
                    capitalChar = true;
                }
            }
        }

        //* Checks for special character in password
        for(let i = 0; i < password.length; i++){
            for(let j = 0; j < specials.length; j++){
                if(password.charAt(i) == specials.at(j)){
                    specialChar = true;
                }
            }
        }

        //* Checks for number in password
        for(let i = 0; i < password.length; i++){
            for(let j = 0; j < nums.length; j++){
                if(password.charAt(i) == nums.at(j)){
                    numInPass = true;
                }
            }
        }

        console.log(numOfLetters);
        console.log(capitalChar);
        console.log(specialChar);
        console.log(numInPass);

        if(numOfLetters == 0){
            cue.innerHTML = "Password must contain a letter";
            return false;
        }else if(!capitalChar){
            cue.innerHTML = "Password must contain a capital letter"
            return false;
        }else if(!specialChar){
            cue.innerHTML = "Password must contain a special character";
            return false;
        }else if(!numInPass){
            cue.innerHTML = "Password must contain a number"
            return false;
        }

        else{
            alert("You're through!");
            return true;
        }
    }
}

// Fetch students

async function fetchStudents(){
    try {
        const response = await fetch("http://169.239.251.102:341/~marc.sossou/api/students.json");
        const students = await response.json();
        return students;
    } catch (error) {
        console.error("Error fetching students:", error);
        return [];
    }
}

// Fetch courses

async function fetchCourses(){
    try {
        const response = await fetch("http://169.239.251.102:341/~marc.sossou/api/courses.json");
        const courses = await response.json()
        return courses;
    }
    catch (error) {
        console.error("Error fetching courses:", error);
        return [];
    }
}


// Fetch Sessions

async function fetchSessions(){
    try {
        const response = await fetch("http://169.239.251.102:341/~marc.sossou/api/sessions.json");
        const sessions = await response.json()
        return sessions;
    }
    catch (error) {
        console.error("Error fetching sessions:", error);
        return [];
    }
}


