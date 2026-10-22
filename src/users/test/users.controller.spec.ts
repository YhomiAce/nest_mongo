import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';

jest.mock('../users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    describe('when getuser is called', () => {
      let user: User;
      beforeEach(async () => {
        user = await usersController.getUser(userStub().userId);
      });
      test('then it should call usersService', () => {
        expect(usersService.getUserById).toBeCalledWith(userStub().userId);
      });
      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUsers', () => {
    describe('when getusers is called', () => {
      let users: User[];
      beforeEach(async () => {
        users = await usersController.getUsers();
      });
      test('then it should call usersService', () => {
        expect(usersService.getUsers).toHaveBeenCalled();
      });
      test('then it should return a list of users', () => {
        expect(Array.isArray(users)).toBeTruthy();
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;
      beforeEach(async () => {
        createUserDto = {
          email: userStub().email,
          age: userStub().age,
          name: userStub().name,
          favoriteFoods: userStub().favoriteFoods,
        };
        user = await usersController.createUser(createUserDto);
      });
      test('then it should call usersService', () => {
        expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);
      });
      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      let updateUserDto: CreateUserDto;
      let userId: string;

      beforeEach(async () => {
        updateUserDto = {
          email: userStub().email,
          age: userStub().age,
          name: userStub().name,
          favoriteFoods: userStub().favoriteFoods,
        };
        userId = userStub().userId;
        user = await usersController.updateUser(userId, updateUserDto);
      });
      test('then it should call usersService', () => {
        expect(usersService.updateUser).toHaveBeenCalledWith(
          userId,
          updateUserDto,
        );
      });
      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('deleteUser', () => {
    describe('when deleteUser is called', () => {
      let userId: string;
      let deleteResult: boolean;

      beforeEach(async () => {
        userId = userStub().userId;
        deleteResult = await usersController.deleteUser(userId);
      });
      test('then it should call usersService', () => {
        expect(usersService.deleteUser).toHaveBeenCalledWith(userId);
      });
      test('then it should return a boolean', () => {
        expect(deleteResult).toBeTruthy();
      });
    });
  });
});
