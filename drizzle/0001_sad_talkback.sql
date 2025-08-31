CREATE TABLE "farms" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "farms_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"farmerId" integer NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "farms" ADD CONSTRAINT "farms_farmerId_farmers_id_fk" FOREIGN KEY ("farmerId") REFERENCES "public"."farmers"("id") ON DELETE no action ON UPDATE no action;