# Configuration (/docs/paid_resources/filo_vehiclekeys/configuration)





All options live in `shared/sh-config.lua` (kept open when escrowed) and are commented inline.

## General [#general]

```lua
Config.Debug = false
Config.InteractionType = 'prompts'  -- 'target' (ox_target) or 'prompts' (sleepless_prompts)
Config.Minigames = 'tr_minigames'   -- 'builtin' (Config.Difficulty + eye_minigames) or 'tr_minigames'
Config.TrMinigames = {
    HotwireItem = 'wire_strippers', -- match Config.hotwire.item in tr_minigames
    HotwireCommand = 'hotwire',
}
Config.PromptPosition = 'bottom-center'

Config.DefaultKeybinds = { Lock = 'L', Ignition = 'G', Engine = 'M', Hotwire = 'H', Search = 'Y' }
Config.HoldingIgnitionWillToggleEngine = true
```

## Data & Key Cleanup [#data--key-cleanup]

```lua
Config.KeyCleanup = {
    Enabled = true,
    RemovedGraceSeconds = 5, -- wait after deletion, in case the vehicle respawns with the same plate
}
Config.VehicleDataRetentionMonths = 3
```

Keys for vehicles nobody owns are removed when the vehicle is deleted and after a server restart.
Player-owned vehicles always keep their keys.

## Keyfob & World Vehicles [#keyfob--world-vehicles]

```lua
Config.KeyfobDistance = 100.0
Config.AutoDriveDrivingFlag = 786603
Config.AutoDriveSpeed = 3.0

Config.JobKeys = true                   -- give keys for vehicles spawned by job scripts
Config.LockNPCVehicles = true
Config.LockParkedVehicles = true
Config.LockedVehiclesChance = 0.5
Config.DisableLeaveOnLockedDoors = true
```

## Hotwire, Lockpick & Search [#hotwire-lockpick--search]

```lua
Config.Hotwire = {
    Enabled = true,
    SaveHotwireState = true,          -- hotwire persists until the ignition is repaired
    Fixing = { Item = 'electrical_tools', SuccessDurabilityDecrease = 0.1, FailDurabilityDecrease = 0.25 },
    HotwireItem = 'electrical_tools', -- nil for no item
    SuccessDurabilityDecrease = 0.1,
    FailDurabilityDecrease = 0.25,
    AlarmChance = 0.6,
}

Config.Lockpick = {
    Enabled = true, Item = 'lockpick',
    SuccessDurabilityDecrease = 0.1, FailDurabilityDecrease = 0.25, AlarmChance = 0.6,
}

Config.AdvancedLockpick = {
    Enabled = true, Item = 'advanced_lockpick',
    SuccessDurabilityDecrease = 0.05, FailDurabilityDecrease = 0.1, AlarmChance = 0.3,
}

Config.KeySearching = { Enabled = true, Duration = 10, SearchingChance = 0.5 }
```

## Keyless System [#keyless-system]

```lua
Config.KeylessSystem = {
    Enabled = true,
    AutomaticallyDetectElectricModels = true,
    Models = { `neon` }, -- manual overrides
}
```

## Difficulty [#difficulty]

Used by the built-in flow. Lookup order: `ModelDifficulty` (by model name), then
`VehicleClassDifficulty` (by GTA class ID), then `DefaultDifficulty`.

```lua
Config.Difficulty = {
    DefaultDifficulty = 'medium',
    HotwireTimes   = { easy = 35000, medium = 28000, hard = 22000, expert = 18000 }, -- ms
    LockpickChance = { easy = 0.9, medium = 0.75, hard = 0.55, expert = 0.35 },
    AdvancedLockpickChance = { easy = 1.0, medium = 0.9, hard = 0.75, expert = 0.55 },
    HotwireChance  = { easy = 0.9, medium = 0.75, hard = 0.55, expert = 0.35 },
    MinigameLevel  = { easy = 1, medium = 2, hard = 3, expert = 4 },
    VehicleClassDifficulty = { [0] = 'easy', [7] = 'expert', --[[ ... ]] },
    ModelDifficulty = { ['adder'] = 'expert' },
}
```

