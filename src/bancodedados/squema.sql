drop table if exists cliente;

create table cliente(
    id serial primary key,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    telefone varchar(20),
    senha text not null
);

