-- MySQL dump 10.13  Distrib 8.0.24, for Linux (x86_64)
--
-- Host: localhost    Database: order_order_dev
-- ------------------------------------------------------
-- Server version	8.0.24

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
-- Table structure for table `order_orders`
--

DROP TABLE IF EXISTS `order_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_orders` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `order_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单编号',
  `order_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单名称',
  `intro` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '介绍',
  `img_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单图片',
  `status` int DEFAULT NULL COMMENT '订单状态：0：审核中；1：审核失败；2：派单中；3：派单失败；4：开发中；5：测试中；6：交付失败；7：完成',
  `deleted` int NOT NULL COMMENT '删除：0：未删除；1：已删除；',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `delivery_time` datetime DEFAULT NULL COMMENT '交付时间',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='订单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_orders`
--

LOCK TABLES `order_orders` WRITE;
/*!40000 ALTER TABLE `order_orders` DISABLE KEYS */;
INSERT INTO `order_orders` VALUES (13,'202310193547121','测试订单','解决vue2bug','blob:http://localhost:6100/4cefe8b6-f2b6-4ca6-bb2d-4cadc6f375da',2,0,'2023-10-01 01:35:48','2023-10-18 00:00:00','测试备注');
/*!40000 ALTER TABLE `order_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_recharge_orders`
--

DROP TABLE IF EXISTS `order_recharge_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_recharge_orders` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `recharge_order_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '充值订单编号',
  `u_id` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户主键',
  `amount` decimal(10,0) NOT NULL COMMENT '金额',
  `status` int DEFAULT NULL COMMENT '订单状态：0：待支付中；1：支付失败；2：支付成功；',
  `deleted` int NOT NULL COMMENT '删除：0：未删除；1：已删除；',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='订单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_recharge_orders`
--

LOCK TABLES `order_recharge_orders` WRITE;
/*!40000 ALTER TABLE `order_recharge_orders` DISABLE KEYS */;
INSERT INTO `order_recharge_orders` VALUES (14,'CZ_2023104133454131','1',10,2,0,'2023-10-04 05:34:54','已返回支付宝链接，等待用户支付.');
/*!40000 ALTER TABLE `order_recharge_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'order_order_dev'
--

--
-- Dumping routines for database 'order_order_dev'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-31  0:27:52
