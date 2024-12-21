-- Créer une base de données nommé "biblioteque"
CREATE DATABASE biblioteque;

-- Création des tables (livres, abonnes, prets, users)
CREATE TABLE livres (
	id INTEGER generated always as identity PRIMARY KEY,
	titre VARCHAR(255) NOT NULL,
	auteur VARCHAR(255) NOT NULL
);

CREATE TABLE abonnes (
	id INTEGER generated always as identity PRIMARY KEY,
	nom VARCHAR(255) NOT NULL,
	prenom VARCHAR(255) NOT NULL,
	adresse VARCHAR(255)
);

CREATE TABLE prets (
	id INTEGER generated always as identity PRIMARY KEY,
	id_livre INT REFERENCES livres(id),
	id_abonne INT REFERENCES abonnes(id),
	date_pret DATE,
	date_retour DATE
);

create table users (
	id INTEGER generated always as identity PRIMARY KEY,
	username VARCHAR(250),
	password VARCHAR(250)
);

-- Met à jour la séquence associée à la colonne "id" de la table "livres" après une opération de suppression.
CREATE OR REPLACE FUNCTION reset_livres_ids()
RETURNS TRIGGER AS $$
BEGIN
	-- Met à jour la séquence "livres_id_seq" en lui attribuant la valeur maximale actuelle de la colonne "id".
	-- Si aucun enregistrement n'existe, la séquence est mise à zéro.
	PERFORM setval(
		pg_get_serial_sequence('livres', 'id'),
		(SELECT MAX(id) FROM livres)
	);

	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Création d'un trigger pour appeler la fonction "reset_livres_ids" après chaque suppression dans la table "livres".
CREATE TRIGGER trigger_reset_livres_ids
AFTER DELETE ON livres 
FOR EACH STATEMENT
EXECUTE FUNCTION reset_livres_ids();


-- Met à jour la séquence associée à la colonne "id" de la table "abonnes" après une opération de suppression.
CREATE OR REPLACE FUNCTION reset_abonnes_ids()
RETURNS TRIGGER AS $$
BEGIN
	PERFORM setval(
		pg_get_serial_sequence('abonnes', 'id'),
		(SELECT MAX(id) FROM abonnes)
	);
	
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Création d'un trigger pour appeler la fonction "reset_abonnes_ids" après chaque suppression dans la table "abonnes".
CREATE TRIGGER trigger_reset_abonnes_ids
AFTER DELETE ON abonnes
FOR EACH STATEMENT
EXECUTE FUNCTION reset_abonnes_ids();

-- Met à jour la séquence associée à la colonne "id" de la table "prets" après une opération de suppression.
CREATE OR REPLACE FUNCTION reset_prets_ids()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM setval(
    pg_get_serial_sequence('prets', 'id'),
    (SELECT MAX(id) FROM prets)
  );

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Création d'un trigger pour appeler la fonction "reset_prets_ids" après chaque suppression dans la table "prets".
CREATE TRIGGER trigger_reset_prets_ids
AFTER DELETE ON prets
FOR EACH STATEMENT
EXECUTE FUNCTION reset_prets_ids();

-- Met à jour la séquence associée à la colonne "id" de la table "users" après une opération de suppression.
CREATE OR REPLACE FUNCTION reset_users_ids()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM setval(
    pg_get_serial_sequence('users', 'id'),
    (SELECT MAX(id) FROM users)
  );

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Création d'un trigger pour appeler la fonction "reset_users_ids" après chaque suppression dans la table "users".
CREATE TRIGGER trigger_reset_users_ids
AFTER DELETE ON users
FOR EACH STATEMENT
EXECUTE FUNCTION reset_users_ids();


-- Insertions des jeux d'essais
INSERT INTO livres (titre, auteur) VALUES
	('Le Petit Prince', 'Antoine de Saint-Exupéry'),
	('1984', 'George Orwell'),
	('L''Étranger', 'Albert Camus'),
	('Les Misérables', 'Victor Hugo'),
	('Harry Potter à l''école des sorciers', 'J.K. Rowling');

INSERT INTO abonnes (nom, prenom, adresse) VALUES
	('Dupont', 'Jean', '123 Rue de la Paix, Paris'),
	('Martin', 'Marie', '456 Avenue des Champs-Élysées, Paris'),
	('Bernard', 'Luc', '789 Boulevard Saint-Germain, Paris'),
	('Durand', 'Sophie', '101 Rue de Rivoli, Paris'),
	('Petit', 'Paul', '202 Rue de la République, Lyon');

INSERT INTO prets (id_livre, id_abonne, date_pret, date_retour) VALUES
	(1, 1, '2024-10-01', '2024-10-15'),
	(2, 2, '2024-10-05', '2024-10-20'),
	(3, 3, '2024-10-10', '2024-10-25'),
	(4, 4, '2024-10-15', '2024-10-30'),
	(5, 5, '2024-10-20', '2024-11-05');

-- Exemple pour supprimer un trigger
DROP TRIGGER IF EXISTS trigger_reset_ids ON abonnes;

-- Afficher la liste des triggers existants
SELECT  trigger_name,
    event_object_table AS table_name,
    event_manipulation AS event,
    action_statement AS trigger_function
FROM information_schema.triggers
WHERE trigger_schema = 'public'; -- Remplacez par le schéma si nécessaire