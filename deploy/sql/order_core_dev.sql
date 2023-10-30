-- MySQL dump 10.13  Distrib 8.0.24, for Linux (x86_64)
--
-- Host: localhost    Database: order_core_dev
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
-- Table structure for table `chat_messages`
--

DROP TABLE IF EXISTS `chat_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_messages` (
  `id` int NOT NULL COMMENT '主键',
  `send_id` int NOT NULL COMMENT '发送人Id',
  `recevice_id` int NOT NULL COMMENT '接收人Id',
  `type` int NOT NULL COMMENT '消息类型：0：文本；1：表情；2：图片；3：语音；4.视频；5：文件；',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_messages`
--

LOCK TABLES `chat_messages` WRITE;
/*!40000 ALTER TABLE `chat_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `per_role_apis`
--

DROP TABLE IF EXISTS `per_role_apis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `per_role_apis` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` int NOT NULL COMMENT '角色编号',
  `api_id` int NOT NULL COMMENT '接口编号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `per_role_apis`
--

LOCK TABLES `per_role_apis` WRITE;
/*!40000 ALTER TABLE `per_role_apis` DISABLE KEYS */;
INSERT INTO `per_role_apis` VALUES (1,6,1),(2,1,1),(3,1,1),(4,1,1),(5,1,1),(6,1,1);
/*!40000 ALTER TABLE `per_role_apis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `per_role_menus`
--

DROP TABLE IF EXISTS `per_role_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `per_role_menus` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` int NOT NULL COMMENT '角色编号',
  `menu_id` int NOT NULL COMMENT '菜单编号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1202 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `per_role_menus`
--

LOCK TABLES `per_role_menus` WRITE;
/*!40000 ALTER TABLE `per_role_menus` DISABLE KEYS */;
INSERT INTO `per_role_menus` VALUES (664,9,8),(665,9,9),(666,2,27),(667,2,29),(668,2,28),(669,2,30),(670,2,31),(671,3,43),(672,3,27),(673,3,29),(674,3,28),(675,3,30),(676,3,31),(844,7,82),(845,7,83),(846,7,84),(1165,1,117),(1166,1,119),(1167,1,120),(1168,1,104),(1169,1,105),(1170,1,106),(1171,1,68),(1172,1,69),(1173,1,70),(1174,1,71),(1175,1,72),(1176,1,73),(1177,1,75),(1178,1,8),(1179,1,79),(1180,1,86),(1181,1,10),(1182,1,80),(1183,1,11),(1184,1,13),(1185,1,76),(1186,1,77),(1187,1,81),(1188,1,82),(1189,1,83),(1190,1,87),(1191,1,89),(1192,1,90),(1193,1,92),(1194,1,93),(1195,1,94),(1196,1,43),(1197,1,27),(1198,1,29),(1199,1,28),(1200,1,30),(1201,1,31);
/*!40000 ALTER TABLE `per_role_menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `per_user_roles`
--

DROP TABLE IF EXISTS `per_user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `per_user_roles` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int NOT NULL COMMENT '用户编号',
  `role_id` int NOT NULL COMMENT '角色编号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `per_user_roles`
--

LOCK TABLES `per_user_roles` WRITE;
/*!40000 ALTER TABLE `per_user_roles` DISABLE KEYS */;
INSERT INTO `per_user_roles` VALUES (10,68,2),(24,1,1),(25,1,9),(26,2,9),(27,3,9),(28,81,3),(29,112,7);
/*!40000 ALTER TABLE `per_user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_apis`
--

DROP TABLE IF EXISTS `sys_apis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_apis` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `api_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '接口编号',
  `api_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '接口名称',
  `api_path` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '接口地址',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_apis`
--

LOCK TABLES `sys_apis` WRITE;
/*!40000 ALTER TABLE `sys_apis` DISABLE KEYS */;
INSERT INTO `sys_apis` VALUES (1,'dept','部门列表','/api/v2/system/depts','2023-04-16 17:07:54','测试');
/*!40000 ALTER TABLE `sys_apis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_depts`
--

DROP TABLE IF EXISTS `sys_depts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_depts` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `dept_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '部门编号',
  `dept_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '部门名称',
  `p_id` int DEFAULT NULL COMMENT '父级部门id',
  `create_time` int NOT NULL COMMENT '创建时间',
  `remark` int DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_depts`
--

LOCK TABLES `sys_depts` WRITE;
/*!40000 ALTER TABLE `sys_depts` DISABLE KEYS */;
INSERT INTO `sys_depts` VALUES (20,'BM_0001','集团',0,0,0),(56,'ainiteam','艾尼科技',20,0,0),(57,'Sales ','销售部门',56,0,0),(58,'development ','开发部',56,0,0),(59,'test','测试公司',20,0,0);
/*!40000 ALTER TABLE `sys_depts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_dictionaries`
--

DROP TABLE IF EXISTS `sys_dictionaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_dictionaries` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '编号',
  `dic_type_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典类型',
  `dic_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典编号',
  `dic_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典名称',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_dictionaries`
--

LOCK TABLES `sys_dictionaries` WRITE;
/*!40000 ALTER TABLE `sys_dictionaries` DISABLE KEYS */;
INSERT INTO `sys_dictionaries` VALUES (1,'gender','1','男','0000-00-00 00:00:00',''),(2,'gender','2','女','0000-00-00 00:00:00',''),(3,'keyword','3','有偿','0000-00-00 00:00:00',''),(4,'keyword','4','付费','0000-00-00 00:00:00',''),(5,'keyword','4','帮忙','0000-00-00 00:00:00',''),(6,'keyword','5','花钱','0000-00-00 00:00:00',''),(7,'keyword','6','掏钱','0000-00-00 00:00:00',''),(8,'keyword','7','有接单的','0000-00-00 00:00:00',''),(9,'keyword','8','谁接单','0000-00-00 00:00:00',''),(10,'keyword','9','人接单','0000-00-00 00:00:00',''),(11,'keyword','10','解决问题','0000-00-00 00:00:00',''),(12,'keyword','11','求助','0000-00-00 00:00:00',''),(13,'keyword','12','帮助','0000-00-00 00:00:00',''),(14,'keyword','13','帮忙','0000-00-00 00:00:00',''),(15,'keyword','14','联系我','0000-00-00 00:00:00',''),(17,'keyword','15','有可以做的技术','0000-00-00 00:00:00',''),(20,'','ff','s','0000-00-00 00:00:00',''),(21,'orderStatus','0','审核中','2023-10-01 12:01:23',NULL),(22,'orderStatus','1','审核失败','2023-10-01 12:02:06',NULL),(23,'orderStatus','2','待接单','2023-10-01 12:16:00',NULL),(24,'orderStatus','3','进行中','2023-10-01 12:16:18',NULL),(25,'orderStatus','4','已完成','2023-10-01 12:16:31',NULL),(26,'orderStatus','5','测试中','2023-10-01 12:16:43',NULL),(27,'orderStatus','6','交付失败','2023-10-01 12:17:24',NULL),(28,'orderStatus','7','完成','2023-10-01 12:17:32',NULL),(29,'recharge_order_status','0','待支付','2023-10-04 23:55:36',NULL),(30,'recharge_order_status','1','支付失败','2023-10-04 23:55:44',NULL),(31,'recharge_order_status','2','支付成功','2023-10-04 23:55:54',NULL);
/*!40000 ALTER TABLE `sys_dictionaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_dictionary_types`
--

DROP TABLE IF EXISTS `sys_dictionary_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_dictionary_types` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '编号',
  `dic_type_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典类型编码',
  `dic_type_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典类型名称',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='字典分类';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_dictionary_types`
--

LOCK TABLES `sys_dictionary_types` WRITE;
/*!40000 ALTER TABLE `sys_dictionary_types` DISABLE KEYS */;
INSERT INTO `sys_dictionary_types` VALUES (1,'gender','性别','0000-00-00 00:00:00',''),(2,'keyword','关键字','0000-00-00 00:00:00',''),(3,'orderStatus','订单状态','2023-10-01 09:55:01',NULL),(4,'recharge_order_status','充值订单状态','2023-10-04 23:54:38',NULL);
/*!40000 ALTER TABLE `sys_dictionary_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_menus`
--

DROP TABLE IF EXISTS `sys_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_menus` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `menu_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单编号',
  `menu_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单名称',
  `path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '路由',
  `view_path` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '视图',
  `menu_type` int NOT NULL COMMENT '菜单类型：0：目录，1：菜单，2：按钮',
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '图标',
  `sort` int NOT NULL COMMENT '排序',
  `p_id` int NOT NULL COMMENT '父id',
  `link` int NOT NULL COMMENT '是否外链：0：否，1：是',
  `link_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '链接地址',
  `enabled` int NOT NULL COMMENT '是否启用：0：禁用，1：启用',
  `status` int NOT NULL COMMENT '是否显示：0：隐藏，1：显示',
  `cache` int NOT NULL COMMENT '是否缓存：0：不缓存，1：缓存',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '备注',
  `deleted` int NOT NULL COMMENT '删除：0：未删除，1：已删除	',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_menus`
--

LOCK TABLES `sys_menus` WRITE;
/*!40000 ALTER TABLE `sys_menus` DISABLE KEYS */;
INSERT INTO `sys_menus` VALUES (1,'systemManager','系统管理','/system','',0,'user',1,0,0,'',1,1,1,'0000-00-00 00:00:00','',0),(2,'userManager','用户管理','/system/user','',1,'user-filled',2,1,0,'',1,1,1,'0000-00-00 00:00:00','',0),(3,'roleManager','角色管理','/system/role','',1,'Apple',3,1,0,'',1,1,1,'0000-00-00 00:00:00','',0),(4,'menuManager','菜单管理','/system/menu','',1,'BellFilled',4,1,0,'',1,1,1,'0000-00-00 00:00:00','',0),(5,'deptManager','部门管理','/system/dept','',1,'Bicycle',5,1,0,'',1,1,1,'0000-00-00 00:00:00','',0),(6,'dictionaryType','字典分类','/system/dictionaryType','',1,'Collection',5,1,0,'',1,1,1,'0000-00-00 00:00:00','',0),(7,'dictionaryManager','字典管理','/system/dictionary','',1,'Link',7,1,0,'',1,1,1,'0000-00-00 00:00:00','',0),(8,'add','新增',NULL,'',2,NULL,1,2,0,'',1,1,1,'0000-00-00 00:00:00','',0),(9,'delete','删除',NULL,'',2,NULL,2,2,0,'',1,1,1,'0000-00-00 00:00:00','',0),(10,'edit','编辑',NULL,'',2,NULL,3,2,0,'',1,1,1,'0000-00-00 00:00:00','',0),(11,'add','新增',NULL,'',2,NULL,1,3,0,'',1,1,1,'0000-00-00 00:00:00','',0),(12,'delete','删除',NULL,'',2,NULL,2,3,0,'',1,1,1,'0000-00-00 00:00:00','',0),(13,'edit','编辑',NULL,'',2,NULL,3,3,0,'',1,1,1,'0000-00-00 00:00:00','',0),(14,'permission','权限管理','/permission','',0,'Cloudy',2,0,0,'',1,1,1,'0000-00-00 00:00:00','',0),(15,'assignUser','分配用户','/permission/assignUser','',1,'Filter',1,14,0,'',1,1,1,'0000-00-00 00:00:00','',0),(16,'rolePermission','角色权限','/permission/rolePermission','',1,'CircleCheckFilled',2,14,0,'',1,1,1,'0000-00-00 00:00:00','',0),(23,'logManager','日志管理','/system/log','',0,'Notification',8,1,0,'',1,1,1,'0000-00-00 00:00:00','',0),(24,'operate','操作日志','/system/log/operate','/system/log/operate',1,'Edit',1,23,0,'',1,1,1,'0000-00-00 00:00:00','',0),(25,'error','错误日志','/system/log/error','/system/log/error',1,'Download',2,23,0,'',1,1,1,'0000-00-00 00:00:00','',0),(26,'help','相关帮助','/help','',0,'Food',4,0,0,'',1,1,1,'0000-00-00 00:00:00','',0),(27,'document','开发文档','/helper/document','',1,'IceCream',1,26,1,'https://doc.ainiteam.com/',1,1,1,'0000-00-00 00:00:00','',0),(28,'gitee','码云','gitee','',1,'Watch',3,26,1,'https://gitee.com/zhanglp520/quick-vue3-admin',1,1,1,'0000-00-00 00:00:00','',0),(29,'apiDocument','接口文档','','',1,'Aim',2,26,1,'https://console-docs.apipost.cn/preview/0e11a2eb3c3883a7/4fff7a394c074ac7',1,1,1,'0000-00-00 00:00:00','',0),(30,'github','github','','',1,'Clock',4,26,1,'https://github.com/zhanglp520/quick-vue3-admin..git',1,1,1,'0000-00-00 00:00:00','',0),(31,'gitlab','gitlab','','',1,'Chicken',5,26,1,'http://110.42.130.88:8099/zhanglp520/quick-vue3-admin.git',1,1,1,'0000-00-00 00:00:00','',0),(33,'resourceManagement','资源管理','/resourceManagement','',0,'Aim',3,0,0,'',1,1,1,'0000-00-00 00:00:00','',0),(34,'attachmentManagement','附件管理','/resource/attachment','',1,'Coin',1,33,0,'',1,1,1,'0000-00-00 00:00:00','',0),(35,'storageManagement','存储管理','/resource/storage','',0,'CopyDocument',2,33,0,'',1,1,1,'0000-00-00 00:00:00','',0),(36,'smsManagement','短信管理','/resource/sms','',0,'CoffeeCup',3,33,0,'',1,1,1,'0000-00-00 00:00:00','',0),(37,'smsTemplate','短信模板','/resource/sms/template','',1,'Basketball',1,36,0,'',1,1,1,'0000-00-00 00:00:00','',0),(38,'smsConfig','短信配置','/resource/sms/config','',1,'Bell',2,36,0,'',1,1,1,'0000-00-00 00:00:00','',0),(39,'objectStore','对象存储','/resource/storage/object','',1,'Help',0,35,0,'',1,1,1,'0000-00-00 00:00:00','',0),(40,'generalStore','普通存储','/resource/storage/general','',1,'Chicken',2,35,0,'',1,1,1,'0000-00-00 00:00:00','',0),(41,'signature','签名管理','/resource/sms/signature','',1,'Bell',3,36,0,'',1,1,1,'0000-00-00 00:00:00','',0),(43,'productIntroduction','产品介绍','/help/productIntroduction','',1,'Aim',0,26,0,'',1,1,1,'0000-00-00 00:00:00','',0),(44,'business','业务平台','','',0,'AlarmClock',0,0,0,'',1,0,1,'0000-00-00 00:00:00','',0),(45,'businessOrder','订单管理系统','','',1,'AlarmClock',1,44,1,'https://order.ainiteam.com/',1,0,1,'0000-00-00 00:00:00','',0),(46,'businessDispath','调度平台','','',1,'AlarmClock',1,44,1,'https://dispatch.ainiteam.com/',1,0,1,'0000-00-00 00:00:00','',0),(47,'businessChat','聊天系统','','',1,'AlarmClock',1,44,1,'https://dispatch.ainiteam.com/',1,0,1,'0000-00-00 00:00:00','',0),(48,'businessVideo','音视系统','','',1,'AlarmClock',1,44,1,'https://dispatch.ainiteam.com/',1,0,1,'0000-00-00 00:00:00','',0),(49,'businessMonitor','监控系统','','',1,'AlarmClock',1,44,1,'https://dispatch.ainiteam.com/',1,0,1,'0000-00-00 00:00:00','',0),(50,'businessMarket','商城系统','','',1,'AlarmClock',1,44,1,'https://dispatch.ainiteam.com/',1,0,1,'0000-00-00 00:00:00','',0),(51,'businessIOT','物联网平台','','',1,'AlarmClock',1,44,1,'https://iot.ainiteam.com/',1,0,1,'0000-00-00 00:00:00','',0),(52,'businessTakeaway','外卖系统','','',1,'AlarmClock',1,44,1,'https://iot.ainiteam.com/',1,0,1,'0000-00-00 00:00:00','',0),(53,'businessERP','ERP系统','','',1,'AlarmClock',1,44,1,'https://iot.ainiteam.com/',1,0,1,'0000-00-00 00:00:00','',0),(54,'businessCMS','CMS系统','','',1,'AlarmClock',1,44,1,'https://iot.ainiteam.com/',1,0,1,'0000-00-00 00:00:00','',0),(55,'businessOA','OA系统','','',1,'AlarmClock',1,44,1,'https://iot.ainiteam.com/',1,0,1,'0000-00-00 00:00:00','',0),(56,'businessLogistics ','物流管理系统','','',1,'AlarmClock',1,44,1,'https://iot.ainiteam.com/',1,0,1,'0000-00-00 00:00:00','',0),(57,'businessCRM','CRM管理系统','','',1,'AlarmClock',1,44,1,'https://iot.ainiteam.com/',1,0,1,'0000-00-00 00:00:00','',0),(58,'developerTools','开发者工具','/developerTools','/app-tools/index',0,'quick-banquan',0,0,0,'',1,1,1,'0000-00-00 00:00:00','',0),(59,'flexDebug','弹性布局','/app-tools/developerTools/flexDebug','/app-tools/index',1,'Aim',0,58,0,'',1,1,1,'0000-00-00 00:00:00','',0),(60,'databaseManager','数据库管理','/database','',0,'AddLocation',0,0,0,'',1,1,1,'0000-00-00 00:00:00','',0),(61,'workflow','工作流','/workflow','',0,'Aim',0,0,0,'',1,1,1,'0000-00-00 00:00:00','',0),(63,'flowDesign','流程设计器','/app-tools/developerTools/flowDesign','/app-tools/index',1,'ArrowDown',0,58,0,'',1,1,1,'0000-00-00 00:00:00','',0),(64,'databaseDesign','数据库设计器','/app-tools/developerTools/databaseDesign','/app-tools/index',1,'ArrowUp',0,58,0,'',1,1,1,'0000-00-00 00:00:00','',0),(65,'formDesign','表单设计器','/app-tools/developerTools/formDesign','/app-tools/index',1,'Bell',0,58,0,'',1,1,1,'0000-00-00 00:00:00','',0),(66,'reportManager','报表管理','/report','',0,'Avatar',0,0,0,'',1,1,1,'0000-00-00 00:00:00','',0),(67,'flowManager','流程管理','/workflow/flow','',0,'Bottom',0,61,0,'',1,1,1,'0000-00-00 00:00:00','',0),(68,'import','导入','','',2,'AddLocation',0,2,0,'',1,1,1,'0000-00-00 00:00:00','',0),(69,'export','导出','','',2,'AlarmClock',0,2,0,'',1,1,1,'0000-00-00 00:00:00','',0),(70,'detail','详情','','',2,'CirclePlusFilled',0,2,0,'',1,1,1,'0000-00-00 00:00:00','',0),(71,'resetPassword','重置密码','','',2,'Clock',0,2,0,'',1,1,1,'0000-00-00 00:00:00','',0),(72,'enabled','启用','','',2,'Comment',0,2,0,'',1,1,1,'0000-00-00 00:00:00','',0),(73,'disabled','禁用','','',2,'',0,2,0,'',1,1,1,'0000-00-00 00:00:00','',0),(74,'batchDelete','批量删除 ','','',2,'Clock',0,2,0,'',1,1,1,'0000-00-00 00:00:00','',0),(75,'print','打印','','',2,'',0,2,0,'',1,1,1,'0000-00-00 00:00:00','',0),(76,'add','新增',NULL,'',2,NULL,0,4,0,'',1,1,1,'0000-00-00 00:00:00','',0),(77,'edit','编辑',NULL,'',2,NULL,0,4,0,'',1,1,1,'0000-00-00 00:00:00','',0),(78,'delete','删除',NULL,'',2,NULL,0,4,0,'',1,1,1,'0000-00-00 00:00:00','',0),(79,'detail','详情 ',NULL,'',2,NULL,1,2,0,'',1,1,1,'0000-00-00 00:00:00','',0),(80,'detail','详情',NULL,'',2,NULL,0,3,0,'',1,1,1,'0000-00-00 00:00:00','',0),(81,'detail','详情 ',NULL,'',2,NULL,0,4,0,'',1,1,1,'0000-00-00 00:00:00','',0),(82,'add','新增',NULL,'',2,NULL,0,5,0,'',1,1,1,'0000-00-00 00:00:00','',0),(83,'edit','编辑',NULL,'',2,NULL,0,5,0,'',1,1,1,'0000-00-00 00:00:00','',0),(84,'delete','删除',NULL,'',2,NULL,0,5,0,'',1,1,1,'0000-00-00 00:00:00','',0),(86,'download','下载',NULL,'',2,NULL,1,2,0,'',1,1,1,'0000-00-00 00:00:00','',0),(87,'add','新增',NULL,'',2,NULL,1,6,0,'',1,1,1,'0000-00-00 00:00:00','',0),(88,'delete','删除',NULL,'',2,NULL,2,6,0,'',1,1,1,'0000-00-00 00:00:00','',0),(89,'edit','编辑',NULL,'',2,NULL,3,6,0,'',1,1,1,'0000-00-00 00:00:00','',0),(90,'add','新增',NULL,'',2,NULL,1,7,0,'',1,1,1,'0000-00-00 00:00:00','',0),(91,'delete','删除',NULL,'',2,NULL,2,7,0,'',1,1,1,'0000-00-00 00:00:00','',0),(92,'edit','编辑',NULL,'',2,NULL,3,7,0,'',1,1,1,'0000-00-00 00:00:00','',0),(93,'detail','详情 ',NULL,'',2,NULL,0,24,0,'',1,1,1,'0000-00-00 00:00:00','',0),(94,'detail','详情','','',2,'CirclePlusFilled',0,25,0,'',1,1,1,'0000-00-00 00:00:00','',0),(95,'assignUser','分配用户',NULL,'',2,NULL,0,15,0,'',1,1,1,'0000-00-00 00:00:00','',0),(96,'assignPermission','分配权限',NULL,'',2,NULL,0,16,0,'',1,1,1,'0000-00-00 00:00:00','',0),(97,'reportDesign','报表设计器','/app-tools/developerTools/reportDesign','/app-tools/index',1,'AlarmClock',0,58,0,'',1,1,1,'0000-00-00 00:00:00','',0),(98,'spreadSheet','电子表格','/report/spreadSheet','',1,'Apple',0,66,0,'',1,1,1,'0000-00-00 00:00:00','',0),(99,'viewer','报表预览','/report/viewer','',1,'Aim',0,66,0,'',1,1,1,'0000-00-00 00:00:00','',0),(100,'TableDesign','表格设计器','/app-tools/developerTools/tableDesign','/app-tools/index',1,'Bell',0,58,0,'',1,1,1,'0000-00-00 00:00:00','',0),(101,'crudDesign','CRUD设计器','/app-tools/developerTools/crudDesign','/app-tools/index',1,'Bell',0,58,0,'',1,1,1,'0000-00-00 00:00:00','',0),(103,'api','接口管理','/system/api','',1,'Aim',0,1,0,'',1,1,1,'0000-00-00 00:00:00','',0),(104,'add','新增','','',2,'',0,103,0,'',1,1,1,'0000-00-00 00:00:00','',0),(105,'edit','编辑','','',2,'',0,103,0,'',1,1,1,'0000-00-00 00:00:00','',0),(106,'detail','详情','','',2,'',0,103,0,'',1,1,1,'0000-00-00 00:00:00','',0),(107,'auth','授权管理','/auth','',0,'AddLocation',0,0,0,'',1,1,1,'0000-00-00 00:00:00','',0),(108,'roleAuth','角色授权','/auth/role','',1,'Aim',0,107,0,'',1,1,1,'0000-00-00 00:00:00','',0),(115,'OrderManager','订单管理','/order','',0,'AddLocation',0,0,0,'',1,1,1,'0000-00-00 00:00:00','',0),(119,'excute','处理','','',2,'',0,122,0,'',1,1,0,'2023-09-22 17:12:47',NULL,0),(120,'excute','处理','','',2,'',0,123,0,'',1,1,0,'2023-09-24 21:27:57',NULL,0),(121,'QQManager','QQ管理','/qq','',0,'AddLocation',0,0,0,'',1,1,0,'2023-09-24 22:47:57',NULL,0),(122,'qqGroup','QQ群订单','/qq/qqGroup','',1,'AddLocation',0,121,0,'',1,1,0,'2023-09-24 22:48:54',NULL,0),(123,'qqFrend','QQ好友消息','/qq/qqFrend','',1,'Aim',0,121,0,'',1,1,0,'2023-09-24 22:49:35',NULL,0),(124,'OrderList','订单列表','/order/order','',1,'AlarmClock',0,115,0,'',1,1,0,'2023-09-27 11:37:00',NULL,0),(125,'add','新增','','',2,'AlarmClock',0,124,0,'',1,1,0,'2023-09-27 16:41:48',NULL,0),(126,'edit','编辑','','',2,'Apple',0,124,0,'',1,1,0,'2023-09-27 16:42:20',NULL,0),(127,'delete','删除','','',2,'Basketball',0,124,0,'',1,1,0,'2023-09-27 16:44:58',NULL,0),(128,'detail','详情','','',2,'BellFilled',0,124,0,'',1,1,0,'2023-09-27 16:45:37',NULL,0),(129,'pass','通过','','',2,'AddLocation',0,124,0,'',1,1,0,'2023-10-01 16:09:17',NULL,0),(130,'refuse','拒绝','','',2,'',0,124,0,'',1,1,0,'2023-10-01 16:09:58',NULL,0),(131,'recive','接单','','',2,'',0,124,0,'',1,1,0,'2023-10-01 16:10:32',NULL,0),(132,'back','退单','','',2,'',0,124,0,'',1,1,0,'2023-10-01 16:11:18',NULL,0),(133,'complete','完成','','',2,'',0,124,0,'',1,1,0,'2023-10-01 16:11:18',NULL,0),(134,'PaymentManager','支付管理','/pay','',0,'AlarmClock',0,0,0,'',1,1,0,'2023-10-02 19:29:02',NULL,0),(135,'WalletManager','钱包管理','/pay/wallet','',1,'BellFilled',0,134,0,'',1,1,0,'2023-10-02 19:29:53',NULL,0),(136,'RechargeManager','充值订单','/order/recharge','',1,'Bicycle',0,115,0,'',1,1,0,'2023-10-02 19:31:36',NULL,0),(137,'WithdrawManager','提现订单','/order/withdraw','',1,'ColdDrink',0,115,0,'',1,1,0,'2023-10-02 19:33:04',NULL,0);
/*!40000 ALTER TABLE `sys_menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_roles`
--

DROP TABLE IF EXISTS `sys_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_roles` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色编号',
  `role_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
  `dept_id` int NOT NULL COMMENT '部门编号',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_roles`
--

LOCK TABLES `sys_roles` WRITE;
/*!40000 ALTER TABLE `sys_roles` DISABLE KEYS */;
INSERT INTO `sys_roles` VALUES (1,'admin','管理员',20,'0000-00-00 00:00:00',''),(2,'user','普通用户',56,'0000-00-00 00:00:00',''),(3,'test','测试专员',56,'0000-00-00 00:00:00',''),(7,'doctor','医生',59,'0000-00-00 00:00:00',''),(8,'techer','教师',59,'0000-00-00 00:00:00',''),(9,'tech1','发发',59,'0000-00-00 00:00:00',''),(10,'ttt','ff',59,'0000-00-00 00:00:00',''),(11,'aa','AA',20,'0000-00-00 00:00:00','');
/*!40000 ALTER TABLE `sys_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_users`
--

DROP TABLE IF EXISTS `sys_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户编号',
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `avatar` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '头像',
  `full_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '姓名',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '电话',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '邮箱',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '地址',
  `balance` decimal(10,2) NOT NULL COMMENT '余额',
  `freeze_amount` decimal(10,2) NOT NULL COMMENT '冻结金额',
  `deleted` int NOT NULL COMMENT '是否删除：0：未删除，1：已删除',
  `enabled` int NOT NULL COMMENT '是否启用：0：禁用，1：启用',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `user_name` (`user_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_users`
--

LOCK TABLES `sys_users` WRITE;
/*!40000 ALTER TABLE `sys_users` DISABLE KEYS */;
INSERT INTO `sys_users` VALUES (0,'YH_0000','administrator','14e1b600b1fd579f47433b88e8d85291','http://localhost:4100/public\\uploads\\2023-01-05\\2718ff6a-5c91-4ecc-bdf8-050cb8c53791.jpg','超级管理员','15229380174','','西安',0.00,0.00,0,1,'2022-10-29 17:15:29','超级管理员'),(1,'YH_0001','admin','14e1b600b1fd579f47433b88e8d85291','https://api.order.ainiteam.com/public/uploads/2023-09-13/29bcdca3-ea50-4572-90c7-d5d490cace1a.jpg','管理员','15229380174','','西安',510.25,100.25,0,1,'2022-10-29 17:15:29','管理员账号误删'),(68,'YH_0002','user','14e1b600b1fd579f47433b88e8d85291',NULL,'用户',NULL,NULL,NULL,0.00,0.00,0,0,'2022-08-07 20:13:58',''),(112,'YH_003','zhangyisheng','14e1b600b1fd579f47433b88e8d85291',NULL,'张医生','','','',0.00,0.00,0,1,'2023-04-16 19:41:36','');
/*!40000 ALTER TABLE `sys_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'order_core_dev'
--

--
-- Dumping routines for database 'order_core_dev'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-31  0:27:41
