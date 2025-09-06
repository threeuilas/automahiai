CREATE TYPE "public"."crop_harvest_type" AS ENUM('harvest_once', 'continuous_harvest');--> statement-breakpoint
CREATE TABLE "crop" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "crop_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"type" "crop_harvest_type" NOT NULL,
	"days_to_maturity" integer NOT NULL,
	"days_between_harvests" integer,
	"seeds_per_linear_feet" integer NOT NULL,
	"plants_per_linear_feet" integer NOT NULL,
	"seed_vendor" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "farm_crop" (
	"farm_id" integer NOT NULL,
	"crop_id" integer NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "farm_crop" ADD CONSTRAINT "farm_crop_farm_id_farm_id_fk" FOREIGN KEY ("farm_id") REFERENCES "public"."farm"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "farm_crop" ADD CONSTRAINT "farm_crop_crop_id_crop_id_fk" FOREIGN KEY ("crop_id") REFERENCES "public"."crop"("id") ON DELETE no action ON UPDATE no action;