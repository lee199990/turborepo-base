[@jmrepo/gismap](../README.md) / [Exports](../modules.md) / GisMap

# Class: GisMap\<T, C\>

## Type parameters

| Name | Type                                                |
| :--- | :-------------------------------------------------- |
| `T`  | `T`                                                 |
| `C`  | extends `Controllers`\<`T`\> = `Controllers`\<`T`\> |

## Hierarchy

-   **`GisMap`**

    ↳ [`CustomMapLibre`](CustomMapLibre.md)

    ↳ [`CustomOpenLayers`](CustomOpenLayers.md)

## Table of contents

### Constructors

-   [constructor](GisMap.md#constructor)

### Properties

-   [controllers](GisMap.md#controllers)
-   [instance](GisMap.md#instance)
-   [status](GisMap.md#status)

### Methods

-   [destroy](GisMap.md#destroy)
-   [getControl](GisMap.md#getcontrol)
-   [onLoaded](GisMap.md#onloaded)
-   [setup](GisMap.md#setup)

## Constructors

### constructor

• **new GisMap**\<`T`, `C`\>(`container`, `option?`): [`GisMap`](GisMap.md)\<`T`, `C`\>

#### Type parameters

| Name | Type                                                |
| :--- | :-------------------------------------------------- |
| `T`  | `T`                                                 |
| `C`  | extends `Controllers`\<`T`\> = `Controllers`\<`T`\> |

#### Parameters

| Name        | Type                          |
| :---------- | :---------------------------- |
| `container` | `string`                      |
| `option`    | [`InitConfig`](InitConfig.md) |

#### Returns

[`GisMap`](GisMap.md)\<`T`, `C`\>

#### Defined in

lib/gismap.ts:20

## Properties

### controllers

• **controllers**: `C`

#### Defined in

lib/gismap.ts:16

---

### instance

• **instance**: `T`

#### Defined in

lib/gismap.ts:14

---

### status

• **status**: `MapStatusAdapter`\<`T`\>

#### Defined in

lib/gismap.ts:18

## Methods

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

lib/gismap.ts:32

---

### getControl

▸ **getControl**\<`K`\>(`key`): `C`[`K`]

#### Type parameters

| Name | Type                                                   |
| :--- | :----------------------------------------------------- |
| `K`  | extends [`ControllerName`](../enums/ControllerName.md) |

#### Parameters

| Name  | Type |
| :---- | :--- |
| `key` | `K`  |

#### Returns

`C`[`K`]

#### Defined in

lib/gismap.ts:28

---

### onLoaded

▸ **onLoaded**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

lib/gismap.ts:26

---

### setup

▸ **setup**(`container`, `option`): `T`

#### Parameters

| Name        | Type                          |
| :---------- | :---------------------------- |
| `container` | `string`                      |
| `option`    | [`InitConfig`](InitConfig.md) |

#### Returns

`T`

#### Defined in

lib/gismap.ts:24
