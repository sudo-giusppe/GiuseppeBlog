export type FieldVariant =
	| "classic"
	| "mirror"
	| "highway"
	| "duet"
	| "colony"
	| "turmite"
	| "turmite2";

export interface FieldConfig {
	label: string;
	/** Number of cell states. */
	colors: number;
	/** One turn rule per ant; the rule string is indexed by cell state. */
	rules: string[];
	prewarm: number;
	/** Relative opacity so denser variants keep the same visual weight. */
	weight: number;
	layout: "single" | "duet" | "colony";
}

export const fieldConfigs: Record<FieldVariant, FieldConfig> = {
	classic: {
		label: "langton",
		colors: 2,
		rules: ["RL"],
		prewarm: 14000,
		weight: 1,
		layout: "single",
	},
	mirror: {
		label: "langton / espejo",
		colors: 2,
		rules: ["LR"],
		prewarm: 14000,
		weight: 1,
		layout: "single",
	},
	highway: {
		label: "langton / autopista",
		colors: 2,
		rules: ["RL"],
		prewarm: 40000,
		weight: 0.8,
		layout: "single",
	},
	duet: {
		label: "langton / dúo",
		colors: 2,
		rules: ["RL", "LR"],
		prewarm: 12000,
		weight: 0.9,
		layout: "duet",
	},
	colony: {
		label: "langton / colonia",
		colors: 2,
		rules: ["RL", "RL", "RL"],
		prewarm: 9000,
		weight: 0.8,
		layout: "colony",
	},
	turmite: {
		label: "turmite / 3 estados",
		colors: 3,
		rules: ["RLR"],
		prewarm: 20000,
		weight: 0.9,
		layout: "single",
	},
	turmite2: {
		label: "turmite / RLL",
		colors: 3,
		rules: ["RLL"],
		prewarm: 20000,
		weight: 0.9,
		layout: "single",
	},
};
