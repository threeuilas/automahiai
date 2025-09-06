ALTER TABLE "crop" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "crop" DROP COLUMN "days_to_maturity";--> statement-breakpoint
ALTER TABLE "crop" DROP COLUMN "quantity_per_harvest";--> statement-breakpoint
ALTER TABLE "crop" DROP COLUMN "days_between_harvests";--> statement-breakpoint
ALTER TABLE "crop" DROP COLUMN "seeds_per_linear_feet";--> statement-breakpoint
ALTER TABLE "crop" DROP COLUMN "plants_per_linear_feet";--> statement-breakpoint
ALTER TABLE "crop" DROP COLUMN "seed_vendor";--> statement-breakpoint
DROP TYPE "public"."crop_harvest_type";