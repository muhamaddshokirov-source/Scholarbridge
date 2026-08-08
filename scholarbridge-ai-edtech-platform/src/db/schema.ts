import { pgTable, serial, text, integer, doublePrecision, boolean, timestamp } from "drizzle-orm/pg-core";

export const studentProfiles = pgTable("student_profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  degreeLevel: text("degree_level").notNull().default("Master"),
  targetMajor: text("target_major").notNull().default("Computer Science"),
  gpa: doublePrecision("gpa").notNull().default(3.5),
  gpaScale: doublePrecision("gpa_scale").notNull().default(4.0),
  ieltsScore: doublePrecision("ielts_score").default(7.0),
  toeflScore: integer("toefl_score").default(95),
  satScore: integer("sat_score").default(1350),
  greScore: integer("gre_score").default(315),
  budgetAnnualUsd: integer("budget_annual_usd").notNull().default(25000),
  preferredCountries: text("preferred_countries").notNull().default("[\"United States\", \"United Kingdom\", \"Canada\", \"Germany\"]"),
  needScholarship: boolean("need_scholarship").notNull().default(true),
  extracurriculars: text("extracurriculars").default("Hackathon winner, Peer Tutor, Student Council Vice President"),
  workExperienceYears: integer("work_experience_years").default(1),
  researchPublications: integer("research_publications").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const universities = pgTable("universities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  flagEmoji: text("flag_emoji").notNull().default("🌐"),
  worldRanking: integer("world_ranking").notNull(),
  degreeLevel: text("degree_level").notNull().default("All"),
  programMajor: text("program_major").notNull(),
  annualTuitionUsd: integer("annual_tuition_usd").notNull(),
  annualLivingEstUsd: integer("annual_living_est_usd").notNull(),
  minGpa: doublePrecision("min_gpa").notNull().default(3.0),
  minIelts: doublePrecision("min_ielts").notNull().default(6.5),
  minSat: integer("min_sat").default(1200),
  acceptanceRate: doublePrecision("acceptance_rate").notNull(),
  postStudyWorkVisaYears: doublePrecision("post_study_work_visa_years").notNull().default(2.0),
  description: text("description").notNull(),
  highlights: text("highlights").notNull().default("[]"),
  websiteUrl: text("website_url").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const scholarships = pgTable("scholarships", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  provider: text("provider").notNull(),
  country: text("country").notNull(),
  coverageType: text("coverage_type").notNull().default("Full Tuition + Stipend"),
  amountUsdValue: integer("amount_usd_value").notNull(),
  deadline: text("deadline").notNull(),
  degreeLevels: text("degree_levels").notNull().default("[\"Master\", \"PhD\"]"),
  eligibleMajors: text("eligible_majors").notNull().default("[\"All\"]"),
  minGpa: doublePrecision("min_gpa").default(3.2),
  minIelts: doublePrecision("min_ielts").default(6.5),
  financialNeedBased: boolean("financial_need_based").default(false),
  meritBased: boolean("merit_based").default(true),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  websiteUrl: text("website_url").notNull(),
});

export const savedUniversities = pgTable("saved_universities", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => studentProfiles.id, { onDelete: "cascade" }).notNull(),
  universityId: integer("university_id").references(() => universities.id, { onDelete: "cascade" }).notNull(),
  matchCategory: text("match_category").notNull().default("Match"),
  matchScore: integer("match_score").notNull().default(85),
  status: text("status").notNull().default("Shortlisted"),
  notes: text("notes").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const savedScholarships = pgTable("saved_scholarships", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => studentProfiles.id, { onDelete: "cascade" }).notNull(),
  scholarshipId: integer("scholarship_id").references(() => scholarships.id, { onDelete: "cascade" }).notNull(),
  status: text("status").notNull().default("Saved"),
  notes: text("notes").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const applicationTasks = pgTable("application_tasks", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => studentProfiles.id, { onDelete: "cascade" }).notNull(),
  universityId: integer("university_id").references(() => universities.id, { onDelete: "set null" }),
  title: text("title").notNull(),
  category: text("category").notNull().default("Document Prep"),
  dueDate: text("due_date").notNull(),
  isCompleted: boolean("is_completed").notNull().default(false),
  priority: text("priority").notNull().default("Medium"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const aiEvaluations = pgTable("ai_evaluations", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => studentProfiles.id, { onDelete: "cascade" }).notNull(),
  evaluationType: text("evaluation_type").notNull().default("Profile Analysis"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
