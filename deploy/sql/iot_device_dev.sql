-- MySQL dump 10.13  Distrib 8.0.24, for Linux (x86_64)
--
-- Host: localhost    Database: iot_device_dev
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
-- Table structure for table `alarm_configs`
--

DROP TABLE IF EXISTS `alarm_configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alarm_configs` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `config_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置编号',
  `config_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='告警配置表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alarm_configs`
--

LOCK TABLES `alarm_configs` WRITE;
/*!40000 ALTER TABLE `alarm_configs` DISABLE KEYS */;
INSERT INTO `alarm_configs` VALUES (1,'1','告警配置'),(2,'1','告警配置1');
/*!40000 ALTER TABLE `alarm_configs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alarm_records`
--

DROP TABLE IF EXISTS `alarm_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alarm_records` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `record_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '记录编号',
  `record_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '记录名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='告警记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alarm_records`
--

LOCK TABLES `alarm_records` WRITE;
/*!40000 ALTER TABLE `alarm_records` DISABLE KEYS */;
INSERT INTO `alarm_records` VALUES (1,'1','告警记录');
/*!40000 ALTER TABLE `alarm_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dev_devices`
--

DROP TABLE IF EXISTS `dev_devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dev_devices` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `device_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '设备编号',
  `device_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '设备名称',
  `product_id` int NOT NULL COMMENT '所属产品',
  `status` int NOT NULL COMMENT '是否在线：0：离线，1：在线',
  `enabled` int NOT NULL COMMENT '是否启用：0：禁用，1：启用',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '备注',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='设备表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dev_devices`
--

LOCK TABLES `dev_devices` WRITE;
/*!40000 ALTER TABLE `dev_devices` DISABLE KEYS */;
INSERT INTO `dev_devices` VALUES (2,'001','设备1',1,0,1,'','2023-07-05 23:14:42'),(6,'Deng','灯',4,0,1,'','0000-00-00 00:00:00'),(7,'kongt','空调',1,0,1,'家电11','0000-00-00 00:00:00'),(8,'reshuiq','热水器',1,0,1,'家用电器','0000-00-00 00:00:00'),(9,'shuilongt','水龙头',5,0,1,'家庭必须','0000-00-00 00:00:00'),(10,'guiz','柜子',10,0,1,'','0000-00-00 00:00:00'),(11,'wmx','物模型测试设备',1,0,1,'test','2023-08-02 16:39:29');
/*!40000 ALTER TABLE `dev_devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dev_physical_model_atrribute_records`
--

DROP TABLE IF EXISTS `dev_physical_model_atrribute_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dev_physical_model_atrribute_records` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `identifying` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标识',
  `value` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '值',
  `device_id` int NOT NULL COMMENT '设备编号',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='设备物模型属性记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dev_physical_model_atrribute_records`
--

LOCK TABLES `dev_physical_model_atrribute_records` WRITE;
/*!40000 ALTER TABLE `dev_physical_model_atrribute_records` DISABLE KEYS */;
INSERT INTO `dev_physical_model_atrribute_records` VALUES (1,'status','开',11,'2023-08-03 00:00:00'),(12,'temperature','27',11,'2023-08-03 18:00:00'),(13,'humidity','55',11,'2023-08-03 18:00:00'),(18,'temperature','14',11,'2023-08-04 08:19:55'),(19,'humidity','35',11,'2023-08-04 08:19:55'),(20,'temperature','12',2,'2023-08-05 21:58:41'),(21,'temperature','12',11,'2023-08-05 21:59:27'),(22,'temperature','13',2,'2023-08-05 22:22:07'),(23,'temperature','13',11,'2023-08-05 22:22:25'),(24,'temperature','14',11,'2023-08-05 22:22:34'),(25,'humidity','45',11,'2023-08-05 22:22:52'),(26,'status','0',11,'2023-08-05 22:23:06'),(27,'status','关',11,'2023-08-05 22:23:15'),(28,'humidity','44',11,'2023-08-05 22:25:06'),(29,'temperature','15',2,'2023-08-05 22:27:30'),(30,'temperature','15',11,'2023-08-05 22:28:22'),(31,'temperature','26',11,'2023-08-05 22:30:40'),(32,'temperature','27',2,'2023-08-05 22:35:15'),(33,'temperature','27',11,'2023-08-05 22:36:18'),(34,'humidity','51',11,'2023-08-05 22:36:18'),(35,'humidity','22',11,'2023-08-06 05:59:38'),(36,'temperature','32',11,'2023-08-06 05:59:38'),(37,'humidity','25',11,'2023-08-06 06:02:19'),(38,'temperature','26',11,'2023-08-06 06:02:19'),(39,'temperature','26',11,'2023-08-06 06:14:46'),(40,'humidity','25',11,'2023-08-06 06:14:46'),(41,'humidity','25',11,'2023-08-06 06:17:47'),(42,'temperature','26',11,'2023-08-06 06:17:47'),(43,'humidity','9',11,'2023-08-06 06:57:11'),(44,'temperature','7',11,'2023-08-06 06:57:11'),(45,'humidity','9',11,'2023-08-06 06:57:35'),(46,'temperature','7',11,'2023-08-06 06:57:35'),(47,'humidity','2',11,'2023-08-06 06:59:54'),(48,'temperature','1',11,'2023-08-06 06:59:54'),(49,'temperature','1',11,'2023-08-06 10:25:24'),(50,'humidity','2',11,'2023-08-06 10:25:24'),(51,'temperature','1',11,'2023-08-06 10:27:30'),(52,'humidity','2',11,'2023-08-06 10:27:30'),(53,'temperature','3',11,'2023-08-06 10:29:31'),(54,'humidity','4',11,'2023-08-06 10:29:31'),(55,'temperature','3',11,'2023-08-06 10:32:59'),(56,'humidity','4',11,'2023-08-06 10:32:59'),(57,'temperature','11',2,'2023-08-06 10:34:53'),(58,'humidity','22',2,'2023-08-06 10:34:53'),(59,'humidity','3',2,'2023-08-06 10:47:16'),(60,'temperature','2',2,'2023-08-06 10:47:16'),(61,'humidity','2',2,'2023-08-06 10:47:49'),(62,'temperature','5',2,'2023-08-06 10:47:49'),(63,'temperature','3',2,'2023-08-06 10:49:36'),(64,'humidity','4',2,'2023-08-06 10:49:36'),(65,'temperature','3',2,'2023-08-06 10:52:32'),(66,'humidity','4',2,'2023-08-06 10:52:32'),(67,'temperature','2',2,'2023-08-06 10:54:26'),(68,'humidity','6',2,'2023-08-06 10:54:26'),(69,'CurrentTemperature','1',2,'2023-08-06 10:58:11'),(70,'CurrentHumidity','21',2,'2023-08-06 10:58:11'),(71,'CurrentTemperature','1',2,'2023-08-06 11:01:02'),(72,'CurrentHumidity','21',2,'2023-08-06 11:01:02'),(73,'CurrentHumidity','21',11,'2023-08-06 11:01:10'),(74,'CurrentTemperature','1',11,'2023-08-06 11:01:10'),(75,'CurrentTemperature','1',11,'2023-08-06 11:10:54'),(76,'CurrentHumidity','21',11,'2023-08-06 11:10:54'),(77,'CurrentTemperature','3',2,'2023-08-06 11:18:05'),(78,'CurrentHumidity','4',2,'2023-08-06 11:18:05'),(79,'CurrentTemperature','5',2,'2023-08-06 11:19:55'),(80,'CurrentHumidity','6',2,'2023-08-06 11:19:55'),(81,'CurrentTemperature','5',11,'2023-08-06 11:20:02'),(82,'CurrentHumidity','6',11,'2023-08-06 11:20:02'),(83,'CurrentTemperature','7',11,'2023-08-06 11:20:09'),(84,'CurrentHumidity','8',11,'2023-08-06 11:20:09'),(85,'CurrentTemperature','2',11,'2023-08-06 11:47:37'),(86,'CurrentHumidity','3',11,'2023-08-06 11:47:37'),(87,'CurrentTemperature','3',11,'2023-08-06 21:48:39'),(88,'CurrentTemperature','26',11,'2023-08-06 21:51:53'),(89,'CurrentHumidity','34',11,'2023-08-06 21:51:53'),(90,'CurrentTemperature','25',11,'2023-08-07 10:48:28'),(91,'CurrentHumidity','70',11,'2023-08-07 10:48:28'),(92,'CurrentTemperature','24',11,'2023-08-14 11:01:36'),(93,'CurrentTemperature','23',11,'2023-08-14 11:14:06'),(94,'CurrentTemperature','23',11,'2023-08-14 11:15:10');
/*!40000 ALTER TABLE `dev_physical_model_atrribute_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dev_physical_model_event_records`
--

DROP TABLE IF EXISTS `dev_physical_model_event_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dev_physical_model_event_records` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `identifying` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标识',
  `input_params` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '输入参数',
  `device_id` int NOT NULL COMMENT '设备编号',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='设备物模型触发事件记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dev_physical_model_event_records`
--

LOCK TABLES `dev_physical_model_event_records` WRITE;
/*!40000 ALTER TABLE `dev_physical_model_event_records` DISABLE KEYS */;
INSERT INTO `dev_physical_model_event_records` VALUES (1,'click','[]',11,'2023-08-03 00:00:00'),(2,'message','{\"name\":\"test\",\"age\":12}',11,'2023-08-04 09:32:31');
/*!40000 ALTER TABLE `dev_physical_model_event_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dev_physical_model_function_records`
--

DROP TABLE IF EXISTS `dev_physical_model_function_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dev_physical_model_function_records` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `identifying` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标识',
  `input_params` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '输入参数',
  `out_params` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '输出参数',
  `device_id` int NOT NULL COMMENT '设备编号',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='设备物模型功能调用记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dev_physical_model_function_records`
--

LOCK TABLES `dev_physical_model_function_records` WRITE;
/*!40000 ALTER TABLE `dev_physical_model_function_records` DISABLE KEYS */;
INSERT INTO `dev_physical_model_function_records` VALUES (1,'start','[]','[]',11,'2023-08-03 00:00:00'),(2,'start','{\"name\":\"test\",\"age\":12}','{\"name\":\"test1\",\"age\":21}',11,'2023-08-04 09:28:38');
/*!40000 ALTER TABLE `dev_physical_model_function_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dev_physical_models`
--

DROP TABLE IF EXISTS `dev_physical_models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dev_physical_models` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `product_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '产品编号',
  `attributes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '属性',
  `functions` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '功能',
  `events` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '事件',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='物模型';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dev_physical_models`
--

LOCK TABLES `dev_physical_models` WRITE;
/*!40000 ALTER TABLE `dev_physical_models` DISABLE KEYS */;
INSERT INTO `dev_physical_models` VALUES (1,'1','[{\"identifying\":\"status\",\"name\":\"状态\",\"unit\":\"\",\"dataType\":\"bool\",\"remark\":\"状态：0-关，1-开\",\"read\":1},{\"identifying\":\"CurrentTemperature\",\"name\":\"温度\",\"unit\":\"℃\",\"dataType\":\"int\",\"remark\":\"温度范围：16~26\",\"read\":1},{\"identifying\":\"CurrentHumidity\",\"name\":\"湿度\",\"unit\":\"%\",\"dataType\":\"int\",\"remark\":\"湿度范围：30~70\",\"read\":1}]','[{\"identifying\":\"open\",\"name\":\"打开\",\"outputParams\":\"\",\"inputParams\":\"\",\"remark\":\"打开设备\",\"isAsync\":0},{\"identifying\":\"close\",\"name\":\"关闭\",\"outputParams\":\"\",\"inputParams\":\"\",\"remark\":\"关闭设备\",\"isAsync\":0}]','[{\"identifying\":\"message\",\"name\":\"消息\",\"outputParams\":\"\",\"remark\":\"\",\"level\":\"0\"},{\"identifying\":\"click\",\"name\":\"点击\",\"outputParams\":\"\",\"remark\":\"\",\"level\":\"0\"}]'),(2,'4','[]','[]','[]'),(3,'5','[]','[]','[]'),(4,'10','[]','[]','[]'),(5,'12','[]','[]','[]'),(6,'13','[]','[]','[]'),(7,'14','[]','[]','[]'),(8,'15','[]','[]','[]'),(9,'16','[]','[]','[]'),(10,'17','[]','[]','[]'),(11,'18','[]','[]','[]'),(12,'19','[]','[]','[]');
/*!40000 ALTER TABLE `dev_physical_models` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dev_product_types`
--

DROP TABLE IF EXISTS `dev_product_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dev_product_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_type_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `product_type_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `p_id` int NOT NULL COMMENT '父id',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='产品分类表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dev_product_types`
--

LOCK TABLES `dev_product_types` WRITE;
/*!40000 ALTER TABLE `dev_product_types` DISABLE KEYS */;
INSERT INTO `dev_product_types` VALUES (2,'test','监控',0,'2023-07-24 15:21:20',''),(3,'test1','摄像头',2,'2023-07-26 21:08:10',''),(4,'Deng','灯',0,'2023-07-26 21:08:55',''),(6,'Bingx','冰箱1',0,'2023-07-27 17:24:45',''),(7,'haier','海尔冰箱',6,'2023-07-27 17:25:42',''),(8,'kongt','空调',4,'2023-07-28 12:58:55','家庭必须品1111'),(9,'zhcs','智慧城市',0,'2023-08-14 22:04:48',''),(10,'ggfw','公共服务',9,'2023-08-14 22:05:30',''),(11,'tzcjq','WiFi探针采集器',10,'2023-08-14 22:06:17',''),(12,'zhsh','智慧生活',0,'2023-08-14 22:06:50',''),(13,'jjaf','家居安防',12,'2023-08-14 22:07:18',''),(14,'trqtcq','天然气探测器',13,'2023-08-14 22:07:47','');
/*!40000 ALTER TABLE `dev_product_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dev_products`
--

DROP TABLE IF EXISTS `dev_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dev_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `product_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category_mode` int NOT NULL COMMENT '品类方式：0：标准品类，1：自定义品类',
  `product_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '产品分类',
  `device_type` int NOT NULL COMMENT '设备类型',
  `access_protocol` int NOT NULL COMMENT '接入协议',
  `data_protocol` int NOT NULL COMMENT '数据协议',
  `network_mode` int NOT NULL COMMENT '联网方式',
  `access_key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '秘钥',
  `enabled` int NOT NULL COMMENT '是否启用：0：禁用，1：启用',
  `published` int NOT NULL COMMENT '发布状态：0：未发布，1：已发布,2：撤销发布',
  `product_key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '产品秘钥',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `publish_time` datetime DEFAULT NULL COMMENT '发布时间',
  `unpublish_time` datetime DEFAULT NULL COMMENT '撤销发布时间',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '备注',
  `product_secret` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '产品私密',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='产品表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dev_products`
--

LOCK TABLES `dev_products` WRITE;
/*!40000 ALTER TABLE `dev_products` DISABLE KEYS */;
INSERT INTO `dev_products` VALUES (5,'wlw','网联物11',0,'2',3,0,0,0,'',1,0,'','2023-07-27 10:53:35','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','',''),(10,'kongt','空调',0,'4',1,0,0,0,'',0,2,'','2023-07-28 12:15:28','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','家电111',''),(13,'test1','产品1',1,'1',0,0,0,0,'aaaaaaaaa',0,1,'bbbbbbb','2023-08-30 15:52:31',NULL,NULL,NULL,'','cccccccc'),(14,'wlwxm','物联网项目',0,'9,10,11',27,300,301,302,'aaaaaaaaa',0,2,'bbbbbbb','2023-08-30 18:47:59',NULL,NULL,NULL,'物联网','cccccccc'),(15,'wlwxmkf','物联网项目开发',0,'9,10,11',26,300,301,302,'aaaaaaaaa',1,2,'bbbbbbb','2023-08-30 19:01:48',NULL,NULL,NULL,'物联网项目开发','cccccccc'),(16,'ceshi','测试1111',1,'9,10,11',27,300,301,305,'aaaaaaaaa',0,2,'bbbbbbb','2023-08-30 21:19:32',NULL,NULL,NULL,'测试','cccccccc'),(17,'product','产品测试',0,'9,10,11',27,300,301,304,'aaaaaaaaa',1,1,'bbbbbbb','2023-09-09 21:51:41',NULL,NULL,NULL,'11','cccccccc'),(19,'zhanglp-test1','张-产品测试',0,'4,8',26,300,301,303,'aaaaaaaaa',1,1,'bbbbbbb','2023-09-12 22:27:45','2023-09-12 23:24:17','2023-09-12 23:24:17','2023-09-12 23:22:00','测试产品','cccccccc');
/*!40000 ALTER TABLE `dev_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice_configs`
--

DROP TABLE IF EXISTS `notice_configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_configs` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `config_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置编号',
  `config_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='通知配置表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice_configs`
--

LOCK TABLES `notice_configs` WRITE;
/*!40000 ALTER TABLE `notice_configs` DISABLE KEYS */;
INSERT INTO `notice_configs` VALUES (1,'1','通知配置');
/*!40000 ALTER TABLE `notice_configs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice_templates`
--

DROP TABLE IF EXISTS `notice_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_templates` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `template_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模板编号',
  `template_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模板名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='通知模板表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice_templates`
--

LOCK TABLES `notice_templates` WRITE;
/*!40000 ALTER TABLE `notice_templates` DISABLE KEYS */;
INSERT INTO `notice_templates` VALUES (1,'1','通知模板1');
/*!40000 ALTER TABLE `notice_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'iot_device_dev'
--

--
-- Dumping routines for database 'iot_device_dev'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-31  0:15:39
