drop table if exists cliente;
drop table if exists endereco;

create table cliente(
    id serial primary key,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    telefone varchar(25),
    senha text not null
);

create table endereco(
    id serial primary key,
  	cliente_id integer not null references cliente(id),
    cep varchar(25) not null,
    complemento varchar(100),
    endereco varchar(200) not null,
);


drop table if exists itens_pedido;
drop table if exists pedido;

create table pedido(
    id serial primary key,
  	restaurante_id integer references restaurante(id),
  	cliente_id integer references cliente(id),
    subtotal integer not null,
    taxa_entrega integer not null,
    total integer not null	
);

create table itens_pedido(
    id serial primary key,
  	pedido_id integer not null references pedido(id),
  	produto_id integer not null references produto(id),
    preco integer not null,
  	quantidade integer not null,
  	preco_total integer not null
);

