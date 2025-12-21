-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cookshare
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` text,
  `created_at` datetime(6) DEFAULT NULL,
  `author_id` bigint NOT NULL,
  `post_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKn2na60ukhs76ibtpt9burkm27` (`author_id`),
  KEY `FKh4c7lvsc298whoyd4w9ta25cr` (`post_id`),
  CONSTRAINT `FKh4c7lvsc298whoyd4w9ta25cr` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `FKn2na60ukhs76ibtpt9burkm27` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKry8tnr4x2vwemv2bb0h5hyl0x` (`post_id`),
  KEY `FKnvx9seeqqyy71bij291pwiwrg` (`user_id`),
  CONSTRAINT `FKnvx9seeqqyy71bij291pwiwrg` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKry8tnr4x2vwemv2bb0h5hyl0x` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meal_planner_entries`
--

DROP TABLE IF EXISTS `meal_planner_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meal_planner_entries` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `meal_type` varchar(255) NOT NULL,
  `post_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkhijbpa1ym04t7goo3dvlpg8y` (`post_id`),
  KEY `FK9woc33o1hp03d1phbqqpiqtj4` (`user_id`),
  CONSTRAINT `FK9woc33o1hp03d1phbqqpiqtj4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKkhijbpa1ym04t7goo3dvlpg8y` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meal_planner_entries`
--

LOCK TABLES `meal_planner_entries` WRITE;
/*!40000 ALTER TABLE `meal_planner_entries` DISABLE KEYS */;
/*!40000 ALTER TABLE `meal_planner_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cooking_time` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` text,
  `diet` enum('DIABETIC_FRIENDLY','GLUTEN_FREE','HIGH_PROTEIN','KETO','LACTOSE_FREE','LOW_CARB','NONE','VEGAN','VEGETARIAN') DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `ingredients` text,
  `theme` enum('AMERICAN','CHINESE','FRENCH','HEALTHY','INDIAN','ITALIAN','JAPANESE','MEDITERRANEAN','MOROCCAN','OTHER','PASTRY') DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `tutorial` text,
  `type` enum('APPETIZER','BREAKFAST','DESSERT','DINNER','DRINK','LUNCH','OTHER','SAUCE','SNACK') DEFAULT NULL,
  `author_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6xvn0811tkyo3nfjk2xvqx6ns` (`author_id`),
  CONSTRAINT `FK6xvn0811tkyo3nfjk2xvqx6ns` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (101,'58 min','2025-12-02 18:28:03.074205','Delicious homemade Spaghetti Carbonara. Very easy and tasty.','LACTOSE_FREE','https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','PASTRY','Spaghetti Carbonara','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','DINNER',1),(102,'41 min','2025-12-14 18:28:03.107415','Delicious homemade Chicken Curry. Very easy and tasty.','DIABETIC_FRIENDLY','https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','JAPANESE','Chicken Curry','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','SAUCE',1),(103,'53 min','2025-11-18 18:28:03.110943','Delicious homemade Beef Stroganoff. Very easy and tasty.','GLUTEN_FREE','https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','OTHER','Beef Stroganoff','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','DINNER',1),(104,'39 min','2025-11-25 18:28:03.115090','Delicious homemade Vegetable Stir Fry. Very easy and tasty.','GLUTEN_FREE','https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','JAPANESE','Vegetable Stir Fry','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','APPETIZER',2),(105,'26 min','2025-11-17 18:28:03.119405','Delicious homemade Caesar Salad. Very easy and tasty.','NONE','https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','MOROCCAN','Caesar Salad','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','DRINK',2),(106,'41 min','2025-12-09 18:28:03.121876','Delicious homemade Chocolate Cake. Very easy and tasty.','LOW_CARB','https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','OTHER','Chocolate Cake','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','APPETIZER',1),(107,'50 min','2025-12-06 18:28:03.128822','Delicious homemade Pancakes. Very easy and tasty.','LOW_CARB','https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','PASTRY','Pancakes','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','DRINK',1),(108,'48 min','2025-12-04 18:28:03.131804','Delicious homemade Grilled Salmon. Very easy and tasty.','VEGETARIAN','https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','MOROCCAN','Grilled Salmon','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','BREAKFAST',1),(109,'22 min','2025-12-13 18:28:03.135940','Delicious homemade Mushroom Risotto. Very easy and tasty.','KETO','https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','AMERICAN','Mushroom Risotto','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','SNACK',1),(110,'48 min','2025-12-06 18:28:03.138936','Delicious homemade Tacos. Very easy and tasty.','VEGETARIAN','https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','FRENCH','Tacos','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','SNACK',2),(111,'56 min','2025-11-22 18:28:03.143415','Delicious homemade Burger & Fries. Very easy and tasty.','LOW_CARB','https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','HEALTHY','Burger & Fries','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','DESSERT',1),(112,'39 min','2025-12-12 18:28:03.145881','Delicious homemade Tomato Soup. Very easy and tasty.','KETO','https://images.unsplash.com/photo-1547592166-23acbe3226bf?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','AMERICAN','Tomato Soup','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','DESSERT',1),(113,'45 min','2025-11-18 18:28:03.151070','Delicious homemade Cheesecake. Very easy and tasty.','DIABETIC_FRIENDLY','https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','MEDITERRANEAN','Cheesecake','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','SNACK',2),(114,'20 min','2025-12-02 18:28:03.154311','Delicious homemade Apple Pie. Very easy and tasty.','HIGH_PROTEIN','https://images.unsplash.com/photo-1568571780765-92762279d0c9?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','JAPANESE','Apple Pie','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','APPETIZER',2),(115,'58 min','2025-11-27 18:28:03.157340','Delicious homemade Roast Chicken. Very easy and tasty.','LOW_CARB','https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','PASTRY','Roast Chicken','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','SAUCE',2),(116,'53 min','2025-12-12 18:28:03.160874','Delicious homemade Lasagna. Very easy and tasty.','VEGETARIAN','https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','AMERICAN','Lasagna','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','LUNCH',1),(117,'42 min','2025-12-05 18:28:03.164305','Delicious homemade Sushi Rolls. Very easy and tasty.','LOW_CARB','https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','OTHER','Sushi Rolls','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','DINNER',1),(118,'45 min','2025-12-03 18:28:03.167854','Delicious homemade French Toast. Very easy and tasty.','GLUTEN_FREE','https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','AMERICAN','French Toast','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','SNACK',1),(119,'15 min','2025-11-29 18:28:03.172236','Delicious homemade Greek Salad. Very easy and tasty.','DIABETIC_FRIENDLY','https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','MOROCCAN','Greek Salad','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','APPETIZER',1),(120,'23 min','2025-12-04 18:28:03.174299','Delicious homemade Pad Thai. Very easy and tasty.','LACTOSE_FREE','https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','FRENCH','Pad Thai','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','DESSERT',1),(125,'45 min','2025-12-19 00:24:29.483873','tajine','NONE',NULL,'eeee','OTHER','ee','','OTHER',1),(126,'','2025-12-19 00:27:54.848077','','NONE',NULL,'','OTHER','aa','','OTHER',1),(127,'','2025-12-19 00:31:18.985632','','NONE',NULL,'','OTHER','vv','','OTHER',1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `expiry_date` datetime(6) NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKghpmfn23vmxfu3spu3lfg4r2d` (`token`),
  KEY `FK1lih5y2npsf8u5o3vhdb9y0os` (`user_id`),
  CONSTRAINT `FK1lih5y2npsf8u5o3vhdb9y0os` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `avatar_url` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'2025-11-27 21:04:50.596778','imad@imad','imad eddine','$2a$10$a5v1exHfYE/7gvd8QPD2Yu1eUD4oeHkMuRnXYX37waE3X//rZ08I6','imad'),(2,NULL,'2025-12-11 21:33:48.818097','user@user','user','$2a$10$UcdTGKj/Y792ynO4mGJLMeyg.a/1Sm5Pea6Swz0W6pi7uBJ1gRNF.','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-21 16:39:33
