# LandmarkGuesser - Backend
Project LandmarkGuesser is a simple copy of [GeoGuessr](https://www.geoguessr.com/) game. The rules are practically the same: players are given an image of a landmark and their goal is to guess its location on the map. The closer their guess, the more points they score. The game consists of 5 rounds.

## General info
Backend repository for my fullstack application. I used [TypeScript](https://www.npmjs.com/package/typescript), [Express](https://expressjs.com/), [MySQL](https://www.mysql.com/) database and also [haversine-distance](https://www.npmjs.com/package/haversine-distance) to calculate the distance between 2 coordinates. Application is using 1 router which handles 4 queries:
 - POST /game - *for creating a new game*
 - POST /game/:id - *for creating a new round*
 - PUT /game/:id - *for updating a new round* 
 - GET /game/:id - *for getting game params*

## Tech Stack
 - TypeScript ![typescript+plain-1324760574122087083](https://user-images.githubusercontent.com/106924762/230974597-96a4e1ea-a06e-43f8-85df-c12ba25fbd74.png)
 - NodeJS ![vscode+icons+type+node-1324451430863084037 (1)](https://user-images.githubusercontent.com/106924762/231144964-c4e394f0-3542-4b31-b59d-7dec903b7bd6.png)
 - ExpressJS ![vlz](https://user-images.githubusercontent.com/106924762/231144314-1d210428-6be6-4915-8bc7-699ab654a5a2.png)
 - MySQL ![database+mysql-1330884283041508942 (1)](https://user-images.githubusercontent.com/106924762/231145567-71cce129-8fe0-45e5-9d9e-aaeacafeb8f1.png)

## Frontend
Frontend repository: https://github.com/ValenRod/LandmarkGuesserFront
    
## Database

    CREATE DATABASE IF NOT EXISTS `landmark_guesser_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
    USE `landmark_guesser_db`;

    CREATE TABLE IF NOT EXISTS `games` (
      `id` varchar(36) NOT NULL,
      `firstRoundId` varchar(36) DEFAULT NULL,
      `secondRoundId` varchar(36) DEFAULT NULL,
      `thirdRoundId` varchar(36) DEFAULT NULL,
      `fourthRoundId` varchar(36) DEFAULT NULL,
      `fifthRoundId` varchar(36) DEFAULT NULL,
      `currentRound` smallint(1) NOT NULL,
      `totalPoints` smallint(4) NOT NULL DEFAULT 0,
      PRIMARY KEY (`id`),
      KEY `FK_games_rounds` (`firstRoundId`),
      KEY `FK_games_rounds_2` (`secondRoundId`),
      KEY `FK_games_rounds_3` (`thirdRoundId`),
      KEY `FK_games_rounds_4` (`fourthRoundId`),
      KEY `FK_games_rounds_5` (`fifthRoundId`),
      CONSTRAINT `FK_games_rounds` FOREIGN KEY (`firstRoundId`) REFERENCES `rounds` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
      CONSTRAINT `FK_games_rounds_2` FOREIGN KEY (`secondRoundId`) REFERENCES `rounds` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
      CONSTRAINT `FK_games_rounds_3` FOREIGN KEY (`thirdRoundId`) REFERENCES `rounds` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
      CONSTRAINT `FK_games_rounds_4` FOREIGN KEY (`fourthRoundId`) REFERENCES `rounds` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
      CONSTRAINT `FK_games_rounds_5` FOREIGN KEY (`fifthRoundId`) REFERENCES `rounds` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS `landmarks` (
      `id` varchar(36) NOT NULL DEFAULT uuid(),
      `url` varchar(200) NOT NULL,
      `lat` decimal(10,7) NOT NULL,
      `lng` decimal(10,7) NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS `rounds` (
      `id` varchar(36) NOT NULL,
      `roundNumber` tinyint(1) NOT NULL,
      `landmarkId` varchar(36) NOT NULL,
      `playerGuessLat` decimal(10,7) DEFAULT NULL,
      `playerGuessLng` decimal(10,7) DEFAULT NULL,
      `distance` mediumint(5) DEFAULT NULL,
      `points` smallint(4) DEFAULT NULL,
      PRIMARY KEY (`id`),
      KEY `FK_rounds_landmarks` (`landmarkId`) USING BTREE,
      CONSTRAINT `FK_rounds_landmarks` FOREIGN KEY (`landmarkId`) REFERENCES `landmarks` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

## Run project locally
Clone the project

    git clone https://github.com/ValenRod/LandmarkGuesserBack.git
    
Go to the project directory

    cd LandmarkGuesserBack

Install dependencies

    npm install

Start the server

    ts-node index.ts


