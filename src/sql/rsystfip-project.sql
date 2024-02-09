-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 28, 2023 at 10:16 AM
-- Server version: 11.1.2-MariaDB
-- PHP Version: 8.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `rsystfip_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `Appointments`
--

CREATE TABLE `Appointments` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id del agendamiento, Primary key.',
  `person_id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que almacena el id de la persona agendada, llave foranea del campo id de la tabla registered people.',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Campo que guarda la fecha del agendamiento, utilizada para hacer busquedas en rango en  la base de datos.',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Campo que guarda la fecha y hora de actualización.',
  `start_time` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Campo que guarda la fecha y hora (datetime), de inicio de la visita a la rectoria, de la persona agendada.',
  `end_time` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Campo que guarda la fecha y hora (datetime), de finalizacion de la visita a la rectoria, de la persona agendada.',
  `visit_subject` varchar(150) NOT NULL COMMENT 'Campo que guarda el asunto, motivo o razon de la visita a la rectoria, para su posterior agendamiento.',
  `status` enum('scheduled','daily','cancelled') NOT NULL COMMENT 'Campo que guarda el tipo de agendamiento realizado, puede ser de dos tipos,agendamiento programado o agendamiento al dia.',
  `color` varchar(7) NOT NULL COMMENT 'Campo que guarda un valor de texto correspondiente al color que tendra el registro al ser agendado.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena todos los agendamientos en fecha del aplicativo.';

--
-- Dumping data for table `Appointments`
--

INSERT INTO `Appointments` (`id`, `person_id`, `created_at`, `updated_at`, `start_time`, `end_time`, `visit_subject`, `status`, `color`) VALUES
(1, 1, '2023-07-20 19:52:14', '2023-07-20 19:52:14', '2023-07-20 19:52:14', '2023-07-20 19:52:14', 'Fugit deserunt dolorum corrupti earum non eligendi adipisci ut nulla', 'daily', '#388cdc'),
(2, 2, '2023-07-20 19:52:33', '2023-07-20 19:52:33', '2023-07-20 19:52:33', '2023-07-20 19:52:33', 'Alias in deleniti eius repudiandae adipisicing sit voluptas adipisci aliquam laborum Ut', 'daily', '#388cdc'),
(3, 3, '2023-07-20 19:52:50', '2023-07-20 19:52:50', '2023-07-20 20:30:00', '2023-07-20 21:00:00', 'Numquam non amet anim quod ut minim aute omnis cillum rerum earum vel eius cumque consequatur Id aperiam', 'scheduled', '#73b559'),
(4, 4, '2023-07-20 19:52:59', '2023-07-20 19:53:58', '2023-07-20 21:00:00', '2023-07-20 21:30:00', 'Adipisci repudiandae dolor unde aliqua Enim ut dolores obcaecati qui quod aliqua Voluptatibus', 'cancelled', '#549915'),
(5, 5, '2023-07-20 19:53:22', '2023-07-20 19:53:22', '2023-07-20 20:00:00', '2023-07-20 20:30:00', 'Sed sit quis saepe quod impedit tempore sed laudantium rerum explicabo Quisquam ipsam in', 'scheduled', '#ba087e'),
(6, 6, '2023-07-20 19:55:14', '2023-07-20 19:55:14', '2023-07-20 21:00:00', '2023-07-20 21:30:00', 'Distinctio Voluptates enim omnis necessitatibus blanditiis labore nobis deleniti eveniet officiis dolorum quia provident voluptas sit ea id', 'scheduled', '#cbb10f'),
(7, 7, '2023-07-20 19:55:53', '2023-07-20 19:55:53', '2023-07-21 08:00:00', '2023-07-21 08:30:00', 'Pariatur Nisi dolor dolor quis voluptatem illo tempore sapiente adipisicing velit deserunt accusantium delectus officia', 'scheduled', '#a6af3d'),
(8, 8, '2023-07-20 19:57:42', '2023-07-20 19:57:42', '2023-07-21 10:00:00', '2023-07-21 10:30:00', 'Molestiae aut quam nostrud ut qui ut ipsum', 'scheduled', '#edaa94'),
(9, 9, '2023-07-20 20:00:18', '2023-07-20 20:00:18', '2023-07-21 09:30:00', '2023-07-21 10:00:00', 'Cupidatat occaecat omnis modi qui labore placeat praesentium ut expedita quia vero cillum voluptatum excepturi ut voluptate architecto velit sint', 'scheduled', '#c874f5'),
(10, 10, '2023-07-20 20:01:36', '2023-07-20 20:01:36', '2023-07-20 20:01:36', '2023-07-20 20:01:36', 'Quo magna occaecat ea qui cum et non id excepteur reprehenderit doloribus consectetur aut', 'daily', '#388cdc'),
(11, 11, '2023-07-20 20:02:02', '2023-07-20 20:02:02', '2023-07-20 20:02:02', '2023-07-20 20:02:02', 'Qui aspernatur beatae omnis quo consequatur voluptate maxime earum aperiam exercitation est dolores duis voluptate', 'daily', '#388cdc');

