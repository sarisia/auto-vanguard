module.exports = function AutoVanguard(mod) {
	mod.command.add(['vanguard', 'vg'], {
		$default: () => {
			mod.settings.enabled = !mod.settings.enabled
			mod.command.message((mod.settings.enabled ? 'en' : 'dis') + 'abled globally')
		},
		'this': () => {
			const ingame = mod.game.me.name
			if (typeof mod.settings.players[ingame] === 'undefined') {
				mod.settings.players[ingame] = false
			} else {
				mod.settings.players[ingame] = !mod.settings.players[ingame]
			}

			mod.command.message((mod.settings.players[ingame] ? 'en' : 'dis') + 'abled for this character')
		}
	})

	mod.hook('S_COMPLETE_EVENT_MATCHING_QUEST', 1, (event) => {
		if(typeof mod.settings.players[mod.game.me.name] === 'undefined') {
			if (!mod.settings.enabled)
			return
		}
		if(!mod.settings.players[mod.game.me.name])
			return
		
		setTimeout(() => {
			mod.send('C_COMPLETE_DAILY_EVENT', 1, {
				id: event.id
			})
		}, mod.settings.complete_delay)

		return false
	})
}
