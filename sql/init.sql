-- web_demo.message 定义
CREATE DATABASE IF NOT EXISTS web_demo DEFAULT CHARSET utf8mb4;
USE web_demo;
DROP TABLE IF EXISTS 'message'
create table `message` (
  `id` int not null auto_increment,
`name` varchar(20) default null,
`studentId` varchar(20) default null,
`major` varchar(30) default null,
`position` varchar(20) default null,
`phone` varchar(20) default null,
`contact` varchar(30) default null,
`message` text,
`createtime` datetime default CURRENT_TIMESTAMP COMMENT '表单提交时间',
primary key (`id`)
) engine = InnoDB auto_increment = 12 default CHARSET = utf8mb4 collate = utf8mb4_0900_ai_ci;
INSERT INTO `message` (`name`, `studentId`, `major`, `position`, `phone`, `contact`, `message`)
VALUES 
('和', '154', '物联网', '嵌入式', '18948926630', '456', '测试留言1'),
('刘', '245959', '一班', '后端', '18948926630', '25987', '测试留言2');