-- --------------------------------------------------------

--
-- Table structure for table `CanceledAppointments`
--

CREATE TABLE `CanceledAppointments` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id del agendamiento cancelado, Primary Key.',
  `person_id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id de la persona que se va a cancelar la cita.',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Campo que guarda la fecha y hora en la que se cancela la cita.',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Campo que guarda la fecha y hora de actualización.',
  `cancellation_subject` varchar(150) NOT NULL COMMENT 'Campo que guarda el asunto por el cual se cancela la cita.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena las citas canceladas.';

--
-- Dumping data for table `CanceledAppointments`
--

INSERT INTO `CanceledAppointments` (`id`, `person_id`, `created_at`, `updated_at`, `cancellation_subject`) VALUES
(1, 4, '2023-07-20 19:53:58', '2023-07-20 19:53:58', 'Laudantium fugiat animi maiores est doloremque animi et et');

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id del tipo de persona (autoincremental).',
  `category_name` varchar(15) NOT NULL COMMENT 'Campo que guarda el nombre del tipo de persona, clasificado por categoria.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena los diferentes tipos de persona clasificada por categoria, usada para los agendamientos.';

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`id`, `category_name`) VALUES
(1, 'Docente'),
(2, 'Estudiante'),
(3, 'Coordinador'),
(4, 'Decano'),
(5, 'Otro (externo)');

-- --------------------------------------------------------

--
-- Table structure for table `Deans`
--

CREATE TABLE `Deans` (
  `id` varchar(11) NOT NULL COMMENT 'Campo que guarda el numero de cedula del de decano del ITFIP, (unique).',
  `first_name` varchar(25) NOT NULL COMMENT 'Campo que guarda el nombre de decano del ITFIP.',
  `last_name` varchar(25) NOT NULL COMMENT 'Campo que guarda el apellido de decano del ITFIP.',
  `faculty_id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id de facultad a la que pertenece el decano del ITFIP.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena los datos de decanos del ITFIP, que seran utilizados para el agendamiento de personas mas rapidamente, haciendo un autocompletado.';

--
-- Dumping data for table `Deans`
--

