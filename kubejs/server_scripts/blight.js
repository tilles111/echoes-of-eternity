PlayerEvents.tick(event => {
    let curBlight = event.player.persistentData.getInt('blight') || 0
    event.player.persistentData.putInt(
        'blight',
        curBlight + 1
    )
  event.player.effect(Item.of('minecraft:diamond', 64))
})