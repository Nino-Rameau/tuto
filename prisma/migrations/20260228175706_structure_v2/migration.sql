-- CreateTable
CREATE TABLE `utilisateur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `profil` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `utilisateur_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tuto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `pre_requis` TEXT NULL,
    `chapo` LONGTEXT NOT NULL,
    `intro` LONGTEXT NOT NULL,
    `contenu` LONGTEXT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `type` ENUM('texte', 'vidéo') NOT NULL,
    `statut` ENUM('brouillon', 'en_ligne') NOT NULL DEFAULT 'brouillon',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `tuto_titre_key`(`titre`),
    UNIQUE INDEX `tuto_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `progression` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `tuto_id` INTEGER NOT NULL,
    `etat` ENUM('en_cours', 'terminé') NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `progression_user_id_tuto_id_key`(`user_id`, `tuto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `categorie_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tuto_categorie` (
    `categorie_id` INTEGER NOT NULL,
    `tuto_id` INTEGER NOT NULL,

    PRIMARY KEY (`categorie_id`, `tuto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `progression` ADD CONSTRAINT `progression_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `progression` ADD CONSTRAINT `progression_tuto_id_fkey` FOREIGN KEY (`tuto_id`) REFERENCES `tuto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tuto_categorie` ADD CONSTRAINT `tuto_categorie_categorie_id_fkey` FOREIGN KEY (`categorie_id`) REFERENCES `categorie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tuto_categorie` ADD CONSTRAINT `tuto_categorie_tuto_id_fkey` FOREIGN KEY (`tuto_id`) REFERENCES `tuto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
