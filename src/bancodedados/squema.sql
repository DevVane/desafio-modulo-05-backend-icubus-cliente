drop table if exists cliente;

create table cliente(
    id serial primary key,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    telefone varchar(25),
    senha text not null
);

drop table if exists pedido;
drop table if exists itens_pedido;

create table pedido(
    id serial primary key,
    subtotal integer not null,
    taxa_entrega integer not null,
    total integer not null,
  	restaurante_id integer references restaurante(id),
  	cliente_id integer references cliente(id),
  	produto_id integer references produto(id)
);

create table itens_pedido(
    id serial primary key,
    preco integer not null,
  	quantidade integer not null,
  	preco_total integer not null,
  	pedido_id integer not null references pedido(id),
  	produto_id integer not null references produto(id)
);










