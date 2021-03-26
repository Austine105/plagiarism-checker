import { Sequelize } from 'sequelize-typescript';
import { CheckerModel } from 'src/modules/checker/checker.model';
import { UserModel } from 'src/modules/user/user.model';
import { configService } from '../config/config.service';
import { SEQUELIZE } from '../constants';


export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
          const sequelize = new Sequelize(configService.getDatabaseUrl(), configService.getSequelizeConfig());
            sequelize.addModels([UserModel, CheckerModel]);
            // await sequelize.sync();
            return sequelize;
        },
    },
];
