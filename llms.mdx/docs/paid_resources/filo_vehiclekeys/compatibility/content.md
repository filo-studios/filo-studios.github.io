# Compatibility (/docs/paid_resources/filo_vehiclekeys/compatibility)





## qb-vehiclekeys & qbx\_vehiclekeys [#qb-vehiclekeys--qbx_vehiclekeys]

`filo_vehiclekeys` provides `qb-vehiclekeys`, `qbx_vehiclekeys` and `filo_vehiclekey` (v1), so
garages and job scripts that use them keep working without changes.

```lua
-- qb-vehiclekeys
TriggerServerEvent('qb-vehiclekeys:server:AcquireVehicleKeys', plate)
TriggerEvent('vehiclekeys:client:SetOwner', plate)

-- qbx_vehiclekeys
lib.callback.await('qbx_vehiclekeys:server:giveKeys', false, netId)
exports.qbx_vehiclekeys:GiveKeys(source, vehicle)
exports.qbx_vehiclekeys:RemoveKeys(source, vehicle)
exports.qbx_vehiclekeys:SetLockState(vehicle, state)
exports.qbx_vehiclekeys:HasKeys(vehicle) -- client
```

## tr\_minigames [#tr_minigames]

Set `Config.Minigames = 'tr_minigames'` to use tr\_minigames' physical lockpick and hotwire.
filo\_vehiclekeys stays in charge of input and prompts; tr\_minigames runs the minigame and decides
the outcome.

* **Hotwire:** the hotwire key (`H`) and prompt start tr\_minigames' hotwire. The prompt only shows when you have no key and carry `Config.TrMinigames.HotwireItem`.
* **Lockpick:** using the `lockpick` item starts tr\_minigames' lockpick. A successful pick unlocks the car.
* **After a hotwire:** the car is marked hotwired and runs without a key being handed out.
* **Access checks:** tr\_minigames asks filo\_vehiclekeys through `HasVehicleAccess`. Keys, job keys and the police bypass all count.

The `tr_core` and `tr_minigames` folders in the download are pre-configured (`keys = 'filo_vehiclekeys'`,
their own prompts, target option and keybinds off). Ensure them **after** `filo_vehiclekeys`:

```
ensure filo_vehiclekeys
ensure tr_core
ensure tr_minigames
```

<Callout type="warn">
  In this mode, difficulty, class tiers, alarms and lockpick/hotwire alerts come from tr\_minigames'
  own config. `Config.Blacklist` is still checked before a hotwire starts, but copy the models into
  tr\_minigames' `excludeModels` too. Keep `Config.TrMinigames.HotwireItem` equal to tr\_minigames'
  `Config.hotwire.item` (default `wire_strippers`).
</Callout>

## Editing the bridge [#editing-the-bridge]

Everything that depends on another resource lives in `bridge/` and stays open when escrowed.

| File                                             | What it contains                                                                |
| ------------------------------------------------ | ------------------------------------------------------------------------------- |
| `bridge/framework/client.lua` / `server.lua`     | Player job, money, owned vehicles, usable items, vehicle names                  |
| `bridge/inventory/client.lua` / `server.lua`     | Item checks, adding/removing items, durability, inventory reads                 |
| `bridge/minigames/client.lua`                    | Hotwire, lockpick, search and wiring minigames (each returns true on pass)      |
| `bridge/minigames/server.lua`                    | Syncs results from tr\_minigames into the key state                             |
| `bridge/dispatch/client.lua`                     | ps-dispatch, builtin and custom dispatch                                        |
| `bridge/target/client.lua`                       | Lock/unlock target options on vehicles                                          |
| `bridge/compatibility/client.lua` / `server.lua` | qb/qbx shims, plus `HasVehicleAccess` and `StartEngineWithoutKeys` for tr\_core |

To support another framework or inventory, change the function bodies and keep the function
names: the rest of the resource calls them by name.

<Callout type="info">
  Something broken after a third-party update? Open a ticket in the
  [Discord](https://discord.gg/EWKWXVBHK7).
</Callout>
