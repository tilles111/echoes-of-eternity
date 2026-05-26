PlayerEvents.respawned(event => {
    // Cause I am not evil
    event.player.persistentData.putInt('blight', 0)
    event.player.persistentData.putInt('blightcooldown', 0)
})

PlayerEvents.tick(event => {
    // Thanks Deepa :)
    let curBlight = event.player.persistentData.getInt('blight') || 0
    let curBlightCooldown = event.player.persistentData.getInt('blightcooldown') || 0
    let blightRes = event.player.attributes.getValue('kubejs:blight_resistance') || 0

    if (curBlightCooldown > 0) {
        event.player.persistentData.putInt('blightcooldown', curBlightCooldown - 1)
    } else {
        if (curBlight > 0) {
            event.player.persistentData.putInt('blight', curBlight - (10 + (2 * blightRes)))
            if (event.player.persistentData.getInt('blight') < 0) {
                event.player.persistentData.putInt('blight', 0)
            }
        }
    }
    
    if (event.player.isCreative() == true) return
    
    // Biome based blight gain
    // Future tilles pls replace with blighted biomes
    if (event.player.block.getBiomeId() == 'minecraft:badlands') {
        if (10 - blightRes > 0) {
            event.player.persistentData.putInt('blight', curBlight + (10 - blightRes))
            event.player.persistentData.putInt('blightcooldown', 100)
        }
    }
    if (event.player.block.getBiomeId() == 'minecraft:wooded_badlands') {
        if (20 - blightRes > 0) {
            event.player.persistentData.putInt('blight', curBlight + (20 - blightRes))
            event.player.persistentData.putInt('blightcooldown', 100)
        }
    }
    // Maybe add visual effects based on stage?
    // Blight status effects
    if (curBlight > 72000) {
        event.player.persistentData.putInt('blight', 72000)
        event.player.potionEffects.add('minecraft:wither', 20, 4)
    }
    if (curBlight > 60000) {
        event.player.potionEffects.add('spectrum:somnolence', 20, 0)
        event.player.potionEffects.add('spectrum:life_drain', 50, 9)
        event.player.potionEffects.add('minecraft:slowness', 20, 1)
        event.player.potionEffects.add('minecraft:weakness', 20, 1)
        event.player.potionEffects.add('minecraft:darkness', 50, 0)
    } else {
        if (curBlight >= 48000) {
            event.player.potionEffects.add('spectrum:somnolence', 20, 0)
        event.player.potionEffects.add('spectrum:life_drain', 50, 7)
            event.player.potionEffects.add('minecraft:slowness', 20, 1)
            event.player.potionEffects.add('minecraft:weakness', 20, 1)
        } else {
            if (curBlight >= 36000) {
                event.player.potionEffects.add('spectrum:somnolence', 20, 0)
                event.player.potionEffects.add('spectrum:life_drain', 50, 5)
                event.player.potionEffects.add('minecraft:slowness', 20, 0)
                event.player.potionEffects.add('minecraft:weakness', 20, 1)
            } else {
                if (curBlight >= 24000) {
                    event.player.potionEffects.add('spectrum:somnolence', 20, 0)
                    event.player.potionEffects.add('spectrum:life_drain', 50, 3)
                    event.player.potionEffects.add('minecraft:slowness', 20, 0)
                    event.player.potionEffects.add('minecraft:weakness', 20, 0)
                } else {
                    if (curBlight >= 12000) {
                        event.player.potionEffects.add('spectrum:somnolence', 20, 0)
                        event.player.potionEffects.add('spectrum:life_drain', 50, 1)
                        event.player.potionEffects.add('minecraft:slowness', 20, 0)
                    }
                }
            }
        }
    }
})