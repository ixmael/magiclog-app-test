import {
  UserServiceInterface,
} from '../../domain/user/service';
import {
  UserRepositoryInterface,
} from '../../domain/user/repository';

import createANewUser from './createANewUser';
import login from './login';

export type UserServiceServicesType = {
  repository: UserRepositoryInterface;
  logger: any;
  crypt: any;
};

/**
 * This implements the UserServiceInterface
 * @param repository the repository to handle the users
 * @returns an implementation of the UserServiceInterface
 */
const UserService = (services: UserServiceServicesType): UserServiceInterface => {
  return {
    createANewUser: (email: string, plainPassword: string) => createANewUser(email, plainPassword, services),
    login: (email: string, plainPassword: string) => login(email, plainPassword, services),
  } as UserServiceInterface;
};

export default UserService;
