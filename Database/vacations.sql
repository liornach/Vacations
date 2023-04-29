-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2023 at 07:56 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) DEFAULT NULL,
  `vacationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(2, 5),
(2, 6),
(2, 7),
(3, 8),
(4, 4),
(4, 7),
(4, 8),
(4, 10),
(5, 11),
(5, 12),
(6, 4),
(6, 12),
(7, 1),
(7, 3),
(7, 5),
(7, 6),
(7, 7),
(7, 9),
(7, 12),
(8, 4),
(8, 12),
(9, 3),
(16, 2),
(16, 3),
(16, 5),
(16, 7),
(16, 12);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) DEFAULT NULL,
  `lastName` varchar(40) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `userPassword` varchar(256) DEFAULT NULL,
  `role` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `userPassword`, `role`) VALUES
(1, 'Lior', 'Nachmias', 'lior54nach@gmail.com', '54153a840db730e995fb5eed4198c0efcfcefb6cb5a16a8f4cca06e1b4a77f04a23cb05a57619c126bcb74fd8c39721e77f4a0648a93e96ae39ec8e728567d8f', 1),
(2, 'Moshe', 'Cohen', 'Moshe.cohen@gmail.com', '403da2ecf377d577f11a481522319895eddb39cdc2c43038d91f87fc225a71de33d8f0c281f8d22499daae72c00c84d9c8a1a4cdac1a596ac3baf73182804e58', 2),
(3, 'Roi', 'Mizrahi', 'roi54@walla.com', '7f17b6e6de4a4db12cc5aa68c847b6fd3e6813ba9abdbf3b2e6f2ceb67ac1891d06b5fc15894f4a6e52e2ad393d2d40a36fcefa4b80e86ebd04adb5404c10b60', 2),
(4, 'Mani', 'Richarson', 'manmani@yahoo.com', 'b2eae4e072c65b53515209e5db23f4acaed3a615eaf7e43dc141539bf0dbaa504571a7dc6a92bf80b6d17110ccd4210c7cf2fe1d7cb0b306d5944d709cb8a8f6', 2),
(5, 'Roger', 'Olive', 'rogRog@gmail.com', 'b8f8fe201d9d059c90fd61e63ffda60ee973db2a09ff1438bcc65cd14092835e21f24dc1965fee177a84c62fe6effc399d374df3eebd6bd96b15b0c3bea46139', 2),
(6, 'Leah', 'Manstein', 'LeahLili@zahav.com', '3a629c36951f46069542fb306c30def1b3dbb7507bea2b4781d5cda560b2a3a11c9290c01851b732cf4015181f7d797d20488cfb3478962c082c4ea4fbe2277f', 2),
(7, 'Shimon', 'Israeli', 'shimi@walla.com', '5c16b77f2302112e2ab43b713651a4a63788d8e8fd997cd730b8ef183e9f0dddae78503631c2c0ba2441806f3224eb93da1ac13dac9bbc938a7fe75c9f491dd9', 2),
(8, 'Madison', 'May', 'myMadi@gmail.com', '83976eddcce4ff6d4682e983b13330c5b40039072b95f3603558b92a021cc5dd2d1a21e4c5bd9a7114c0edecac3ab57eda596d25d60fbcbc7bd59d7083f71f90', 2),
(9, 'Kelly', 'Bonham', 'kelkel123@gmail.com', 'f7ae6034548fd8c52761b09205bc9ed1e817280213fba89bcee15187548a40c8e51a53aca3c3f8400f5836a37b8cae3ca473f3e66e9f81b24d9e4113e936587f', 2),
(16, 'Robin', 'Hood', 'robin@yahoo.com', 'e0cc9016a7f983c2fe3bbf39cbd99e6ceb8000713545f9e6542cafc571548caebf05370c5c82eba8b25e7bd3789edb29dfe0cae727a60dc78997e070d0d76e40', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(80) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `imageName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Athens', 'Explore the magic of Athens, where ancient history and modern-day vibrancy collide to create a unique and unforgettable vacation. Start your journey at the iconic Acropolis, and discover the world of gods and heroes as you wander through the ancient ruins. Then explore the trendy neighborhoods of Plaka, Monastiraki, and Psyri, where you\'ll find colorful streets, traditional Greek tavernas, and boutique shops. At night, the city comes alive with vibrant nightlife, including rooftop bars, trendy clubs, and live music venues. Sample delicious local cuisine, relax on the Athens Riviera, or take a day trip to the picturesque island of Aegina. Athens is a city that will capture your heart and imagination, so pack your bags and get ready for an adventure of a lifetime!', '2023-08-25', '2023-08-30', 750, 'acf416de-ccc6-4575-a4c0-b53d472cab5f.jpg'),
(2, 'Amsterdam', 'Discover Amsterdam, the city of canals, bikes, and culture. Explore charming streets, world-famous museums, and delicious food and drink. Immerse yourself in the vibrant nightlife and rich artistic heritage. With friendly locals and a welcoming spirit, Amsterdam is a destination for adventure, culture, and a one-of-a-kind experience. Come and experience the magic of this amazing city for yourself!', '2023-08-23', '2023-08-30', 750, '46b69c66-a804-4171-9bfc-e8827185ee44.jpg'),
(3, 'Tokyo', 'Discover the fusion of ancient and modern in Tokyo, a city where traditional temples and modern technology harmoniously coexist. Explore the trendy fashion districts, indulge in the delicious cuisine, or soak in the breathtaking views from Tokyo Skytree. Don\'t miss the chance to visit the historic Imperial Palace or experience the thrill of Tokyo Disneyland. With a range of accommodation options, Tokyo caters to all travelers. Book your trip and immerse yourself in the vibrant culture of Tokyo!', '2023-03-08', '2023-03-22', 2500, '99c39365-0818-478d-84ac-c120ed879571.jpg'),
(4, 'Sydney', 'Discover the beauty and charm of Sydney, a city that offers a mix of cosmopolitan culture and natural wonders. Marvel at the iconic Sydney Opera House, enjoy a day at the beach, or explore the fascinating history at The Rocks. Indulge in the local cuisine, shop in trendy boutiques, or climb the Harbour Bridge for a breathtaking view. With a range of accommodation options, Sydney caters to all types of travelers. Book your trip now and fall in love with the unique blend of city and nature that Sydney has to offer!', '2024-02-12', '2024-02-27', 2350, 'b631fd1c-99cd-4816-b7ec-c2d1b2d21b25.jpg'),
(5, 'Lofoten Islands', 'Escape to the breathtaking Lofoten Islands, an archipelago in Norway that boasts stunning scenery and rich culture. From the towering peaks to the serene fjords, this region offers a truly unique experience. Go fishing, kayaking or hiking to see the stunning views or watch the magical Northern Lights. Indulge in the local delicacies and visit the cozy fishing villages. With a range of accommodation options, from traditional rorbuer to modern hotels, Lofoten Islands is the perfect destination for nature lovers and adventure seekers. Book your trip now and discover the raw beauty of Lofoten Islands!', '2023-07-06', '2023-07-13', 2900, '2f61f3dd-aa1a-4428-997c-4f5374e34e1c.jpg'),
(6, 'Rome', 'Discover the Eternal City of Rome, a city steeped in history and culture. Visit the iconic landmarks, indulge in the delicious food, and immerse yourself in the vibrant atmosphere. From the Colosseum to the Vatican, there\'s no shortage of things to see and do. Explore the charming neighborhoods, take a stroll through the picturesque streets, and enjoy a glass of wine in a cozy trattoria. With a range of accommodation options, from charming B&Bs to luxurious hotels, Rome is the perfect destination for those seeking history, culture, and romance. Book your trip now and experience the enchantment of Rome!', '2023-09-06', '2023-09-11', 1200, '9762e5a5-01cd-4388-9547-3076dd541a3d.jpg'),
(7, 'Tel Aviv', 'Discover Tel Aviv, the vibrant city on the Mediterranean coast that never sleeps. With its white-sand beaches, bustling markets, and vibrant nightlife, Tel Aviv has something for everyone. Explore the rich cultural scene, indulge in the mouth-watering cuisine, and shop at the trendy boutiques. Take a stroll through the charming neighborhoods and experience the city\'s unique blend of modernity and tradition. With a range of accommodation options, from chic boutique hotels to stylish apartments, Tel Aviv is the perfect destination for those seeking sun, fun, and culture. Book your trip now and experience the energy of Tel Aviv!', '2023-05-17', '2023-05-23', 1200, 'd5163781-1250-4979-9229-80618ac05c7d.jpg'),
(8, 'Paris', 'Fall in love with the City of Love, Paris! Admire the iconic landmarks, stroll along the Seine, and indulge in the world-famous cuisine. From the Eiffel Tower to the Louvre, there\'s no shortage of things to see and do. Explore the charming neighborhoods, experience the vibrant nightlife, and immerse yourself in the city\'s unparalleled romance. With a range of accommodation options, from cozy guesthouses to luxurious hotels, Paris is the perfect destination for those seeking beauty, culture, and passion. Book your trip now and experience the magic of Paris!', '2023-07-28', '2023-08-05', 1100, 'da13cf2b-8a1e-4440-92f8-694105ef90dc.jpg'),
(9, 'Vienne', 'Discover the enchanting city of Vienna, where history meets modernity. From imperial palaces to contemporary museums, Vienna is a feast for the senses. Stroll along the picturesque streets, experience the world-renowned coffee culture, and indulge in the decadent cuisine. With a range of accommodation options, from charming bed and breakfasts to elegant hotels, Vienna is the perfect destination for those seeking sophistication, culture, and romance. Book your trip now and immerse yourself in the magic of Vienna!', '2024-06-22', '2024-06-28', 1500, '87319065-0b05-4bc5-bb93-dd26f21086db.jpg'),
(10, 'London', 'Experience the vibrant and diverse city of London. Explore the iconic landmarks, from Buckingham Palace to Big Ben, and immerse yourself in the city\'s rich history and culture. Discover the hidden gems of the city\'s charming neighborhoods, indulge in the world-class cuisine, and enjoy the buzzing nightlife. With a range of accommodation options, from trendy boutique hotels to historic bed and breakfasts, London is the perfect destination for those seeking excitement, culture, and adventure. Book your trip now and be swept away by the magic of London!', '2024-08-30', '2024-09-05', 1400, '1dbf466d-10a3-4cb2-8eae-f82ddf32e1ac.jpg'),
(11, 'New York', 'Discover the city that never sleeps: New York. From the bright lights of Times Square to the tranquility of Central Park, the city offers a diverse range of experiences. Explore the iconic architecture, world-renowned museums, and unbeatable shopping. With a range of accommodation options, from trendy boutique hotels to budget-friendly hostels, New York is the perfect destination for all types of travelers. Book your trip now and let the city\'s energy and excitement sweep you off your feet!', '2024-12-23', '2025-01-03', 2550, '87f9dc97-f420-4fd9-a39f-f772381b80c5.jpg'),
(12, 'Berlin', 'Experience the vibrant and eclectic culture of Berlin. From the bustling nightlife to the rich history and architecture, Berlin offers something for everyone. Discover the city\'s world-famous museums, street art, and trendy neighborhoods. With a range of accommodation options, from historic boutique hotels to modern hostels, Berlin is the perfect destination for all types of travelers. Book your trip now and immerse yourself in the electric energy of Berlin!', '2023-03-23', '2023-04-01', 550, '9a300dc1-1d21-45ea-9717-9a6d9f8cfc40.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD UNIQUE KEY `row_unique` (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
