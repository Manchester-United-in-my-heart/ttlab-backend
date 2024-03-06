import { Connection } from 'mongoose';
import { TokenSchema } from './entities/token.entity';
import { Admin, AdminSchema } from '../admin/entities/admin.entity';

export const tokenProviders = [
  {
    provide: 'TOKEN_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Token', TokenSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const adminProviders = [
  {
    provide: 'ADMIN_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Admin', AdminSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
