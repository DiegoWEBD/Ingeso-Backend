create table if not exists app_user(
    institutional_email text primary key,
    name text not null
);

create table if not exists student(
    institutional_email text primary key 
    references app_user(institutional_email)
    on delete cascade
);

create table if not exists teacher(
    institutional_email text primary key 
    references app_user(institutional_email)
    on delete cascade
);

create table if not exists drug(
    name text primary key,
    presentation text not null,
    description text not null
);

create table if not exists favorite_drug(
    drug_name text not null references drug(name)
    on delete cascade on update cascade,
    user_institutional_email text not null
    references app_user(institutional_email)
    on delete cascade,
    primary key (drug_name, user_institutional_email)
);

create table if not exists administration_procedure(
    drug_name text not null references drug(name)
    on delete cascade on update cascade,
    method text not null,
    procedure text not null,
    primary key (drug_name, method)
);

create table if not exists ram(
    drug_name text not null references drug(name)
    on delete cascade on update cascade,
    reaction text not null
);

create table if not exists refresh_token(
    user_institutional_email text primary key 
    references app_user(institutional_email)
    on delete cascade,
    token text not null unique,
    expires_at timestamp not null
);

create table if not exists allowed_teacher (
    institutional_email text primary key
    references teacher(institutional_email)
    on delete cascade,
    date_added timestamp not null default now()
);