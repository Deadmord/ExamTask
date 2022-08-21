import { School } from "./entities";
import { Kids, NewSchool } from "./schoolDynamicallycreating";
import { getClassYoungestStudent as getClassYoungestStudentFullName, initializeSchool, printSchool, sortSchoolStructure, transferStudent} from "./services";

const school: School = initializeSchool();

// Hello, thank yor for your time, below you can see solutions in tasks order with comments, 
// the main part of code from task 8 with classes defenition is in file "schoolDynamicallyCreating.ts".

console.log(`----------Task 1----------`);
printSchool(school); 

/*  ----------------Task 2, 3---------------
    "History" It's reserved word, that "Allows manipulation of the browser session history, 
    that is the pages visited in the tab or frame that the current page is loaded in."
    1st solution: Use "enum" for professions;
    2nd: use array of profession
    3rd: make function recived number of professions and by "swich" return string. 
*/

console.log(`----------Task 4----------`);
console.log(`The full name of first student is ${school.classes[0].students[0].fullName()}`);

console.log(`----------Task 5----------`);
console.log(`At ${school.classes[0].name} class the yongest student is ${getClassYoungestStudentFullName(school.classes[0])}`);
//As you can see, it doesn,t affect on object itself!

console.log(`----------Task 6----------`);
sortSchoolStructure(school);
printSchool(school);

console.log(`----------Task 7----------`);
console.log(`Lets transfer ${school.classes[1].students[2].fullName()} from class ${school.classes[1].name} to class ${school.classes[0].name}.`);
transferStudent(school.classes[1].students[2].fullName(), school.classes[1], school.classes[0]);
printSchool(school);

/*  ----------------Task 8, 9---------------
    For more realism, lets assume the folowing logic:
    1) There are some number of children in city, for instance 200, from 2010 to 2020 birth years.
    Create they automaticlly, acording to the condition above/
    2) Create new school.  
    3) Enroll all these children in school by dividing them into classes according to age.
        2.1) Generate of a teacher for each class with some professions.
        2.2) we have some limit of student in class, 20 kids in example below.
        2.3) Create new class if sutable does't exist.
    4) Sort students and print result.
*/
console.log(`----------Task 8----------`);
const entrants: Kids = new Kids(200, new Date('2010-01-01'), new Date('2020-12-31'));
const newSchool: NewSchool = new NewSchool("New School", "Israel, Haifa","+97-012-345-67-89", 20)

newSchool.enrollInClasses(entrants);

sortSchoolStructure(newSchool);
printSchool(newSchool);



//The end//