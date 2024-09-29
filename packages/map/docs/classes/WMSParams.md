[@jmrepo/gismap](../README.md) / [Exports](../modules.md) / WMSParams

# Class: WMSParams

## Table of contents

### Constructors

-   [constructor](WMSParams.md#constructor)

### Properties

-   [bbox](WMSParams.md#bbox)
-   [format](WMSParams.md#format)
-   [height](WMSParams.md#height)
-   [layers](WMSParams.md#layers)
-   [request](WMSParams.md#request)
-   [service](WMSParams.md#service)
-   [srs](WMSParams.md#srs)
-   [styles](WMSParams.md#styles)
-   [transparent](WMSParams.md#transparent)
-   [version](WMSParams.md#version)
-   [width](WMSParams.md#width)

### Methods

-   [create](WMSParams.md#create)

## Constructors

### constructor

• **new WMSParams**(): [`WMSParams`](WMSParams.md)

#### Returns

[`WMSParams`](WMSParams.md)

## Properties

### bbox

• `Optional` **bbox**: `string`

#### Defined in

lib/controllers/layer-controller/services/wms.ts:71

---

### format

• **format**: [`LayerFormat`](../enums/LayerFormat.md) = `LayerFormat.Png`

#### Defined in

lib/controllers/layer-controller/services/wms.ts:47

---

### height

• **height**: `number` = `256`

#### Defined in

lib/controllers/layer-controller/services/wms.ts:66

---

### layers

• **layers**: `string` = `''`

#### Defined in

lib/controllers/layer-controller/services/wms.ts:60

---

### request

• **request**: [`WMSRequest`](../enums/WMSRequest.md) = `WMSRequest.GetMap`

#### Defined in

lib/controllers/layer-controller/services/wms.ts:52

---

### service

• **service**: `string` = `'WMS'`

#### Defined in

lib/controllers/layer-controller/services/wms.ts:54

---

### srs

• **srs**: `string` = `'EPSG:4326'`

#### Defined in

lib/controllers/layer-controller/services/wms.ts:69

---

### styles

• **styles**: `string` = `''`

#### Defined in

lib/controllers/layer-controller/services/wms.ts:50

---

### transparent

• **transparent**: `boolean` = `true`

#### Defined in

lib/controllers/layer-controller/services/wms.ts:57

---

### version

• **version**: `string` = `'1.1.0'`

#### Defined in

lib/controllers/layer-controller/services/wms.ts:44

---

### width

• **width**: `number` = `256`

#### Defined in

lib/controllers/layer-controller/services/wms.ts:63

## Methods

### create

▸ **create**(`params?`): [`WMSParams`](WMSParams.md)

#### Parameters

| Name      | Type                                     |
| :-------- | :--------------------------------------- |
| `params?` | `Partial`\<[`WMSParams`](WMSParams.md)\> |

#### Returns

[`WMSParams`](WMSParams.md)

#### Defined in

lib/controllers/layer-controller/services/wms.ts:40
