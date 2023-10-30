-- MySQL dump 10.13  Distrib 8.0.24, for Linux (x86_64)
--
-- Host: localhost    Database: quick_log_v2
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
-- Table structure for table `sys_logs`
--

DROP TABLE IF EXISTS `sys_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_logs` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` int DEFAULT NULL COMMENT '日志类型：0:操作日志;1.异常日志',
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ip地址',
  `request` json DEFAULT NULL COMMENT '请求参数',
  `response` json NOT NULL COMMENT '响应',
  `exception` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '异常',
  `duration` int NOT NULL COMMENT '耗时（ms）',
  `operate_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '操作人编号',
  `create_time` datetime NOT NULL COMMENT '日志时间',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=199968 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_logs`
--

LOCK TABLES `sys_logs` WRITE;
/*!40000 ALTER TABLE `sys_logs` DISABLE KEYS */;
INSERT INTO `sys_logs` VALUES (199967,0,'127.0.0.1','{\"url\": \"/api/v2/system/users?keyword=&current=1&size=10\", \"body\": {}, \"query\": {\"size\": \"10\", \"current\": \"1\", \"keyword\": \"\"}, \"method\": \"GET\", \"params\": {}}','{\"msg\": \"操作成功.\", \"data\": {\"total\": 4, \"payload\": [{\"id\": 116, \"email\": \"\", \"phone\": \"\", \"avatar\": null, \"remark\": \"\", \"userId\": \"YH_0003\", \"address\": \"\", \"deleted\": 0, \"enabled\": 1, \"fullName\": \"测试\", \"password\": \"14e1b600b1fd579f47433b88e8d85291\", \"userName\": \"test\", \"createTime\": \"2023-09-21 11:28:35\"}, {\"id\": 115, \"email\": \"\", \"phone\": \"\", \"avatar\": null, \"remark\": \"\", \"userId\": \"YH_0002\", \"address\": \"\", \"deleted\": 0, \"enabled\": 1, \"fullName\": \"普通用户\", \"password\": \"14e1b600b1fd579f47433b88e8d85291\", \"userName\": \"user\", \"createTime\": \"2023-09-21 11:27:28\"}, {\"id\": 114, \"email\": \"zhanglp15229380174@163.com\", \"phone\": \"15229380174\", \"avatar\": null, \"remark\": \"管理员（请误删）\", \"userId\": \"YH_0001\", \"address\": \"北京\", \"deleted\": 0, \"enabled\": 1, \"fullName\": \"管理员\", \"password\": \"14e1b600b1fd579f47433b88e8d85291\", \"userName\": \"admin\", \"createTime\": \"2023-09-19 11:01:20\"}]}, \"status\": 0}',NULL,6,'admin','2023-10-31 00:01:10',NULL);
/*!40000 ALTER TABLE `sys_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'quick_log_v2'
--

--
-- Dumping routines for database 'quick_log_v2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-31  0:01:23
