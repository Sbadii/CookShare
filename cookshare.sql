-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: cookshare
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
  `author_id` bigint NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `content` text,
  PRIMARY KEY (`id`),
  KEY `FKn2na60ukhs76ibtpt9burkm27` (`author_id`),
  KEY `FKh4c7lvsc298whoyd4w9ta25cr` (`post_id`),
  CONSTRAINT `FKh4c7lvsc298whoyd4w9ta25cr` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `FKn2na60ukhs76ibtpt9burkm27` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'2025-12-27 15:59:00.908171',1,202,'hey');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
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
  `date` date NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `meal_type` varchar(255) NOT NULL,
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
  `author_id` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cooking_time` varchar(255) DEFAULT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `ingredients` text,
  `title` varchar(255) DEFAULT NULL,
  `tutorial` text,
  `diet` enum('DIABETIC_FRIENDLY','GLUTEN_FREE','HIGH_PROTEIN','KETO','LACTOSE_FREE','LOW_CARB','NONE','VEGAN','VEGETARIAN') DEFAULT NULL,
  `theme` enum('AMERICAN','CHINESE','FRENCH','HEALTHY','INDIAN','ITALIAN','JAPANESE','MEDITERRANEAN','MOROCCAN','OTHER','PASTRY') DEFAULT NULL,
  `type` enum('APPETIZER','BREAKFAST','DESSERT','DINNER','DRINK','LUNCH','OTHER','SAUCE','SNACK') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6xvn0811tkyo3nfjk2xvqx6ns` (`author_id`),
  CONSTRAINT `FK6xvn0811tkyo3nfjk2xvqx6ns` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=222 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'2025-12-02 18:28:03.074205',101,'58 min','Delicious homemade Spaghetti Carbonara. Very easy and tasty.','https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','Spaghetti Carbonara','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','LACTOSE_FREE','PASTRY','DINNER'),(1,'2025-12-14 18:28:03.107415',102,'41 min','Delicious homemade Chicken Curry. Very easy and tasty.','https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','Chicken Curry','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','DIABETIC_FRIENDLY','JAPANESE','SAUCE'),(1,'2025-11-18 18:28:03.110943',103,'53 min','Delicious homemade Beef Stroganoff. Very easy and tasty.','https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','Beef Stroganoff','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','GLUTEN_FREE','OTHER','DINNER'),(2,'2025-11-25 18:28:03.115090',104,'39 min','Delicious homemade Vegetable Stir Fry. Very easy and tasty.','https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','Vegetable Stir Fry','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','GLUTEN_FREE','JAPANESE','APPETIZER'),(2,'2025-11-17 18:28:03.119405',105,'26 min','Delicious homemade Caesar Salad. Very easy and tasty.','https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','Caesar Salad','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','NONE','MOROCCAN','DRINK'),(1,'2025-12-09 18:28:03.121876',106,'41 min','Delicious homemade Chocolate Cake. Very easy and tasty.','https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','Chocolate Cake','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','LOW_CARB','OTHER','APPETIZER'),(1,'2025-12-06 18:28:03.128822',107,'50 min','Delicious homemade Pancakes. Very easy and tasty.','https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','Pancakes','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','LOW_CARB','PASTRY','DRINK'),(1,'2025-12-13 18:28:03.135940',109,'22 min','Delicious homemade Mushroom Risotto. Very easy and tasty.','https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','Mushroom Risotto','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','KETO','AMERICAN','SNACK'),(2,'2025-12-06 18:28:03.138936',110,'48 min','Delicious homemade Tacos. Very easy and tasty.','https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=60','Salt, Pepper, Main Ingredient, Love','Tacos','Step 1: Prep ingredients. Step 2: Cook. Step 3: Serve.','VEGETARIAN','FRENCH','SNACK'),(1,'2025-12-21 17:27:43.000000',201,'30 min','Classic Italian Margherita pizza with fresh basil and mozzarella.','https://images.unsplash.com/photo-1601924582975-7e2c06f37c89?auto=format&fit=crop&w=800&q=60','Flour, Tomato, Mozzarella, Basil, Olive oil','Margherita Pizza','Prepare dough, add toppings, bake at 220°C.','VEGETARIAN','ITALIAN','DINNER'),(2,'2025-12-21 17:27:43.000000',202,'25 min','Healthy avocado toast with eggs and sesame seeds.','https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=60','Bread, Avocado, Eggs, Sesame','Avocado Toast','Toast bread, smash avocado, add egg.','LOW_CARB','HEALTHY','BREAKFAST'),(1,'2025-12-21 17:27:43.000000',203,'45 min','Creamy mushroom pasta with garlic and parmesan.','https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=60','Pasta, Mushrooms, Garlic, Cream','Mushroom Pasta','Cook pasta, sauté mushrooms, mix sauce.','VEGETARIAN','ITALIAN','DINNER'),(1,'2025-12-21 17:27:43.000000',204,'20 min','Fresh Greek salad with feta cheese and olives.','https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=60','Tomatoes, Cucumber, Feta, Olives','Greek Salad','Chop vegetables and mix.','DIABETIC_FRIENDLY','MEDITERRANEAN','APPETIZER'),(2,'2025-12-21 17:27:43.000000',205,'50 min','Slow cooked Moroccan chicken with spices.','https://images.unsplash.com/photo-1604908177522-937e73c0bb42?auto=format&fit=crop&w=800&q=60','Chicken, Onion, Ginger, Spices','Moroccan Chicken Tagine','Cook slowly with spices.','HIGH_PROTEIN','MOROCCAN','DINNER'),(1,'2025-12-21 17:27:43.000000',206,'35 min','Japanese ramen with soft-boiled eggs.','https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=60','Noodles, Eggs, Broth, Soy sauce','Ramen Bowl','Prepare broth, cook noodles.','NONE','JAPANESE','DINNER'),(2,'2025-12-21 17:27:43.000000',207,'15 min','Protein smoothie with banana and peanut butter.','https://images.unsplash.com/photo-1553530666-5b1a4c5a82c4?auto=format&fit=crop&w=800&q=60','Banana, Milk, Peanut butter','Protein Smoothie','Blend all ingredients.','HIGH_PROTEIN','HEALTHY','DRINK'),(1,'2025-12-21 17:27:43.000000',208,'40 min','Classic American cheeseburger.','https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=60','Beef, Cheese, Bun','Cheeseburger','Grill meat and assemble.','NONE','AMERICAN','DINNER'),(2,'2025-12-21 17:27:43.000000',209,'55 min','Oven baked salmon with lemon and herbs.','https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60','Salmon, Lemon, Herbs','Lemon Salmon','Bake salmon at 180°C.','KETO','HEALTHY','DINNER'),(1,'2025-12-21 17:27:43.000000',210,'18 min','French omelette with cheese.','https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=60','Eggs, Butter, Cheese','Cheese Omelette','Cook gently on low heat.','LOW_CARB','FRENCH','BREAKFAST'),(2,'2025-12-21 17:27:43.000000',211,'60 min','Traditional beef lasagna.','https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=60','Pasta sheets, Beef, Tomato sauce','Beef Lasagna','Layer ingredients and bake.','HIGH_PROTEIN','ITALIAN','DINNER'),(1,'2025-12-21 17:27:43.000000',212,'25 min','Healthy quinoa bowl with vegetables.','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=60','Quinoa, Vegetables','Quinoa Bowl','Cook quinoa and mix.','VEGAN','HEALTHY','LUNCH'),(2,'2025-12-21 17:27:43.000000',213,'35 min','Spicy Thai noodles.','https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=800&q=60','Noodles, Chili, Vegetables','Thai Noodles','Stir fry ingredients.','LOW_CARB','OTHER','DINNER'),(1,'2025-12-21 17:27:43.000000',214,'20 min','Fresh fruit salad.','https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=60','Seasonal fruits','Fruit Salad','Cut fruits and mix.','VEGAN','HEALTHY','SNACK'),(2,'2025-12-21 17:27:43.000000',215,'50 min','Baked chicken breast with vegetables.','https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=60','Chicken, Vegetables','Baked Chicken','Bake at 180°C.','HIGH_PROTEIN','HEALTHY','DINNER'),(1,'2025-12-21 17:27:43.000000',216,'15 min','Classic pancakes with maple syrup.','https://images.unsplash.com/photo-1495214783159-3503fd1b572d?auto=format&fit=crop&w=800&q=60','Flour, Milk, Eggs','Pancakes','Cook on pan.','VEGETARIAN','AMERICAN','BREAKFAST'),(2,'2025-12-21 17:27:43.000000',217,'45 min','Vegetarian couscous.','https://images.unsplash.com/photo-1605478031159-bb5c1c6fa3e2?auto=format&fit=crop&w=800&q=60','Couscous, Vegetables','Vegetable Couscous','Steam couscous.','VEGAN','MOROCCAN','LUNCH'),(1,'2025-12-21 17:27:43.000000',218,'30 min','Garlic shrimp pasta.','https://images.unsplash.com/photo-1608756687919-5b4f8b1a0d8c?auto=format&fit=crop&w=800&q=60','Shrimp, Pasta, Garlic','Garlic Shrimp Pasta','Cook shrimp and pasta.','HIGH_PROTEIN','ITALIAN','DINNER'),(2,'2025-12-21 17:27:43.000000',219,'10 min','Fresh orange juice.','https://images.unsplash.com/photo-1582719478181-2c0d6fa7e8d3?auto=format&fit=crop&w=800&q=60','Oranges','Orange Juice','Squeeze oranges.','NONE','HEALTHY','DRINK'),(1,'2025-12-21 17:27:43.000000',220,'40 min','Baked vegetable gratin.','https://images.unsplash.com/photo-1540189549336-6e99c3679fe?auto=format&fit=crop&w=800&q=60','Vegetables, Cream','Vegetable Gratin','Bake until golden.','VEGETARIAN','FRENCH','DINNER'),(1,'2025-12-21 19:03:11.061451',221,'','','http://localhost:8080/uploads/1766340191051_smiley_nb.png','df','er','df','NONE','OTHER','OTHER');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `expiry_date` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `token` varchar(255) NOT NULL,
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
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `avatar_url` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2025-12-21 17:05:31.238605',1,NULL,'imad@imad','imad eddine amraqui','$2a$10$XocrS4ncnqrhLMP5.cJexu7AKOxmwUbZsSGYLQAR6wfj6RW47/bie','imadEddine'),('2025-12-21 17:06:06.481722',2,NULL,'user1@user1','user1','$2a$10$kl2aujntAfdMW8Mix0jZp.Q5lOT31t5rVZRd.jMxlvyct173Mp0ku','user1'),('2025-12-21 18:09:10.791636',3,NULL,'test@example.com','Test User','$2a$10$vwLmI8bpnqTluqEL16I5YukNR8tW7ssTCwqSDJvMkb0HgXSDmF7nq','testuser');
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

-- Dump completed on 2025-12-28 16:01:58
