export interface Teacher {
    firstName: string;
    lastName: string;
    fullName: () => string;
    professions: string[];
    numberAddProfessions?: number;
};

export interface Student {
    firstName: string;
    lastName: string;
    birthDate: Date;
    fullName: () => string;
    age: () => number
};

export interface Classroom {
    name: string;
    teacher: Teacher;
    birthYear?: number;
    students: Student[];
};

export interface School {
    name: string;
    address: string;
    phone: string;
    classes: Classroom[];
}

export interface INewSchool extends School {
    classVolume: number;
    enrollInClasses(entrants: Ientrants): void;
}

export interface Ientrants {
    numberOfKids: number;
    birthDataFrom: Date;
    birthDataTo: Date;
    entrantsClass: Classroom;
}