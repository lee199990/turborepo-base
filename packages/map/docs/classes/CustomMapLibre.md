[@jmrepo/gismap](../README.md) / [Exports](../modules.md) / CustomMapLibre

# Class: CustomMapLibre

## Hierarchy

-   [`GisMap`](GisMap.md)\<`Map`, `OpenLayerControllers`\>

    ↳ **`CustomMapLibre`**

## Table of contents

### Constructors

-   [constructor](CustomMapLibre.md#constructor)

### Properties

-   [controllers](CustomMapLibre.md#controllers)
-   [instance](CustomMapLibre.md#instance)
-   [status](CustomMapLibre.md#status)

### Methods

-   [destroy](CustomMapLibre.md#destroy)
-   [getControl](CustomMapLibre.md#getcontrol)
-   [onLoaded](CustomMapLibre.md#onloaded)
-   [setup](CustomMapLibre.md#setup)

## Constructors

### constructor

• **new CustomMapLibre**(`container`, `option?`): [`CustomMapLibre`](CustomMapLibre.md)

#### Parameters

| Name        | Type                          |
| :---------- | :---------------------------- |
| `container` | `string`                      |
| `option?`   | [`InitConfig`](InitConfig.md) |

#### Returns

[`CustomMapLibre`](CustomMapLibre.md)

#### Overrides

[GisMap](GisMap.md).[constructor](GisMap.md#constructor)

#### Defined in

lib/engine/maplibre/map.ts:25

## Properties

### controllers

• **controllers**: `OpenLayerControllers`

#### Inherited from

[GisMap](GisMap.md).[controllers](GisMap.md#controllers)

#### Defined in

lib/gismap.ts:16

---

### instance

• **instance**: `Map`

#### Inherited from

[GisMap](GisMap.md).[instance](GisMap.md#instance)

#### Defined in

lib/gismap.ts:14

---

### status

• **status**: `MapStatusAdapter`\<`Map`\>

#### Inherited from

[GisMap](GisMap.md).[status](GisMap.md#status)

#### Defined in

lib/gismap.ts:18

## Methods

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Overrides

[GisMap](GisMap.md).[destroy](GisMap.md#destroy)

#### Defined in

lib/engine/maplibre/map.ts:69

---

### getControl

▸ **getControl**\<`K`\>(`key`): `OpenLayerControllers`[`K`]

#### Type parameters

| Name | Type                                                   |
| :--- | :----------------------------------------------------- |
| `K`  | extends [`ControllerName`](../enums/ControllerName.md) |

#### Parameters

| Name  | Type |
| :---- | :--- |
| `key` | `K`  |

#### Returns

`OpenLayerControllers`[`K`]

#### Overrides

[GisMap](GisMap.md).[getControl](GisMap.md#getcontrol)

#### Defined in

lib/engine/maplibre/map.ts:59

---

### onLoaded

▸ **onLoaded**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

[GisMap](GisMap.md).[onLoaded](GisMap.md#onloaded)

#### Defined in

lib/engine/maplibre/map.ts:63

---

### setup

▸ **setup**(`container`, `option`): `Map`

#### Parameters

| Name        | Type                          |
| :---------- | :---------------------------- |
| `container` | `string`                      |
| `option`    | [`InitConfig`](InitConfig.md) |

#### Returns

`Map`

#### Overrides

[GisMap](GisMap.md).[setup](GisMap.md#setup)

#### Defined in

lib/engine/maplibre/map.ts:30
