
import { Classroom, Student, Teacher, Ientrants, INewSchool } from "./entities";
import { createTeacher, createStudent, createClassroom } from "./services"
import { getRandomBirthDate, getRandomValueFromArray } from "./helpers";
import { firstNames, lastNames} from "./constants";

export class Kids implements Ientrants {
    numberOfKids: number;
    birthDataFrom: Date;
    birthDataTo: Date;
    entrantsClass: Classroom;
    
    constructor (numberOfKids: number, birthDataFrom: Date, birthDataTo: Date) {
        this.numberOfKids = numberOfKids;
        this.birthDataFrom = birthDataFrom;
        this.birthDataTo = birthDataTo;

        const entrants: Student[] = [];
        for (let indexEntrant = 0; indexEntrant < numberOfKids; indexEntrant++) {
            entrants.push(createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate(birthDataFrom, birthDataTo)))
        }

        const entrantsClassInternal: Classroom = createClassroom("Entrants", createTeacher('Without','teacher',[]), entrants);
        this.entrantsClass = entrantsClassInternal;
        
    }

};

export class NewSchool implements INewSchool {
    name: string;
    address: string;
    phone: string;
    classes: Classroom[];
    classVolume: number;

    constructor (name: string, address: string, phone: string, classVolume: number = 30) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.classVolume = classVolume;
        this.classes = [];  
    }

    enrollInClasses(entrants: Ientrants): void {
        if (entrants.entrantsClass.students.length === 0) {
            console.warn("There are no children here");
        } else {

            while (entrants.entrantsClass.students.length > 0) {
                const currentStudent: Student = entrants.entrantsClass.students.splice(0,1)[0];
                let classNotFound = true;

                for(let indexClass = 0; indexClass < this.classes.length; indexClass++) {
                    if (this.classes[indexClass].birthYear === currentStudent.birthDate.getFullYear() && this.classes[indexClass].students.length < this.classVolume) {
                        this.classes[indexClass].students.push(currentStudent);
                        classNotFound = false;
                        break;
                    }
                }
                
                if(classNotFound) {
                    const teacher: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [], 3);
                    const classroom: Classroom = createClassroom(teacher.professions[0], teacher, [currentStudent]);
                    classroom.birthYear = currentStudent.birthDate.getFullYear();
                    this.classes.push(classroom);
                }

            }
            console.log(`All ${entrants.numberOfKids} kids enroled at ${this.classes.length} classes\n`);
        }
        entrants.numberOfKids = 0; //erase number of kids after enroll in school.
    }
};
