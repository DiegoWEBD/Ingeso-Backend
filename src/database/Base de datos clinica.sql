-- Tabla 'user' 
create table "user" (
    institutional_email text primary key,
    name text
);

-- Tabla 'student'
create table student (
    institutional_email text primary key,
    constraint fk_student_user foreign key (institutional_email) references "user" (institutional_email)
);

-- Tabla 'teacher'
create table teacher (
    institutional_email text primary key,
    constraint fk_teacher_user foreign key (institutional_email) references "user" (institutional_email)
);

-- Tabla 'drug'
create table drug (
    name text primary key,
    description text
);

-- Tabla 'drug_type'
create table drug_type (
    dtype text primary key,
    description text
);

-- Tabla 'drug_type_association' 
create table drug_type_association (
    dtype text,
    drug_name text,
    primary key (dtype, drug_name),
    constraint fk_dtype foreign key (dtype) references drug_type (dtype),
    constraint fk_drug_name foreign key (drug_name) references drug (name)
);

-- Tabla 'administration_route'
create table administration_route (
    route text primary key,
    description text
);

-- Tabla 'administration_procedure' 
create table administration_procedure (
    route text,
    drug_name text,
    procedure text,
    primary key (route, drug_name),
    constraint fk_route foreign key (route) references administration_route (route),
    constraint fk_drug_name_procedure foreign key (drug_name) references drug (name)
);

-- Tabla 'adverse_reaction'
create table adverse_reaction (
    drug_name_1 text,
    drug_name_2 text,
    primary key (drug_name_1, drug_name_2),
    constraint fk_drug1 foreign key (drug_name_1) references drug (name),
    constraint fk_drug2 foreign key (drug_name_2) references drug (name)
);
