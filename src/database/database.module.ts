import { Module } from '@nestjs/common';

@Module({
    // imports: [
    //     MongooseModule.forRootAsync({
    //       imports: [ConfigModule],
    //       useFactory: async (configService: ConfigService) => {
    //         //const uri = configService.get<string>('MONGO_URI');
    //         const uri = 'mongodb+srv://scheduler-api-user:$cheduler2025@cluster0.9tp1k.mongodb.net/appointment_schedule?retryWrites=true&w=majority&appName=Cluster0';
    //         console.log('Connecting to database with URI:', uri);
    //         return {
    //           uri,
    //         };
    //       },
    //       inject: [ConfigService],
    //     }),
    //   ],
})
export class DatabaseModule {}
