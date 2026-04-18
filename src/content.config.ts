import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const desafios = defineCollection({
  loader: glob({ base: "./src/content/desafios", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image(),
    }),
});

// const blogsPersonales = defineCollection({
//   loader: glob({
//     base: "./src/content/blogsPersonales",
//     pattern: "**/*.{md,mdx}",
//   }),
//   schema: ({ image }) =>
//     z.object({
//       title: z.string(),
//       description: z.string(),
//       pubDate: z.coerce.date(),
//       heroImage: z.optional(image()),
//     }),
// });

const mapas = defineCollection({
  loader: glob({ base: "./src/content/mapas", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      heroImage: image(),
    }),
});

export const collections = { desafios, mapas };
