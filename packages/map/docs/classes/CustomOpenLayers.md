[@jmrepo/gismap](../README.md) / [Exports](../modules.md) / CustomOpenLayers

# Class: CustomOpenLayers

## Hierarchy

-   [`GisMap`](GisMap.md)\<`Map`, `OpenLayerControllers`\>

    ↳ **`CustomOpenLayers`**

## Table of contents

### Constructors

-   [constructor](CustomOpenLayers.md#constructor)

### Properties

-   [controllers](CustomOpenLayers.md#controllers)
-   [instance](CustomOpenLayers.md#instance)
-   [status](CustomOpenLayers.md#status)

### Methods

-   [destroy](CustomOpenLayers.md#destroy)
-   [getControl](CustomOpenLayers.md#getcontrol)
-   [onLoaded](CustomOpenLayers.md#onloaded)
-   [setup](CustomOpenLayers.md#setup)

## Constructors

### constructor

• **new CustomOpenLayers**(`container`, `option?`): [`CustomOpenLayers`](CustomOpenLayers.md)

#### Parameters

| Name        | Type                          |
| :---------- | :---------------------------- |
| `container` | `string`                      |
| `option?`   | [`InitConfig`](InitConfig.md) |

#### Returns

[`CustomOpenLayers`](CustomOpenLayers.md)

#### Overrides

[GisMap](GisMap.md).[constructor](GisMap.md#constructor)

#### Defined in

lib/engine/openlayer/map.ts:28

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

lib/engine/openlayer/map.ts:63

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

#### Inherited from

[GisMap](GisMap.md).[getControl](GisMap.md#getcontrol)

#### Defined in

lib/gismap.ts:28

---

### onLoaded

▸ **onLoaded**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

[GisMap](GisMap.md).[onLoaded](GisMap.md#onloaded)

#### Defined in

lib/engine/openlayer/map.ts:57

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

lib/engine/openlayer/map.ts:33
