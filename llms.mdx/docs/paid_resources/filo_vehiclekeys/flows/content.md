# Flows (/docs/paid_resources/filo_vehiclekeys/flows)





## Lockpicking & Hotwiring [#lockpicking--hotwiring]

Every attempt resolves to a difficulty tier (`easy` / `medium` / `hard` / `expert`) from
`ModelDifficulty`, then `VehicleClassDifficulty`, then `DefaultDifficulty`.

* **Lockpick:** use `lockpick` or `advanced_lockpick` near a locked vehicle. Pass the minigame, then the server rolls the tier's chance. Tools lose durability and may trigger the alarm.
* **Hotwire:** press `H` in a vehicle you have no key for, with `Config.Hotwire.HotwireItem`. A progress bar runs for the tier's time, then the minigame at the tier's level, then the server rolls the chance.
* **Search:** press `Y` in a parked vehicle to search for its key (`Config.KeySearching`).

Models in `Config.Blacklist.Models` can't be lockpicked, hotwired or carjacked (per action).

<Callout type="info">
  With `Config.Minigames = 'tr_minigames'`, tr\_minigames handles these flows. See
  [Compatibility](/docs/paid_resources/filo_vehiclekeys/compatibility#tr_minigames).
</Callout>

## Carjacking [#carjacking]

Aim a gun at an NPC driver within `Distance` of a car slower than `MaxSpeed`. The driver brakes and
a progress bar starts; it cancels if you stop aiming or move away.

* **Success:** the driver gets out and runs, the car unlocks, you get its key and police are alerted.
* **Failure:** the driver drives off or fights back (`FailBehavior`).

The aim check only runs while a weapon is drawn. Each player has a `Cooldown` between attempts.

## Police [#police]

Jobs in `Config.PoliceBypass.Jobs` (at the minimum grade, on duty, and carrying `police_bypass` if
set) can lock, unlock, insert the ignition and start the engine on any vehicle. With
`UseItemToUnlock`, using the item unlocks the closest vehicle. Carjacking a blacklisted vehicle
with the bypass is allowed and sends no dispatch.

Successful lockpicks, hotwires and carjacks send a dispatch alert based on `Config.Dispatch.Chance`.

## Locksmith [#locksmith]

* **Key cutting:** at a key cutting station or with the `key_cutting_tool`. Copies a key from the locksmith's inventory or a nearby vehicle. Uses a `blank_key`.
* **OBD programming:** for keyless vehicles. The locksmith sits in the driver's seat and uses the `locksmith_tablet`.
* **Invalidate old keys:** optional when making a key. Generates a new key ID so every old copy stops working.
* **NPC store:** when `OfflineStore.MininumDuty` or fewer locksmiths are on duty, players can buy spare keys for vehicles they own. Prices are enforced on the server.
* **Ignition repair:** use `electrical_tools` in a hotwired vehicle to clear the hotwire. Only needed when `Config.Hotwire.SaveHotwireState` is on.

## Admin Panel [#admin-panel]

`/keyadmin` lists stored and spawned vehicles (spawned ones have a green dot). For each vehicle you can:

* toggle keyless, keys-in-ignition, engine-on and hotwired
* add or remove jobs with access
* regenerate the key ID, making every existing key useless
* give a key to an online player
* delete the stored record

Every action is checked on the server against the `command.keyadmin` permission.

## Key Validation [#key-validation]

A key item is valid when its plate and key ID match the vehicle's current key ID. The server keeps
that ID on the spawned vehicle, or in the `filo_vehiclekeys` table for owned vehicles that aren't
spawned. Checks never trust client data.

Keys for unowned vehicles (NPC, stolen or job cars) are removed when the vehicle is deleted and
after a server restart (`Config.KeyCleanup`). Player-owned vehicles always keep their keys.
