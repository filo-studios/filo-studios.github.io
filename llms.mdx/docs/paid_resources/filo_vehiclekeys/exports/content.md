# Exports (/docs/paid_resources/filo_vehiclekeys/exports)





## Server [#server]

`target` can be a plate, network ID or entity.

```lua
exports.filo_vehiclekeys:GiveKeys(source, target, forceGive, invalidateOldKey)
exports.filo_vehiclekeys:RemoveKeys(source, target)
exports.filo_vehiclekeys:GiveJobKeys(plate, job)
exports.filo_vehiclekeys:RemoveJobKeys(plate, job)
exports.filo_vehiclekeys:SetKeysInIgnition(plate, keysInIgnition, canRemove)
exports.filo_vehiclekeys:SetLockState(vehicle, locked) -- boolean, or 2 = locked / 1 = unlocked
exports.filo_vehiclekeys:HasVehicleAccess(source, vehicle) -- keys, job keys or police bypass
```

## Client [#client]

```lua
exports.filo_vehiclekeys:GiveKeys(vehicle, invalidateOldKey)
exports.filo_vehiclekeys:GiveKeysByPlate(plate, invalidateOldKey)
exports.filo_vehiclekeys:RemoveKeys(vehicle)
exports.filo_vehiclekeys:RemoveKeysByPlate(plate)

exports.filo_vehiclekeys:HasKeys(vehicle)
exports.filo_vehiclekeys:HasKeysByPlate(plate)
exports.filo_vehiclekeys:HasJobKeys(vehicle)
exports.filo_vehiclekeys:HasJobKeysByPlate(plate)
exports.filo_vehiclekeys:HasVehicleAccess(vehicle) -- keys, job keys or police bypass
exports.filo_vehiclekeys:HasPoliceBypass()

exports.filo_vehiclekeys:GiveJobKeys(vehicle, job)
exports.filo_vehiclekeys:RemoveJobKeys(vehicle, job)
exports.filo_vehiclekeys:SetKeysInIgnition(plate, keysInIgnition, canRemove)
```

<Callout type="info">
  `StartEngineWithoutKeys` is also exported for tr\_core's key bridge. You don't need to call it yourself.
</Callout>
