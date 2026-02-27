import { AKTIVIST_MODE_PROMPT } from './aktivist';
import { DEBUGGER_MODE_PROMPT } from './debugger';
import { DRAMA_QUEEN_MODE_PROMPT } from './drama-queen';
import { FILOSOF_MODE_PROMPT } from './filosof';
import { FOLIEHATT_MODE_PROMPT } from './foliehatt';
import { FORSVARARE_MODE_PROMPT } from './forsvarare';
import { HANDLAGGARE_MODE_PROMPT } from './handlaggare';
import { HYPERFOKUSERAD_MODE_PROMPT } from './hyperfokuserad';
import { KAPTEN_MODE_PROMPT } from './kapten';
import { KLASSISK_MODE_PROMPT } from './klassisk';
import { MORSA_MODE_PROMPT } from './morsa';
import { NATTUGGLA_MODE_PROMPT } from './nattuggla';
import { PEDAGOG_MODE_PROMPT } from './pedagog';
import { RECENSENT_MODE_PROMPT } from './recensent';
import { SJUKSYSTER_MODE_PROMPT } from './sjuksyster';
import { SYRLIG_MODE_PROMPT } from './syrlig';
import { TERAPEUT_MODE_PROMPT } from './terapeut';
import { VETERAN_MODE_PROMPT } from './veteran';
import { FORHANDLARE_MODE_PROMPT } from './forhandlare';

const MODE_MAP: Record<string, string> = {
	klassisk: KLASSISK_MODE_PROMPT,
	debugger: DEBUGGER_MODE_PROMPT,
	sjuksyster: SJUKSYSTER_MODE_PROMPT,
	handlaggare: HANDLAGGARE_MODE_PROMPT,
	foliehatt: FOLIEHATT_MODE_PROMPT,
	'drama-queen': DRAMA_QUEEN_MODE_PROMPT,
	nattuggla: NATTUGGLA_MODE_PROMPT,
	terapeut: TERAPEUT_MODE_PROMPT,
	filosof: FILOSOF_MODE_PROMPT,
	aktivist: AKTIVIST_MODE_PROMPT,
	forsvarare: FORSVARARE_MODE_PROMPT,
	hyperfokuserad: HYPERFOKUSERAD_MODE_PROMPT,
	kapten: KAPTEN_MODE_PROMPT,
	morsa: MORSA_MODE_PROMPT,
	pedagog: PEDAGOG_MODE_PROMPT,
	recensent: RECENSENT_MODE_PROMPT,
	syrlig: SYRLIG_MODE_PROMPT,
	veteran: VETERAN_MODE_PROMPT,
	forhandlare: FORHANDLARE_MODE_PROMPT
};

export function getModePrompt(modeId: string): string {
	return MODE_MAP[modeId] ?? KLASSISK_MODE_PROMPT;
}
