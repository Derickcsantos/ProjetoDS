create database login;

create table usuario(
	id int auto_increment primary key,
    username varchar(255) not null unique,
    password varchar(255)
);

create table perfil(
	id_perfil int auto_increment primary key,
    usuario int,
    foreign key (usuario) references usuario(id),
    nome varchar(50),
    telefone varchar(20),
    cidade varchar(50),
    descricao varchar(200),
    habilidades varchar(200),
    projetos varchar(200)
);

create table autenticacao(
	id_autenticacao int,
    usuario_autenticacao int,
	foreign key (usuario_autenticacao) references usuario(id),
    tipo varchar(20),
    data_ultima_tentativa datetime
);

create table lading_page(
	perfil_lading int,
    foreign key (perfil_lading) references perfil(id_perfil)
);