INSERT INTO `Deans` (`id`, `first_name`, `last_name`, `faculty_id`) VALUES
('96148583', 'Portia', 'Peters', 2),
('96964787', 'Shea', 'Carney', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Documents`
--

CREATE TABLE `Documents` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id del tipo de documento, (autoincremental).',
  `document_name` varchar(3) NOT NULL COMMENT 'Campo que guarda una abreviacion corta del tipo de documento.',
  `document_description` varchar(40) NOT NULL COMMENT 'Campo que guarda el nombre detallado del tipo de documento.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena los tipos de documentos, que seran utilizados para el agendamiento de personas.';

--
-- Dumping data for table `Documents`
--

INSERT INTO `Documents` (`id`, `document_name`, `document_description`) VALUES
(1, 'CC', 'Cédula Ciudadanía'),
(2, 'TI', 'Tarjeta Identidad'),
(3, 'CE', 'Cédula Extranjería'),
(4, 'PA', 'Pasaporte');

-- --------------------------------------------------------

--
-- Table structure for table `Faculties`
--

CREATE TABLE `Faculties` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id de la facultad, (autoincremental).',
  `faculty_name` varchar(60) NOT NULL COMMENT 'Campo que guarda el nombre de la facultad.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena las facultades actuales de los programas academicos del ITFIP.';

--
-- Dumping data for table `Faculties`
--

INSERT INTO `Faculties` (`id`, `faculty_name`) VALUES
(1, 'Economía, Administración y Contaduría Pública'),
(2, 'Ingeniería y Ciencias Agroindustriales'),
(3, 'Ciencias Sociales, Salud y Educación'),
(4, 'No aplica');

-- --------------------------------------------------------

--
-- Table structure for table `People`
--

CREATE TABLE `People` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id de las personas agendadas (autoincremental).',
  `first_name` varchar(25) NOT NULL COMMENT 'Campo que guarda el nombre de las personas agendadas.',
  `last_name` varchar(25) NOT NULL COMMENT 'Campo que guarda el apellido de las personas agendadas.',
  `document_id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id del tipo de documento referenciado de la tabla document.',
  `document_number` varchar(11) NOT NULL COMMENT 'Campo que guarda el numero de documento de las personas agendadas.',
  `phone_number` char(10) NOT NULL COMMENT 'Campo que guarda el numero de telefono de contacto.',
  `email` varchar(30) NOT NULL COMMENT 'Campo que guarda el correo electronico de contacto.',
  `category_id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id del tipo de persona referenciado de la tabla person_type.',
  `faculty_id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id de la facultad a la que pertenece referenciado de la tabla faculties.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena todos los datos personales de las personas que han sido agendadas.';

--
-- Dumping data for table `People`
--

INSERT INTO `People` (`id`, `first_name`, `last_name`, `document_id`, `document_number`, `phone_number`, `email`, `category_id`, `faculty_id`) VALUES
(1, 'Calvin', 'Kirby', 3, '6485373353', '9163890445', 'tuzybawih@mailinator.com', 4, 3),
(2, 'Brittany', 'Acosta', 1, '87884743', '2648373120', 'xobomasu@mailinator.com', 3, 3),
(3, 'Trevor', 'Reilly', 2, '15873874', '9927837344', 'kujuv@mailinator.com', 1, 2),
(4, 'Leah', 'Wiley', 3, '23637847', '4982893734', 'runytisi@mailinator.com', 3, 3),
(5, 'Damon', 'Frye', 2, '81963443', '1523478422', 'cewidan@mailinator.com', 2, 3),
(6, 'Joseph', 'Molina', 3, '54937843', '9943884744', 'zajecu@mailinator.com', 3, 2),
(7, 'Hadley', 'Larson', 3, '76873747', '6485596333', 'luticole@mailinator.com', 4, 2),
(8, 'Jonas', 'Greer', 2, '76873747', '6672763322', 'xibi@mailinator.com', 4, 3),
(9, 'Portia', 'Peters', 3, '96148583', '3372423833', 'kuwuzuxa@mailinator.com', 4, 2),
(10, 'Maxwell', 'Christensen', 3, '65701167', '5863784333', 'tarabetyx@mailinator.com', 3, 1),
(11, 'Shea', 'Carney', 2, '96964787', '8984849744', 'jubipugici@mailinator.com', 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

CREATE TABLE `Roles` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que guarda el rol que tiene el usaurio, existen 3: admin, rector, secretaria.',
  `role_name` varchar(25) NOT NULL COMMENT 'Campo que guarda el rol que tiene el usuario, existen 3: admin, rector, secretaria.',
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Campo que guarda los permisos que tiene el usaurio' CHECK (json_valid(`permissions`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena los roles de la aplicación.';

--
-- Dumping data for table `Roles`
--

INSERT INTO `Roles` (`id`, `role_name`, `permissions`) VALUES
(1, 'admin', '[\"admin\", \"add\", \"schedule\", \"reports\", \"statistics\"]'),
(2, 'rector', '[\"schedule\"]'),
(3, 'secretaria', '[\"add\", \"schedule\", \"reports\", \"statistics\"]');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id de los usuarios del aplicativo, con acceso permitido (unique).',
  `first_name` varchar(25) NOT NULL COMMENT 'Campo que guarda el nombre de los usuarios del aplicativo, con acceso permitido.',
  `last_name` varchar(25) NOT NULL COMMENT 'Campo que guarda el apellido de los usuarios del aplicativo, con acceso permitido.',
  `document_id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que almacena el id del tipo de documento, de la tabla document.',
  `document_number` varchar(11) NOT NULL COMMENT 'Campo que guarda el numero de documento.',
  `phone_number` char(10) NOT NULL COMMENT 'Campo que guarda el numero de telefono de contacto.',
  `email` varchar(30) NOT NULL COMMENT 'Campo que guarda el correo electronico institucional o usuario de acceso al aplicativo.',
  `password` varchar(100) NOT NULL COMMENT 'Campo que guarda el password de acceso al aplicativo (encriptado).',
  `role_id` int(10) UNSIGNED NOT NULL COMMENT 'Campo que guarda el rol que tiene el usaurio, existen 3: admin, rector, secretaria.',
  `authorized` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena los usuarios del aplicativo, y sus respectivos usuarios y password de acceso al aplicativo.';

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `first_name`, `last_name`, `document_id`, `document_number`, `phone_number`, `email`, `password`, `role_id`, `authorized`) VALUES
(1, 'José Manuel', 'Mendoza Vásquez', 1, '1005773423', '3186329251', 'jmendoza23@itfip.edu.co', '$2a$10$KlgJL5qfkrhlMPh4DGGuE.M.hIKZTMy..fsATl0Srg3RbCrJaGoc2', 2, 0),
(2, 'Carlos Enrique', 'Lara Meneses', 1, '64858737', '3012834716', 'CLARA16@itfip.edu.co', '$2a$10$ku9fm7qvIbxytaHkcRw7luIfCAL7W3zPvXxnMgXkkcgGQ/ku69nsi', 3, 0),
(3, 'Ricardo Andrés', 'Rojas Rico', 1, '1111122448', '3173926578', 'rrojas48@itfip.edu.co', '$2a$10$aqA6nW8IxaeJMa7jFdEcLu2eZHkFa4TGlttiTRF7j57ctmUUZAP7.', 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Appointments`
--
ALTER TABLE `Appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `CanceledAppointments`
--
ALTER TABLE `CanceledAppointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Deans`
--
ALTER TABLE `Deans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Documents`
--
ALTER TABLE `Documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Faculties`
--
ALTER TABLE `Faculties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `People`
--
ALTER TABLE `People`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Appointments`
--
ALTER TABLE `Appointments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Campo que guarda el id del agendamiento, Primary key.', AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `CanceledAppointments`
--
ALTER TABLE `CanceledAppointments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Campo que guarda el id del agendamiento cancelado, Primary Key.', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Campo que guarda el id del tipo de persona (autoincremental).', AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Documents`
--
ALTER TABLE `Documents`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Campo que guarda el id del tipo de documento, (autoincremental).', AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Faculties`
--
ALTER TABLE `Faculties`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Campo que guarda el id de la facultad, (autoincremental).', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `People`
--
ALTER TABLE `People`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Campo que guarda el id de las personas agendadas (autoincremental).', AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Roles`
--
ALTER TABLE `Roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Campo que guarda el rol que tiene el usaurio, existen 3: admin, rector, secretaria.', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Campo que guarda el id de los usuarios del aplicativo, con acceso permitido (unique).', AUTO_INCREMENT=4;