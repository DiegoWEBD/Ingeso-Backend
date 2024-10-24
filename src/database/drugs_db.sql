create table if not exists app_user(
    institutional_email text primary key,
    name text not null
);

create table if not exists student(
    institutional_email text primary key references app_user(institutional_email)
    on delete cascade
);

create table if not exists teacher(
    institutional_email text primary key references app_user(institutional_email)
    on delete cascade
);

create table if not exists drug_classification(
    classification text primary key,
    description text not null
);

create table if not exists drug(
    name text primary key,
    presentation text not null,
    description text not null
);

create table if not exists drug_classification_association(
    classification text not null references drug_classification(classification)
    on delete cascade,
    drug_name text not null references drug(name)
    on delete cascade,
    primary key (classification, drug_name)
);

create table if not exists administration_procedure(
    drug_name text not null references drug(name)
    on delete cascade,
    method text not null,
    procedure text not null,
    primary key (drug_name, method)
);

create table if not exists ram(
    drug_name text not null references drug(name)
    on delete cascade,
    reaction text not null
);