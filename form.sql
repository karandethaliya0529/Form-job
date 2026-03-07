use job_application_form;
create table IF NOT EXISTS states (
    state_id int AUTO_INCREMENT PRIMARY KEY,
    state_name varchar(100) NOT NULL
);

CREATE TABLE cities (
city_id INT AUTO_INCREMENT PRIMARY KEY,
city_name VARCHAR(100) NOT NULL,
state_id INT NOT NULL,
FOREIGN KEY (state_id) REFERENCES states(state_id) on delete CASCADE
);

CREATE INDEX idx_city_state ON cities(state_id);

CREATE TABLE pincodes (
pincode_id INT AUTO_INCREMENT PRIMARY KEY,
zipcode VARCHAR(10) NOT NULL
);

CREATE TABLE genders (
gender_id INT AUTO_INCREMENT PRIMARY KEY,
gender_name VARCHAR(20)
);

CREATE TABLE relationship_status (
status_id INT AUTO_INCREMENT PRIMARY KEY,
status_name VARCHAR(50)
);

CREATE TABLE applicants (
applicant_id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(50) not NULL,
last_name VARCHAR(50)not null,
designation VARCHAR(100) not null,
email VARCHAR(150) not null,
phone VARCHAR(15) not null,
dob DATE not null,
gender_id INT not null,
relationship_status_id INT not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP default CURRENT_TIMESTAMP
on update CURRENT_TIMESTAMP,

FOREIGN KEY (gender_id) REFERENCES genders(gender_id),
FOREIGN KEY (relationship_status_id) REFERENCES relationship_status(status_id)

);

CREATE INDEX idx_applicant_email ON applicants(email);
CREATE INDEX idx_applicant_phone ON applicants(phone);

CREATE TABLE addresses (
address_id INT AUTO_INCREMENT PRIMARY KEY,
applicant_id int not null,
address_line1 VARCHAR(255) not null,
address_line2 VARCHAR(255),
city_id INT not null,
state_id INT not null,
pincode_id INT not null,

FOREIGN KEY (city_id) REFERENCES cities(city_id),
FOREIGN KEY (state_id) REFERENCES states(state_id),
FOREIGN KEY (pincode_id) REFERENCES pincodes(pincode_id),
Foreign Key (applicant_id) REFERENCES applicants(applicant_id)

);

CREATE INDEX idx_address_city ON addresses(city_id);
CREATE INDEX idx_address_state ON addresses(state_id);
CREATE INDEX idx_address_pincode ON addresses(pincode_id);

CREATE TABLE education (
education_id INT AUTO_INCREMENT PRIMARY KEY,
applicant_id INT not null,
course VARCHAR(100) not null,
passing_year YEAR not null,
university VARCHAR(150) not null,
result VARCHAR(20) not null,

FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id)

);

CREATE INDEX idx_education_applicant ON education(applicant_id);

CREATE TABLE experience (
experience_id INT AUTO_INCREMENT PRIMARY KEY,
applicant_id INT not null,
company_name VARCHAR(150) not null,
from_date DATE not null,
to_date DATE not null,
annual_package DECIMAL(10,2) not null,
reason_leave VARCHAR(255) not null,
ref_contact_no VARCHAR(15) not null,
ref_contact_name VARCHAR(100) not null,

FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id)

);

CREATE INDEX idx_experience_applicant ON experience(applicant_id);

CREATE TABLE languages (
language_id INT AUTO_INCREMENT PRIMARY KEY,
language_name VARCHAR(50)
);

CREATE TABLE applicant_languages (
id INT AUTO_INCREMENT PRIMARY KEY,
applicant_id INT not null,
language_id INT not null,
can_read BOOLEAN,
can_write BOOLEAN,
can_speak BOOLEAN,

FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id),
FOREIGN KEY (language_id) REFERENCES languages(language_id)

);

CREATE INDEX idx_lang_applicant ON applicant_languages(applicant_id);

CREATE TABLE technologies (
tech_id INT AUTO_INCREMENT PRIMARY KEY,
tech_name VARCHAR(100) not null
);

CREATE TABLE skill_levels (
level_id INT AUTO_INCREMENT PRIMARY KEY,
level_name VARCHAR(50) not null
);

CREATE TABLE applicant_technologies (
id INT AUTO_INCREMENT PRIMARY KEY,
applicant_id INT not null,
tech_id INT not null,
level_id INT not null,

FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id),
FOREIGN KEY (tech_id) REFERENCES technologies(tech_id),
FOREIGN KEY (level_id) REFERENCES skill_levels(level_id)

);

CREATE INDEX idx_tech_applicant ON applicant_technologies(applicant_id);

CREATE TABLE reference_contacts (
reference_id INT AUTO_INCREMENT PRIMARY KEY,
applicant_id INT not null,
name VARCHAR(100) not null,
contact_no VARCHAR(15) not null,
relation VARCHAR(50) not null,

FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id)

);

CREATE INDEX idx_reference_applicant ON reference_contacts(applicant_id);

CREATE TABLE departments (
department_id INT AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(100) not null
);

CREATE TABLE preferences (
preference_id INT AUTO_INCREMENT PRIMARY KEY,
applicant_id INT not null,
notice_period VARCHAR(50) not null,
expected_ctc DECIMAL(10,2) not null,
current_ctc DECIMAL(10,2) not null,
department_id INT not null,

FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id),
FOREIGN KEY (department_id) REFERENCES departments(department_id)

);

CREATE INDEX idx_preference_applicant ON preferences(applicant_id);

CREATE TABLE preferred_locations(
    preferred_location_id int Auto_increment primary key,
    applicant_id int not null,
    city_id int not null,
    priority int not null,
    Foreign Key (applicant_id) REFERENCES applicants(applicant_id),
    Foreign Key (city_id) REFERENCES cities(city_id)
);

CREATE INDEX idx_pref_applicant ON preferred_locations(applicant_id);

drop table preferences;