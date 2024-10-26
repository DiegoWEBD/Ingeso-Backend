import Ram from '../../../domain/ram/Ram'
import { RamJSON } from './RamJSON'

export default class RamAdapter {
	private constructor() {}

	static ToJSON(ram: Ram): RamJSON {
		return { reaction: ram.getReaction() }
	}
}
