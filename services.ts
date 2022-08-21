// Ideas:
// Build dynamically created classmates: collection of first names, collection of lastnames, randomly pick birth date
import * as _ from 'underscore';
import { Professions, firstNames, lastNames} from "./constants";
import { Classroom, School, Student, Teacher } from "./entities";
import { getRandomBirthDate, getRandomValueFromArray, fullName, getAge } from "./helpers";

export function initializeSchool(): School {
    const student1: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student2: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student3: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student4: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());

    const teacher1: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Professions.Mathematics], 3);

    const student5: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student6: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student7: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student8: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());

    const teacher2: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Professions.Geography, Professions.History]);

    const mathClass: Classroom = createClassroom(teacher1.professions[0], teacher1, [student1, student2, student3, student4]);
    const geographyClass: Classroom = createClassroom(teacher2.professions[0], teacher2, [student5, student6, student7, student8]);

    return {
        name: "Big school",
        address: "Moscow",
        phone: "+7 (916) 000 12 21",
        classes: [
            mathClass,
            geographyClass
        ]
    }
}

export function createTeacher(firstName: string, lastName: string, professions: string[], numberAddProfessions: number = 0): Teacher {
    const allProfessions: string[] = professions;
    
    for (let indexAddProfession = 0; indexAddProfession < numberAddProfessions; indexAddProfession++) {
        const ProfecyPointer: number = Math.ceil((Math.random() * 6));
        let addProfession: string = "";
        switch (ProfecyPointer) {
            case 1: 
                addProfession = Professions.Chemistry;
                break;
            case 2: 
                addProfession = Professions.Geography;
                break;
            case 3: 
                addProfession = Professions.Hebrew;
                break;
            case 4: 
                addProfession = Professions.History
                break;
            case 5: 
                addProfession = Professions.Physics;
                break;
            default: 
                addProfession = Professions.Mathematics;
                break;   
        }
        if (!allProfessions.includes(addProfession)) {
            allProfessions.push(addProfession);
        }
    };
    
    return {
        firstName: firstName,
        lastName: lastName,
        fullName: () => fullName(firstName, lastName),
        professions: allProfessions
    };
}

export function createStudent(firstName: string, lastName: string, birthDate: Date): Student {
    return {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        fullName: () => fullName(firstName, lastName),
        age: () => getAge(birthDate)
    };
}

export function createClassroom(name: string, teacher: Teacher, students: Student[], birthYear?: number): Classroom {
    return {
        name: name,
        teacher: teacher, 
        birthYear: birthYear,
        students: students
    };
}

export function sortSchoolStructure(school: School): void {             //Another sorting varian with "underscore"
    const sortingClasses: Classroom[] = _.sortBy(school.classes, (eachClass) => eachClass.name); //1st sorting #6.1 condition

    for (let indexClass = 0; indexClass < sortingClasses.length; indexClass++) { //2nd sorting #6.2 condition
        sortingClasses[indexClass].students = _.sortBy((_.sortBy(sortingClasses[indexClass].students, (eachStudent) => eachStudent.firstName.toLowerCase())),(eachStudent) => eachStudent.lastName.toLowerCase()); 
    }
    
    school.classes = sortingClasses;
};

export function transferStudent(fullName: string, fromClassroom: Classroom, toClassroom: Classroom): void {
    const classMaxStudents: number = 30;
    const indexStudent = fromClassroom.students.findIndex(curentStudent => curentStudent.fullName() === fullName);
    
    if (indexStudent === -1) {
        console.warn(`Student ${fullName} didn't found in ${fromClassroom.name} class!\n`);
    } else if (toClassroom.students.length >= classMaxStudents) {
        console.warn(`${toClassroom.name} class is overloaded!\n`);
    } else {
        toClassroom.students.push(fromClassroom.students.splice(indexStudent, 1)[0]); //it seems more progmatically
        //fromClassroom.students.splice(indexStudent, 1);
        console.log(`Student ${fullName} transfered to ${toClassroom.name} class successfully\n`);
    }
}

export function getClassYoungestStudent(classroom: Classroom): string {
    if (classroom.students.length > 0) {
        const copyClassroomStudents = [...classroom.students]; // Copy the array of students so function doesn't affect transmitted object itself or we jast can use "underscore" it doesn't affect on own array
        const youngestStudent: Student = (copyClassroomStudents.sort((curentStudent, nextStudent)=> curentStudent.birthDate.getTime() - nextStudent.birthDate.getTime()))[copyClassroomStudents.length - 1];
        return youngestStudent.fullName();
    } else {
        return `The ${classroom.name} class is empety`;
    }
};

export function printSchool(school: School): void {
    console.log(`School data:`);
    console.log(`============`);
    console.log(`${school.name}\n${school.address}\n${school.phone}\n`);
    console.log(`Classes\n=======`);

    for (let indexClass = 0; indexClass < school.classes.length; indexClass++) {
        console.log(`Class ${indexClass + 1}: ${school.classes[indexClass].name} `);
        
        console.log(`Teacher: ${school.classes[indexClass].teacher.fullName()} (${school.classes[indexClass].teacher.professions.join(', ')})`);
        
        console.log(`Students:`);
        
        for (let indexStudent = 0; indexStudent < school.classes[indexClass].students.length; indexStudent++) {
            console.log(`${indexStudent + 1}: ${school.classes[indexClass].students[indexStudent].fullName()}: ${school.classes[indexClass].students[indexStudent].age()}`)
        }
        console.log(``);
    }
};