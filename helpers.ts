export function getRandomValueFromArray(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
};

export function getRandomBirthDate(birthDataFrom: Date = new Date('2009-01-01'), birthDataTo: Date = new Date('2011-12-31')): Date {
    const birthDataDifferenceInmSec = birthDataTo.getTime() - birthDataFrom.getTime();
    const birthDateInmSec = birthDataFrom.getTime() + Math.random()*birthDataDifferenceInmSec;
    return new Date(birthDateInmSec);
/*
    const year: number = 2011 - (Math.floor(Math.random() * 3));
    const month: number = Math.floor(Math.random() * 12);
    const day: number = Math.floor(Math.random() * 29);
    return new Date(year, month, day);
*/
};

export function fullName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`
};

export function getAge(birthDate: Date): number {
    const ageDifferenceInMilliseconds: number = Date.now() - birthDate.getTime();
    const ageDate: Date = new Date(ageDifferenceInMilliseconds); 
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};