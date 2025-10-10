async function fetchStudents(){
    try {
        const response = await fetch("http://169.239.251.102:341/~marc.sossou/api/students.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const students = await response.json();
        console.log(students.students.length)
        return students.students;
    } catch (error) {
        console.error("Error fetching students:", error);
        return [];
    }
}

fetchStudents().then(console.log)