import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as faker from 'faker';

export const allLanguages = [
  'React',
  'Angular',
  'Python',
  'Machine Learning',
  'Kubernetes',
  'Docker',
  'CICD',
  'CSS',
  'GraphQL',
  'AWS',
  'GCP',
  'Azure',
  'GatsBy',
  'Java',
  'Hibernate',
  'Node',
  'Express',
  'CSS',
  'HTML',
];

const getRandomArray = (
  sourceArray: Array<unknown>,
  targetArrayLength: number
) => {
  return sourceArray
    .sort(() => 0.5 - Math.random())
    .slice(0, targetArrayLength);
};

const person = (index: number) => {
  return {
    id: index,
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    country: faker.address.country(),
    active: faker.random.boolean(),
    description: faker.lorem.sentence(),
    available: faker.date.future(),
    updatedTs: faker.date.past(),
    skills: getRandomArray(allLanguages, 5),
  };
};

// faker.random.number(30)
const persons = (count = 10) => {
  const res = [];
  for (let i = 1; i <= count; i++) {
    res.push(person(i));
  }
  return res;
};

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const mentors = persons(10);
    const mentees = persons(10);

    return { mentors, mentees };
  }
}
