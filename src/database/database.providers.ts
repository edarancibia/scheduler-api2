
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://scheduler-api-user:$cheduler2025@cluster0.9tp1k.mongodb.net/appointment_schedule?retryWrites=true&w=majority&appName=Cluster0'),
  },
];
