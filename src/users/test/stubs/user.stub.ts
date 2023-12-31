import type { User } from 'src/entities/user.entity';

export const userStub = (): User => {
  return {
    userId: '124',
    age: 23,
    email: 'test@stub.com',
    name: 'Test Stub',
    favoriteFoods: ['rice', 'beans', 'yam'],
  };
};