<Callout type="info">
  Passing the minigame is not enough on its own: the server then rolls the tier's chance.
</Callout>

<details>
  <summary>
    GTA vehicle class IDs
  </summary>

  | ID | Class           | ID | Class       |
  | -- | --------------- | -- | ----------- |
  | 0  | Compacts        | 11 | Utility     |
  | 1  | Sedans          | 12 | Vans        |
  | 2  | SUVs            | 13 | Cycles      |
  | 3  | Coupes          | 14 | Boats       |
  | 4  | Muscle          | 15 | Helicopters |
  | 5  | Sports Classics | 16 | Planes      |
  | 6  | Sports          | 17 | Service     |
  | 7  | Super           | 18 | Emergency   |
  | 8  | Motorcycles     | 19 | Military    |
  | 9  | Off-road        | 20 | Commercial  |
  | 10 | Industrial      | 21 | Trains      |
</details>

## Blacklist [#blacklist]

```lua
Config.Blacklist = {
    Lockpick = true, -- set an action to false to allow it on blacklisted models
    Hotwire = true,
    Carjack = true,
    Models = { ['police'] = true, ['police2'] = true },
}
```

## Police Bypass [#police-bypass]

```lua
Config.PoliceBypass = {
    Enabled = true,
    RequireDuty = true,
    Jobs = { ['police'] = 0, ['sheriff'] = 0 }, -- job = minimum grade
    Item = 'police_bypass',                     -- nil = the job alone is enough
    UseItemToUnlock = true,                     -- using the item unlocks the closest vehicle
    Distance = 3.0,
}
```

## Dispatch [#dispatch]

```lua
Config.Dispatch = {
    Enabled = true,
    System = 'ps-dispatch', -- 'ps-dispatch' | 'builtin' | 'custom'
    Jobs = { 'police', 'sheriff' },
    Chance = { lockpick = 1.0, hotwire = 0.75, carjack = 1.0 },
    Blip = { sprite = 229, color = 1, scale = 1.0, time = 60 },
    Custom = function(data)
        -- data = { action, vehicle, plate, model, coords }
    end,
}
```

* **ps-dispatch** calls its `VehicleTheft` (lockpick, hotwire) or `CarJacking` alert.
* **builtin** sends a notification and a flashing blip to on-duty players in `Jobs`.
* **custom** runs `Custom(data)` on the offender's client, so you can call any dispatch export.

## Carjacking [#carjacking]

```lua
Config.Carjack = {
    Enabled = true,
    Duration = 6000,       -- progress bar (ms)
    Distance = 12.0,
    MaxSpeed = 15.0,       -- m/s
    SuccessChance = 0.85,
    FailBehavior = 'flee', -- 'flee' or 'fight'
    Cooldown = 30,         -- seconds per player
    GiveKeys = true,
    MeleeAllowed = false,
}
```

## Locksmith [#locksmith]

```lua
Config.Locksmith = {
    Job = 'locksmith',
    RequireDuty = true,
    Items = {
        OBD            = { item = 'locksmith_tablet', degrade = 0.1 },
        KeyCuttingTool = { item = 'key_cutting_tool', degrade = 0.1 },
        BlankKey       = { item = 'blank_key' },
    },
    Interactions = {
        { coords = vec3(165.660, -1810.262, 29.275), type = 'KeyCutting' },
    },
    Blips = {
        { coords = vec3(167.32, -1803.38, 29.32), label = 'Locksmith', sprite = 811, color = 5, scale = 1.0 },
    },
    OfflineStore = {
        Enabled = true,
        MininumDuty = 0, -- NPC store opens when on-duty locksmiths <= this
        Prices = { Mechanical = 1000, Wireless = 5000 },
        Locations = {
            {
                coords = vec4(165.55, -1808.37, 28.32, 320.84),
                anim = { dict = 'anim@amb@nightclub@lazlow@ig1_vip@', name = 'clubvip_base_laz', flag = 1 },
                model = `s_m_y_xmech_01`,
            },
        },
    },
}
```
