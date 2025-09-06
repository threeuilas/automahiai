import { farm } from '../schema/farm';

export type Farm = Omit<typeof farm.$inferSelect, 'updatedAt' | 'deletedAt'>;
