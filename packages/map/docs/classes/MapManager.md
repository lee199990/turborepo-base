[@jmrepo/gismap](../README.md) / [Exports](../modules.md) / MapManager

# Class: MapManager\<T\>

## Type parameters

| Name | Type                                       |
| :--- | :----------------------------------------- |
| `T`  | extends [`GisMap`](GisMap.md)\<`unknown`\> |

## Table of contents

### Constructors

-   [constructor](MapManager.md#constructor)

### Properties

-   [activeMap](MapManager.md#activemap)
-   [maps](MapManager.md#maps)
-   [#Instance](MapManager.md##instance)

### Methods

-   [create](MapManager.md#create)
-   [destroy](MapManager.md#destroy)
-   [get](MapManager.md#get)
-   [remove](MapManager.md#remove)
-   [getInstance](MapManager.md#getinstance)

## Constructors

### constructor

• **new MapManager**\<`T`\>(): [`MapManager`](MapManager.md)\<`T`\>

#### Type parameters

| Name | Type                                                                   |
| :--- | :--------------------------------------------------------------------- |
| `T`  | extends [`GisMap`](GisMap.md)\<`unknown`, `Controllers`\<`unknown`\>\> |

#### Returns

[`MapManager`](MapManager.md)\<`T`\>

## Properties

### activeMap

• `Optional` **activeMap**: `T`

#### Defined in

lib/map-manager.ts:24

---

### maps

• **maps**: `Map`\<`string`, `T`\>

#### Defined in

lib/map-manager.ts:22

---

### #Instance

▪ `Static` `Private` **#Instance
**: [`MapManager`](MapManager.md)\<[`GisMap`](GisMap.md)\<`unknown`, `Controllers`\<`unknown`\>\>\>

#### Defined in

lib/map-manager.ts:13

## Methods

### create

▸ **create**\<`R`\>(`id`, `engine`): `R`

#### Type parameters

| Name | Type                                                                   |
| :--- | :--------------------------------------------------------------------- |
| `R`  | extends [`GisMap`](GisMap.md)\<`unknown`, `Controllers`\<`unknown`\>\> |

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `id`     | `string` |
| `engine` | `R`      |

#### Returns

`R`

#### Defined in

lib/map-manager.ts:26

---

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

lib/map-manager.ts:46

---

### get

▸ **get**(`id`): `undefined` \| `T`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

`undefined` \| `T`

#### Defined in

lib/map-manager.ts:32

---

### remove

▸ **remove**(`id`): `boolean`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

`boolean`

#### Defined in

lib/map-manager.ts:36

---

### getInstance

▸ **getInstance**\<`T`\>(): [`MapManager`](MapManager.md)\<`T`\>

#### Type parameters

| Name | Type                                                                   |
| :--- | :--------------------------------------------------------------------- |
| `T`  | extends [`GisMap`](GisMap.md)\<`unknown`, `Controllers`\<`unknown`\>\> |

#### Returns

[`MapManager`](MapManager.md)\<`T`\>

#### Defined in

lib/map-manager.ts:15
