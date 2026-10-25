import type { FieldVariant } from "./fields";

export interface Post {
	title: string;
	description: string;
	/** ISO date, displayed as-is. */
	date: string;
	category: string;
	minutes: number;
	href: string;
	lang: "es" | "en";
	/** Background variant for the article page. */
	field: FieldVariant;
}

/** Newest first. */
export const posts: Post[] = [
	{
		title: "La hormiga de Langton",
		description:
			"Dos reglas, dos colores y una hormiga que termina construyendo una autopista: cómo el comportamiento global emerge de decisiones locales.",
		date: "2026-10-24",
		category: "autómatas",
		minutes: 8,
		href: "/blog/langtons-ant",
		lang: "es",
		field: "highway",
	},
	{
		title: "Algoritmos genéticos",
		description:
			"Selección, cruce y mutación: cómo una población de soluciones mejora sin gradientes, y por qué no es una varita mágica.",
		date: "2026-10-18",
		category: "algoritmos",
		minutes: 11,
		href: "/blog/genetic-algorithms",
		lang: "es",
		field: "duet",
	},
];

export const categories = [
	{ value: "all", label: "todo" },
	{ value: "autómatas", label: "autómatas" },
	{ value: "algoritmos", label: "algoritmos" },
];

export function countFor(value: string): number {
	if (value === "all") return posts.length;
	return posts.filter((post) => post.category === value).length;
}

/** The post before and after in publication order. */
export function adjacent(href: string): {
	previous?: Post;
	next?: Post;
} {
	const index = posts.findIndex((post) => post.href === href);
	return {
		next: index > 0 ? posts[index - 1] : undefined,
		previous: index >= 0 ? posts[index + 1] : undefined,
	};
}
