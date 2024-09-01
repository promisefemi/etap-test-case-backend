import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CoursesModule } from "./courses/courses.module";

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.getOrThrow("DB_URL"),
        autoLoadEntities: true,
        logging: true,
        keepConnectionAlive: true,
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize:
          configService.getOrThrow("ENVIRONMENT") == "development"
            ? true
            : false,
      }),
    }),

    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
