-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `StatusCourse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
