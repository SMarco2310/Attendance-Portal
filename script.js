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



async function fetchStudents(){
    try {
        console.log("Fetching students from API...");
        const response = await fetch("http://localhost:3000/students");
        console.log("Response status:", response.status);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Raw data received:", data);
        return data.students;
    } catch (error) {
        console.error("Error fetching students:", error);
        console.error("Error details:", error.message);
        console.error("Make sure the proxy server is running: node proxy-server.js");
        return [];
    }
}



async function fetchCourses(){
    try {
        console.log("Fetching courses from API...");
        const response = await fetch("http://localhost:3000/courses");
        console.log("Courses response status:", response.status);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Courses data received:", data);
        return data.courses;
    }
    catch (error) {
        console.error("Error fetching courses:", error);
        console.error("Error details:", error.message);
        console.error("Make sure the proxy server is running: node proxy-server.js");
        return [];
    }
}



async function fetchSessions(){
    
    try {
        console.log("Fetching sessions from API...");
        const response = await fetch("http://localhost:3000/sessions");
        console.log("Sessions response status:", response.status);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Sessions data received:", data);
        return data.sessions;
    }
    catch (error) {
        console.error("Error fetching sessions:", error);
        console.error("Error details:", error.message);
        console.error("Make sure the proxy server is running: node proxy-server.js");
        return [];
    }
}





if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", createStudentsTable);
} else {
    createStudentsTable();
}


async function createStudentsTable(){
    const table = document.getElementById("students");
    if (!table) {
        console.error("Table element not found");
        return;
    }

    try {
        const students = await fetchStudents();
        console.log("Fetched students:", students);

        if (!students || students.length === 0) {
            table.innerHTML = `<tr><td colspan="4">No students found.</td></tr>`;
            return;
        }

        const rowsHtml = students.map(student  => {
            return `
                <tr>
                    <td>${student.fullName}</td>
                    <td>${student.studentId}</td>
                    <td>${student.major}</td>
                    <td>
                        <input type="range" name="attendance" min="0" max="100" value="${student.attendance}">
                        <span>${student.attendance}%</span>
                    </td>
                </tr>
            `;
        }).join('');

        table.innerHTML = rowsHtml;
    } catch (error) {
        console.error("Failed to fetch or create students table:", error);
        table.innerHTML = `<tr><td colspan="4">Error loading data: ${error.message}</td></tr>`;
    }
};



