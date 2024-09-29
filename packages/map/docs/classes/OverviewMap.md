[@jmrepo/gismap](../README.md) / [Exports](../modules.md) / OverviewMap

# Class: OverviewMap

## Table of contents

### Constructors

-   [constructor](OverviewMap.md#constructor)

### Properties

-   [options](OverviewMap.md#options)
-   [overviewMap](OverviewMap.md#overviewmap)
-   [parentMap](OverviewMap.md#parentmap)

### Methods

-   [addLayer](OverviewMap.md#addlayer)
-   [overviewMapInit](OverviewMap.md#overviewmapinit)

## Constructors

### constructor

• **new OverviewMap**(`parentMap`, `options?`): [`OverviewMap`](OverviewMap.md)

#### Parameters

| Name        | Type                 |
| :---------- | :------------------- |
| `parentMap` | `MapInstanceType`    |
| `options?`  | `OverviewMapOptions` |

#### Returns

[`OverviewMap`](OverviewMap.md)

#### Defined in

lib/widget/overviewMap/OverviewMap.ts:22

## Properties

### options

• `Protected` `Optional` **options**: `OverviewMapOptions`

#### Defined in

lib/widget/overviewMap/OverviewMap.ts:24

---

### overviewMap

• `Private` **overviewMap**: `OpenlayersOverviewMap` \| `MaplibreOverviewMap`

#### Defined in

lib/widget/overviewMap/OverviewMap.ts:20

---

### parentMap

• `Protected` **parentMap**: `MapInstanceType`

#### Defined in

lib/widget/overviewMap/OverviewMap.ts:23

## Methods

### addLayer

▸ **addLayer**(`options`): [`OverviewMap`](OverviewMap.md)

#### Parameters

| Name      | Type                                                |
| :-------- | :-------------------------------------------------- |
| `options` | [`TmsLayerOption`](../interfaces/TmsLayerOption.md) |

#### Returns

[`OverviewMap`](OverviewMap.md)

#### Defined in

lib/widget/overviewMap/OverviewMap.ts:39

---

### overviewMapInit

▸ **overviewMapInit**(`instance`): `void`

#### Parameters

| Name       | Type  |
| :--------- | :---- |
| `instance` | `any` |

#### Returns

`void`

#### Defined in

lib/widget/overviewMap/OverviewMap.ts:33
