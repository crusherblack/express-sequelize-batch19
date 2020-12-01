# express-sequelize-batch19

1. npm Install
2. npm start

## sequelize <command>

# Commands:
 - sequelize db:migrate                        Run pending migrations
 -  sequelize db:migrate:schema:timestamps:add  Update migration table to have
                                              timestamps
 - sequelize db:migrate:status                 List the status of all migrations      
  -  sequelize db:migrate:undo                   Reverts a migration
   - sequelize db:migrate:undo:all               Revert all migrations ran
   - sequelize db:seed                           Run specified seeder
  -  sequelize db:seed:undo                      Deletes data from the database
   - sequelize db:seed:all                       Run every seeder
   - sequelize db:seed:undo:all                  Deletes data from the database
   - sequelize db:create                         Create database specified by
                                              configuration
  -  sequelize db:drop                           Drop database specified by
                                              configuration
   - sequelize init                              Initializes project
   - sequelize init:config                       Initializes configuration
   - sequelize init:migrations                   Initializes migrations
   - sequelize init:models                       Initializes models
   - sequelize init:seeders                      Initializes seeders
