import {int, text, singlestoreTable} from 'drizzle-orm/singlestore-core';

export const cloudDriveFiles = singlestoreTable('cloud-drive_files', {
  id: int('id').primaryKey().autoincrement(),
  name: text('name').notNull()
});