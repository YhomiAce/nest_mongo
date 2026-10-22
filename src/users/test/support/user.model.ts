import { MockModel } from '../../../database/test/support/mock.model';
import { User } from '../../../entities/user.entity';
import { userStub } from '../stubs/user.stub';

export class UserModel extends MockModel<User> {
  protected entityStub = userStub();
}
