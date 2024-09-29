[@jmrepo/gismap](../README.md) / [Exports](../modules.md) / WMTSParams

# Class: WMTSParams

## Indexable

▪ [key: `string`]: `string`

## Table of contents

### Constructors

-   [constructor](WMTSParams.md#constructor)

### Properties

-   [format](WMTSParams.md#format)
-   [layer](WMTSParams.md#layer)
-   [request](WMTSParams.md#request)
-   [service](WMTSParams.md#service)
-   [style](WMTSParams.md#style)
-   [tileMatrixSet](WMTSParams.md#tilematrixset)
-   [version](WMTSParams.md#version)

### Methods

-   [create](WMTSParams.md#create)

## Constructors

### constructor

• **new WMTSParams**(): [`WMTSParams`](WMTSParams.md)

#### Returns

[`WMTSParams`](WMTSParams.md)

## Properties

### format

• **format**: [`LayerFormat`](../enums/LayerFormat.md) = `LayerFormat.Png`

#### Defined in

lib/controllers/layer-controller/services/wmts.ts:28

---

### layer

• **layer**: `string` = `''`

#### Defined in

lib/controllers/layer-controller/services/wmts.ts:35

---

### request

• **request**: [`WMTSRequest`](../enums/WMTSRequest.md) = `WMTSRequest.GetTile`

#### Defined in

lib/controllers/layer-controller/services/wmts.ts:33

---

### service

• **service**: `string` = `'WMTS'`

#### Defined in

lib/controllers/layer-controller/services/wmts.ts:37

---

### style

• **style**: `string` = `''`

#### Defined in

lib/controllers/layer-controller/services/wmts.ts:31

---

### tileMatrixSet

• **tileMatrixSet**: `string` = `'EPSG:3857'`

#### Defined in

lib/controllers/layer-controller/services/wmts.ts:39

---

### version

• **version**: `string` = `'1.1.0'`

#### Defined in

lib/controllers/layer-controller/services/wmts.ts:25

## Methods

### create

▸ **create**(`params?`): [`WMTSParams`](WMTSParams.md)

#### Parameters

| Name      | Type                                       |
| :-------- | :----------------------------------------- |
| `params?` | `Partial`\<[`WMTSParams`](WMTSParams.md)\> |

#### Returns

[`WMTSParams`](WMTSParams.md)

#### Defined in

lib/controllers/layer-controller/services/wmts.ts:21
