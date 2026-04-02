-- Ajout balise meta dans les tuto
ALTER TABLE `tuto`
  ADD COLUMN `MetaTitle` VARCHAR(70) NULL,
  ADD COLUMN `MetaDescription` VARCHAR(190) NULL;
