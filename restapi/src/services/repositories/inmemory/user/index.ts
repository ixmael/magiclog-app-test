import {
  UserRepositoryInterface,
} from '../../../../core/domain/user/repository';
import {
  UserType,
} from '../../../../core/domain/user/user';

import getByEmail from './getByEmail';
import storeAnUser from './storeAnUser';

/**
 * Implements the UserRepositoryInterface in memory
 * @param storage
 * @returns a object that implements UserRepositoryInterface
 */
const UserRepositoryInMemory = (storage: Array<UserType>): UserRepositoryInterface => {
  return {
    getByEmail: (email: string): Promise<UserType | null> => getByEmail(email, storage),
    storeAnUser: (user: UserType): Promise<boolean> => storeAnUser(user, storage),
  } as UserRepositoryInterface;
};

export default UserRepositoryInMemory;
